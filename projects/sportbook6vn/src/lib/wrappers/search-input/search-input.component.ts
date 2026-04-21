import { Component, computed, input, output } from '@angular/core';

import { Sportbook6vnInputSize, Sportbook6vnInputStatus } from '../input/input.types';

@Component({
  selector: 'sportbook6vn-search-input',
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class Sportbook6vnSearchInputComponent {
  readonly value = input('');
  readonly placeholder = input('Input text');
  readonly disabled = input(false);
  readonly size = input<Sportbook6vnInputSize>('md');
  readonly status = input<Sportbook6vnInputStatus>('default');
  readonly inputId = input<string | null>(null);
  readonly allowClear = input(true);

  readonly valueChange = output<string>();
  readonly searchSubmit = output<string>();

  protected readonly wrapperClass = computed(
    () =>
      [
        'sportbook6vn-search-input',
        `sportbook6vn-search-input--size-${this.size()}`,
        `sportbook6vn-search-input--status-${this.status()}`,
        this.disabled() ? 'sportbook6vn-search-input--disabled' : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected readonly showClear = computed(
    () => this.allowClear() && !this.disabled() && this.value().trim().length > 0,
  );

  protected onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }

  protected onKeydown(event: KeyboardEvent) {
    if (event.key !== 'Enter') {
      return;
    }

    this.searchSubmit.emit(this.value());
  }

  protected clear() {
    if (this.disabled()) {
      return;
    }

    this.valueChange.emit('');
  }
}
