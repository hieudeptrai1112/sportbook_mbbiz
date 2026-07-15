import { Component, computed, input, output } from '@angular/core';

import { MbbizInputSize, MbbizInputStatus } from '../input/input.types';

export type MbbizAffixInputMode = 'prefix' | 'suffix' | 'both';

@Component({
  selector: 'mbbiz-affix-input',
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

  protected onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }
}
