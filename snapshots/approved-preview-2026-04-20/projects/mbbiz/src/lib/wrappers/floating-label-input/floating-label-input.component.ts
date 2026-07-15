import { Component, computed, input, output } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';

import { MbbizInputStatus } from '../input/input.types';

@Component({
  selector: 'mbbiz-floating-label-input',
  imports: [NzInputModule],
  templateUrl: './floating-label-input.component.html',
  styleUrl: './floating-label-input.component.scss',
})
export class MbbizFloatingLabelInputComponent {
  readonly label = input('Title');
  readonly value = input('');
  readonly placeholder = input('Input text');
  readonly disabled = input(false);
  readonly status = input<MbbizInputStatus>('default');
  readonly inputId = input<string | null>(null);

  readonly valueChange = output<string>();

  protected readonly wrapperClass = computed(
    () =>
      [
        'mbbiz-floating-label-input',
        `mbbiz-floating-label-input--status-${this.status()}`,
        this.disabled() ? 'mbbiz-floating-label-input--disabled' : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }
}
