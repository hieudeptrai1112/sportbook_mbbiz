import { Component, computed, input, output } from '@angular/core';

import type {
  Sportbook6vnTabChangeEvent,
  Sportbook6vnTabItem,
  Sportbook6vnTabSize,
  Sportbook6vnTabVariant,
} from './tab.types';

const MIN_TABS = 1;
const MAX_TABS = 5;

@Component({
  selector: 'sportbook6vn-tab',
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
})
export class Sportbook6vnTabComponent {
  readonly items = input<readonly Sportbook6vnTabItem[]>([]);
  readonly activeIndex = input(0);
  readonly amount = input(3);
  readonly generatedLabel = input('Text');
  readonly variant = input<Sportbook6vnTabVariant>('pill');
  readonly size = input<Sportbook6vnTabSize>('large');
  readonly ariaLabel = input('Tabs');

  readonly indexChange = output<number>();
  readonly tabChange = output<Sportbook6vnTabChangeEvent>();

  protected readonly resolvedItems = computed<readonly Sportbook6vnTabItem[]>(() => {
    const items = this.items();
    if (items.length > 0) {
      return items.slice(0, MAX_TABS);
    }

    const amount = Math.min(MAX_TABS, Math.max(MIN_TABS, Math.round(this.amount())));
    return Array.from<unknown, Sportbook6vnTabItem>({ length: amount }, (_, index) => ({
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
      'sportbook6vn-tab',
      `sportbook6vn-tab--variant-${this.variant()}`,
      `sportbook6vn-tab--size-${this.size()}`,
    ].join(' '),
  );

  protected itemClass(index: number, item: Sportbook6vnTabItem): string {
    return [
      'sportbook6vn-tab__item',
      index === this.currentIndex() ? 'sportbook6vn-tab__item--active' : '',
      item.disabled ? 'sportbook6vn-tab__item--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected trackItem(index: number, item: Sportbook6vnTabItem): string {
    return `${item.id ?? item.label}-${index}`;
  }

  protected hasCount(item: Sportbook6vnTabItem): boolean {
    return item.count !== undefined && item.count !== null && `${item.count}`.length > 0;
  }

  protected onTabClick(index: number, item: Sportbook6vnTabItem): void {
    if (item.disabled || index === this.currentIndex()) {
      return;
    }

    this.indexChange.emit(index);
    this.tabChange.emit({ index, item });
  }
}
