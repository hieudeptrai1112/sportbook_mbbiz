import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';

export type DsInputAffixLabelState =
  | 'default'
  | 'hover'
  | 'focus'
  | 'typing'
  | 'filled'
  | 'error'
  | 'disabled'
  | 'error-typing'
  | 'error-filled';

export type DsInputAffixLabelMode = 'front' | 'post' | 'both';
export type DsInputAffixLabelInteractiveMode = 'default' | 'error';

@Component({
  selector: 'app-ds-input-affix-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ds-input-affix-label.component.html',
  styleUrl: './ds-input-affix-label.component.scss',
})
export class DsInputAffixLabelComponent {
  readonly value = input('');
  readonly state = input<DsInputAffixLabelState>('default');
  readonly placeholder = input('Input text');
  readonly width = input<number | null>(250);
  readonly interactive = input(false);
  readonly interactiveMode = input<DsInputAffixLabelInteractiveMode>('default');
  readonly labelMode = input<DsInputAffixLabelMode>('front');
  readonly frontLabel = input('RMB');
  readonly postLabel = input('.com');

  private readonly liveValue = signal('');
  private readonly liveHover = signal(false);
  private readonly liveFocus = signal(false);

  protected readonly currentState = computed<DsInputAffixLabelState>(() => {
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
    () =>
      `ds-input-affix-label ds-input-affix-label--state-${this.currentState()} ds-input-affix-label--mode-${this.labelMode()}`,
  );

  protected readonly showFront = computed(
    () => this.labelMode() === 'front' || this.labelMode() === 'both',
  );

  protected readonly showPost = computed(
    () => this.labelMode() === 'post' || this.labelMode() === 'both',
  );

  protected readonly displayValue = computed(() => {
    if (this.interactive()) {
      return this.liveValue();
    }

    return this.value();
  });

  protected readonly nativeValue = computed(() => this.liveValue());

  protected readonly showCursor = computed(
    () =>
      !this.interactive() &&
      (this.currentState() === 'focus' ||
        this.currentState() === 'typing' ||
        this.currentState() === 'error-typing'),
  );

  protected readonly showTypingValue = computed(
    () =>
      !this.interactive() &&
      (this.currentState() === 'typing' || this.currentState() === 'error-typing'),
  );

  protected readonly staticDisplayText = computed(() => {
    if (this.showTypingValue()) {
      return this.displayValue() || this.placeholder();
    }

    if (this.displayValue()) {
      return this.displayValue();
    }

    return this.currentState() === 'focus' ? '' : this.placeholder();
  });

  protected readonly textClass = computed(() => {
    if (this.currentState() === 'disabled') {
      return 'ds-input-affix-label__text ds-input-affix-label__text--disabled';
    }

    if (this.showTypingValue() || this.displayValue()) {
      return 'ds-input-affix-label__text ds-input-affix-label__text--primary';
    }

    return 'ds-input-affix-label__text ds-input-affix-label__text--placeholder';
  });

  protected readonly labelClass = computed(() =>
    this.currentState() === 'disabled'
      ? 'ds-input-affix-label__label ds-input-affix-label__label--disabled'
      : 'ds-input-affix-label__label',
  );

  protected readonly labelTextClass = computed(() =>
    this.currentState() === 'disabled'
      ? 'ds-input-affix-label__label-text ds-input-affix-label__label-text--disabled'
      : 'ds-input-affix-label__label-text',
  );

  protected readonly labelDividerClass = computed(() =>
    this.currentState() === 'disabled'
      ? 'ds-input-affix-label__divider ds-input-affix-label__divider--disabled'
      : 'ds-input-affix-label__divider',
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
}
