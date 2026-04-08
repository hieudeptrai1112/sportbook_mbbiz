import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';

export type DsInputSearchState =
  | 'default'
  | 'hover'
  | 'focus'
  | 'typing'
  | 'filled'
  | 'disabled'
  | 'error'
  | 'error-typing'
  | 'error-filled';

export type DsInputSearchInteractiveMode = 'default' | 'error';

@Component({
  selector: 'app-ds-input-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ds-input-search.component.html',
  styleUrl: './ds-input-search.component.scss',
})
export class DsInputSearchComponent {
  readonly value = input('');
  readonly state = input<DsInputSearchState>('default');
  readonly placeholder = input('Input text');
  readonly width = input<number | null>(250);
  readonly interactive = input(false);
  readonly interactiveMode = input<DsInputSearchInteractiveMode>('default');

  private readonly liveValue = signal('');
  private readonly liveHover = signal(false);
  private readonly liveFocus = signal(false);

  protected readonly currentState = computed<DsInputSearchState>(() => {
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
    () => `ds-input-search ds-input-search--state-${this.currentState()}`,
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
      return 'ds-input-search__text ds-input-search__text--disabled';
    }

    if (!this.displayValue()) {
      return 'ds-input-search__text ds-input-search__text--placeholder';
    }

    if (
      this.currentState() === 'typing' ||
      this.currentState() === 'filled' ||
      this.currentState() === 'error' ||
      this.currentState() === 'error-typing' ||
      this.currentState() === 'error-filled'
    ) {
      return 'ds-input-search__text ds-input-search__text--primary';
    }

    return 'ds-input-search__text';
  });

  protected readonly showCursor = computed(
    () =>
      !this.interactive() &&
      (this.currentState() === 'focus' ||
        this.currentState() === 'typing' ||
        this.currentState() === 'error-typing'),
  );

  protected readonly showClearIcon = computed(
    () => this.currentState() === 'typing' && this.displayValue().trim().length > 0,
  );

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

  protected clearInput(event: MouseEvent) {
    if (!this.interactive()) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this.liveValue.set('');
    this.liveFocus.set(true);
  }
}
