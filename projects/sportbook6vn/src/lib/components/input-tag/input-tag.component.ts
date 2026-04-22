import { Component, ElementRef, OnDestroy, computed, effect, input, output, signal, viewChild } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';

import { Sportbook6vnInputStatus } from '../input/input.types';

export type Sportbook6vnInputTagObjectValue = {
  value: string;
  label?: string;
  closable?: boolean;
};

export type Sportbook6vnInputTagValue = string | Sportbook6vnInputTagObjectValue;

export type Sportbook6vnInputTagRenderResult =
  | string
  | {
      label?: string;
      tone?: 'default' | 'brand' | 'success' | 'warning' | 'danger';
      className?: string;
      closable?: boolean;
    };

export type Sportbook6vnInputTagRenderFn = (context: {
  value: string;
  label: string;
  closable: boolean;
  index: number;
  values: readonly Sportbook6vnInputTagValue[];
}) => Sportbook6vnInputTagRenderResult | null | undefined;

export type Sportbook6vnInputTagValidateResult =
  | boolean
  | string
  | Sportbook6vnInputTagObjectValue
  | Promise<boolean | string | Sportbook6vnInputTagObjectValue>;

export type Sportbook6vnInputTagValidateFn = (
  inputValue: string,
  tags: readonly Sportbook6vnInputTagValue[],
) => Sportbook6vnInputTagValidateResult;

export type Sportbook6vnInputTagMaxTagCount =
  | number
  | 'responsive'
  | {
      count: number | 'responsive';
      render?: (hiddenTagCount: number, values: readonly Sportbook6vnInputTagValue[]) => string;
    };

type Sportbook6vnInputTagModel = {
  value: string;
  label: string;
  closable: boolean;
  raw: Sportbook6vnInputTagValue;
};

@Component({
  selector: 'sportbook6vn-input-tag',
  imports: [NzInputModule],
  templateUrl: './input-tag.component.html',
  styleUrl: './input-tag.component.scss',
})
export class Sportbook6vnInputTagComponent implements OnDestroy {
  readonly tags = input<readonly Sportbook6vnInputTagValue[]>([]);
  readonly value = input('');
  readonly placeholder = input('Input text');
  readonly disabled = input(false);
  readonly readOnly = input(false);
  readonly status = input<Sportbook6vnInputStatus>('default');
  readonly hovered = input(false);
  readonly focused = input(false);
  readonly allowClear = input(false);
  readonly showTrailingClear = input(false);
  readonly saveOnBlur = input(false);
  readonly labelInValue = input(false);
  readonly tokenSeparators = input<readonly string[]>([]);
  readonly maxTagCount = input<Sportbook6vnInputTagMaxTagCount | null>(null);
  readonly inputId = input<string | null>(null);
  readonly validate = input<Sportbook6vnInputTagValidateFn>((inputValue, tags) => {
    return !!inputValue && tags.every((tag) => this.normalizeTag(tag).value !== inputValue);
  });
  readonly renderTag = input<Sportbook6vnInputTagRenderFn | null>(null);

  readonly valueChange = output<string>();
  readonly tagsChange = output<Sportbook6vnInputTagValue[]>();
  readonly tagRemove = output<Sportbook6vnInputTagValue>();
  readonly clearRequest = output<void>();

  private readonly nativeInput = viewChild<ElementRef<HTMLInputElement>>('nativeInput');
  private readonly contentRef = viewChild<ElementRef<HTMLElement>>('contentRef');
  private readonly measureContainer = viewChild<ElementRef<HTMLElement>>('measureContainer');
  private readonly measureOverflow = viewChild<ElementRef<HTMLElement>>('measureOverflow');

  protected readonly localTags = signal<Sportbook6vnInputTagModel[]>([]);
  protected readonly localValue = signal('');
  protected readonly runtimeFocused = signal(false);
  protected readonly responsiveVisibleCount = signal<number | null>(null);

  private resizeObserver: ResizeObserver | null = null;
  private measureRaf: number | null = null;
  private readonly inputMinWidth = 80;
  private readonly collapsedInputMinWidth = 72;
  private readonly chipGap = 4;

  constructor() {
    effect(() => {
      this.localTags.set(this.tags().map((tag) => this.normalizeTag(tag)));
    });

    effect(() => {
      this.localValue.set(this.value());
    });

    effect(() => {
      const isResponsive = this.isResponsiveMode();
      const content = this.contentRef()?.nativeElement;
      const measureContainer = this.measureContainer()?.nativeElement;
      const measureOverflow = this.measureOverflow()?.nativeElement;
      this.localTags();
      this.showClearButton();
      this.renderTag();
      this.maxTagCount();

      if (!isResponsive || !content || !measureContainer || !measureOverflow) {
        this.responsiveVisibleCount.set(null);
        this.disconnectResizeObserver();
        return;
      }

      this.connectResizeObserver(content, measureContainer);
      this.scheduleResponsiveMeasurement();
    });
  }

