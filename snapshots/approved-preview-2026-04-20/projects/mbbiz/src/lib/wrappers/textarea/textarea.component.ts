import { Component, computed, input, output } from '@angular/core';

import { MbbizInputStatus } from '../input/input.types';

@Component({
  selector: 'mbbiz-textarea',
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
})
export class MbbizTextareaComponent {
  readonly value = input('');
  readonly placeholder = input('Input text');
  readonly disabled = input(false);
  readonly status = input<MbbizInputStatus>('default');
  readonly maxLength = input(100);
  readonly rows = input(4);
  readonly textareaId = input<string | null>(null);

  readonly valueChange = output<string>();

  protected readonly wrapperClass = computed(
    () =>
      [
        'mbbiz-textarea',
        `mbbiz-textarea--status-${this.status()}`,
        this.disabled() ? 'mbbiz-textarea--disabled' : '',
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
