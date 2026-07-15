import {
  TABLE_PREVIEW_ALL_COLUMNS,
  TABLE_PREVIEW_DEFAULT_COLUMNS,
  TABLE_PREVIEW_DEFAULT_ROWS,
  TABLE_PREVIEW_FIXED_RIGHT_COLUMNS,
  TABLE_PREVIEW_PRIMITIVE_COLUMNS,
  TABLE_PREVIEW_PRIMITIVE_ROWS,
  TABLE_PREVIEW_SELECTION_COLUMNS,
  createTablePreviewAllColumnRows,
  createTablePreviewFixedRightRows,
  createTablePreviewSelectionRows,
} from '../../projects/mbbiz/src/lib/components/table/table.preview-fixtures';

const asSnippetLiteral = (value: unknown): string => JSON.stringify(value, null, 2);

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
    description:
      'Five fixed columns, one header row, and four 64px body rows from the Figma table node.',
    tags: ['selector=mbbiz-table', 'use-case=basic', 'rows=4'],
    variant: 'basic',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizTableComponent, type MbbizTableColumn, type MbbizTableRow } from 'mbbiz';

@Component({
  selector: 'app-table-basic-demo',
  standalone: true,
  imports: [MbbizTableComponent],
  template: \`
    <mbbiz-table
      ariaLabel="Basic account table"
      [columns]="columns"
      [data]="rows"
      [tableLayout]="'fixed'"
    />
  \`,
})
export class TableBasicDemoComponent {
  readonly columns: MbbizTableColumn[] = ${asSnippetLiteral(TABLE_PREVIEW_PRIMITIVE_COLUMNS)};

  readonly rows: MbbizTableRow[] = ${asSnippetLiteral(TABLE_PREVIEW_PRIMITIVE_ROWS)};
}`,
  },
  {
    id: 'all-columns',
    title: 'All Columns Table',
    description:
      'Basic table mode with all Figma column definitions and existing table cell renderers.',
    tags: ['selector=mbbiz-table', 'columns=all', 'rows=5'],
    variant: 'all-columns',
    snippetTs: `import { Component, signal } from '@angular/core';
import {
  MbbizTableComponent,
  type MbbizTableCellValueChange,
  type MbbizTableColumn,
  type MbbizTableRow,
} from 'mbbiz';

@Component({
  selector: 'app-table-all-columns-demo',
  standalone: true,
  imports: [MbbizTableComponent],
  template: \`
    <mbbiz-table
      ariaLabel="All column account table"
      [columns]="columns"
      [data]="rows()"
      [tableLayout]="'fixed'"
      (cellValueChange)="onCellValueChange($event)"
    />
  \`,
})
export class TableAllColumnsDemoComponent {
  readonly columns: MbbizTableColumn[] = ${asSnippetLiteral(TABLE_PREVIEW_ALL_COLUMNS)};

  readonly rows = signal<MbbizTableRow[]>(${asSnippetLiteral(createTablePreviewAllColumnRows())});

  onCellValueChange(event: MbbizTableCellValueChange): void {
    this.rows.update((rows) =>
      rows.map((row, index) => {
        if (String(row['id'] ?? index) !== event.rowKey) {
          return row;
        }

        const currentValue = row[event.column.key];
        const currentObject =
          typeof currentValue === 'object' && currentValue !== null
            ? (currentValue as Record<string, unknown>)
            : {};

        return {
          ...row,
          [event.column.key]: { ...currentObject, value: event.nextValue },
        };
      }),
    );
  }
}`,
  },
  {
    id: 'fixed-right-icon',
    title: 'Fixed Right Icon Column',
    description: 'Horizontal scroll keeps one icon action column fixed on the right edge.',
    tags: ['selector=mbbiz-table', 'fixed=right', 'column=icon'],
    variant: 'fixed-right-icon',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizTableComponent, type MbbizTableColumn, type MbbizTableRow } from 'mbbiz';

@Component({
  selector: 'app-table-fixed-right-icon-demo',
  standalone: true,
  imports: [MbbizTableComponent],
  template: \`
    <mbbiz-table
      ariaLabel="Fixed right icon action table"
      [columns]="columns"
      [data]="rows"
      [tableLayout]="'fixed'"
    />
  \`,
})
export class TableFixedRightIconDemoComponent {
  readonly columns: MbbizTableColumn[] = ${asSnippetLiteral(TABLE_PREVIEW_FIXED_RIGHT_COLUMNS)};

  readonly rows: MbbizTableRow[] = ${asSnippetLiteral(createTablePreviewFixedRightRows())};
}`,
  },
  {
    id: 'default',
    title: 'Default',
    description:
      'Baseline table with header cells, 64px rows, Figma divider color, and primary column types.',
    tags: ['selector=mbbiz-table', 'mode=default'],
    variant: 'default',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizTableComponent, type MbbizTableColumn, type MbbizTableRow } from 'mbbiz';

@Component({
  selector: 'app-table-default-demo',
  standalone: true,
  imports: [MbbizTableComponent],
  template: \`
    <mbbiz-table
      ariaLabel="Default account table"
      [columns]="columns"
      [data]="rows"
    />
  \`,
})
export class TableDefaultDemoComponent {
  readonly columns: MbbizTableColumn[] = ${asSnippetLiteral(TABLE_PREVIEW_DEFAULT_COLUMNS)};

  readonly rows: MbbizTableRow[] = ${asSnippetLiteral(TABLE_PREVIEW_DEFAULT_ROWS)};
}`,
  },
  {
    id: 'selection-pagination',
    title: 'Selection and Pagination',
    description:
      'Row selection follows the NG-Zorro checked/indeterminate pattern and pagination keeps data scoped.',
    tags: ['selector=mbbiz-table', 'selection=true', 'pagination=true'],
    variant: 'selection-pagination',
    snippetTs: `import { Component, signal } from '@angular/core';
import {
  MbbizTableComponent,
  type MbbizTableCellValueChange,
  type MbbizTableColumn,
  type MbbizTableRow,
} from 'mbbiz';

@Component({
  selector: 'app-table-selection-pagination-demo',
  standalone: true,
  imports: [MbbizTableComponent],
  template: \`
    <mbbiz-table
      ariaLabel="Selectable account table"
      [columns]="columns"
      [data]="rows()"
      [selectedRowKeys]="selectedRowKeys()"
      [showPagination]="true"
      [pageSize]="2"
      [pageIndex]="pageIndex()"
      (cellValueChange)="onCellValueChange($event)"
      (pageIndexChange)="pageIndex.set($event)"
    />
  \`,
})
export class TableSelectionPaginationDemoComponent {
  readonly pageIndex = signal(1);
  readonly selectedRowKeys = signal<string[]>(['selection-2']);
  readonly columns: MbbizTableColumn[] = ${asSnippetLiteral(TABLE_PREVIEW_SELECTION_COLUMNS)};
  readonly rows = signal<MbbizTableRow[]>(${asSnippetLiteral(createTablePreviewSelectionRows())});

  onCellValueChange(event: MbbizTableCellValueChange): void {
    this.rows.update((rows) =>
      rows.map((row, index) => {
        if (String(row['id'] ?? index) !== event.rowKey) {
          return row;
        }

        const currentValue = row[event.column.key];
        const currentObject =
          typeof currentValue === 'object' && currentValue !== null
            ? (currentValue as Record<string, unknown>)
            : {};

        return {
          ...row,
          [event.column.key]: { ...currentObject, value: event.nextValue },
        };
      }),
    );

    this.selectedRowKeys.set(
      this.rows()
        .filter((row) => {
          const selected = row['selected'];
          return typeof selected === 'object' && selected !== null && 'value' in selected && !!selected.value;
        })
        .map((row, index) => String(row['id'] ?? index)),
    );
  }
}`,
  },
  {
    id: 'state',
    title: 'State',
    description: 'Loading and empty states keep the same table shell.',
    tags: ['selector=mbbiz-table', 'state=loading/empty'],
    variant: 'state',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizTableComponent, type MbbizTableColumn, type MbbizTableRow } from 'mbbiz';

@Component({
  selector: 'app-table-state-demo',
  standalone: true,
  imports: [MbbizTableComponent],
  template: \`
    <mbbiz-table
      ariaLabel="Loading table"
      [columns]="columns"
      [data]="rows"
      [loading]="true"
    />

    <mbbiz-table
      ariaLabel="Empty table"
      [columns]="columns"
      [data]="[]"
      emptyText="Không có dữ liệu"
    />
  \`,
})
export class TableStateDemoComponent {
  readonly columns: MbbizTableColumn[] = ${asSnippetLiteral(TABLE_PREVIEW_DEFAULT_COLUMNS)};

  readonly rows: MbbizTableRow[] = ${asSnippetLiteral(TABLE_PREVIEW_DEFAULT_ROWS)};
}`,
  },
];

export const TABLE_API_ROWS: TableApiRow[] = [
  {
    property: 'columns',
    description:
      'Column definitions for header, cell type, alignment, width, sorting, and fixed column behavior.',
    type: 'readonly MbbizTableColumn[]',
    defaultValue: '[]',
  },
  {
    property: 'data',
    description:
      'Table row records. Each key maps to a column key and may be a primitive or typed cell object.',
    type: 'readonly MbbizTableRow[]',
    defaultValue: '[]',
  },
  {
    property: 'rowKey',
    description: 'Record key used for selection, row tracking, and emitted row events.',
    type: 'string',
    defaultValue: "'id'",
  },
  {
    property: 'ariaLabel',
    description: 'Accessible label for the table region.',
    type: 'string',
    defaultValue: "'Data table'",
  },
  {
    property: 'size',
    description: 'Controls row density.',
    type: "'default' | 'compact'",
    defaultValue: "'default'",
  },
  {
    property: 'loading',
    description: 'Shows the loading state inside the table shell.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'showHeader',
    description: 'Toggles table header visibility.',
    type: 'boolean',
    defaultValue: 'true',
  },
  {
    property: 'selectable',
    description: 'Adds a leading checkbox column with select-all behavior.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'selectedRowKeys',
    description: 'Controlled selected row keys for checkbox selection.',
    type: 'readonly string[]',
    defaultValue: '[]',
  },
  {
    property: 'showPagination',
    description:
      'Renders mbbiz pagination below the table and scopes visible data to the active page.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'pageIndex',
    description: 'Controlled one-based active page index.',
    type: 'number',
    defaultValue: '1',
  },
  {
    property: 'pageSize',
    description: 'Number of rows per page when pagination is enabled.',
    type: 'number',
    defaultValue: '10',
  },
  {
    property: 'emptyText',
    description: 'Text shown when data is empty and loading is false.',
    type: 'string',
    defaultValue: "'Không có dữ liệu'",
  },
  {
    property: 'tableLayout',
    description: 'Native table layout strategy.',
    type: "'auto' | 'fixed'",
    defaultValue: "'auto'",
  },
  {
    property: 'maxHeight',
    description: 'Optional vertical max height for the table viewport.',
    type: 'string | null',
    defaultValue: 'null',
  },
  {
    property: 'illustrationBasePath',
    description: 'Base path used by file cells to resolve file illustration assets.',
    type: 'string',
    defaultValue: 'item-file asset path',
  },
  {
    property: 'tableIllustrationBasePath',
    description: 'Base path used by currency and remind table illustration assets.',
    type: 'string',
    defaultValue: 'table asset path',
  },
];

export const TABLE_OUTPUT_ROWS: TableApiRow[] = [
  {
    property: 'selectedRowKeysChange',
    description: 'Emits selected row keys after row or header checkbox changes.',
    type: 'output<string[]>',
    defaultValue: '-',
  },
  {
    property: 'rowClick',
    description: 'Emits row metadata when a table row is clicked.',
    type: 'output<MbbizTableRowEvent>',
    defaultValue: '-',
  },
  {
    property: 'cellClick',
    description: 'Emits row, column, and value metadata when a cell is clicked.',
    type: 'output<MbbizTableCellEvent>',
    defaultValue: '-',
  },
  {
    property: 'cellValueChange',
    description:
      'Emits when checkbox, input, dropdown, button, icon, or link-style cells change or trigger an action.',
    type: 'output<MbbizTableCellValueChange>',
    defaultValue: '-',
  },
  {
    property: 'sortChange',
    description: 'Emits active column and order after a sortable header is toggled.',
    type: 'output<MbbizTableSortChange>',
    defaultValue: '-',
  },
  {
    property: 'pageIndexChange',
    description: 'Emits one-based page index after pagination changes.',
    type: 'output<number>',
    defaultValue: '-',
  },
];

export const TABLE_TYPE_ROWS: TableApiRow[] = [
  {
    property: 'MbbizTableColumn',
    description:
      'Column configuration object: key, title, type, width, align, headerAlign, fixed, sortable, options, and button metadata.',
    type: 'interface',
    defaultValue: '-',
  },
  {
    property: 'MbbizTableRow',
    description:
      'Record keyed by column key. Values can be primitives or one of the typed table cell objects.',
    type: 'Record<string, MbbizTableCellValue>',
    defaultValue: '-',
  },
  {
    property: 'MbbizTableCellType',
    description: 'Supported cell renderers.',
    type: "'text' | 'number' | 'currency' | 'money' | 'money-in' | 'money-out' | 'time' | 'remind' | 'reference-number' | 'payment-code' | 'status' | 'file' | 'alert' | 'checkbox' | 'icon' | 'button' | 'input' | 'dropdown'",
    defaultValue: "'text'",
  },
  {
    property: 'MbbizTableStatusTone',
    description: 'Status and dot color tone.',
    type: "'success' | 'error' | 'warning' | 'neutral' | 'info'",
    defaultValue: "'neutral'",
  },
  {
    property: 'MbbizTableFixed',
    description: 'Fixed column side. Current demos use the right-side icon column case.',
    type: "'left' | 'right'",
    defaultValue: '-',
  },
];

export const TABLE_VARIABLE_GROUPS: TableVariableGroup[] = [
  {
    title: 'Surface and Border',
    rows: [
      { token: 'background/secondary', value: 'darkblue/200', appliesTo: 'Header cell background', notes: '' },
      { token: 'background/primary', value: 'white/100%', appliesTo: 'Body row background', notes: 'Used by normal table rows and state shell.' },
      { token: 'background/secondary', value: 'darkblue/200', appliesTo: 'Selected row background', notes: 'Applied when a row key is selected.' },
      { token: 'border/brand-primary3', value: 'blue/300', appliesTo: 'Row divider and internal table lines', notes: 'Matches the current table divider color.' },
      { token: 'border/brand-primary3', value: 'blue/300', appliesTo: 'Table viewport border', notes: 'Falls back to table line token if unset.' },
    ],
  },
  {
    title: 'Text and Actions',
    rows: [
      { token: 'text/primary', value: 'darkblue/1000', appliesTo: 'Header label text', notes: 'Used in all table headers.' },
      { token: 'text/primary', value: 'darkblue/1000', appliesTo: 'Default body text', notes: 'Used by text, number, time, and neutral cells.' },
      { token: 'text/secondary', value: 'darkblue/500', appliesTo: 'Muted state and neutral status text', notes: 'Used for empty states and neutral status.' },
      { token: 'text/tertiary', value: 'darkblue/400', appliesTo: 'Input and dropdown placeholder text inside table cells', notes: 'Scoped to table control cells.' },
      { token: 'text/brand-primary1', value: 'blue/500', appliesTo: 'Reference links, payment code, icons, and active sort indicator', notes: 'Used by action-oriented table cells.' },
    ],
  },
  {
    title: 'State and Control',
    rows: [
      { token: 'background/primary', value: 'white/100%', appliesTo: 'Input and dropdown background in table cells', notes: 'Keeps embedded controls aligned with table surface.' },
      { token: 'border/brand-primary3', value: 'blue/300', appliesTo: 'Input and dropdown default border in table cells', notes: 'Shared by embedded input and dropdown default states.' },
      { token: 'border/brand-tertiary', value: 'turquoise/400', appliesTo: 'Focused control border and table accent', notes: 'Used for focused table controls.' },
      { token: 'text/tertiary', value: 'darkblue/400', appliesTo: 'Inactive sort arrows', notes: 'Used in sortable header control.' },
      { token: 'text/disable2', value: 'grayscale/500', appliesTo: 'Disabled actions and controls', notes: 'Used by disabled cell controls.' },
    ],
  },
  {
    title: 'Semantic Cell Color',
    rows: [
      { token: 'text/success', value: 'green/500', appliesTo: 'Success status and money-in values', notes: 'Adds positive money sign and green status tone.' },
      { token: 'background/error-primary', value: 'red/500', appliesTo: 'Error status and money-out values', notes: 'Adds negative money sign and red status tone.' },
      { token: 'background/warning-primary', value: 'orange/500', appliesTo: 'Warning status and alert cells', notes: 'Used by warning status and alert tones.' },
    ],
  }
];

export const TABLE_VARIABLE_NOTES = [
  'Right fixed columns add the EF/Fix Column [R] shadow in component CSS when the table has hidden content to the left of the fixed column.',
  'File and currency illustrations are resolved from the Illustration asset source through table asset mappings.',
];
