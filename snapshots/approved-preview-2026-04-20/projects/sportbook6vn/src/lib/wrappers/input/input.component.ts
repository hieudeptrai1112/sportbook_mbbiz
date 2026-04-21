import { Component, computed, input, output } from '@angular/core';

import { Sportbook6vnInputSize, Sportbook6vnInputStatus } from './input.types';

@Component({
  selector: 'sportbook6vn-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class Sportbook6vnInputComponent {
  readonly value = input('');
  readonly placeholder = input('');
  readonly disabled = input(false);
  readonly size = input<Sportbook6vnInputSize>('md');
  readonly status = input<Sportbook6vnInputStatus>('default');
  readonly type = input<'text' | 'email' | 'number' | 'password' | 'search'>('text');
  readonly inputId = input<string | null>(null);
  readonly label = input<string | null>(null);
  readonly hint = input<string | null>(null);
  readonly errorMessage = input<string | null>(null);

  readonly valueChange = output<string>();

  protected readonly wrapperClass = computed(
    () =>
      [
        'sportbook6vn-input',
        `sportbook6vn-input--size-${this.size()}`,
        `sportbook6vn-input--status-${this.status()}`,
        this.disabled() ? 'sportbook6vn-input--disabled' : '',
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
