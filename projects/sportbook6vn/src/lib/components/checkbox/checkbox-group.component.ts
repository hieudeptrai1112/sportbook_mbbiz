import { Component, computed, effect, input, output, signal } from '@angular/core';

import { Sportbook6vnCheckboxComponent } from './checkbox.component';

export interface Sportbook6vnCheckboxGroupOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

@Component({
  selector: 'sportbook6vn-checkbox-group',
  imports: [Sportbook6vnCheckboxComponent],
  templateUrl: './checkbox-group.component.html',
  styleUrl: './checkbox-group.component.scss',
})
export class Sportbook6vnCheckboxGroupComponent {
  readonly disabled = input(false);
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  readonly options = input<readonly Sportbook6vnCheckboxGroupOption[]>([]);
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
        'sportbook6vn-checkbox-group',
        `sportbook6vn-checkbox-group--${this.direction()}`,
        this.disabled() ? 'sportbook6vn-checkbox-group--disabled' : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected isChecked(option: Sportbook6vnCheckboxGroupOption) {
    return this.localValues().includes(option.value);
  }

  protected onOptionChecked(option: Sportbook6vnCheckboxGroupOption, checked: boolean) {
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
