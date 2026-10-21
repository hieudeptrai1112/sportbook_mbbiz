import { Component, computed, effect, input, output, signal } from '@angular/core';

import type { MbbizRatingStarState, MbbizRatingValue } from './rating.types';

const RATING_STARS: readonly MbbizRatingValue[] = [1, 2, 3, 4, 5];

@Component({
  selector: 'mbbiz-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class MbbizRatingComponent {
  readonly value = input<MbbizRatingValue | null>(null);
  readonly defaultValue = input<MbbizRatingValue>(1);
  readonly ariaLabel = input('Rating');

  readonly valueChange = output<MbbizRatingValue>();

  protected readonly stars = RATING_STARS;
  protected readonly localValue = signal<MbbizRatingValue>(1);
  protected readonly hoveredValue = signal<MbbizRatingValue | null>(null);

  constructor() {
    effect(() => {
      const controlled = this.value();
      this.localValue.set(controlled ?? this.defaultValue());
    });
  }

  protected readonly resolvedValue = computed(() => this.localValue());

  protected starState(star: MbbizRatingValue): MbbizRatingStarState {
    if (star <= this.resolvedValue()) {
      return 'selected';
    }

    const hovered = this.hoveredValue();
    if (hovered !== null && star <= hovered) {
      return 'hover';
    }

    return 'default';
  }

  protected starClass(star: MbbizRatingValue): string {
    return ['mbbiz-rating__star', `mbbiz-rating__star--${this.starState(star)}`].join(' ');
  }

  protected onStarEnter(star: MbbizRatingValue): void {
    this.hoveredValue.set(star);
  }

  protected onLeave(): void {
    this.hoveredValue.set(null);
  }

  protected onStarClick(star: MbbizRatingValue): void {
    if (this.value() === null) {
      this.localValue.set(star);
    }

    this.valueChange.emit(star);
  }
}
