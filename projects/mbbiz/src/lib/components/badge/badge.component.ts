import { Component, computed, input } from '@angular/core';

import type { MbbizBadgeColor, MbbizBadgePresetConfig, MbbizBadgeStatus } from './badge.types';

const BADGE_PRESET_CONFIG: Record<MbbizBadgeStatus, MbbizBadgePresetConfig> = {
  invalid: { color: 'neutral' },
  overdue: { color: 'orange' },
  unfinished: { color: 'blue' },
  'renew-loan': { color: 'blue' },
  pending: { color: 'dark-blue' },
  completed: { color: 'green' },
  failed: { color: 'red' },
};

@Component({
  selector: 'mbbiz-badge',
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class MbbizBadgeComponent {
  readonly status = input<MbbizBadgeStatus>('invalid');
  readonly color = input<MbbizBadgeColor | null>(null);
  readonly label = input('Text');
  readonly description = input('Text');
  readonly showDescription = input(false);
  readonly ariaLabel = input<string | null>(null);

  protected readonly resolvedConfig = computed(() => BADGE_PRESET_CONFIG[this.status()]);
  protected readonly resolvedColor = computed(() => this.color() ?? this.resolvedConfig().color);
  protected readonly resolvedAriaLabel = computed(() => this.ariaLabel() ?? this.label());

  protected readonly badgeClass = computed(() =>
    [
      'mbbiz-badge',
      `mbbiz-badge--${this.status()}`,
      `mbbiz-badge--${this.resolvedColor()}`,
      this.showDescription() ? 'mbbiz-badge--with-description' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
