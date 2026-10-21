import { Component, computed, input, output } from '@angular/core';

import { MbbizInputSize, MbbizInputStatus } from '../input/input.types';

@Component({
  selector: 'mbbiz-search-input',
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class MbbizSearchInputComponent {
  readonly value = input('');
  readonly placeholder = input('Input text');
  readonly disabled = input(false);
  readonly size = input<MbbizInputSize>('md');
  readonly status = input<MbbizInputStatus>('default');
  readonly inputId = input<string | null>(null);
  readonly allowClear = input(true);

  readonly valueChange = output<string>();
  readonly searchSubmit = output<string>();

  protected readonly wrapperClass = computed(
    () =>
      [
        'mbbiz-search-input',
        `mbbiz-search-input--size-${this.size()}`,
        `mbbiz-search-input--status-${this.status()}`,
        this.disabled() ? 'mbbiz-search-input--disabled' : '',
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