  protected readonly wrapperClass = computed(
    () =>
      [
        'sportbook6vn-input-tag',
        `sportbook6vn-input-tag--status-${this.status()}`,
        this.disabled() ? 'sportbook6vn-input-tag--disabled' : '',
        this.readOnly() ? 'sportbook6vn-input-tag--readonly' : '',
        this.hovered() ? 'sportbook6vn-input-tag--hovered' : '',
        this.focusState() ? 'sportbook6vn-input-tag--focused' : '',
        this.localTags().length > 0 ? 'sportbook6vn-input-tag--with-tags' : '',
        this.localTags().length > 0 && !this.localValue() ? 'sportbook6vn-input-tag--collapsed-input' : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected readonly focusState = computed(() => this.focused() || this.runtimeFocused());

  protected readonly showCursor = computed(
    () => this.focused() && !this.runtimeFocused() && !this.disabled() && !this.localValue(),
  );

  protected readonly showClearButton = computed(
    () =>
      (this.showTrailingClear() || this.allowClear()) &&
      !this.disabled() &&
      !this.readOnly() &&
      (this.localTags().length > 0 || !!this.localValue()),
  );

  protected readonly inputPlaceholder = computed(() => (this.showCursor() ? '' : this.placeholder()));

  protected readonly isResponsiveMode = computed(() => {
    const maxTagCount = this.maxTagCount();
    if (!maxTagCount) {
      return false;
    }

    if (maxTagCount === 'responsive') {
      return true;
    }

    return typeof maxTagCount === 'object' && maxTagCount.count === 'responsive';
  });

  protected readonly visibleTags = computed(() => {
    const maxTagCount = this.maxTagCount();
    if (!maxTagCount) {
      return this.localTags();
    }

    if (this.isResponsiveMode()) {
      const count = this.responsiveVisibleCount();
      return this.localTags().slice(0, count ?? this.localTags().length);
    }

    const count =
      typeof maxTagCount === 'number'
        ? maxTagCount
        : typeof maxTagCount === 'object'
          ? typeof maxTagCount.count === 'number'
            ? maxTagCount.count
            : this.localTags().length
          : this.localTags().length;
    return this.localTags().slice(0, count);
  });

  protected readonly hiddenTagCount = computed(() =>
    Math.max(0, this.localTags().length - this.visibleTags().length),
  );

  protected readonly hiddenTags = computed(() => this.localTags().slice(this.visibleTags().length));

  protected readonly overflowLabel = computed(() => {
    const hiddenTagCount = this.hiddenTagCount();
    if (!hiddenTagCount) {
      return null;
    }

    return this.resolveOverflowLabel(hiddenTagCount);
  });

  protected onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const nextValue = target.value;

    if (this.shouldTokenizeValue(nextValue)) {
      void this.tokenizeValue(nextValue);
      return;
    }

    this.localValue.set(nextValue);
    this.valueChange.emit(nextValue);
  }

  protected onKeyDown(event: KeyboardEvent) {
    if (this.disabled() || this.readOnly()) {
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      void this.commitCurrentInput();
      return;
    }

    if (event.key === 'Backspace' && !this.localValue()) {
      this.removeLastTag(event);
    }
  }

  protected onFocus() {
    if (this.disabled()) {
      return;
    }

    this.runtimeFocused.set(true);
  }

  protected onBlur() {
    this.runtimeFocused.set(false);

    if (!this.saveOnBlur() || this.disabled() || this.readOnly()) {
      return;
    }

    void this.commitCurrentInput();
  }

  protected removeTag(index: number, event: Event) {
    event.stopPropagation();

    const visibleTag = this.visibleTags()[index];
    if (!visibleTag || !this.resolveRenderedTag(visibleTag, index).closable) {
      return;
    }

    this.removeTagModel(visibleTag);
  }

  protected removeOverflowTag(index: number, event: Event) {
    event.stopPropagation();

    const hiddenTag = this.hiddenTags()[index];
    const actualIndex = this.visibleTags().length + index;
    if (!hiddenTag || !this.resolveRenderedTag(hiddenTag, actualIndex).closable) {
      return;
    }

    this.removeTagModel(hiddenTag);
  }

  protected clearAll(event: Event) {
    event.stopPropagation();

    if (this.disabled() || this.readOnly()) {
      return;
    }

    this.localTags.set([]);
    this.localValue.set('');
    this.valueChange.emit('');
    this.tagsChange.emit([]);
    this.clearRequest.emit();
  }

  protected focusInput() {
    if (this.disabled()) {
      return;
    }

    this.nativeInput()?.nativeElement.focus();
  }

  protected preserveFocus(event: MouseEvent) {
    if ((event.target as HTMLElement | null)?.tagName !== 'INPUT') {
      event.preventDefault();
    }
  }

  protected trackByTag(index: number, tag: Sportbook6vnInputTagModel) {
    return `${tag.value}-${index}`;
  }

  protected resolveRenderedTag(tag: Sportbook6vnInputTagModel, index: number) {
    const renderTag = this.renderTag();
    const baseResult = {
      label: tag.label,
      tone: 'default' as const,
      className: '',
      closable: tag.closable,
    };

    if (!renderTag) {
      return baseResult;
    }

    const rendered = renderTag({
      value: tag.value,
      label: tag.label,
      closable: tag.closable,
      index,
      values: this.toExternalTags(this.localTags()),
    });

    if (!rendered) {
      return baseResult;
    }

    if (typeof rendered === 'string') {
      return {
        ...baseResult,
        label: rendered,
      };
    }

    return {
      label: rendered.label ?? baseResult.label,
      tone: rendered.tone ?? baseResult.tone,
      className: rendered.className ?? '',
      closable: rendered.closable ?? baseResult.closable,
    };
  }

  private async commitCurrentInput() {
    const candidate = this.localValue().trim();
    if (!candidate) {
      this.localValue.set('');
      this.valueChange.emit('');
      return;
    }

    const validateResult = await this.validate()(candidate, this.toExternalTags(this.localTags()));
    if (!validateResult) {
      return;
    }

    const nextTag = this.resolveCreatedTag(candidate, validateResult);
    const nextTags = [...this.localTags(), this.normalizeTag(nextTag)];

    this.localTags.set(nextTags);
    this.localValue.set('');
    this.tagsChange.emit(this.toExternalTags(nextTags));
    this.valueChange.emit('');
  }

  private removeLastTag(event: KeyboardEvent) {
    const currentTags = this.localTags();
    if (!currentTags.length) {
      return;
    }

    event.preventDefault();

    for (let index = currentTags.length - 1; index >= 0; index -= 1) {
      const candidate = currentTags[index];
      if (!this.resolveRenderedTag(candidate, index).closable) {
        continue;
      }

      const nextTags = currentTags.filter((_tag, currentIndex) => currentIndex !== index);
      this.localTags.set(nextTags);
      this.tagsChange.emit(this.toExternalTags(nextTags));
      this.tagRemove.emit(this.toExternalTag(candidate));
      return;
    }
  }

  private removeTagModel(tag: Sportbook6vnInputTagModel) {
    const nextTags = this.localTags().filter((currentTag) => currentTag !== tag);
    this.localTags.set(nextTags);
    this.tagsChange.emit(this.toExternalTags(nextTags));
    this.tagRemove.emit(this.toExternalTag(tag));
  }

  private shouldTokenizeValue(nextValue: string) {
    const separators = this.tokenSeparators();
    if (!separators.length) {
      return false;
    }

    const separatorPattern = new RegExp(
      `[${separators.map((separator) => this.escapeRegExp(separator)).join('')}]`,
    );
    return separatorPattern.test(nextValue);
  }

  private async tokenizeValue(nextValue: string) {
    const separators = this.tokenSeparators();
    const separatorPattern = new RegExp(
      `[${separators.map((separator) => this.escapeRegExp(separator)).join('')}]`,
    );
    const segments = nextValue.split(separatorPattern);
    const trailingValue = separators.some((separator) => nextValue.endsWith(separator))
      ? ''
      : segments.pop() ?? '';

    const nextTags = [...this.localTags()];
    for (const segment of segments) {
      const candidate = segment.trim();
      if (!candidate) {
        continue;
      }

      const validateResult = await this.validate()(candidate, this.toExternalTags(nextTags));
      if (!validateResult) {
        continue;
      }

      const nextTag = this.normalizeTag(this.resolveCreatedTag(candidate, validateResult));
      if (nextTags.some((tag) => tag.value === nextTag.value)) {
        continue;
      }

      nextTags.push(nextTag);
    }

    this.localTags.set(nextTags);
    this.localValue.set(trailingValue);
    this.tagsChange.emit(this.toExternalTags(nextTags));
    this.valueChange.emit(trailingValue);
  }

  private normalizeTag(tag: Sportbook6vnInputTagValue): Sportbook6vnInputTagModel {
    if (typeof tag === 'string') {
      return {
        value: tag,
        label: tag,
        closable: true,
        raw: tag,
      };
    }

    return {
      value: tag.value,
      label: tag.label ?? tag.value,
      closable: tag.closable !== false,
      raw: tag,
    };
  }

  private resolveCreatedTag(
    candidate: string,
    validateResult: boolean | string | Sportbook6vnInputTagObjectValue,
  ): Sportbook6vnInputTagValue {
    if (validateResult === true) {
      return this.labelInValue()
        ? {
            value: candidate,
            label: candidate,
          }
        : candidate;
    }

    if (typeof validateResult === 'string') {
      return this.labelInValue()
        ? {
            value: validateResult,
            label: candidate,
          }
        : validateResult;
    }

    if (typeof validateResult !== 'object' || validateResult === null) {
      return this.labelInValue()
        ? {
            value: candidate,
            label: candidate,
          }
        : candidate;
    }

    return {
      value: validateResult.value,
      label: validateResult.label ?? candidate,
      ...(validateResult.closable === false ? { closable: false } : {}),
    };
  }

  private toExternalTags(tags: readonly Sportbook6vnInputTagModel[]) {
    return tags.map((tag) => this.toExternalTag(tag));
  }

  private toExternalTag(tag: Sportbook6vnInputTagModel): Sportbook6vnInputTagValue {
    if (typeof tag.raw === 'string' && !this.labelInValue()) {
      return tag.value;
    }

    return {
      value: tag.value,
      label: tag.label,
      ...(tag.closable ? {} : { closable: false }),
    };
  }

  private escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private resolveOverflowLabel(hiddenTagCount: number) {
    const maxTagCount = this.maxTagCount();
    if (maxTagCount && typeof maxTagCount === 'object' && maxTagCount.render) {
      return maxTagCount.render(hiddenTagCount, this.toExternalTags(this.localTags()));
    }

    return `+${hiddenTagCount}`;
  }

  private connectResizeObserver(...elements: HTMLElement[]) {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const signature = elements;
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.scheduleResponsiveMeasurement();
    });

