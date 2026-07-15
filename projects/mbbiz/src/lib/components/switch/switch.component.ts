import { Component, computed, effect, input, output, signal } from '@angular/core';

export type MbbizSwitchInteractionState = 'default' | 'loading' | 'pressed';
export type MbbizSwitchSize = 'm' | 'l';

@Component({
  selector: 'mbbiz-switch',
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
})
export class MbbizSwitchComponent {
  readonly inputId = input<string | null>(null);
  readonly checked = input<boolean | null>(null);
  readonly defaultChecked = input(false);
  readonly disabled = input(false);
  readonly size = input<MbbizSwitchSize>('m');
  readonly interactionState = input<MbbizSwitchInteractionState>('default');

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
        'mbbiz-switch',
        this.resolvedChecked() ? 'mbbiz-switch--checked' : '',
        this.disabled() ? 'mbbiz-switch--disabled' : '',
        `mbbiz-switch--size-${this.size()}`,
        `mbbiz-switch--state-${this.interactionState()}`,
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
