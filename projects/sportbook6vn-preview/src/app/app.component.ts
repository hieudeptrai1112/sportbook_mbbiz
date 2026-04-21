import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  Sportbook6vnAffixLabelInputComponent,
  Sportbook6vnButtonComponent,
  Sportbook6vnCheckboxComponent,
  Sportbook6vnCheckboxGroupComponent,
  Sportbook6vnDropdownComponent,
  Sportbook6vnDropdownTagComponent,
  Sportbook6vnFloatingLabelInputComponent,
  Sportbook6vnInputComponent,
  Sportbook6vnInputTagComponent,
  Sportbook6vnInputTagValue,
  Sportbook6vnModalComponent,
  Sportbook6vnPasswordInputComponent,
  Sportbook6vnRadioComponent,
  Sportbook6vnRadioGroupComponent,
  Sportbook6vnSearchInputComponent,
  Sportbook6vnTextareaComponent,
} from 'sportbook6vn';

@Component({
  selector: 'sportbook6vn-preview-root',
  imports: [
    CommonModule,
    Sportbook6vnAffixLabelInputComponent,
    Sportbook6vnButtonComponent,
    Sportbook6vnCheckboxComponent,
    Sportbook6vnCheckboxGroupComponent,
    Sportbook6vnDropdownComponent,
    Sportbook6vnDropdownTagComponent,
    Sportbook6vnFloatingLabelInputComponent,
    Sportbook6vnInputComponent,
    Sportbook6vnInputTagComponent,
    Sportbook6vnModalComponent,
    Sportbook6vnPasswordInputComponent,
    Sportbook6vnRadioComponent,
    Sportbook6vnRadioGroupComponent,
    Sportbook6vnSearchInputComponent,
    Sportbook6vnTextareaComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Sportbook6vnPreviewAppComponent {
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
  protected readonly affixSlotInputValue = signal('Input text');
  protected readonly searchValue = signal('');
  protected readonly passwordInteractiveValue = signal('');
  protected readonly passwordVisible = signal(false);
  protected readonly textareaValue = signal('Input text');
  protected readonly floatingLabelValue = signal('');
  protected readonly affixPreviewPrefixValue = signal<string | null>(null);
  protected readonly affixPreviewOpenAffix = signal<'prefix' | 'suffix' | null>('prefix');
  protected readonly affixInputValue = signal('');
  protected readonly inputTagValue = signal('');
  protected readonly inputTagTags = signal<Sportbook6vnInputTagValue[]>([]);
  protected readonly inputTagOverflowTags = signal<Sportbook6vnInputTagValue[]>([
    'alpha',
    'beta',
    'gamma',
    'delta',
    'epsilon',
  ]);
  protected readonly inputTagResponsiveTags = signal<Sportbook6vnInputTagValue[]>([
    'label 1',
    'label 2',
    'label 3',
    'label 4',
    'label 5',
  ]);
  protected readonly inputTagValidatedValue = signal('');
  protected readonly inputTagValidatedTags = signal<Sportbook6vnInputTagValue[]>([]);
  protected readonly checkboxGroupValues = signal<(string | number)[]>(['a']);
  protected readonly checkboxGroupVerticalValues = signal<(string | number)[]>(['a']);
  protected readonly radioGroupValue = signal<string | number | null>('a');
  protected readonly radioGroupVerticalValue = signal<string | number | null>('a');

  protected setBasicInputValue(value: string) {
    this.basicInputValue.set(value);
  }

  protected setAffixSlotInputValue(value: string) {
    this.affixSlotInputValue.set(value);
  }

  protected setSearchValue(value: string) {
    this.searchValue.set(value);
  }

  protected setPasswordInteractiveValue(value: string) {
    this.passwordInteractiveValue.set(value);
  }

  protected setPasswordVisible(value: boolean) {
    this.passwordVisible.set(value);
  }

  protected setTextareaValue(value: string) {
    this.textareaValue.set(value);
  }

  protected setFloatingLabelValue(value: string) {
    this.floatingLabelValue.set(value);
  }

  protected setAffixPreviewPrefixValue(value: string | null) {
    this.affixPreviewPrefixValue.set(value);
  }

  protected setAffixPreviewOpenAffix(value: 'prefix' | 'suffix' | null) {
    this.affixPreviewOpenAffix.set(value);
  }

  protected setAffixInputValue(value: string) {
    this.affixInputValue.set(value);
  }

  protected setInputTagValue(value: string) {
    this.inputTagValue.set(value);
  }

  protected setInputTagTags(value: Sportbook6vnInputTagValue[]) {
    this.inputTagTags.set(value);
  }

  protected setInputTagValidatedValue(value: string) {
    this.inputTagValidatedValue.set(value);
  }

  protected setInputTagValidatedTags(value: Sportbook6vnInputTagValue[]) {
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

  protected readonly inputTagEmailValidate = (inputValue: string, tags: readonly Sportbook6vnInputTagValue[]) => {
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
