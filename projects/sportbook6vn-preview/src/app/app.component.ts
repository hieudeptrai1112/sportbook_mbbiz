import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  Sportbook6vnAffixInputComponent,
  Sportbook6vnAffixLabelInputComponent,
  Sportbook6vnButtonComponent,
  Sportbook6vnCheckboxComponent,
  Sportbook6vnCheckboxGroupComponent,
  Sportbook6vnDatepickerComponent,
  Sportbook6vnDropdownComponent,
  Sportbook6vnDropdownTagComponent,
  Sportbook6vnFloatingLabelInputComponent,
  Sportbook6vnInputComponent,
  Sportbook6vnInputTagComponent,
  Sportbook6vnInputTagValue,
  Sportbook6vnItemFileComponent,
  Sportbook6vnItemUploadComponent,
  type Sportbook6vnItemFileErrorType,
  type Sportbook6vnItemFileKind,
  Sportbook6vnModalComponent,
  Sportbook6vnPasswordInputComponent,
  Sportbook6vnRadioComponent,
  Sportbook6vnRadioGroupComponent,
  Sportbook6vnSearchInputComponent,
  Sportbook6vnSwitchComponent,
  Sportbook6vnTextareaComponent,
  Sportbook6vnUploadFileComponent,
  Sportbook6vnUploadFileItem,
} from 'sportbook6vn';

