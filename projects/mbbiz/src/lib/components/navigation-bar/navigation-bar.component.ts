import { Component, computed, input, output, signal } from '@angular/core';
import { IconComponent } from '@mbbiz/icon/angular';

import { MBBIZ_CHECKER_NAV_ITEMS } from './navigation-bar.checker';
import { MBBIZ_MAKER_NAV_ITEMS } from './navigation-bar.maker';
import { MBBIZ_ONE_USER_NAV_ITEMS } from './navigation-bar.one-user';
import type {
  MbbizNavigationBarItem,
  MbbizNavigationBarVariant,
  MbbizNavigationItemClick,
  MbbizNavigationItemState,
  MbbizNavigationSubItem,
} from './navigation-bar.types';

@Component({
  selector: 'mbbiz-navigation-bar',
  imports: [IconComponent],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class MbbizNavigationBarComponent {
  readonly variant = input<MbbizNavigationBarVariant>('maker');
  readonly items = input<readonly MbbizNavigationBarItem[]>([]);
  readonly activeId = input<string | null>(null);
  readonly openId = input<string | null>(null);
  readonly expandedIds = input<readonly string[]>([]);
  readonly showLogo = input(true);
  readonly ariaLabel = input('Navigation');

  readonly itemClick = output<MbbizNavigationItemClick>();

  private readonly hoveredId = signal<string | null>(null);
  private readonly expandedIdSet = signal<ReadonlySet<string>>(new Set());

  protected readonly resolvedItems = computed(() => {
    const items = this.items();
    if (items.length > 0) {
      return items;
    }

    if (this.variant() === 'checker') {
      return MBBIZ_CHECKER_NAV_ITEMS;
    }

    if (this.variant() === '1user') {
      return MBBIZ_ONE_USER_NAV_ITEMS;
    }

    return MBBIZ_MAKER_NAV_ITEMS;
  });

  protected readonly openedId = computed(() => this.openId() ?? this.hoveredId());

  protected readonly openSubmenuItem = computed(() => {
    const id = this.openedId();
    if (!id) {
      return null;
    }

    return this.resolvedItems().find((item) => item.id === id && this.hasChildren(item)) ?? null;
  });

  protected readonly navClass = computed(() =>
    [
      'mbbiz-navigation-bar',
      `mbbiz-navigation-bar--${this.variant()}`,
      this.openSubmenuItem() ? 'mbbiz-navigation-bar--submenu-open' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected trackItem(index: number, item: MbbizNavigationBarItem | MbbizNavigationSubItem) {
    return item.id || `${item.label}-${index}`;
  }

  protected hasChildren(item: MbbizNavigationBarItem | MbbizNavigationSubItem) {
    return (item.children?.length ?? 0) > 0;
  }

  protected isSubmenuOpen(item: MbbizNavigationBarItem) {
    return this.openedId() === item.id && this.hasChildren(item);
  }

  protected isExpanded(item: MbbizNavigationSubItem) {
    return this.expandedIds().includes(item.id) || this.expandedIdSet().has(item.id);
  }

  protected itemState(item: MbbizNavigationBarItem): MbbizNavigationItemState {
    if (item.state) {
      return item.state;
    }

    if (item.disabled) {
      return 'disabled';
    }

    if (this.isSubmenuOpen(item)) {
      return 'hover';
    }

    if (this.isBranchActive(item)) {
      return 'active';
    }

    return 'default';
  }

  protected subItemState(item: MbbizNavigationSubItem): MbbizNavigationItemState {
    if (item.state) {
      return item.state;
    }

    if (item.comingSoon || item.disabled) {
      return 'comingSoon';
    }

    if (this.hasChildren(item)) {
      return this.isExpanded(item) ? 'active' : 'default';
    }

    if (item.id === this.activeId()) {
      return 'active';
    }

    return 'default';
  }

  protected itemClass(item: MbbizNavigationBarItem) {
    const state = this.itemState(item);
    return [
      'mbbiz-navigation-bar__item',
      `mbbiz-navigation-bar__item--${state}`,
      item.showNew ? 'mbbiz-navigation-bar__item--new' : '',
      this.isSubmenuOpen(item) ? 'mbbiz-navigation-bar__item--submenu-open' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected subItemClass(item: MbbizNavigationSubItem, level: 2 | 3) {
    const state = this.subItemState(item);
    return [
      'mbbiz-navigation-bar__subitem',
      `mbbiz-navigation-bar__subitem--l${level}`,
      `mbbiz-navigation-bar__subitem--${state}`,
      item.comingSoon ? 'mbbiz-navigation-bar__subitem--coming-soon' : '',
      this.isExpanded(item) ? 'mbbiz-navigation-bar__subitem--expanded' : '',
      this.hasChildren(item) ? 'mbbiz-navigation-bar__subitem--parent' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected itemIcon(item: MbbizNavigationBarItem) {
    if (this.isSubmenuOpen(item)) {
      return item.icon;
    }

    return this.itemState(item) === 'active' ? (item.iconActive ?? item.icon) : item.icon;
  }

  protected chevronIcon(item: MbbizNavigationSubItem) {
    return this.isExpanded(item) || this.subItemState(item) === 'active'
      ? 'alinear_up'
      : 'alinear_down';
  }

  protected onL1MouseEnter(item: MbbizNavigationBarItem) {
    if (this.openId()) {
      return;
    }

    this.hoveredId.set(this.hasChildren(item) ? item.id : null);
  }

  protected onShellMouseLeave() {
    if (this.openId()) {
      return;
    }

    this.hoveredId.set(null);
  }

  protected onItemClick(item: MbbizNavigationBarItem, index: number) {
    if (item.disabled) {
      return;
    }

    if (this.hasChildren(item) && !this.openId()) {
      this.hoveredId.set(item.id);
    }

    this.itemClick.emit({ item, index, level: 1 });
  }

  protected onSubItemClick(item: MbbizNavigationSubItem, index: number, level: 2 | 3) {
    if (item.disabled) {
      return;
    }

    if (this.hasChildren(item)) {
      this.toggleExpanded(item.id);
      return;
    }

    if (item.comingSoon) {
      return;
    }

    this.itemClick.emit({ item, index, level });
  }

  protected isBranchActive(item: MbbizNavigationBarItem | MbbizNavigationSubItem): boolean {
    const activeId = this.activeId();
    if (!activeId) {
      return false;
    }

    if (item.id === activeId) {
      return true;
    }

    return (item.children ?? []).some((child) => this.isBranchActive(child));
  }

  private toggleExpanded(id: string) {
    const next = new Set(this.expandedIdSet());
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this.expandedIdSet.set(next);
  }
}
