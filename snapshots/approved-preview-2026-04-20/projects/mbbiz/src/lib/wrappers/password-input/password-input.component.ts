import { Component, computed, input, output, signal } from '@angular/core';

import { MbbizInputStatus } from '../input/input.types';

@Component({
  selector: 'mbbiz-password-input',
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
})
export class MbbizPasswordInputComponent {
  readonly value = input('');
  readonly label = input('Title');
  readonly placeholder = input('');
  readonly disabled = input(false);
  readonly status = input<MbbizInputStatus>('default');
  readonly inputId = input<string | null>(null);
  readonly visible = input(false);

  readonly valueChange = output<string>();
  readonly visibleChange = output<boolean>();

  private readonly focused = signal(false);

  protected readonly actualVisible = computed(() => this.visible());
  protected readonly nativeType = computed(() => (this.actualVisible() ? 'text' : 'password'));
  protected readonly showTitle = computed(
    () =>
      this.focused() ||
      this.value().trim().length > 0 ||
      this.status() === 'error' ||
      this.disabled(),
  );

  protected readonly wrapperClass = computed(
    () =>
      [
        'mbbiz-password-input',
        `mbbiz-password-input--status-${this.status()}`,
        this.showTitle() ? 'mbbiz-password-input--titled' : '',
        this.disabled() ? 'mbbiz-password-input--disabled' : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected readonly toggleAriaLabel = computed(() =>
    this.actualVisible() ? 'Hide password' : 'Show password',
  );

  protected onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }

  protected onFocus() {
    this.focused.set(true);
  }

  protected onBlur() {
    this.focused.set(false);
  }

  protected toggleVisibility() {
    if (this.disabled()) {
      return;
    }

    this.visibleChange.emit(!this.actualVisible());
  }
}
