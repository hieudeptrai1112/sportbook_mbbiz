import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';

export type DsTextAreaState =
  | 'default'
  | 'hover'
  | 'focus'
  | 'typing'
  | 'filled'
  | 'error'
  | 'disabled'
  | 'error-typing'
  | 'error-filled';

export type DsTextAreaInteractiveMode = 'default' | 'error';

@Component({
  selector: 'app-ds-text-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ds-text-area.component.html',
  styleUrl: './ds-text-area.component.scss',
})
export class DsTextAreaComponent {
  readonly value = input('');
  readonly state = input<DsTextAreaState>('default');
  readonly placeholder = input('Input text');
  readonly width = input<number | null>(250);
  readonly maxLength = input(100);
  readonly interactive = input(false);
  readonly interactiveMode = input<DsTextAreaInteractiveMode>('default');

  private readonly liveValue = signal('');
  private readonly liveHover = signal(false);
  private readonly liveFocus = signal(false);

  protected readonly currentState = computed<DsTextAreaState>(() => {
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

  protected readonly classes = computed(() => `ds-text-area ds-text-area--state-${this.currentState()}`);

  protected readonly isTypingState = computed(
    () =>
      !this.interactive() &&
      (this.currentState() === 'typing' || this.currentState() === 'error-typing'),
  );

  protected readonly showCursor = computed(
    () =>
      !this.interactive() &&
      (this.currentState() === 'focus' ||
        this.currentState() === 'typing' ||
        this.currentState() === 'error-typing'),
  );

  protected readonly displayValue = computed(() => {
    if (this.interactive()) {
      return this.liveValue();
    }
    return this.currentState() === 'focus' ? '' : this.value();
  });

  protected readonly displayText = computed(() => this.displayValue() || this.placeholder());
  protected readonly nativeValue = computed(() => this.liveValue());

  protected readonly textClass = computed(() => {
    if (this.currentState() === 'disabled') {
      return this.displayValue()
        ? 'ds-text-area__text ds-text-area__text--disabled'
        : 'ds-text-area__text ds-text-area__text--disabled-placeholder';
    }

    if (!this.displayValue()) {
      return 'ds-text-area__text ds-text-area__text--placeholder';
    }

    if (
      this.currentState() === 'typing' ||
      this.currentState() === 'filled' ||
      this.currentState() === 'error-typing' ||
      this.currentState() === 'error-filled'
    ) {
      return 'ds-text-area__text ds-text-area__text--primary';
    }

    return 'ds-text-area__text';
  });

  protected readonly counterText = computed(() => {
    const count = this.interactive() ? this.liveValue().length : this.value().length;
    const limit = this.maxLength();
    return `${Math.min(count, limit)}/${limit}`;
  });

  protected onInput(event: Event) {
    if (!this.interactive()) {
      return;
    }

    const target = event.target as HTMLTextAreaElement;
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
