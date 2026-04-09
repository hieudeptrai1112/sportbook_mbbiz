import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';

export type DsInputAffixState =
  | 'default'
  | 'hover'
  | 'focus'
  | 'typing'
  | 'filled'
  | 'error'
  | 'disabled'
  | 'error-typing'
  | 'error-filled';

export type DsInputAffixMode = 'prefix' | 'suffix' | 'both';
export type DsInputAffixInteractiveMode = 'default' | 'error';

@Component({
  selector: 'app-ds-input-affix',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ds-input-affix.component.html',
  styleUrl: './ds-input-affix.component.scss',
})
export class DsInputAffixComponent {
  readonly value = input('');
  readonly state = input<DsInputAffixState>('default');
  readonly placeholder = input('Input text');
  readonly width = input<number | null>(250);
  readonly interactive = input(false);
  readonly interactiveMode = input<DsInputAffixInteractiveMode>('default');
  readonly affixMode = input<DsInputAffixMode>('prefix');
  readonly prefixText = input('VND');
  readonly suffixText = input('VND');

  private readonly liveValue = signal('');
  private readonly liveHover = signal(false);
  private readonly liveFocus = signal(false);

  protected readonly currentState = computed<DsInputAffixState>(() => {
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
      `ds-input-affix ds-input-affix--state-${this.currentState()} ds-input-affix--mode-${this.affixMode()}`,
  );

  protected readonly displayValue = computed(() => {
    if (this.interactive()) {
      return this.liveValue();
    }

    return this.value();
  });

  protected readonly showPrefix = computed(
    () => this.affixMode() === 'prefix' || this.affixMode() === 'both',
  );

  protected readonly showSuffix = computed(
    () => this.affixMode() === 'suffix' || this.affixMode() === 'both',
  );

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

  protected readonly textClass = computed(() => {
    if (this.currentState() === 'disabled') {
      return 'ds-input-affix__text ds-input-affix__text--disabled';
    }

    if (this.showTypingValue() || this.displayValue()) {
      return 'ds-input-affix__text ds-input-affix__text--primary';
    }

    return 'ds-input-affix__text ds-input-affix__text--placeholder';
  });

  protected readonly currencyClass = computed(() =>
    this.currentState() === 'disabled'
      ? 'ds-input-affix__currency ds-input-affix__currency--disabled'
      : 'ds-input-affix__currency',
  );

  protected readonly iconClass = computed(() =>
    this.currentState() === 'disabled'
      ? 'ds-input-affix__icon ds-input-affix__icon--disabled'
      : 'ds-input-affix__icon',
  );

  protected readonly nativeValue = computed(() => this.liveValue());

  protected readonly staticDisplayText = computed(() => {
    if (this.showTypingValue()) {
      return this.displayValue() || this.placeholder();
    }

    if (this.displayValue()) {
      return this.displayValue();
    }

    return this.currentState() === 'focus' ? '' : this.placeholder();
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
