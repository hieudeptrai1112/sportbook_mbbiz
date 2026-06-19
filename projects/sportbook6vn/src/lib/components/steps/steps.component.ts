import { Component, computed, input, output } from '@angular/core';

import {
  Sportbook6vnStepItem,
  Sportbook6vnStepStatus,
  Sportbook6vnStepsDirection,
  Sportbook6vnStepsSize,
} from './steps.types';

const MIN_STEPS = 1;
const MAX_STEPS = 6;

@Component({
  selector: 'sportbook6vn-steps',
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss',
})
export class Sportbook6vnStepsComponent {
  readonly items = input<readonly Sportbook6vnStepItem[]>([]);
  readonly amount = input(3);
  readonly current = input(0);
  readonly startIndex = input(1);
  readonly generatedTitle = input('Text');
  readonly direction = input<Sportbook6vnStepsDirection>('horizontal');
  readonly size = input<Sportbook6vnStepsSize>('default');
  readonly ariaLabel = input('Steps');
  readonly clickable = input(false);

  readonly indexChange = output<number>();

  protected readonly resolvedItems = computed<readonly Sportbook6vnStepItem[]>(() => {
    const items = this.items();
    if (items.length > 0) {
      return items.slice(0, MAX_STEPS);
    }

    const amount = Math.min(MAX_STEPS, Math.max(MIN_STEPS, Math.round(this.amount())));
    return Array.from<unknown, Sportbook6vnStepItem>({ length: amount }, () => ({
      title: this.generatedTitle(),
    }));
  });

  protected readonly currentIndex = computed(() => {
    const itemCount = this.resolvedItems().length;
    return Math.min(itemCount - 1, Math.max(0, Math.round(this.current())));
  });

  protected readonly isComplete = computed(() => Math.round(this.current()) >= this.resolvedItems().length);

  protected readonly stepsClass = computed(() =>
    [
      'sportbook6vn-steps',
      `sportbook6vn-steps--${this.direction()}`,
      `sportbook6vn-steps--size-${this.size()}`,
      this.isComplete() ? 'sportbook6vn-steps--complete' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected markerLabel(index: number): number {
    return this.startIndex() + index;
  }

  protected stepStatus(index: number, item: Sportbook6vnStepItem): Sportbook6vnStepStatus {
    if (item.status) {
      return item.status;
    }

    if (this.isComplete()) {
      return 'finish';
    }

    const current = this.currentIndex();
    if (index === current) {
      return 'process';
    }

    return index < current ? 'finish' : 'wait';
  }

  protected stepClass(index: number, item: Sportbook6vnStepItem, isLast: boolean): string {
    return [
      'sportbook6vn-steps__item',
      `sportbook6vn-steps__item--${this.stepStatus(index, item)}`,
      isLast ? 'sportbook6vn-steps__item--last' : '',
      item.disabled ? 'sportbook6vn-steps__item--disabled' : '',
      this.clickable() && !item.disabled ? 'sportbook6vn-steps__item--clickable' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected isCurrentStep(index: number, item: Sportbook6vnStepItem): boolean {
    return !this.isComplete() && this.stepStatus(index, item) === 'process';
  }

  protected trackStep(index: number, item: Sportbook6vnStepItem): string {
    return `${item.title}-${index}`;
  }

  protected onStepClick(index: number, item: Sportbook6vnStepItem): void {
    if (!this.clickable() || item.disabled || this.isCurrentStep(index, item)) {
      return;
    }

    this.indexChange.emit(index);
  }
}
