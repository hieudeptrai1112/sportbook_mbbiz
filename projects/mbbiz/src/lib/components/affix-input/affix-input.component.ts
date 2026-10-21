import { Component, computed, input, output } from '@angular/core';
import { IconComponent } from '@mbbiz/icon/angular';

import { MbbizInputSize, MbbizInputStatus } from '../input/input.types';

export type MbbizAffixInputMode = 'prefix' | 'suffix' | 'both';

@Component({
  selector: 'mbbiz-affix-input',
  imports: [IconComponent],
  templateUrl: './affix-input.component.html',
  styleUrl: './affix-input.component.scss',
})
export class MbbizAffixInputComponent {
  readonly value = input('');
  readonly placeholder = input('Input text');
  readonly disabled = input(false);
  readonly size = input<MbbizInputSize>('md');
  readonly status = input<MbbizInputStatus>('default');
  readonly mode = input<MbbizAffixInputMode>('prefix');
  readonly prefixText = input('VND');
  readonly suffixText = input('VND');
  readonly prefixIcon = input<string | null>(null);
  readonly suffixIcon = input<string | null>(null);
  readonly inputId = input<string | null>(null);

  readonly valueChange = output<string>();

  protected readonly wrapperClass = computed(
    () =>
      [
        'mbbiz-affix-input',
        `mbbiz-affix-input--size-${this.size()}`,
        `mbbiz-affix-input--mode-${this.mode()}`,
        `mbbiz-affix-input--status-${this.status()}`,
        this.disabled() ? 'mbbiz-affix-input--disabled' : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected readonly showPrefix = computed(
    () => this.mode() === 'prefix' || this.mode() === 'both',
  );

  protected readonly showSuffix = computed(
    () => this.mode() === 'suffix' || this.mode() === 'both',
  );

  protected readonly resolvedPrefixIcon = computed(() => {
    const explicit = this.prefixIcon();
    if (explicit) {
      return explicit;
    }

    return this.mode() === 'both' ? 'alinear_book' : null;
  });

  protected readonly resolvedSuffixIcon = computed(() => {
    const explicit = this.suffixIcon();
    if (explicit) {
      return explicit;
    }

    return this.mode() === 'both' ? 'alinear_info' : null;
  });

  protected onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }
}
