import { Component, computed, input, output } from '@angular/core';

import { MbbizInputSize, MbbizInputStatus } from './input.types';

@Component({
  selector: 'mbbiz-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class MbbizInputComponent {
  readonly value = input('');
  readonly placeholder = input('');
  readonly disabled = input(false);
  readonly size = input<MbbizInputSize>('md');
  readonly status = input<MbbizInputStatus>('default');
  readonly type = input<'text' | 'email' | 'number' | 'password' | 'search'>('text');
  readonly inputId = input<string | null>(null);
  readonly label = input<string | null>(null);
  readonly hint = input<string | null>(null);
  readonly errorMessage = input<string | null>(null);

  readonly valueChange = output<string>();

  protected readonly wrapperClass = computed(
    () =>
      [
        'mbbiz-input',
        `mbbiz-input--size-${this.size()}`,
        `mbbiz-input--status-${this.status()}`,
        this.disabled() ? 'mbbiz-input--disabled' : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected readonly caption = computed(() =>
    this.status() === 'error' ? this.errorMessage() || this.hint() : this.hint(),
  );

  protected onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }
}
