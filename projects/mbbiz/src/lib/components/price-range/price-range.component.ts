import { Component, computed, effect, input, output, signal } from '@angular/core';
import { IconComponent } from '@mbbiz/icon/angular';

import {
  caretIndexForDigitCount,
  formatPriceVnd,
  parsePriceDigits,
  type MbbizPriceRangeField,
  type MbbizPriceRangeStatus,
  type MbbizPriceRangeValue,
} from './price-range.types';

let priceRangeUid = 0;

@Component({
  selector: 'mbbiz-price-range',
  imports: [IconComponent],
  templateUrl: './price-range.component.html',
  styleUrl: './price-range.component.scss',
})
export class MbbizPriceRangeComponent {
  readonly label = input('Khoảng tiền (VNĐ)');
  readonly fromPlaceholder = input('Từ số tiền');
  readonly toPlaceholder = input('Đến số tiền');
  readonly fromValue = input<string | null>(null);
  readonly toValue = input<string | null>(null);
  readonly defaultFromValue = input('');
  readonly defaultToValue = input('');
  readonly disabled = input(false);
  readonly status = input<MbbizPriceRangeStatus>('default');
  readonly errorMessage = input('Error message');
  readonly ariaLabel = input('Khoảng tiền');

  readonly fromChange = output<string>();
  readonly toChange = output<string>();
  readonly valueChange = output<MbbizPriceRangeValue>();

  private readonly uid = ++priceRangeUid;

  protected readonly localFrom = signal('');
  protected readonly localTo = signal('');
  protected readonly focusedField = signal<MbbizPriceRangeField | null>(null);

  constructor() {
    effect(() => {
      const controlled = this.fromValue();
      this.localFrom.set(
        parsePriceDigits(controlled !== null ? controlled : this.defaultFromValue()),
      );
    });

    effect(() => {
      const controlled = this.toValue();
      this.localTo.set(parsePriceDigits(controlled !== null ? controlled : this.defaultToValue()));
    });
  }

  protected readonly fromInputId = computed(() => `mbbiz-price-range-from-${this.uid}`);
  protected readonly toInputId = computed(() => `mbbiz-price-range-to-${this.uid}`);

  protected readonly displayFrom = computed(() => formatPriceVnd(this.localFrom()));
  protected readonly displayTo = computed(() => formatPriceVnd(this.localTo()));

  protected readonly showError = computed(
    () => this.status() === 'error' && !this.disabled() && Boolean(this.errorMessage()),
  );

  protected readonly isFilled = computed(() => Boolean(this.displayFrom() || this.displayTo()));

  protected readonly arrowColor = computed(() => {
    if (this.disabled()) {
      return 'var(--color-semantic-icon-disable1, #808080)';
    }

    return this.isFilled()
      ? 'var(--color-semantic-icon-neutral4, #6d83a7)'
      : 'var(--color-semantic-icon-neutral5, #9bafc8)';
  });

  protected readonly fieldClass = computed(() =>
    [
      'mbbiz-price-range__field',
      `mbbiz-price-range__field--status-${this.status()}`,
      this.disabled() ? 'mbbiz-price-range__field--disabled' : '',
      this.focusedField() ? `mbbiz-price-range__field--${this.focusedField()}-active` : '',
      this.isFilled() ? 'mbbiz-price-range__field--filled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onInput(field: MbbizPriceRangeField, event: Event): void {
    if (this.disabled()) {
      return;
    }

    const inputEl = event.target as HTMLInputElement;
    const digits = parsePriceDigits(inputEl.value);
    const formatted = formatPriceVnd(digits);
    const digitCount = parsePriceDigits(inputEl.value.slice(0, inputEl.selectionStart ?? 0)).length;

    if (field === 'from') {
      if (this.fromValue() === null) {
        this.localFrom.set(digits);
      }
      this.fromChange.emit(formatted);
    } else {
      if (this.toValue() === null) {
        this.localTo.set(digits);
      }
      this.toChange.emit(formatted);
    }

    this.valueChange.emit({
      from: field === 'from' ? formatted : this.displayFrom(),
      to: field === 'to' ? formatted : this.displayTo(),
    });

    setTimeout(() => {
      const caret = caretIndexForDigitCount(formatted, digitCount);
      inputEl.setSelectionRange(caret, caret);
    });
  }

  protected onFocus(field: MbbizPriceRangeField): void {
    if (this.disabled()) {
      return;
    }

    this.focusedField.set(field);
  }

  protected onBlur(): void {
    this.focusedField.set(null);
  }
}
