import { Component, computed, input, output } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { Sportbook6vnBreadcrumbItem, Sportbook6vnBreadcrumbState } from './breadcrumb.types';

const MIN_BREADCRUMB_AMOUNT = 1;
const MAX_BREADCRUMB_AMOUNT = 5;

@Component({
  selector: 'sportbook6vn-breadcrumb',
  imports: [NzBreadCrumbModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class Sportbook6vnBreadcrumbComponent {
  readonly items = input<readonly Sportbook6vnBreadcrumbItem[]>([]);
  readonly amount = input(3);
  readonly state = input<Sportbook6vnBreadcrumbState>('default');
  readonly ariaLabel = input('Breadcrumb');

  readonly itemClick = output<Sportbook6vnBreadcrumbItem>();

  protected readonly resolvedItems = computed(() => {
    const items = this.items();
    if (items.length > 0) {
      return items;
    }

    const amount = Math.min(MAX_BREADCRUMB_AMOUNT, Math.max(MIN_BREADCRUMB_AMOUNT, Math.round(this.amount())));

    return Array.from<unknown, Sportbook6vnBreadcrumbItem>({ length: amount }, (_, index) => ({
      label: 'Page',
      href: index < amount - 1 ? '#' : null,
      disabled: false,
    }));
  });

  protected readonly breadcrumbClass = computed(() =>
    [
      'sportbook6vn-breadcrumb',
      `sportbook6vn-breadcrumb--state-${this.state()}`,
    ].join(' '),
  );

  protected itemLabelClass(item: Sportbook6vnBreadcrumbItem, isCurrent: boolean) {
    return [
      'sportbook6vn-breadcrumb__label',
      isCurrent ? 'sportbook6vn-breadcrumb__label--current' : '',
      item.disabled ? 'sportbook6vn-breadcrumb__label--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected trackItem(index: number, item: Sportbook6vnBreadcrumbItem) {
    return `${item.label}-${item.href ?? 'current'}-${index}`;
  }

  protected onItemClick(event: MouseEvent, item: Sportbook6vnBreadcrumbItem, isCurrent: boolean) {
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
