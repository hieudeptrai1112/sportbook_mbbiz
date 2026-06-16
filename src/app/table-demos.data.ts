export type TableDemoVariant =
  | 'basic'
  | 'all-columns'
  | 'fixed-right-icon'
  | 'default'
  | 'selection-pagination'
  | 'state';

export interface TableDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  variant: TableDemoVariant;
  snippetTs: string;
}

export interface TableApiRow {
  property: string;
  description: string;
  type: string;
  defaultValue: string;
}

export interface TableVariableRow {
  token: string;
  value: string;
  appliesTo: string;
  notes: string;
}

export interface TableVariableGroup {
  title: string;
  rows: TableVariableRow[];
}

export const TABLE_DEMO_SECTIONS: TableDemoSection[] = [
  {
    id: 'basic',
    title: 'Basic Table',
    description: 'Five fixed columns, one header row, and four 64px body rows from the Figma table node.',
    tags: ['selector=sportbook6vn-table', 'use-case=basic', 'rows=4'],
    variant: 'basic',
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnTableComponent, type Sportbook6vnTableColumn, type Sportbook6vnTableRow } from 'sportbook6vn';

@Component({
  selector: 'app-table-basic-demo',
  standalone: true,
  imports: [Sportbook6vnTableComponent],
  template: \`
    <sportbook6vn-table
      ariaLabel="Basic account table"
      [columns]="columns"
      [data]="rows"
      [tableLayout]="'fixed'"
    />
  \`,
})
export class TableBasicDemoComponent {
  readonly columns: Sportbook6vnTableColumn[] = Array.from({ length: 5 }, (_, index) => ({
    key: \`column\${index + 1}\`,
    title: 'Title',
    width: 170,
  }));

  readonly rows: Sportbook6vnTableRow[] = Array.from({ length: 4 }, (_, rowIndex) => ({
    id: \`row-\${rowIndex + 1}\`,
    column1: 'Text',
    column2: 'Text',
    column3: 'Text',
    column4: 'Text',
    column5: 'Text',
  }));
}`,
  },
  {
    id: 'all-columns',
    title: 'All Columns Table',
    description: 'Basic table mode with all Figma column definitions and existing table cell renderers.',
    tags: ['selector=sportbook6vn-table', 'columns=all', 'rows=5'],
    variant: 'all-columns',
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnTableComponent, type Sportbook6vnTableColumn, type Sportbook6vnTableRow } from 'sportbook6vn';

@Component({
  selector: 'app-table-all-columns-demo',
  standalone: true,
  imports: [Sportbook6vnTableComponent],
  template: \`
    <sportbook6vn-table
      ariaLabel="All column account table"
      [columns]="columns"
      [data]="rows"
      [tableLayout]="'fixed'"
      (cellValueChange)="onCellValueChange($event)"
    />
  \`,
})
export class TableAllColumnsDemoComponent {
  readonly columns: Sportbook6vnTableColumn[] = [
    { key: 'selected', title: 'Title', type: 'checkbox', width: 118 },
    { key: 'index', title: 'STT', type: 'number', width: 78 },
    { key: 'createdAt', title: 'Ngày/Giờ', type: 'time', width: 170 },
    { key: 'referenceNumber', title: 'Số tham chiếu', type: 'reference-number', width: 190 },
    { key: 'paymentCode', title: 'Mã giao dịch', type: 'payment-code', width: 170 },
    { key: 'actions', title: 'Hành động', type: 'icon', width: 160 },
    { key: 'accountType', title: 'Loại tài khoản', width: 190 },
    { key: 'amount', title: 'Số tiền', type: 'money', align: 'right', headerAlign: 'right', width: 180 },
    { key: 'moneyOut', title: 'Số tiền', type: 'money-out', align: 'right', headerAlign: 'right', width: 180 },
    { key: 'moneyIn', title: 'Số tiền', type: 'money-in', align: 'right', headerAlign: 'right', width: 180 },
    { key: 'currency', title: 'Loại tiền', type: 'currency', width: 150 },
    { key: 'file', title: 'File', type: 'file', width: 120 },
    { key: 'status', title: 'Trạng thái', type: 'status', width: 150 },
    { key: 'input', title: 'Hành động', type: 'input', width: 220, placeholder: 'Input text' },
    { key: 'dropdown', title: 'Hành động', type: 'dropdown', width: 220, placeholder: 'Lựa chọn' },
    { key: 'remind', title: '', type: 'remind', align: 'right', headerAlign: 'right', width: 96 },
  ];

  readonly rows: Sportbook6vnTableRow[] = Array.from({ length: 5 }, (_, index) => ({
    id: \`row-\${index + 1}\`,
    selected: { label: 'Text', value: index === 0 },
    index: index + 1,
    createdAt: '10/07/2024 16:00',
    referenceNumber: '619835274089',
    paymentCode: 'FT890123456789',
    actions: { icons: [{ icon: 'trash' }, { icon: 'trash' }, { icon: 'trash' }] },
    accountType: 'Tài khoản thanh toán',
    amount: 1000000000,
    moneyOut: -1000000000,
    moneyIn: 1000000000,
    currency: { code: 'VND', label: 'VND' },
    file: { kind: ['xlsx', 'docx', 'pdf', 'jpg', 'xml'][index] as 'xlsx' | 'docx' | 'pdf' | 'jpg' | 'xml' },
    status: { label: 'Text', tone: ['success', 'error', 'warning', 'neutral', 'info'][index] as 'success' | 'error' | 'warning' | 'neutral' | 'info' },
    input: { placeholder: 'Input text' },
    dropdown: { placeholder: 'Lựa chọn', options: [{ label: 'Lựa chọn 1', value: '1' }] },
    remind: {},
  }));

  onCellValueChange(): void {}
}`,
  },
  {
    id: 'fixed-right-icon',
    title: 'Fixed Right Icon Column',
    description: 'Horizontal scroll keeps one icon action column fixed on the right edge.',
    tags: ['selector=sportbook6vn-table', 'fixed=right', 'column=icon'],
    variant: 'fixed-right-icon',
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnTableComponent, type Sportbook6vnTableColumn, type Sportbook6vnTableRow } from 'sportbook6vn';

@Component({
  selector: 'app-table-fixed-right-icon-demo',
  standalone: true,
  imports: [Sportbook6vnTableComponent],
  template: \`
    <sportbook6vn-table
      ariaLabel="Fixed right icon action table"
      [columns]="columns"
      [data]="rows"
      [tableLayout]="'fixed'"
    />
  \`,
})
export class TableFixedRightIconDemoComponent {
  readonly columns: Sportbook6vnTableColumn[] = [
    { key: 'referenceNumber', title: 'Số tham chiếu', type: 'reference-number', width: 190 },
    { key: 'paymentCode', title: 'Mã giao dịch', type: 'payment-code', width: 170 },
    { key: 'amount', title: 'Số tiền', type: 'money', align: 'right', headerAlign: 'right', width: 180 },
    { key: 'moneyOut', title: 'Số tiền', type: 'money-out', align: 'right', headerAlign: 'right', width: 180 },
    { key: 'moneyIn', title: 'Số tiền', type: 'money-in', align: 'right', headerAlign: 'right', width: 180 },
    { key: 'action', title: 'Hành động', type: 'icon', fixed: 'right', align: 'center', headerAlign: 'center', width: 120 },
  ];

  readonly rows: Sportbook6vnTableRow[] = Array.from({ length: 5 }, (_, index) => ({
    id: \`fixed-row-\${index + 1}\`,
    referenceNumber: '619835274089',
    paymentCode: 'FT890123456789',
    amount: 1000000000,
    moneyOut: -1000000000,
    moneyIn: 1000000000,
    action: { icon: 'trash', label: 'Xóa' },
  }));
}`,
  },
  {
    id: 'default',
    title: 'Default',
    description: 'Baseline table with header cells, 64px rows, Figma divider color, and primary column types.',
    tags: ['selector=sportbook6vn-table', 'mode=default'],
    variant: 'default',
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnTableComponent, type Sportbook6vnTableColumn, type Sportbook6vnTableRow } from 'sportbook6vn';

@Component({
  selector: 'app-table-default-demo',
  standalone: true,
  imports: [Sportbook6vnTableComponent],
  template: \`
    <sportbook6vn-table
      ariaLabel="Default account table"
      [columns]="columns"
      [data]="rows"
    />
  \`,
})
export class TableDefaultDemoComponent {
  readonly columns: Sportbook6vnTableColumn[] = [
    { key: 'accountType', title: 'Loại tài khoản', sortable: true },
    { key: 'file', title: 'File', type: 'file' },
    { key: 'status', title: 'Trạng thái', type: 'status' },
    { key: 'amount', title: 'Số tiền', type: 'money', align: 'right', headerAlign: 'right' },
    { key: 'action', title: 'Hành động', type: 'reference-number' },
  ];

  readonly rows: Sportbook6vnTableRow[] = [
    { id: '1', accountType: 'Tài khoản thanh toán', file: { kind: 'xlsx' }, status: { label: 'Hoạt động', tone: 'success' }, amount: 1000000000, action: 'Chi tiết' },
    { id: '2', accountType: 'Tài khoản tiết kiệm', file: { kind: 'docx' }, status: { label: 'Hết hiệu lực', tone: 'error' }, amount: 52000000, action: 'Chi tiết' },
    { id: '3', accountType: 'Tài khoản vay', file: { kind: 'pdf' }, status: { label: 'Hoạt động', tone: 'success' }, amount: 176500000, action: 'Chi tiết' },
  ];
}`,
  },
  {
    id: 'selection-pagination',
    title: 'Selection and Pagination',
    description: 'Row selection follows the checked and indeterminate pattern while pagination keeps data scoped.',
    tags: ['selector=sportbook6vn-table', 'selection=true', 'pagination=true'],
    variant: 'selection-pagination',
    snippetTs: `import { Component, signal } from '@angular/core';
import { Sportbook6vnTableComponent, type Sportbook6vnTableColumn, type Sportbook6vnTableRow } from 'sportbook6vn';

@Component({
  selector: 'app-table-selection-pagination-demo',
  standalone: true,
  imports: [Sportbook6vnTableComponent],
  template: \`
    <sportbook6vn-table
      ariaLabel="Selectable account table"
      [columns]="columns"
      [data]="rows"
      [selectable]="true"
      [selectedRowKeys]="selectedRowKeys()"
      [showPagination]="true"
      [pageSize]="2"
      [pageIndex]="pageIndex()"
      (selectedRowKeysChange)="selectedRowKeys.set($event)"
      (pageIndexChange)="pageIndex.set($event)"
    />
  \`,
})
export class TableSelectionPaginationDemoComponent {
  readonly pageIndex = signal(1);
  readonly selectedRowKeys = signal<string[]>(['2']);

  readonly columns: Sportbook6vnTableColumn[] = [
    { key: 'accountType', title: 'Loại tài khoản', sortable: true },
    { key: 'file', title: 'File', type: 'file' },
    { key: 'status', title: 'Trạng thái', type: 'status' },
    { key: 'amount', title: 'Số tiền', type: 'money', align: 'right', headerAlign: 'right' },
    { key: 'action', title: 'Hành động', type: 'reference-number' },
  ];

  readonly rows: Sportbook6vnTableRow[] = [
    { id: '1', accountType: 'Tài khoản thanh toán', file: { kind: 'xlsx' }, status: { label: 'Hoạt động', tone: 'success' }, amount: 1000000000, action: 'Chi tiết' },
    { id: '2', accountType: 'Tài khoản tiết kiệm', file: { kind: 'docx' }, status: { label: 'Hết hiệu lực', tone: 'error' }, amount: 52000000, action: 'Chi tiết' },
    { id: '3', accountType: 'Tài khoản vay', file: { kind: 'pdf' }, status: { label: 'Hoạt động', tone: 'success' }, amount: 176500000, action: 'Chi tiết' },
    { id: '4', accountType: 'Tài khoản doanh nghiệp', file: { kind: 'jpg' }, status: { label: 'Hoạt động', tone: 'success' }, amount: 280000000, action: 'Chi tiết' },
  ];
}`,
  },
  {
    id: 'state',
    title: 'State',
    description: 'Loading and empty states keep the same table shell.',
    tags: ['selector=sportbook6vn-table', 'state=loading/empty'],
    variant: 'state',
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnTableComponent, type Sportbook6vnTableColumn, type Sportbook6vnTableRow } from 'sportbook6vn';

@Component({
  selector: 'app-table-state-demo',
  standalone: true,
  imports: [Sportbook6vnTableComponent],
  template: \`
    <sportbook6vn-table
      ariaLabel="Loading table"
      [columns]="columns"
      [data]="rows"
      [loading]="true"
    />

    <sportbook6vn-table
      ariaLabel="Empty table"
      [columns]="columns"
      [data]="[]"
      emptyText="Không có dữ liệu"
    />
  \`,
})
export class TableStateDemoComponent {
  readonly columns: Sportbook6vnTableColumn[] = [
    { key: 'accountType', title: 'Loại tài khoản' },
    { key: 'status', title: 'Trạng thái', type: 'status' },
    { key: 'amount', title: 'Số tiền', type: 'money', align: 'right', headerAlign: 'right' },
  ];

  readonly rows: Sportbook6vnTableRow[] = [
    { id: '1', accountType: 'Tài khoản thanh toán', status: { label: 'Hoạt động', tone: 'success' }, amount: 1000000000 },
  ];
}`,
  },
];

export const TABLE_API_ROWS: TableApiRow[] = [
  { property: 'columns', description: 'Column definitions for header, cell type, alignment, width, sorting, and fixed column behavior.', type: 'readonly Sportbook6vnTableColumn[]', defaultValue: '[]' },
  { property: 'data', description: 'Table row records. Each key maps to a column key and may be a primitive or typed cell object.', type: 'readonly Sportbook6vnTableRow[]', defaultValue: '[]' },
  { property: 'rowKey', description: 'Record key used for selection, row tracking, and emitted row events.', type: 'string', defaultValue: "'id'" },
  { property: 'ariaLabel', description: 'Accessible label for the table region.', type: 'string', defaultValue: "'Data table'" },
  { property: 'size', description: 'Controls row density.', type: "'default' | 'compact'", defaultValue: "'default'" },
  { property: 'loading', description: 'Shows the loading state inside the table shell.', type: 'boolean', defaultValue: 'false' },
  { property: 'showHeader', description: 'Toggles table header visibility.', type: 'boolean', defaultValue: 'true' },
  { property: 'selectable', description: 'Adds a leading checkbox column with select-all behavior.', type: 'boolean', defaultValue: 'false' },
  { property: 'selectedRowKeys', description: 'Controlled selected row keys for checkbox selection.', type: 'readonly string[]', defaultValue: '[]' },
  { property: 'showPagination', description: 'Renders sportbook6vn pagination below the table and scopes visible data to the active page.', type: 'boolean', defaultValue: 'false' },
  { property: 'pageIndex', description: 'Controlled one-based active page index.', type: 'number', defaultValue: '1' },
  { property: 'pageSize', description: 'Number of rows per page when pagination is enabled.', type: 'number', defaultValue: '10' },
  { property: 'emptyText', description: 'Text shown when data is empty and loading is false.', type: 'string', defaultValue: "'Không có dữ liệu'" },
  { property: 'tableLayout', description: 'Native table layout strategy.', type: "'auto' | 'fixed'", defaultValue: "'auto'" },
  { property: 'maxHeight', description: 'Optional vertical max height for the table viewport.', type: 'string | null', defaultValue: 'null' },
  { property: 'illustrationBasePath', description: 'Base path used by file cells to resolve file illustration assets.', type: 'string', defaultValue: 'item-file asset path' },
  { property: 'tableIllustrationBasePath', description: 'Base path used by currency and remind table illustration assets.', type: 'string', defaultValue: 'table asset path' },
];

export const TABLE_OUTPUT_ROWS: TableApiRow[] = [
  { property: 'selectedRowKeysChange', description: 'Emits selected row keys after row or header checkbox changes.', type: 'output<string[]>', defaultValue: '-' },
  { property: 'rowClick', description: 'Emits row metadata when a table row is clicked.', type: 'output<Sportbook6vnTableRowEvent>', defaultValue: '-' },
  { property: 'cellClick', description: 'Emits row, column, and value metadata when a cell is clicked.', type: 'output<Sportbook6vnTableCellEvent>', defaultValue: '-' },
  { property: 'cellValueChange', description: 'Emits when checkbox, input, dropdown, button, icon, or link-style cells change or trigger an action.', type: 'output<Sportbook6vnTableCellValueChange>', defaultValue: '-' },
  { property: 'sortChange', description: 'Emits active column and order after a sortable header is toggled.', type: 'output<Sportbook6vnTableSortChange>', defaultValue: '-' },
  { property: 'pageIndexChange', description: 'Emits one-based page index after pagination changes.', type: 'output<number>', defaultValue: '-' },
];

export const TABLE_TYPE_ROWS: TableApiRow[] = [
  { property: 'Sportbook6vnTableColumn', description: 'Column configuration object: key, title, type, width, align, headerAlign, fixed, sortable, options, and button metadata.', type: 'interface', defaultValue: '-' },
  { property: 'Sportbook6vnTableRow', description: 'Record keyed by column key. Values can be primitives or one of the typed table cell objects.', type: 'Record<string, Sportbook6vnTableCellValue>', defaultValue: '-' },
  { property: 'Sportbook6vnTableCellType', description: 'Supported cell renderers.', type: "'text' | 'number' | 'currency' | 'money' | 'money-in' | 'money-out' | 'time' | 'remind' | 'reference-number' | 'payment-code' | 'status' | 'file' | 'alert' | 'checkbox' | 'icon' | 'button' | 'input' | 'dropdown'", defaultValue: "'text'" },
  { property: 'Sportbook6vnTableStatusTone', description: 'Status and dot color tone.', type: "'success' | 'error' | 'warning' | 'neutral' | 'info'", defaultValue: "'neutral'" },
  { property: 'Sportbook6vnTableFixed', description: 'Fixed column side. Current demos use the right-side icon column case.', type: "'left' | 'right'", defaultValue: '-' },
];

export const TABLE_VARIABLE_GROUPS: TableVariableGroup[] = [
  {
    title: 'Surface and Border',
    rows: [
      { token: '--sportbook6vn-color-table-header-bg', value: '#ecf5fa', appliesTo: 'Header cell background', notes: 'Defined in sportbook6vn-theme.css.' },
      { token: '--sportbook6vn-color-table-row-bg', value: '#ffffff', appliesTo: 'Body row background', notes: 'Used by normal table rows and state shell.' },
      { token: '--sportbook6vn-color-table-selected-row-bg', value: '#ecf5fa', appliesTo: 'Selected row background', notes: 'Applied when a row key is selected.' },
      { token: '--sportbook6vn-color-table-line', value: '#a3b7fd', appliesTo: 'Row divider and internal table lines', notes: 'Matches the current table divider color.' },
      { token: '--sportbook6vn-color-table-outer-border', value: '#a3b7fd', appliesTo: 'Table viewport border', notes: 'Falls back to table line token if unset.' },
    ],
  },
  {
    title: 'Text and Actions',
    rows: [
      { token: '--sportbook6vn-color-table-header-text', value: '#192d39', appliesTo: 'Header label text', notes: 'Used in all table headers.' },
      { token: '--sportbook6vn-color-table-text', value: '#192d39', appliesTo: 'Default body text', notes: 'Used by text, number, time, and neutral cells.' },
      { token: '--sportbook6vn-color-table-muted', value: '#6d83a7', appliesTo: 'Muted state and neutral status text', notes: 'Used for empty states and neutral status.' },
      { token: '--sportbook6vn-color-table-placeholder', value: '#9bafc8', appliesTo: 'Input and dropdown placeholder text inside table cells', notes: 'Scoped to table control cells.' },
      { token: '--sportbook6vn-color-table-action', value: '#141ed2', appliesTo: 'Reference links, payment code, icons, and active sort indicator', notes: 'Used by action-oriented table cells.' },
    ],
  },
  {
    title: 'State and Control',
    rows: [
      { token: '--sportbook6vn-color-table-control-bg', value: '#ffffff', appliesTo: 'Input and dropdown background in table cells', notes: 'Keeps embedded controls aligned with table surface.' },
      { token: '--sportbook6vn-color-table-control-border', value: '#a3b7fd', appliesTo: 'Input and dropdown default border in table cells', notes: 'Shared by embedded input and dropdown default states.' },
      { token: '--sportbook6vn-color-table-focus', value: '#52dddd', appliesTo: 'Focused control border and table accent', notes: 'Used for focused table controls.' },
      { token: '--sportbook6vn-color-table-sort-muted', value: '#9bafc8', appliesTo: 'Inactive sort arrows', notes: 'Used in sortable header control.' },
      { token: '--sportbook6vn-color-table-disabled', value: '#9b9b9b', appliesTo: 'Disabled actions and controls', notes: 'Used by disabled cell controls.' },
    ],
  },
  {
    title: 'Semantic Cell Color',
    rows: [
      { token: '--sportbook6vn-color-table-success', value: '#00ad68', appliesTo: 'Success status and money-in values', notes: 'Adds positive money sign and green status tone.' },
      { token: '--sportbook6vn-color-table-error', value: '#f00000', appliesTo: 'Error status and money-out values', notes: 'Adds negative money sign and red status tone.' },
      { token: '--sportbook6vn-color-table-warning', value: '#fa8a00', appliesTo: 'Warning status and alert cells', notes: 'Used by warning status and alert tones.' },
    ],
  },
];

export const TABLE_VARIABLE_NOTES = [
  'Right fixed columns add the EF/Fix Column [R] shadow in component CSS when the table has hidden content to the left of the fixed column.',
  'File and currency illustrations are resolved from the Illustration asset source through table asset mappings.',
];
