import { Component, computed, effect, input, output, signal } from '@angular/core';

export type Sportbook6vnSwitchInteractionState = 'default' | 'loading' | 'pressed';
export type Sportbook6vnSwitchSize = 'm' | 'l';

@Component({
  selector: 'sportbook6vn-switch',
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
})
export class Sportbook6vnSwitchComponent {
  readonly inputId = input<string | null>(null);
  readonly checked = input<boolean | null>(null);
  readonly defaultChecked = input(false);
  readonly disabled = input(false);
  readonly size = input<Sportbook6vnSwitchSize>('m');
  readonly interactionState = input<Sportbook6vnSwitchInteractionState>('default');

  readonly checkedChange = output<boolean>();
  readonly change = output<boolean>();

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
        'sportbook6vn-switch',
        this.resolvedChecked() ? 'sportbook6vn-switch--checked' : '',
        this.disabled() ? 'sportbook6vn-switch--disabled' : '',
        `sportbook6vn-switch--size-${this.size()}`,
        `sportbook6vn-switch--state-${this.interactionState()}`,
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

    if (this.checked() === null) {
      this.localChecked.set(nextChecked);
    }

    this.checkedChange.emit(nextChecked);
    this.change.emit(nextChecked);
  }
}
