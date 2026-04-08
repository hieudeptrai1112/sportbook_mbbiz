import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, signal } from '@angular/core';

export type DsInputPasswordState =
  | 'default'
  | 'focus'
  | 'typing'
  | 'filled'
  | 'error'
  | 'disabled';

export type DsInputPasswordContentMode = 'hide' | 'unhide';
export type DsInputPasswordInteractiveMode = 'default' | 'error';

@Component({
  selector: 'app-ds-input-password',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ds-input-password.component.html',
  styleUrl: './ds-input-password.component.scss',
})
export class DsInputPasswordComponent {
  readonly value = input('');
  readonly state = input<DsInputPasswordState>('default');
  readonly title = input('Title');
  readonly contentMode = input<DsInputPasswordContentMode>('hide');
  readonly width = input<number | null>(307);
  readonly interactive = input(false);
  readonly interactiveMode = input<DsInputPasswordInteractiveMode>('default');

  private readonly liveValue = signal('');
  private readonly liveFocus = signal(false);
  private readonly liveContentMode = signal<DsInputPasswordContentMode>('hide');

  constructor() {
    effect(() => {
      this.liveContentMode.set(this.contentMode());
    });
  }

  protected readonly currentState = computed<DsInputPasswordState>(() => {
    if (!this.interactive()) {
      return this.state();
    }

    if (this.interactiveMode() === 'error') {
      return 'error';
    }

    const hasValue = this.liveValue().trim().length > 0;
    if (this.liveFocus()) {
      return hasValue ? 'typing' : 'focus';
    }
    return hasValue ? 'filled' : 'default';
  });

  protected readonly actualContentMode = computed<DsInputPasswordContentMode>(() =>
    this.interactive() ? this.liveContentMode() : this.contentMode(),
  );

  protected readonly classes = computed(
    () =>
      `ds-input-password ds-input-password--state-${this.currentState()} ds-input-password--mode-${this.actualContentMode()}`,
  );

  protected readonly showTitle = computed(() => this.currentState() !== 'default');

  protected readonly displayValue = computed(() => {
    if (this.interactive()) {
      return this.liveValue();
    }

    if (this.currentState() === 'focus') {
      return '';
    }

    return this.value();
  });

  protected readonly displayText = computed(() => {
    const value = this.displayValue();
    if (!value) {
      return this.title();
    }

    if (this.actualContentMode() === 'hide') {
      return '•'.repeat(Math.max(value.length, 1));
    }

    return value;
  });

  protected readonly textClass = computed(() => {
    if (!this.displayValue()) {
      return 'ds-input-password__text ds-input-password__text--placeholder';
    }

    if (this.currentState() === 'disabled') {
      return 'ds-input-password__text ds-input-password__text--disabled';
    }

    return 'ds-input-password__text ds-input-password__text--primary';
  });

  protected readonly showCursor = computed(
    () =>
      !this.interactive() &&
      (this.currentState() === 'focus' || this.currentState() === 'typing'),
  );

  protected readonly nativeType = computed(() =>
    this.actualContentMode() === 'hide' ? 'password' : 'text',
  );

  protected readonly nativeValue = computed(() => this.liveValue());

  protected readonly toggleAriaLabel = computed(() =>
    this.actualContentMode() === 'hide' ? 'Show password' : 'Hide password',
  );

  protected readonly isToggleDisabled = computed(
    () => !this.interactive() || this.currentState() === 'disabled',
  );

  protected toggleContentMode() {
    if (this.isToggleDisabled()) {
      return;
    }
    this.liveContentMode.update((mode) => (mode === 'hide' ? 'unhide' : 'hide'));
  }

  protected onInput(event: Event) {
    if (!this.interactive()) {
      return;
    }
    const target = event.target as HTMLInputElement;
    this.liveValue.set(target.value);
  }

  protected onFocus() {
    if (!this.interactive()) {
      return;
    }
    this.liveFocus.set(true);
  }

  protected onBlur() {
    if (!this.interactive()) {
      return;
    }
    this.liveFocus.set(false);
  }
}
