import { Component, computed, input, output } from '@angular/core';

import {
  MbbizStepItem,
  MbbizStepStatus,
  MbbizStepsDirection,
  MbbizStepsSize,
} from './steps.types';

const MIN_STEPS = 1;
const MAX_STEPS = 6;

@Component({
  selector: 'mbbiz-steps',
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss',
})
export class MbbizStepsComponent {
  readonly items = input<readonly MbbizStepItem[]>([]);
  readonly amount = input(3);
  readonly current = input(0);
  readonly startIndex = input(1);
  readonly generatedTitle = input('Text');
  readonly direction = input<MbbizStepsDirection>('horizontal');
  readonly size = input<MbbizStepsSize>('default');
  readonly ariaLabel = input('Steps');
  readonly clickable = input(false);

  readonly indexChange = output<number>();

  protected readonly resolvedItems = computed<readonly MbbizStepItem[]>(() => {
    const items = this.items();
    if (items.length > 0) {
      return items.slice(0, MAX_STEPS);
    }

    const amount = Math.min(MAX_STEPS, Math.max(MIN_STEPS, Math.round(this.amount())));
    return Array.from<unknown, MbbizStepItem>({ length: amount }, () => ({
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
      'mbbiz-steps',
      `mbbiz-steps--${this.direction()}`,
      `mbbiz-steps--size-${this.size()}`,
      this.isComplete() ? 'mbbiz-steps--complete' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected markerLabel(index: number): number {
    return this.startIndex() + index;
  }

  protected stepStatus(index: number, item: MbbizStepItem): MbbizStepStatus {
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

  protected stepClass(index: number, item: MbbizStepItem, isLast: boolean): string {
    return [
      'mbbiz-steps__item',
      `mbbiz-steps__item--${this.stepStatus(index, item)}`,
      isLast ? 'mbbiz-steps__item--last' : '',
      item.disabled ? 'mbbiz-steps__item--disabled' : '',
      this.clickable() && !item.disabled ? 'mbbiz-steps__item--clickable' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected isCurrentStep(index: number, item: MbbizStepItem): boolean {
    return !this.isComplete() && this.stepStatus(index, item) === 'process';
  }

  protected trackStep(index: number, item: MbbizStepItem): string {
    return `${item.title}-${index}`;
  }

  protected onStepClick(index: number, item: MbbizStepItem): void {
    if (!this.clickable() || item.disabled || this.isCurrentStep(index, item)) {
      return;
    }

    this.indexChange.emit(index);
  }
}
