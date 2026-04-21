import { Component, computed, effect, input, output, signal } from '@angular/core';

import { Sportbook6vnRadioComponent } from './radio.component';

export interface Sportbook6vnRadioGroupOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

@Component({
  selector: 'sportbook6vn-radio-group',
  imports: [Sportbook6vnRadioComponent],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss',
})
export class Sportbook6vnRadioGroupComponent {
  readonly name = input<string | null>(null);
  readonly disabled = input(false);
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  readonly options = input<readonly Sportbook6vnRadioGroupOption[]>([]);
  readonly value = input<string | number | null>(null);
  readonly defaultValue = input<string | number | null>(null);

  readonly valueChange = output<string | number | null>();
  readonly change = output<{ value: string | number | null }>();

  protected readonly localValue = signal<string | number | null>(null);

  constructor() {
    effect(() => {
      const controlledValue = this.value();
      if (controlledValue !== null) {
        this.localValue.set(controlledValue);
        return;
      }

      this.localValue.set(this.defaultValue());
    });
  }

  protected readonly wrapperClass = computed(
    () =>
      [
        'sportbook6vn-radio-group',
        `sportbook6vn-radio-group--${this.direction()}`,
        this.disabled() ? 'sportbook6vn-radio-group--disabled' : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected isChecked(option: Sportbook6vnRadioGroupOption) {
    return this.localValue() === option.value;
  }

  protected selectOption(option: Sportbook6vnRadioGroupOption) {
    if (this.disabled() || option.disabled) {
      return;
    }

    if (this.localValue() === option.value) {
      return;
    }

    this.localValue.set(option.value);
    this.valueChange.emit(option.value);
    this.change.emit({ value: option.value });
  }
}
