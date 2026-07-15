import { Component, computed, input, output } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { MbbizBreadcrumbItem, MbbizBreadcrumbState } from './breadcrumb.types';

const MIN_BREADCRUMB_AMOUNT = 1;
const MAX_BREADCRUMB_AMOUNT = 5;

@Component({
  selector: 'mbbiz-breadcrumb',
  imports: [NzBreadCrumbModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class MbbizBreadcrumbComponent {
  readonly items = input<readonly MbbizBreadcrumbItem[]>([]);
  readonly amount = input(3);
  readonly state = input<MbbizBreadcrumbState>('default');
  readonly ariaLabel = input('Breadcrumb');

  readonly itemClick = output<MbbizBreadcrumbItem>();

  protected readonly resolvedItems = computed(() => {
    const items = this.items();
    if (items.length > 0) {
      return items;
    }

    const amount = Math.min(MAX_BREADCRUMB_AMOUNT, Math.max(MIN_BREADCRUMB_AMOUNT, Math.round(this.amount())));

    return Array.from<unknown, MbbizBreadcrumbItem>({ length: amount }, (_, index) => ({
      label: 'Page',
      href: index < amount - 1 ? '#' : null,
      disabled: false,
    }));
  });

  protected readonly breadcrumbClass = computed(() =>
    [
      'mbbiz-breadcrumb',
      `mbbiz-breadcrumb--state-${this.state()}`,
    ].join(' '),
  );

  protected itemLabelClass(item: MbbizBreadcrumbItem, isCurrent: boolean) {
    return [
      'mbbiz-breadcrumb__label',
      isCurrent ? 'mbbiz-breadcrumb__label--current' : '',
      item.disabled ? 'mbbiz-breadcrumb__label--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected trackItem(index: number, item: MbbizBreadcrumbItem) {
    return `${item.label}-${item.href ?? 'current'}-${index}`;
  }

  protected onItemClick(event: MouseEvent, item: MbbizBreadcrumbItem, isCurrent: boolean) {
    if (item.disabled || isCurrent || !item.href || item.href === '#') {
      event.preventDefault();
    }

    if (item.disabled) {
      event.stopPropagation();
      return;
    }

    this.itemClick.emit(item);
  }
}
