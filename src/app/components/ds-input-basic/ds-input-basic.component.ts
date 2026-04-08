import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';

export type DsInputBasicState =
  | 'default'
  | 'hover'
  | 'focus'
  | 'typing'
  | 'filled'
  | 'error'
  | 'disabled'
  | 'error-typing'
  | 'error-filled';

@Component({
  selector: 'app-ds-input-basic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ds-input-basic.component.html',
  styleUrl: './ds-input-basic.component.scss',
})
export class DsInputBasicComponent {
  readonly value = input('');
  readonly state = input<DsInputBasicState>('default');
  readonly placeholder = input('Enter something');
  readonly width = input<number | null>(null);
  readonly interactive = input(false);

  private readonly liveValue = signal('');
  private readonly liveHover = signal(false);
  private readonly liveFocus = signal(false);

  protected readonly currentState = computed<DsInputBasicState>(() => {
    if (!this.interactive()) {
      return this.state();
    }

    const hasValue = this.liveValue().trim().length > 0;

    if (this.liveFocus()) {
      return hasValue ? 'typing' : 'focus';
    }

    if (this.liveHover() && !hasValue) {
      return 'hover';
    }

    return hasValue ? 'filled' : 'default';
  });

  protected readonly classes = computed(
    () => `ds-input-basic ds-input-basic--state-${this.currentState()}`,
  );

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
    if (!this.displayValue()) {
      return 'ds-input-basic__text ds-input-basic__text--placeholder';
    }

    if (this.currentState() === 'disabled') {
      return 'ds-input-basic__text ds-input-basic__text--disabled';
    }

    if (
      this.currentState() === 'typing' ||
      this.currentState() === 'filled' ||
      this.currentState() === 'error-typing' ||
      this.currentState() === 'error-filled'
    ) {
      return 'ds-input-basic__text ds-input-basic__text--primary';
    }

    return 'ds-input-basic__text';
  });

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
