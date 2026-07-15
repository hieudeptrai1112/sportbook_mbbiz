import { Component, computed, input } from '@angular/core';

import type { MbbizStatusColor, MbbizStatusPreset, MbbizStatusPresetConfig } from './status.types';

const STATUS_PRESET_CONFIG: Record<MbbizStatusPreset, MbbizStatusPresetConfig> = {
  invalid: { color: 'neutral', label: 'Text' },
  overdue: { color: 'orange', label: 'Text' },
  unfinished: { color: 'blue', label: 'Text' },
  'renew-loan': { color: 'blue', label: 'Text' },
  pending: { color: 'dark-blue', label: 'Text' },
  completed: { color: 'green', label: 'Text' },
  failed: { color: 'red', label: 'Text' },
};

@Component({
  selector: 'mbbiz-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
})
export class MbbizStatusComponent {
  readonly label = input<string | null>(null);
  readonly description = input('Text');
  readonly showDescription = input(false);
  readonly color = input<MbbizStatusColor | null>(null);
  readonly status = input<MbbizStatusPreset | null>(null);

  protected readonly resolvedConfig = computed<MbbizStatusPresetConfig>(() => {
    const status = this.status();
    const presetConfig = status ? STATUS_PRESET_CONFIG[status] : STATUS_PRESET_CONFIG.invalid;

    return {
      color: this.color() ?? presetConfig.color,
      label: this.label() ?? presetConfig.label,
    };
  });

  protected readonly wrapperClass = computed(() =>
    [
      'mbbiz-status',
      `mbbiz-status--${this.resolvedConfig().color}`,
      this.showDescription() ? 'mbbiz-status--with-description' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