    signature.forEach((element) => this.resizeObserver?.observe(element));
  }

  private disconnectResizeObserver() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  private scheduleResponsiveMeasurement() {
    if (!this.isResponsiveMode()) {
      return;
    }

    if (typeof requestAnimationFrame === 'undefined') {
      this.measureResponsiveLayout();
      return;
    }

    if (this.measureRaf !== null) {
      cancelAnimationFrame(this.measureRaf);
    }

    this.measureRaf = requestAnimationFrame(() => {
      this.measureRaf = null;
      this.measureResponsiveLayout();
    });
  }

  private measureResponsiveLayout() {
    if (!this.isResponsiveMode()) {
      this.responsiveVisibleCount.set(null);
      return;
    }

    const content = this.contentRef()?.nativeElement;
    const measureContainer = this.measureContainer()?.nativeElement;
    const measureOverflow = this.measureOverflow()?.nativeElement;
    if (!content || !measureContainer || !measureOverflow) {
      return;
    }

    const chips = Array.from(
      measureContainer.querySelectorAll<HTMLElement>('.sportbook6vn-input-tag__chip'),
    );

    if (!chips.length) {
      this.responsiveVisibleCount.set(0);
      return;
    }

    const availableWidth = Math.max(
      0,
      content.clientWidth - this.getReservedInputWidth() - (this.showClearButton() ? 24 : 0),
    );

    let usedWidth = 0;
    let visibleCount = 0;

    for (let index = 0; index < chips.length; index += 1) {
      const remaining = chips.length - (index + 1);
      const chipWidth = chips[index].offsetWidth + (index > 0 ? this.chipGap : 0);
      const overflowWidth = remaining > 0 ? this.measureOverflowWidth(measureOverflow, remaining) : 0;

      if (usedWidth + chipWidth + overflowWidth > availableWidth) {
        break;
      }

      usedWidth += chipWidth;
      visibleCount = index + 1;
    }

    this.responsiveVisibleCount.set(visibleCount);
  }

  private measureOverflowWidth(measureOverflow: HTMLElement, hiddenTagCount: number) {
    measureOverflow.textContent = this.resolveOverflowLabel(hiddenTagCount);
    return measureOverflow.offsetWidth + this.chipGap;
  }

  private getReservedInputWidth() {
    return this.localTags().length > 0 && !this.localValue()
      ? this.collapsedInputMinWidth
      : this.inputMinWidth;
  }

  ngOnDestroy() {
    this.disconnectResizeObserver();
    if (this.measureRaf !== null && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(this.measureRaf);
      this.measureRaf = null;
    }
  }
}