@Component({
  selector: 'sportbook6vn-preview-root',
  imports: [
    CommonModule,
    Sportbook6vnAffixInputComponent,
    Sportbook6vnAffixLabelInputComponent,
    Sportbook6vnButtonComponent,
    Sportbook6vnCheckboxComponent,
    Sportbook6vnCheckboxGroupComponent,
    Sportbook6vnDatepickerComponent,
    Sportbook6vnDropdownComponent,
    Sportbook6vnDropdownTagComponent,
    Sportbook6vnFloatingLabelInputComponent,
    Sportbook6vnInputComponent,
    Sportbook6vnInputTagComponent,
    Sportbook6vnItemFileComponent,
    Sportbook6vnItemUploadComponent,
    Sportbook6vnModalComponent,
    Sportbook6vnPasswordInputComponent,
    Sportbook6vnRadioComponent,
    Sportbook6vnRadioGroupComponent,
    Sportbook6vnSearchInputComponent,
    Sportbook6vnSwitchComponent,
    Sportbook6vnTextareaComponent,
    Sportbook6vnUploadFileComponent,
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

  protected readonly uploadFilesDone: Sportbook6vnUploadFileItem[] = [
    { uid: 'upload-done-1', name: 'Tên tệp tin.pdf', sizeLabel: '2 MB', fileKind: 'pdf' },
    { uid: 'upload-done-2', name: 'Tên tệp tin.docx', sizeLabel: '2 MB', fileKind: 'docx' },
    { uid: 'upload-done-3', name: 'Tên tệp tin.xlsx', sizeLabel: '2 MB', fileKind: 'xlsx' },
  ];

  protected readonly uploadFilesExpanded: Sportbook6vnUploadFileItem[] = [
    { uid: 'upload-expanded-1', name: 'Tên tệp tin.pdf', sizeLabel: '2 MB', fileKind: 'pdf' },
    { uid: 'upload-expanded-2', name: 'Tên tệp tin.docx', sizeLabel: '2 MB', fileKind: 'docx' },
    { uid: 'upload-expanded-3', name: 'Tên tệp tin.xlsx', sizeLabel: '2 MB', fileKind: 'xlsx' },
    { uid: 'upload-expanded-4', name: 'Tên tệp tin.jpg', sizeLabel: '2 MB', fileKind: 'jpg' },
  ];

  protected readonly uploadFilesLoading: Sportbook6vnUploadFileItem[] = [
    { uid: 'upload-loading-1', name: 'Tên tệp tin.pdf', sizeLabel: '2 MB', fileKind: 'pdf', status: 'uploading', percent: 42 },
    { uid: 'upload-loading-2', name: 'Tên tệp tin.xlsx', sizeLabel: '2 MB', fileKind: 'xlsx', status: 'uploading', percent: 86 },
  ];

  protected readonly uploadFilesError: Sportbook6vnUploadFileItem[] = [
    {
      uid: 'upload-error-1',
      name: 'Tên tệp tin.xlsx',
      sizeLabel: '2 MB',
      fileKind: 'xlsx',
      status: 'error',
      errorType: 'size',
      errorMessage: 'File tải lên vượt quá dung lượng cho phép',
    },
    {
      uid: 'upload-error-2',
      name: 'Tên tệp tin.xml',
      sizeLabel: '2 MB',
      fileKind: 'xml',
      status: 'error',
      errorType: 'format',
      errorMessage: 'File tải lên không đúng định dạng. Vui lòng kiểm tra và tải lại',
    },
  ];

  protected readonly uploadFileTypes: Sportbook6vnUploadFileItem[] = [
    { uid: 'upload-type-xlsx', name: 'Tên tệp tin.xlsx', sizeLabel: '2 MB', fileKind: 'xlsx', downloadable: true },
    { uid: 'upload-type-docx', name: 'Tên tệp tin.docx', sizeLabel: '2 MB', fileKind: 'docx', downloadable: true },
    { uid: 'upload-type-pdf', name: 'Tên tệp tin.pdf', sizeLabel: '2 MB', fileKind: 'pdf', downloadable: true },
    { uid: 'upload-type-jpg', name: 'Tên tệp tin.jpg', sizeLabel: '2 MB', fileKind: 'jpg', downloadable: true },
    { uid: 'upload-type-xml', name: 'Tên tệp tin.xml', sizeLabel: '2 MB', fileKind: 'xml', downloadable: true },
  ];

  protected readonly itemFileKinds: { kind: Sportbook6vnItemFileKind; name: string }[] = [
    { kind: 'xlsx', name: 'Tên tệp tin.xlsx' },
    { kind: 'docx', name: 'Tên tệp tin.docx' },
    { kind: 'pdf', name: 'Tên tệp tin.pdf' },
    { kind: 'jpg', name: 'Tên tệp tin.jpg' },
    { kind: 'xml', name: 'Tên tệp tin.xml' },
  ];

  protected readonly itemFileLoadingKinds = this.itemFileKinds.map((item, index) => ({
    ...item,
    percent: [72, 54, 38, 80, 46][index],
  }));

  protected readonly itemFileErrorCases: {
    kind: Sportbook6vnItemFileKind;
    name: string;
    errorType: Sportbook6vnItemFileErrorType;
  }[] = [
    { kind: 'xlsx', name: 'Tên tệp tin.xlsx', errorType: 'size' },
    { kind: 'pdf', name: 'Tên tệp tin.pdf', errorType: 'upload' },
    { kind: 'error', name: 'Tên tệp tin.xml', errorType: 'format' },
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
  protected readonly draftBasicInputValue = signal('');
  protected readonly draftAffixInputValue = signal('');
  protected readonly draftSearchValue = signal('');
  protected readonly draftPasswordValue = signal('');
  protected readonly draftPasswordVisible = signal(false);
  protected readonly draftTextareaValue = signal('');
  protected readonly draftFloatingLabelValue = signal('');
  protected readonly draftAffixLabelValue = signal('');
  protected readonly draftAffixLabelPrefixValue = signal<string | null>(null);
  protected readonly inputTagValue = signal('');
  protected readonly inputTagTags = signal<Sportbook6vnInputTagValue[]>([]);
  protected readonly draftInputTagValue = signal('');
  protected readonly draftInputTagTags = signal<Sportbook6vnInputTagValue[]>([]);
  protected readonly draftInputTagValidatedValue = signal('');
  protected readonly draftInputTagValidatedTags = signal<Sportbook6vnInputTagValue[]>([]);
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
  protected readonly checkboxSelectAllValues = signal<(string | number)[]>(['a']);
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

  protected setDraftBasicInputValue(value: string) {
    this.draftBasicInputValue.set(value);
  }

  protected setDraftAffixInputValue(value: string) {
    this.draftAffixInputValue.set(value);
  }

  protected setDraftSearchValue(value: string) {
    this.draftSearchValue.set(value);
  }

  protected setDraftPasswordValue(value: string) {
    this.draftPasswordValue.set(value);
  }

  protected setDraftPasswordVisible(value: boolean) {
    this.draftPasswordVisible.set(value);
  }

  protected setDraftTextareaValue(value: string) {
    this.draftTextareaValue.set(value);
  }

  protected setDraftFloatingLabelValue(value: string) {
    this.draftFloatingLabelValue.set(value);
  }

  protected setDraftAffixLabelValue(value: string) {
    this.draftAffixLabelValue.set(value);
  }

  protected setDraftAffixLabelPrefixValue(value: string | null) {
    this.draftAffixLabelPrefixValue.set(value);
  }

  protected setInputTagValue(value: string) {
    this.inputTagValue.set(value);
  }

  protected setInputTagTags(value: Sportbook6vnInputTagValue[]) {
    this.inputTagTags.set(value);
  }

  protected setDraftInputTagValue(value: string) {
    this.draftInputTagValue.set(value);
  }

  protected setDraftInputTagTags(value: Sportbook6vnInputTagValue[]) {
    this.draftInputTagTags.set(value);
  }

  protected setDraftInputTagValidatedValue(value: string) {
    this.draftInputTagValidatedValue.set(value);
  }

  protected setDraftInputTagValidatedTags(value: Sportbook6vnInputTagValue[]) {
    this.draftInputTagValidatedTags.set(value);
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

  protected setCheckboxSelectAllValues(value: (string | number)[]) {
    this.checkboxSelectAllValues.set(value);
  }

  protected setCheckboxSelectAll(checked: boolean) {
    this.checkboxSelectAllValues.set(checked ? this.checkboxGroupOptions.map((option) => option.value) : []);
  }

  protected isCheckboxSelectAllChecked() {
    return this.checkboxSelectAllValues().length === this.checkboxGroupOptions.length;
  }

  protected isCheckboxSelectAllIndeterminate() {
    const selectedCount = this.checkboxSelectAllValues().length;
    return selectedCount > 0 && selectedCount < this.checkboxGroupOptions.length;
  }

  protected setRadioGroupValue(value: string | number | null) {
    this.radioGroupValue.set(value);
  }

  protected setRadioGroupVerticalValue(value: string | number | null) {
    this.radioGroupVerticalValue.set(value);
  }

  protected readonly inputTagOverflowRender = (count: number) => `${count} More`;
  protected readonly inputTagResponsiveOverflowRender = (count: number) => `+${count} More`;

  protected readonly downloadPreviewUploadFile = (file: Sportbook6vnUploadFileItem): void => {
    this.downloadPreviewFile(file.name);
  };

  protected downloadPreviewItemFile(file: { name: string }): void {
    this.downloadPreviewFile(file.name);
  }

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

  private downloadPreviewFile(fileName: string): void {
    const blob = new Blob([`Sportbook6vn preview download: ${fileName}\n`], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

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
