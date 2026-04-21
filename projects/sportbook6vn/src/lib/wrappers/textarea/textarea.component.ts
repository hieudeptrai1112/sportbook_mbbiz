import { Component, computed, input, output } from '@angular/core';

import { Sportbook6vnInputStatus } from '../input/input.types';

@Component({
  selector: 'sportbook6vn-textarea',
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
})
export class Sportbook6vnTextareaComponent {
  readonly value = input('');
  readonly placeholder = input('Input text');
  readonly disabled = input(false);
  readonly status = input<Sportbook6vnInputStatus>('default');
  readonly maxLength = input(100);
  readonly rows = input(4);
  readonly textareaId = input<string | null>(null);

  readonly valueChange = output<string>();

  protected readonly wrapperClass = computed(
    () =>
      [
        'sportbook6vn-textarea',
        `sportbook6vn-textarea--status-${this.status()}`,
        this.disabled() ? 'sportbook6vn-textarea--disabled' : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected readonly counterText = computed(() => {
    const count = this.value().length;
    const limit = this.maxLength();
    return `${Math.min(count, limit)}/${limit}`;
  });

  protected onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.valueChange.emit(target.value);
  }
}
