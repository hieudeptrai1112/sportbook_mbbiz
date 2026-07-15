import { Component, computed, effect, input, output, signal } from '@angular/core';

import { MbbizRadioComponent } from './radio.component';

export interface MbbizRadioGroupOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

@Component({
  selector: 'mbbiz-radio-group',
  imports: [MbbizRadioComponent],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss',
})
export class MbbizRadioGroupComponent {
  readonly name = input<string | null>(null);
  readonly disabled = input(false);
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  readonly options = input<readonly MbbizRadioGroupOption[]>([]);
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
        'mbbiz-radio-group',
        `mbbiz-radio-group--${this.direction()}`,
        this.disabled() ? 'mbbiz-radio-group--disabled' : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected isChecked(option: MbbizRadioGroupOption) {
    return this.localValue() === option.value;
  }

  protected selectOption(option: MbbizRadioGroupOption) {
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
