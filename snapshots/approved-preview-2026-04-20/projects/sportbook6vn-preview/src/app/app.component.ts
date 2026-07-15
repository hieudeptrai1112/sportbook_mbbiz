import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  MbbizAffixLabelInputComponent,
  MbbizButtonComponent,
  MbbizCheckboxComponent,
  MbbizCheckboxGroupComponent,
  MbbizDropdownComponent,
  MbbizDropdownTagComponent,
  MbbizFloatingLabelInputComponent,
  MbbizInputComponent,
  MbbizInputTagComponent,
  MbbizInputTagValue,
  MbbizModalComponent,
  MbbizPasswordInputComponent,
  MbbizRadioComponent,
  MbbizRadioGroupComponent,
  MbbizSearchInputComponent,
  MbbizTextareaComponent,
} from 'mbbiz';

@Component({
  selector: 'mbbiz-preview-root',
  imports: [
    CommonModule,
    MbbizAffixLabelInputComponent,
    MbbizButtonComponent,
    MbbizCheckboxComponent,
    MbbizCheckboxGroupComponent,
    MbbizDropdownComponent,
    MbbizDropdownTagComponent,
    MbbizFloatingLabelInputComponent,
    MbbizInputComponent,
    MbbizInputTagComponent,
    MbbizModalComponent,
    MbbizPasswordInputComponent,
    MbbizRadioComponent,
    MbbizRadioGroupComponent,
    MbbizSearchInputComponent,
    MbbizTextareaComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MbbizPreviewAppComponent {
  protected readonly checkboxGroupOptions = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
    { label: 'C', value: 'c' },
    { label: 'D', value: 'd' },
  ];
  protected readonly radioGroupOptions = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
    { label: 'C', value: 'c' },
    { label: 'D', value: 'd' },
  ];

  protected readonly dropdownItems = [
    { id: 'option-1', label: 'Option 1' },
    { id: 'option-2', label: 'Option 2' },
    { id: 'option-3', label: 'Option 3' },
    { id: 'option-4', label: 'Option 4' },
    { id: 'option-5', label: 'Option 5' },
    { id: 'option-6', label: 'Option 6' },
  ];

  protected readonly currencyAffixItems = [
    { id: 'vnd', label: 'VND', flagCode: 'vnd' as const },
    { id: 'usd', label: 'USD', flagCode: 'usd' as const },
    { id: 'krw', label: 'KRW', flagCode: 'krw' as const },
    { id: 'gbp', label: 'GBP', flagCode: 'gbp' as const },
    { id: 'cad', label: 'CAD', flagCode: 'cad' as const },
    { id: 'thb', label: 'THB', flagCode: 'thb' as const },
  ];

  protected readonly basicInputValue = signal('Input text');
  protected readonly searchValue = signal('');
  protected readonly passwordTypingValue = signal('');
  protected readonly passwordValue = signal('Input text');
  protected readonly passwordVisible = signal(true);
  protected readonly textareaValue = signal('Input text');
  protected readonly affixPreviewPrefixValue = signal<string | null>(null);
  protected readonly affixPreviewOpenAffix = signal<'prefix' | 'suffix' | null>('prefix');
  protected readonly inputTagValue = signal('');
  protected readonly inputTagTags = signal<MbbizInputTagValue[]>([]);
  protected readonly inputTagObjectValue = signal('');
  protected readonly inputTagObjectTags = signal<MbbizInputTagValue[]>([
    { value: 'usd', label: 'USD' },
    { value: 'eur', label: 'EUR' },
  ]);
  protected readonly inputTagOverflowTags = signal<MbbizInputTagValue[]>([
    'alpha',
    'beta',
    'gamma',
    'delta',
    'epsilon',
  ]);
  protected readonly inputTagResponsiveTags = signal<MbbizInputTagValue[]>([
    'label 1',
    'label 2',
    'label 3',
    'label 4',
    'label 5',
  ]);
  protected readonly inputTagTokenValue = signal('');
  protected readonly inputTagTokenTags = signal<MbbizInputTagValue[]>([]);
  protected readonly inputTagValidatedValue = signal('');
  protected readonly inputTagValidatedTags = signal<MbbizInputTagValue[]>([]);
  protected readonly checkboxGroupValues = signal<(string | number)[]>(['a']);
  protected readonly checkboxGroupVerticalValues = signal<(string | number)[]>(['a']);
  protected readonly radioGroupValue = signal<string | number | null>('a');
  protected readonly radioGroupVerticalValue = signal<string | number | null>('a');

  protected setBasicInputValue(value: string) {
    this.basicInputValue.set(value);
  }

  protected setSearchValue(value: string) {
    this.searchValue.set(value);
  }

  protected setPasswordTypingValue(value: string) {
    this.passwordTypingValue.set(value);
  }

  protected setPasswordValue(value: string) {
    this.passwordValue.set(value);
  }

  protected setPasswordVisible(value: boolean) {
    this.passwordVisible.set(value);
  }

  protected setTextareaValue(value: string) {
    this.textareaValue.set(value);
  }

  protected setAffixPreviewPrefixValue(value: string | null) {
    this.affixPreviewPrefixValue.set(value);
  }

  protected setAffixPreviewOpenAffix(value: 'prefix' | 'suffix' | null) {
    this.affixPreviewOpenAffix.set(value);
  }

  protected setInputTagValue(value: string) {
    this.inputTagValue.set(value);
  }

  protected setInputTagTags(value: MbbizInputTagValue[]) {
    this.inputTagTags.set(value);
  }

  protected setInputTagObjectValue(value: string) {
    this.inputTagObjectValue.set(value);
  }

  protected setInputTagObjectTags(value: MbbizInputTagValue[]) {
    this.inputTagObjectTags.set(value);
  }

  protected setInputTagTokenValue(value: string) {
    this.inputTagTokenValue.set(value);
  }

  protected setInputTagTokenTags(value: MbbizInputTagValue[]) {
    this.inputTagTokenTags.set(value);
  }

  protected setInputTagValidatedValue(value: string) {
    this.inputTagValidatedValue.set(value);
  }

  protected setInputTagValidatedTags(value: MbbizInputTagValue[]) {
    this.inputTagValidatedTags.set(value);
  }

  protected setCheckboxGroupValues(value: (string | number)[]) {
    this.checkboxGroupValues.set(value);
  }

  protected setCheckboxGroupVerticalValues(value: (string | number)[]) {
    this.checkboxGroupVerticalValues.set(value);
  }

  protected setRadioGroupValue(value: string | number | null) {
    this.radioGroupValue.set(value);
  }

  protected setRadioGroupVerticalValue(value: string | number | null) {
    this.radioGroupVerticalValue.set(value);
  }

  protected readonly inputTagOverflowRender = (count: number) => `${count} More`;
  protected readonly inputTagResponsiveOverflowRender = (count: number) => `+${count} More`;

  protected readonly inputTagRenderTone = ({ value, label }: { value: string; label: string }) => {
    const toneMap: Record<string, 'brand' | 'warning' | 'success'> = {
      arcoblue: 'brand',
      orange: 'warning',
      lime: 'success',
    };

    return {
      label,
      tone: toneMap[value] ?? 'brand',
    };
  };

  protected readonly inputTagEmailValidate = (inputValue: string, tags: readonly MbbizInputTagValue[]) => {
    const candidate = inputValue.trim().toLowerCase();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate);
    const duplicated = tags.some((tag) => {
      if (typeof tag === 'string') {
        return tag === candidate;
      }

      return tag.value === candidate;
    });

    if (!candidate || !isEmail || duplicated) {
      return false;
    }

    return {
      value: candidate,
      label: candidate,
    };
  };
}
