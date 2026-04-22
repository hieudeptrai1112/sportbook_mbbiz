import { Component, computed, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'sportbook6vn-radio',
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
})
export class Sportbook6vnRadioComponent {
  readonly inputId = input<string | null>(null);
  readonly checked = input<boolean | null>(null);
  readonly defaultChecked = input(false);
  readonly disabled = input(false);
  readonly label = input<string | null>(null);
  readonly name = input<string | null>(null);
  readonly value = input<string | number | null>(null);

  readonly checkedChange = output<boolean>();
  readonly select = output<void>();

  protected readonly localChecked = signal(false);

  constructor() {
    effect(() => {
      const controlledChecked = this.checked();
      if (controlledChecked !== null) {
        this.localChecked.set(controlledChecked);
        return;
      }

      this.localChecked.set(this.defaultChecked());
    });
  }

  protected readonly resolvedChecked = computed(() => this.localChecked());

  protected readonly wrapperClass = computed(
    () =>
      [
        'sportbook6vn-radio',
        this.resolvedChecked() ? 'sportbook6vn-radio--checked' : '',
        this.disabled() ? 'sportbook6vn-radio--disabled' : '',
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
    if (target.checked) {
      if (this.checked() === null) {
        this.localChecked.set(true);
      }
      this.checkedChange.emit(true);
      this.select.emit();
    }
  }
}
