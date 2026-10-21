import { Component, computed, effect, input, output, signal } from '@angular/core';

export type MbbizCheckboxInteractionState = 'default' | 'hover' | 'pressed';

@Component({
  selector: 'mbbiz-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class MbbizCheckboxComponent {
  readonly inputId = input<string | null>(null);
  readonly checked = input<boolean | null>(null);
  readonly defaultChecked = input(false);
  readonly indeterminate = input<boolean | null>(null);
  readonly defaultIndeterminate = input(false);
  readonly disabled = input(false);
  readonly error = input(false);
  readonly label = input<string | null>(null);
  readonly interactionState = input<MbbizCheckboxInteractionState>('default');

  readonly checkedChange = output<boolean>();
  readonly indeterminateChange = output<boolean>();
  readonly change = output<{ checked: boolean; indeterminate: boolean }>();

  protected readonly localChecked = signal(false);
  protected readonly localIndeterminate = signal(false);

  constructor() {
    effect(() => {
      const controlledChecked = this.checked();
      if (controlledChecked !== null) {
        this.localChecked.set(controlledChecked);
        return;
      }

      this.localChecked.set(this.defaultChecked());
    });

    effect(() => {
      const controlledIndeterminate = this.indeterminate();
      if (controlledIndeterminate !== null) {
        this.localIndeterminate.set(controlledIndeterminate);
        return;
      }

      this.localIndeterminate.set(this.defaultIndeterminate());
    });
  }

  protected readonly resolvedChecked = computed(() => this.localChecked());
  protected readonly resolvedIndeterminate = computed(() => this.localIndeterminate());

  protected readonly wrapperClass = computed(
    () =>
      [
        'mbbiz-checkbox',
        this.resolvedChecked() ? 'mbbiz-checkbox--checked' : '',
        this.resolvedIndeterminate() ? 'mbbiz-checkbox--indeterminate' : '',
        this.disabled() ? 'mbbiz-checkbox--disabled' : '',
        this.error() ? 'mbbiz-checkbox--error' : '',
        `mbbiz-checkbox--state-${this.interactionState()}`,
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected onInputChange(event: Event) {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }

    const target = event.target as HTMLInputElement;
    const nextChecked = target.checked;
    const nextIndeterminate = false;

    if (this.checked() === null) {
      this.localChecked.set(nextChecked);
    }

    if (this.indeterminate() === null) {
      this.localIndeterminate.set(false);
    }

    this.checkedChange.emit(nextChecked);
    if (this.resolvedIndeterminate()) {
      this.indeterminateChange.emit(false);
    }
    this.change.emit({ checked: nextChecked, indeterminate: nextIndeterminate });
  }
}
