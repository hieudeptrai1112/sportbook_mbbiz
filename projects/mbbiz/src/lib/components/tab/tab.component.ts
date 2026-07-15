import { Component, computed, input, output } from '@angular/core';

import type {
  MbbizTabChangeEvent,
  MbbizTabItem,
  MbbizTabSize,
  MbbizTabVariant,
} from './tab.types';

const MIN_TABS = 1;
const MAX_TABS = 5;

@Component({
  selector: 'mbbiz-tab',
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
})
export class MbbizTabComponent {
  readonly items = input<readonly MbbizTabItem[]>([]);
  readonly activeIndex = input(0);
  readonly amount = input(3);
  readonly generatedLabel = input('Text');
  readonly variant = input<MbbizTabVariant>('pill');
  readonly size = input<MbbizTabSize>('large');
  readonly ariaLabel = input('Tabs');

  readonly indexChange = output<number>();
  readonly tabChange = output<MbbizTabChangeEvent>();

  protected readonly resolvedItems = computed<readonly MbbizTabItem[]>(() => {
    const items = this.items();
    if (items.length > 0) {
      return items.slice(0, MAX_TABS);
    }

    const amount = Math.min(MAX_TABS, Math.max(MIN_TABS, Math.round(this.amount())));
    return Array.from<unknown, MbbizTabItem>({ length: amount }, (_, index) => ({
      id: `tab-${index + 1}`,
      label: this.generatedLabel(),
    }));
  });

  protected readonly currentIndex = computed(() => {
    const itemCount = this.resolvedItems().length;
    return Math.min(itemCount - 1, Math.max(0, Math.round(this.activeIndex())));
  });

  protected readonly tabClass = computed(() =>
    [
      'mbbiz-tab',
      `mbbiz-tab--variant-${this.variant()}`,
      `mbbiz-tab--size-${this.size()}`,
    ].join(' '),
  );

  protected itemClass(index: number, item: MbbizTabItem): string {
    return [
      'mbbiz-tab__item',
      index === this.currentIndex() ? 'mbbiz-tab__item--active' : '',
      item.disabled ? 'mbbiz-tab__item--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected trackItem(index: number, item: MbbizTabItem): string {
    return `${item.id ?? item.label}-${index}`;
  }

  protected hasCount(item: MbbizTabItem): boolean {
    return item.count !== undefined && item.count !== null && `${item.count}`.length > 0;
  }

  protected onTabClick(index: number, item: MbbizTabItem): void {
    if (item.disabled || index === this.currentIndex()) {
      return;
    }

    this.indexChange.emit(index);
    this.tabChange.emit({ index, item });
  }
}
