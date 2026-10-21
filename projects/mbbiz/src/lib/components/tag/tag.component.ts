import { Component, computed, input } from '@angular/core';

import type { MbbizTagColor, MbbizTagPresetConfig, MbbizTagStatus } from './tag.types';

const TAG_PRESET_CONFIG: Record<MbbizTagStatus, MbbizTagPresetConfig> = {
  invalid: { color: 'neutral' },
  overdue: { color: 'orange' },
  unfinished: { color: 'blue' },
  'renew-loan': { color: 'blue' },
  pending: { color: 'dark-blue' },
  completed: { color: 'green' },
  failed: { color: 'red' },
};

@Component({
  selector: 'mbbiz-tag',
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class MbbizTagComponent {
  readonly status = input<MbbizTagStatus>('invalid');
  readonly color = input<MbbizTagColor | null>(null);
  readonly label = input('Text');
  readonly description = input('Text');
  readonly showDescription = input(false);
  readonly ariaLabel = input<string | null>(null);

  protected readonly resolvedConfig = computed(() => TAG_PRESET_CONFIG[this.status()]);
  protected readonly resolvedColor = computed(() => this.color() ?? this.resolvedConfig().color);
  protected readonly resolvedAriaLabel = computed(() => this.ariaLabel() ?? this.label());

  protected readonly tagClass = computed(() =>
    [
      'mbbiz-tag',
      `mbbiz-tag--${this.status()}`,
      `mbbiz-tag--${this.resolvedColor()}`,
      this.showDescription() ? 'mbbiz-tag--with-description' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
