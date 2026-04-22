import { Component, computed, input, output } from '@angular/core';

import { Sportbook6vnInputSize, Sportbook6vnInputStatus } from '../input/input.types';

export type Sportbook6vnAffixInputMode = 'prefix' | 'suffix' | 'both';

@Component({
  selector: 'sportbook6vn-affix-input',
  templateUrl: './affix-input.component.html',
  styleUrl: './affix-input.component.scss',
})
export class Sportbook6vnAffixInputComponent {
  readonly value = input('');
  readonly placeholder = input('Input text');
  readonly disabled = input(false);
  readonly size = input<Sportbook6vnInputSize>('md');
  readonly status = input<Sportbook6vnInputStatus>('default');
  readonly mode = input<Sportbook6vnAffixInputMode>('prefix');
  readonly prefixText = input('VND');
  readonly suffixText = input('VND');
  readonly inputId = input<string | null>(null);

  readonly valueChange = output<string>();

  protected readonly wrapperClass = computed(
    () =>
      [
        'sportbook6vn-affix-input',
        `sportbook6vn-affix-input--size-${this.size()}`,
        `sportbook6vn-affix-input--mode-${this.mode()}`,
        `sportbook6vn-affix-input--status-${this.status()}`,
        this.disabled() ? 'sportbook6vn-affix-input--disabled' : '',
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
