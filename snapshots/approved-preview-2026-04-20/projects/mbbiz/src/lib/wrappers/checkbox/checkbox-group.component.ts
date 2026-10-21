import { Component, computed, effect, input, output, signal } from '@angular/core';

import { MbbizCheckboxComponent } from './checkbox.component';

export interface MbbizCheckboxGroupOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

@Component({
  selector: 'mbbiz-checkbox-group',
  imports: [MbbizCheckboxComponent],
  templateUrl: './checkbox-group.component.html',
  styleUrl: './checkbox-group.component.scss',
})
export class MbbizCheckboxGroupComponent {
  readonly disabled = input(false);
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  readonly options = input<readonly MbbizCheckboxGroupOption[]>([]);
  readonly value = input<readonly (string | number)[] | null>(null);
  readonly defaultValue = input<readonly (string | number)[]>([]);

  readonly valueChange = output<(string | number)[]>();
  readonly change = output<{ value: (string | number)[] }>();

  protected readonly localValues = signal<(string | number)[]>([]);

  constructor() {
    effect(() => {
      const controlledValue = this.value();
      if (controlledValue !== null) {
        this.localValues.set([...controlledValue]);
        return;
      }

      this.localValues.set([...this.defaultValue()]);
    });
  }

  protected readonly wrapperClass = computed(
    () =>
      [
        'mbbiz-checkbox-group',
        `mbbiz-checkbox-group--${this.direction()}`,
        this.disabled() ? 'mbbiz-checkbox-group--disabled' : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected isChecked(option: MbbizCheckboxGroupOption) {
    return this.localValues().includes(option.value);
  }

  protected onOptionChecked(option: MbbizCheckboxGroupOption, checked: boolean) {
    if (this.disabled() || option.disabled) {
      return;
    }

    const current = new Set(this.localValues());
    if (checked) {
      current.add(option.value);
    } else {
      current.delete(option.value);
    }

    const nextValues = this.options()
      .map((item) => item.value)
      .filter((value) => current.has(value));

    this.localValues.set(nextValues);
    this.valueChange.emit(nextValues);
    this.change.emit({ value: nextValues });
  }
}
