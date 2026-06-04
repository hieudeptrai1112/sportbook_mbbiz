import { Component, computed, input } from '@angular/core';

import type { Sportbook6vnBadgeColor, Sportbook6vnBadgePresetConfig, Sportbook6vnBadgeStatus } from './badge.types';

const BADGE_PRESET_CONFIG: Record<Sportbook6vnBadgeStatus, Sportbook6vnBadgePresetConfig> = {
  invalid: { color: 'neutral' },
  overdue: { color: 'orange' },
  unfinished: { color: 'blue' },
  'renew-loan': { color: 'blue' },
  pending: { color: 'dark-blue' },
  completed: { color: 'green' },
  failed: { color: 'red' },
};

@Component({
  selector: 'sportbook6vn-badge',
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class Sportbook6vnBadgeComponent {
  readonly status = input<Sportbook6vnBadgeStatus>('invalid');
  readonly color = input<Sportbook6vnBadgeColor | null>(null);
  readonly label = input('Text');
  readonly description = input('Text');
  readonly showDescription = input(false);
  readonly ariaLabel = input<string | null>(null);

  protected readonly resolvedConfig = computed(() => BADGE_PRESET_CONFIG[this.status()]);
  protected readonly resolvedColor = computed(() => this.color() ?? this.resolvedConfig().color);
  protected readonly resolvedAriaLabel = computed(() => this.ariaLabel() ?? this.label());

  protected readonly badgeClass = computed(() =>
    [
      'sportbook6vn-badge',
      `sportbook6vn-badge--${this.status()}`,
      `sportbook6vn-badge--${this.resolvedColor()}`,
      this.showDescription() ? 'sportbook6vn-badge--with-description' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
