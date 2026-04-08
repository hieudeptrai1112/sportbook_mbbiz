import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';

export type DsInputFloatingLabelState =
  | 'default'
  | 'hover'
  | 'focus'
  | 'typing'
  | 'filled'
  | 'error'
  | 'disabled'
  | 'error-typing'
  | 'error-filled';

export type DsInputFloatingLabelInteractiveMode = 'default' | 'error';

@Component({
  selector: 'app-ds-input-floating-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ds-input-floating-label.component.html',
  styleUrl: './ds-input-floating-label.component.scss',
})
export class DsInputFloatingLabelComponent {
  readonly value = input('');
  readonly state = input<DsInputFloatingLabelState>('default');
  readonly title = input('Title');
  readonly placeholder = input('Input text');
  readonly width = input<number | null>(250);
  readonly interactive = input(false);
  readonly interactiveMode = input<DsInputFloatingLabelInteractiveMode>('default');

  private readonly liveValue = signal('');
  private readonly liveHover = signal(false);
  private readonly liveFocus = signal(false);

  protected readonly currentState = computed<DsInputFloatingLabelState>(() => {
    if (!this.interactive()) {
      return this.state();
    }

    const hasValue = this.liveValue().trim().length > 0;

    if (this.interactiveMode() === 'error') {
      if (this.liveFocus()) {
        return hasValue ? 'error-typing' : 'error';
      }
      return hasValue ? 'error-filled' : 'error';
    }

    if (this.liveFocus()) {
      return hasValue ? 'typing' : 'focus';
    }

    if (this.liveHover() && !hasValue) {
      return 'hover';
    }

    return hasValue ? 'filled' : 'default';
  });

  protected readonly classes = computed(
    () => `ds-input-floating-label ds-input-floating-label--state-${this.currentState()}`,
  );

  protected readonly displayValue = computed(() => {
    if (this.interactive()) {
      return this.liveValue();
    }
    return this.currentState() === 'focus' ? '' : this.value();
  });

  protected readonly hasDisplayValue = computed(() => this.displayValue().trim().length > 0);

  protected readonly showCursor = computed(
    () =>
      !this.interactive() &&
      (this.currentState() === 'focus' ||
        this.currentState() === 'typing' ||
        this.currentState() === 'error-typing'),
  );

  protected readonly showTrailingCursor = computed(
    () =>
      !this.interactive() &&
      (this.currentState() === 'typing' || this.currentState() === 'error-typing'),
  );

  protected readonly textClass = computed(() => {
    if (this.currentState() === 'disabled') {
      return 'ds-input-floating-label__value ds-input-floating-label__value--disabled';
    }

    if (
      this.currentState() === 'typing' ||
      this.currentState() === 'filled' ||
      this.currentState() === 'error-typing' ||
      this.currentState() === 'error-filled'
    ) {
      return 'ds-input-floating-label__value ds-input-floating-label__value--primary';
    }

    return 'ds-input-floating-label__value ds-input-floating-label__value--placeholder';
  });

  protected readonly nativeValue = computed(() => this.liveValue());

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

  protected onMouseEnter() {
    if (!this.interactive()) {
      return;
    }
    this.liveHover.set(true);
  }

  protected onMouseLeave() {
    if (!this.interactive()) {
      return;
    }
    this.liveHover.set(false);
  }
}
