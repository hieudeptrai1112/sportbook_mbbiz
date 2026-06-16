import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, inject, signal, type WritableSignal } from '@angular/core';
import {
  Sportbook6vnAffixInputComponent,
  Sportbook6vnAffixLabelInputComponent,
  Sportbook6vnBadgeComponent,
  type Sportbook6vnBadgeStatus,
  Sportbook6vnButtonComponent,
  Sportbook6vnButtonLinkComponent,
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
  Sportbook6vnMessageComponent,
  Sportbook6vnMessageService,
  type Sportbook6vnMessageType,
  Sportbook6vnModalComponent,
  Sportbook6vnPasswordInputComponent,
  Sportbook6vnPaginationComponent,
  type Sportbook6vnPaginationRangeFormatter,
  type Sportbook6vnPaginationSummaryFormatter,
  Sportbook6vnRadioComponent,
  Sportbook6vnRadioGroupComponent,
  Sportbook6vnSearchInputComponent,
  Sportbook6vnStepsComponent,
  Sportbook6vnStatusComponent,
  type Sportbook6vnStatusColor,
  type Sportbook6vnStatusPreset,
  Sportbook6vnSwitchComponent,
  Sportbook6vnTabComponent,
  Sportbook6vnTableComponent,
  type Sportbook6vnTableCellValueChange,
  type Sportbook6vnTableColumn,
  type Sportbook6vnTableRow,
  type Sportbook6vnTabItem,
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
    Sportbook6vnBadgeComponent,
    Sportbook6vnButtonComponent,
    Sportbook6vnButtonLinkComponent,
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
    Sportbook6vnMessageComponent,
    Sportbook6vnModalComponent,
    Sportbook6vnPasswordInputComponent,
    Sportbook6vnPaginationComponent,
    Sportbook6vnRadioComponent,
    Sportbook6vnRadioGroupComponent,
    Sportbook6vnSearchInputComponent,
    Sportbook6vnStepsComponent,
    Sportbook6vnStatusComponent,
    Sportbook6vnSwitchComponent,
    Sportbook6vnTabComponent,
    Sportbook6vnTableComponent,
    Sportbook6vnTextareaComponent,
    Sportbook6vnUploadFileComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Sportbook6vnPreviewAppComponent {
  private readonly message = inject(Sportbook6vnMessageService);
  private readonly tableColumnFileKinds: Sportbook6vnItemFileKind[] = ['xlsx', 'docx', 'pdf', 'jpg', 'xml'];
  private readonly tableColumnStatusTones = ['success', 'error', 'warning', 'neutral', 'info'] as const;

  protected readonly tablePrimitiveColumns: Sportbook6vnTableColumn[] = Array.from({ length: 5 }, (_, index) => ({
    key: `column${index + 1}`,
    title: 'Title',
    width: 170,
  }));

  protected readonly tablePrimitiveRows: Sportbook6vnTableRow[] = Array.from({ length: 4 }, (_, rowIndex) => ({
    id: `table-row-${rowIndex + 1}`,
    column1: 'Text',
    column2: 'Text',
    column3: 'Text',
    column4: 'Text',
    column5: 'Text',
  }));

  protected readonly tableDefaultColumns: Sportbook6vnTableColumn[] = [
    { key: 'accountType', title: 'Loại tài khoản', width: 150, sortable: true },
    { key: 'file', title: 'File', type: 'file', width: 100 },
    { key: 'status', title: 'Trạng thái', type: 'status', width: 145 },
    { key: 'amount', title: 'Số tiền', type: 'money', width: 150 },
    { key: 'action', title: 'Hành động', type: 'button', width: 124 },
  ];

  protected readonly tableDefaultRows: Sportbook6vnTableRow[] = [
    {
      id: 'account-1',
      accountType: 'Tài khoản thanh toán',
      file: { kind: 'xlsx', alt: 'Excel file' },
      status: { label: 'Hoạt động', tone: 'success' },
      amount: 1000000000,
      action: { label: 'Chi tiết' },
    },
    {
      id: 'account-2',
      accountType: 'Tài khoản tiết kiệm',
      file: { kind: 'docx', alt: 'Word file' },
      status: { label: 'Hết hiệu lực', tone: 'error' },
      amount: 52000000,
      action: { label: 'Chi tiết' },
    },
    {
      id: 'account-3',
      accountType: 'Tài khoản vay',
      file: { kind: 'pdf', alt: 'PDF file' },
      status: { label: 'Hoạt động', tone: 'success' },
      amount: 176500000,
      action: { label: 'Chi tiết' },
    },
  ];

  protected readonly tableSelectionColumns: Sportbook6vnTableColumn[] = [
    { key: 'selected', title: 'Title', type: 'checkbox', width: 132 },
    ...this.tableDefaultColumns,
  ];

  protected readonly tableSelectionRows = signal<Sportbook6vnTableRow[]>(
    this.tableDefaultRows.map((row, index) => ({
      ...row,
      id: `selection-${index + 1}`,
      selected: { label: 'Text', value: index === 1 },
    })),
  );

  protected readonly tableColumnTypeColumns: Sportbook6vnTableColumn[] = [
    { key: 'checkbox', title: 'Title', type: 'checkbox', width: 100 },
    { key: 'number', title: 'STT', type: 'number', width: 48 },
    { key: 'time', title: 'Ngày/Giờ', type: 'time', width: 134 },
    { key: 'referenceNumber', title: 'Số tham chiếu', type: 'reference-number', width: 160 },
    { key: 'paymentCode', title: 'Mã giao dịch', type: 'payment-code', width: 136 },
    { key: 'icon', title: 'Hành động', type: 'icon', width: 124 },
    { key: 'text', title: 'Loại tài khoản', width: 150 },
    { key: 'money', title: 'Số tiền', type: 'money', width: 150 },
    { key: 'moneyOut', title: 'Số tiền', type: 'money-out', width: 150 },
    { key: 'moneyIn', title: 'Số tiền', type: 'money-in', width: 150 },
    { key: 'currency', title: 'Loại tiền', type: 'currency', width: 104 },
    { key: 'file', title: 'File', type: 'file', width: 100 },
    { key: 'status', title: 'Trạng thái', type: 'status', width: 145 },
    { key: 'input', title: 'Hành động', type: 'input', width: 170, placeholder: 'Input text' },
    {
      key: 'dropdown',
      title: 'Hành động',
      type: 'dropdown',
      width: 170,
      placeholder: 'Lựa chọn',
      options: [
        { label: 'Tuỳ chọn 1', value: 'option-1' },
        { label: 'Tuỳ chọn 2', value: 'option-2' },
      ],
    },
    {
      key: 'pillAction',
      title: 'Hành động',
      type: 'button',
      width: 150,
      align: 'left',
      headerAlign: 'left',
      buttonVariant: 'secondary',
      buttonShape: 'pill',
      buttonSize: 'md',
    },
    { key: 'remind', title: '', type: 'remind', width: 56 },
  ];

  protected readonly tableAllColumnRows = signal<Sportbook6vnTableRow[]>(
    Array.from({ length: 5 }, (_, index) => this.createTableAllColumnRow(index)),
  );

  protected readonly tableFixedRightIconColumns: Sportbook6vnTableColumn[] = [
    { key: 'checkbox', title: 'Title', type: 'checkbox', width: 100 },
    { key: 'number', title: 'STT', type: 'number', width: 60 },
    { key: 'time', title: 'Ngày/Giờ', type: 'time', width: 150 },
    { key: 'referenceNumber', title: 'Số tham chiếu', type: 'reference-number', width: 170 },
    { key: 'paymentCode', title: 'Mã giao dịch', type: 'payment-code', width: 160 },
    { key: 'text', title: 'Loại tài khoản', width: 170 },
    { key: 'money', title: 'Số tiền', type: 'money', width: 160 },
    { key: 'moneyOut', title: 'Số tiền', type: 'money-out', width: 160 },
    { key: 'moneyIn', title: 'Số tiền', type: 'money-in', width: 160 },
    { key: 'currency', title: 'Loại tiền', type: 'currency', width: 120 },
    { key: 'file', title: 'File', type: 'file', width: 100 },
    { key: 'status', title: 'Trạng thái', type: 'status', width: 150 },
    { key: 'icon', title: 'Hành động', type: 'icon', width: 104, fixed: 'right' },
  ];

  protected readonly tableFixedRightIconRows: Sportbook6vnTableRow[] = Array.from({ length: 5 }, (_, index) => ({
    ...this.createTableAllColumnRow(index),
    id: `fixed-right-icon-${index + 1}`,
    icon: {
      icons: [{ icon: 'trash', label: `Xóa dòng ${index + 1}` }],
    },
  }));

  protected readonly tableSelectedRowKeys = signal<string[]>(['selection-2']);
  protected readonly tablePaginationIndex = signal(1);
  protected readonly paginationDropdownPage = signal(1);
  protected readonly paginationMaximumPage = signal(10);
  protected readonly paginationQuickPage = signal(23);
  protected readonly paginationDropdownOpen = signal(true);
  protected readonly paginationQuickSelectedRange: Sportbook6vnPaginationRangeFormatter = () =>
    'Đã hiển thị 91 - 100 trên 18000 kết quả';
  protected readonly paginationQuickDefaultRange: Sportbook6vnPaginationRangeFormatter = () =>
    'Đã hiển thị 1 - 10 trên 18000 kết quả';
  protected readonly paginationQuickMaximumRange: Sportbook6vnPaginationRangeFormatter = () =>
    'Đã hiển thị 17990 - 18000 trên 18000 kết quả';
  protected readonly paginationQuickSummary: Sportbook6vnPaginationSummaryFormatter = (summary) =>
    `Trang ${new Intl.NumberFormat('vi-VN').format(summary.pageIndex)} / ${new Intl.NumberFormat('vi-VN').format(summary.pageCount)}`;

  protected readonly messageCases: {
    type: Extract<Sportbook6vnMessageType, 'inform' | 'warning' | 'error' | 'success'>;
    content: string;
  }[] = [
    { type: 'inform', content: 'Informative inform.' },
    { type: 'warning', content: 'Warning inform with dismiss button.' },
    { type: 'error', content: 'Error inform with dismiss button.' },
    { type: 'success', content: 'Success inform with dismiss button.' },
  ];

  protected readonly tabPillActiveIndex = signal(0);
  protected readonly tabUnderlinedActiveIndex = signal(0);
  protected readonly tabSmallActiveIndex = signal(0);
  protected readonly tabDefaultItems: Sportbook6vnTabItem[] = [
    { label: 'Text' },
    { label: 'Text' },
    { label: 'Text' },
  ];
  protected readonly tabCountItems: Sportbook6vnTabItem[] = [
    { label: 'Text', count: 12 },
    { label: 'Text' },
    { label: 'Text', count: 12 },
  ];
  protected readonly tabDisabledItems: Sportbook6vnTabItem[] = [
    { label: 'Text' },
    { label: 'Text' },
    { label: 'Text', disabled: true },
  ];
  protected readonly stepProgressStates = [0, 1, 2, 3, 4];

  protected readonly badgeStatusCases: { status: Sportbook6vnBadgeStatus; label: string }[] = [
    { status: 'invalid', label: 'Text' },
    { status: 'overdue', label: 'Text' },
    { status: 'unfinished', label: 'Text' },
    { status: 'renew-loan', label: 'Text' },
    { status: 'pending', label: 'Text' },
    { status: 'completed', label: 'Text' },
    { status: 'failed', label: 'Text' },
  ];

  protected readonly statusColorCases: { color: Sportbook6vnStatusColor; label: string }[] = [
    { color: 'neutral', label: 'Text' },
    { color: 'orange', label: 'Text' },
    { color: 'blue', label: 'Text' },
    { color: 'dark-blue', label: 'Text' },
    { color: 'green', label: 'Text' },
    { color: 'red', label: 'Text' },
  ];

  protected readonly statusPresetCases: { status: Sportbook6vnStatusPreset; label: string }[] = [
    { status: 'invalid', label: 'Invalid' },
    { status: 'overdue', label: 'Approve ASAP' },
    { status: 'unfinished', label: 'Today' },
    { status: 'renew-loan', label: 'Renew Loan' },
    { status: 'pending', label: 'Processing' },
    { status: 'completed', label: 'Completed' },
    { status: 'failed', label: 'Failed Transfer' },
  ];

  protected showMessage(type: Sportbook6vnMessageType): void {
    const content = this.messageCases.find((item) => item.type === type)?.content ?? 'Informative inform.';
    this.message.create(type, content, {
      closable: type !== 'inform',
      duration: 5000,
      top: 32,
    });
  }

  protected clearMessages(): void {
    this.message.remove();
  }

  protected setTablePaginationIndex(value: number): void {
    this.tablePaginationIndex.set(value);
  }

  protected setPaginationDropdownPage(value: number): void {
    this.paginationDropdownPage.set(value);
  }

  protected setPaginationMaximumPage(value: number): void {
    this.paginationMaximumPage.set(value);
  }

  protected setPaginationQuickPage(value: number): void {
    this.paginationQuickPage.set(value);
  }

  protected setPaginationDropdownOpen(value: boolean): void {
    this.paginationDropdownOpen.set(value);
  }

  protected updateTableAllColumnCellValue(event: Sportbook6vnTableCellValueChange): void {
    this.updateTableRows(this.tableAllColumnRows, event);
  }

  protected updateTableSelectionCellValue(event: Sportbook6vnTableCellValueChange): void {
    this.updateTableRows(this.tableSelectionRows, event);
    this.syncTableSelectionKeys();
  }

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

  private createTableAllColumnRow(index: number): Sportbook6vnTableRow {
    const fileKind = this.tableColumnFileKinds[index % this.tableColumnFileKinds.length];
    const statusTone = this.tableColumnStatusTones[index % this.tableColumnStatusTones.length];

    return {
      id: `all-column-${index + 1}`,
      currency: 'VND',
      file: { kind: fileKind, alt: `${fileKind.toUpperCase()} file` },
      remind: { alt: 'Remind' },
      checkbox: { label: 'Text', value: index === 0 },
      number: index + 1,
      time: '10/07/2024 16:00',
      referenceNumber: '619835274089',
      paymentCode: 'FT890123456789',
      icon: {
        icons: [
          { icon: 'trash', label: `Xóa dòng ${index + 1}` },
          { icon: 'trash', label: `Xóa dòng ${index + 1}` },
          { icon: 'trash', label: `Xóa dòng ${index + 1}` },
        ],
      },
      pillAction: { label: 'Text', variant: 'secondary', shape: 'pill', size: 'md' },
      text: 'Tài khoản thanh toán',
      money: 1000000000,
      moneyOut: 1000000000,
      moneyIn: 1000000000,
      status: { label: 'Text', tone: statusTone },
      input: { placeholder: 'Input text' },
      dropdown: {
        value: null,
        placeholder: 'Lựa chọn',
        options: [
          { label: 'Tuỳ chọn 1', value: 'option-1' },
          { label: 'Tuỳ chọn 2', value: 'option-2' },
        ],
      },
    };
  }

  private updateTableRows(
    rowsSignal: WritableSignal<Sportbook6vnTableRow[]>,
    event: Sportbook6vnTableCellValueChange,
  ): void {
    rowsSignal.update((rows) =>
      rows.map((row, index) => {
        const rowKey = String(row['id'] ?? index);
        if (rowKey !== event.rowKey) {
          return row;
        }

        const currentValue = row[event.column.key];
        const currentObject = typeof currentValue === 'object' && currentValue !== null
          ? (currentValue as Record<string, unknown>)
          : {};

        return {
          ...row,
          [event.column.key]: {
            ...currentObject,
            value: event.nextValue,
          },
        };
      }),
    );
  }

  private syncTableSelectionKeys(): void {
    const selectedKeys = this.tableSelectionRows()
      .filter((row) => {
        const selected = row['selected'];
        return typeof selected === 'object' && selected !== null && 'value' in selected && !!selected.value;
      })
      .map((row, index) => String(row['id'] ?? index));

    this.tableSelectedRowKeys.set(selectedKeys);
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
