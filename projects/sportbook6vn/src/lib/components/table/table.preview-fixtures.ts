import type { Sportbook6vnItemFileKind } from '../item-file/item-file.types';
import type {
  Sportbook6vnTableColumn,
  Sportbook6vnTableRow,
  Sportbook6vnTableStatusTone,
} from './table.types';

const FILE_KINDS: readonly Sportbook6vnItemFileKind[] = ['xlsx', 'docx', 'pdf', 'jpg', 'xml'];
const STATUS_TONES: readonly Sportbook6vnTableStatusTone[] = [
  'success',
  'error',
  'warning',
  'neutral',
  'info',
];

export const TABLE_PREVIEW_PRIMITIVE_COLUMNS: readonly Sportbook6vnTableColumn[] = Array.from(
  { length: 5 },
  (_, index) => ({
    key: `column${index + 1}`,
    title: 'Title',
    width: 170,
  }),
);

export const TABLE_PREVIEW_PRIMITIVE_ROWS: readonly Sportbook6vnTableRow[] = Array.from(
  { length: 4 },
  (_, rowIndex) => ({
    id: `table-row-${rowIndex + 1}`,
    column1: 'Text',
    column2: 'Text',
    column3: 'Text',
    column4: 'Text',
    column5: 'Text',
  }),
);

export const TABLE_PREVIEW_DEFAULT_COLUMNS: readonly Sportbook6vnTableColumn[] = [
  { key: 'accountType', title: 'Loại tài khoản', width: 150, sortable: true },
  { key: 'file', title: 'File', type: 'file', width: 100 },
  { key: 'status', title: 'Trạng thái', type: 'status', width: 145 },
  { key: 'amount', title: 'Số tiền', type: 'money', width: 150 },
  { key: 'action', title: 'Hành động', type: 'button', width: 124 },
];

export const TABLE_PREVIEW_DEFAULT_ROWS: readonly Sportbook6vnTableRow[] = [
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

export const TABLE_PREVIEW_SELECTION_COLUMNS: readonly Sportbook6vnTableColumn[] = [
  { key: 'selected', title: 'Title', type: 'checkbox', width: 132 },
  ...TABLE_PREVIEW_DEFAULT_COLUMNS,
];

export const createTablePreviewSelectionRows = (): Sportbook6vnTableRow[] =>
  TABLE_PREVIEW_DEFAULT_ROWS.map((row, index) => ({
    ...row,
    id: `selection-${index + 1}`,
    selected: { label: 'Text', value: index === 1 },
  }));

export const TABLE_PREVIEW_ALL_COLUMNS: readonly Sportbook6vnTableColumn[] = [
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

export const createTablePreviewAllColumnRow = (index: number): Sportbook6vnTableRow => {
  const fileKind = FILE_KINDS[index % FILE_KINDS.length];
  const statusTone = STATUS_TONES[index % STATUS_TONES.length];

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
};

export const createTablePreviewAllColumnRows = (): Sportbook6vnTableRow[] =>
  Array.from({ length: 5 }, (_, index) => createTablePreviewAllColumnRow(index));

export const TABLE_PREVIEW_FIXED_RIGHT_COLUMNS: readonly Sportbook6vnTableColumn[] = [
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

export const createTablePreviewFixedRightRows = (): Sportbook6vnTableRow[] =>
  Array.from({ length: 5 }, (_, index) => ({
    ...createTablePreviewAllColumnRow(index),
    id: `fixed-right-icon-${index + 1}`,
    icon: {
      icons: [{ icon: 'trash', label: `Xóa dòng ${index + 1}` }],
    },
  }));
