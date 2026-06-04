import { Component, computed, input } from '@angular/core';

import type { Sportbook6vnStatusColor, Sportbook6vnStatusPreset, Sportbook6vnStatusPresetConfig } from './status.types';

const STATUS_PRESET_CONFIG: Record<Sportbook6vnStatusPreset, Sportbook6vnStatusPresetConfig> = {
  invalid: { color: 'neutral', label: 'Text' },
  overdue: { color: 'orange', label: 'Text' },
  unfinished: { color: 'blue', label: 'Text' },
  'renew-loan': { color: 'blue', label: 'Text' },
  pending: { color: 'dark-blue', label: 'Text' },
  completed: { color: 'green', label: 'Text' },
  failed: { color: 'red', label: 'Text' },
};

@Component({
  selector: 'sportbook6vn-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
})
export class Sportbook6vnStatusComponent {
  readonly label = input<string | null>(null);
  readonly description = input('Text');
  readonly showDescription = input(false);
  readonly color = input<Sportbook6vnStatusColor | null>(null);
  readonly status = input<Sportbook6vnStatusPreset | null>(null);

  protected readonly resolvedConfig = computed<Sportbook6vnStatusPresetConfig>(() => {
    const status = this.status();
    const presetConfig = status ? STATUS_PRESET_CONFIG[status] : STATUS_PRESET_CONFIG.invalid;

    return {
      color: this.color() ?? presetConfig.color,
      label: this.label() ?? presetConfig.label,
    };
  });

  protected readonly wrapperClass = computed(() =>
    [
      'sportbook6vn-status',
      `sportbook6vn-status--${this.resolvedConfig().color}`,
      this.showDescription() ? 'sportbook6vn-status--with-description' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
