import { Component, computed, input, signal } from '@angular/core';

import type { MbbizTooltipPosition, MbbizTooltipSide } from './tooltip.types';

@Component({
  selector: 'mbbiz-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
})
export class MbbizTooltipComponent {
  readonly text = input('Text');
  readonly position = input<MbbizTooltipPosition>('top');
  readonly side = input<MbbizTooltipSide>('left');
  readonly trigger = input(false);
  readonly ariaLabel = input<string | null>(null);

  private readonly hovered = signal(false);

  protected readonly resolvedSide = computed<MbbizTooltipSide>(() => {
    const position = this.position();
    const side = this.side();

    if (position === 'top' || position === 'bottom') {
      return side === 'top' || side === 'bottom' ? 'center' : side;
    }

    return side === 'left' || side === 'right' ? 'center' : side;
  });

  protected readonly visible = computed(() => !this.trigger() || this.hovered());
  protected readonly resolvedAriaLabel = computed(() => this.ariaLabel() ?? this.text());

  protected readonly tooltipClass = computed(() =>
    [
      'mbbiz-tooltip',
      `mbbiz-tooltip--${this.position()}`,
      `mbbiz-tooltip--side-${this.resolvedSide()}`,
      this.trigger() ? 'mbbiz-tooltip--anchored' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onEnter(): void {
    if (this.trigger()) {
      this.hovered.set(true);
    }
  }

  protected onLeave(): void {
    if (this.trigger()) {
      this.hovered.set(false);
    }
  }
}
