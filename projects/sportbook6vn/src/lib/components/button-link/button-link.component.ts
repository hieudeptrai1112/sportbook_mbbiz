import { Component, computed, input, output } from '@angular/core';

import type { Sportbook6vnButtonLinkSize } from './button-link.types';

@Component({
  selector: 'sportbook6vn-button-link',
  templateUrl: './button-link.component.html',
  styleUrl: './button-link.component.scss',
})
export class Sportbook6vnButtonLinkComponent {
  readonly size = input<Sportbook6vnButtonLinkSize>('lg');
  readonly disabled = input(false);
  readonly href = input<string | null>(null);
  readonly target = input<string | null>(null);
  readonly rel = input<string | null>(null);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly ariaLabel = input<string | null>(null);

  readonly buttonLinkClick = output<MouseEvent>();

  protected readonly linkClass = computed(() =>
    [
      'sportbook6vn-button-link',
      `sportbook6vn-button-link--${this.size()}`,
      this.disabled() ? 'sportbook6vn-button-link--disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected readonly shouldRenderAnchor = computed(() => !!this.href() && !this.disabled());
  protected readonly resolvedRel = computed(() => {
    const rel = this.rel();
    if (rel) {
      return rel;
    }

    return this.target() === '_blank' ? 'noopener noreferrer' : null;
  });

  protected onClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.buttonLinkClick.emit(event);
  }
}
