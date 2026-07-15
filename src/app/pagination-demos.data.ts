export type PaginationDemoVariant =
  | 'default'
  | 'active-border'
  | 'dropdown-open'
  | 'boundary'
  | 'disabled'
  | 'quick-selected'
  | 'quick-default'
  | 'quick-maximum'
  | 'quick-input-active';

export interface PaginationDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  variant: PaginationDemoVariant;
  snippetTs: string;
}

export interface PaginationApiRow {
  property: string;
  description: string;
  type: string;
  defaultValue: string;
}

export interface PaginationVariableRow {
  token: string;
  value: string;
  appliesTo: string;
  notes: string;
}

export interface PaginationVariableGroup {
  title: string;
  rows: PaginationVariableRow[];
}

export const PAGINATION_DEMO_SECTIONS: PaginationDemoSection[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'Baseline page list with total result range, page numbers, and dropdown jumper trigger.',
    tags: ['selector=mbbiz-pagination', 'mode=page-list', 'page=1'],
    variant: 'default',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizPaginationComponent } from 'mbbiz';

@Component({
  selector: 'app-pagination-default-demo',
  standalone: true,
  imports: [MbbizPaginationComponent],
  template: \`
    <mbbiz-pagination
      ariaLabel="Pagination"
      [total]="100"
      [pageIndex]="1"
    />
  \`,
})
export class PaginationDefaultDemoComponent {}`,
  },
  {
    id: 'active-border',
    title: 'Active Border',
    description: 'Dropdown jumper trigger uses the active border state while the page list remains unchanged.',
    tags: ['selector=mbbiz-pagination', 'jumpActive=true'],
    variant: 'active-border',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizPaginationComponent } from 'mbbiz';

@Component({
  selector: 'app-pagination-active-border-demo',
  standalone: true,
  imports: [MbbizPaginationComponent],
  template: \`
    <mbbiz-pagination
      ariaLabel="Pagination active jumper"
      [total]="100"
      [pageIndex]="1"
      [jumpActive]="true"
    />
  \`,
})
export class PaginationActiveBorderDemoComponent {}`,
  },
  {
    id: 'dropdown-open',
    title: 'Dropdown Jumper Open',
    description: 'Open jumper state lists available pages with a compact internal scrollbar.',
    tags: ['selector=mbbiz-pagination', 'openJump=true'],
    variant: 'dropdown-open',
    snippetTs: `import { Component, signal } from '@angular/core';
import { MbbizPaginationComponent } from 'mbbiz';

@Component({
  selector: 'app-pagination-dropdown-open-demo',
  standalone: true,
  imports: [MbbizPaginationComponent],
  template: \`
    <mbbiz-pagination
      ariaLabel="Pagination open jumper"
      [total]="100"
      [pageIndex]="pageIndex()"
      [openJump]="openJump()"
      (pageIndexChange)="pageIndex.set($event)"
      (openJumpChange)="openJump.set($event)"
    />
  \`,
})
export class PaginationDropdownOpenDemoComponent {
  readonly pageIndex = signal(1);
  readonly openJump = signal(true);
}`,
  },
  {
    id: 'boundary',
    title: 'Boundary',
    description: 'Last page state disables next controls while keeping previous controls available.',
    tags: ['selector=mbbiz-pagination', 'page=last'],
    variant: 'boundary',
    snippetTs: `import { Component, signal } from '@angular/core';
import { MbbizPaginationComponent } from 'mbbiz';

@Component({
  selector: 'app-pagination-boundary-demo',
  standalone: true,
  imports: [MbbizPaginationComponent],
  template: \`
    <mbbiz-pagination
      ariaLabel="Pagination last page"
      [total]="100"
      [pageIndex]="pageIndex()"
      (pageIndexChange)="pageIndex.set($event)"
    />
  \`,
})
export class PaginationBoundaryDemoComponent {
  readonly pageIndex = signal(10);
}`,
  },
  {
    id: 'disabled',
    title: 'Disabled',
    description: 'Disabled state keeps the same layout while making all controls unavailable.',
    tags: ['selector=mbbiz-pagination', 'disabled=true'],
    variant: 'disabled',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizPaginationComponent } from 'mbbiz';

@Component({
  selector: 'app-pagination-disabled-demo',
  standalone: true,
  imports: [MbbizPaginationComponent],
  template: \`
    <mbbiz-pagination
      ariaLabel="Disabled pagination"
      [total]="10"
      [pageIndex]="1"
      [disabled]="true"
    />
  \`,
})
export class PaginationDisabledDemoComponent {}`,
  },
  {
    id: 'quick-selected',
    title: 'Quick Jumper Selected',
    description: 'Large result sets switch to quick jumper mode with formatted page summary and direct input.',
    tags: ['selector=mbbiz-pagination', 'mode=quick-jumper', 'page=23'],
    variant: 'quick-selected',
    snippetTs: `import { Component, signal } from '@angular/core';
import {
  MbbizPaginationComponent,
  type MbbizPaginationRangeFormatter,
  type MbbizPaginationSummaryFormatter,
} from 'mbbiz';

@Component({
  selector: 'app-pagination-quick-selected-demo',
  standalone: true,
  imports: [MbbizPaginationComponent],
  template: \`
    <mbbiz-pagination
      ariaLabel="Quick pagination"
      mode="quick-jumper"
      [total]="18000"
      [pageCount]="18000"
      [pageIndex]="pageIndex()"
      [quickJumpValue]="23"
      [rangeFormatter]="rangeFormatter"
      [summaryFormatter]="summaryFormatter"
      (pageIndexChange)="pageIndex.set($event)"
    />
  \`,
})
export class PaginationQuickSelectedDemoComponent {
  readonly pageIndex = signal(23);
  readonly rangeFormatter: MbbizPaginationRangeFormatter = () =>
    'Đã hiển thị 91 - 100 trên 18000 kết quả';
  readonly summaryFormatter: MbbizPaginationSummaryFormatter = (summary) =>
    \`Trang \${new Intl.NumberFormat('vi-VN').format(summary.pageIndex)} / \${new Intl.NumberFormat('vi-VN').format(summary.pageCount)}\`;
}`,
  },
  {
    id: 'quick-default',
    title: 'Quick Jumper Default',
    description: 'First page quick jumper state with previous controls disabled.',
    tags: ['selector=mbbiz-pagination', 'mode=quick-jumper', 'page=1'],
    variant: 'quick-default',
    snippetTs: `import { Component } from '@angular/core';
import {
  MbbizPaginationComponent,
  type MbbizPaginationRangeFormatter,
  type MbbizPaginationSummaryFormatter,
} from 'mbbiz';

@Component({
  selector: 'app-pagination-quick-default-demo',
  standalone: true,
  imports: [MbbizPaginationComponent],
  template: \`
    <mbbiz-pagination
      ariaLabel="Quick pagination first page"
      mode="quick-jumper"
      [total]="18000"
      [pageCount]="18000"
      [pageIndex]="1"
      [rangeFormatter]="rangeFormatter"
      [summaryFormatter]="summaryFormatter"
    />
  \`,
})
export class PaginationQuickDefaultDemoComponent {
  readonly rangeFormatter: MbbizPaginationRangeFormatter = () =>
    'Đã hiển thị 1 - 10 trên 18000 kết quả';
  readonly summaryFormatter: MbbizPaginationSummaryFormatter = (summary) =>
    \`Trang \${new Intl.NumberFormat('vi-VN').format(summary.pageIndex)} / \${new Intl.NumberFormat('vi-VN').format(summary.pageCount)}\`;
}`,
  },
  {
    id: 'quick-maximum',
    title: 'Quick Jumper Maximum',
    description: 'Last page quick jumper state with next controls disabled.',
    tags: ['selector=mbbiz-pagination', 'mode=quick-jumper', 'page=18000'],
    variant: 'quick-maximum',
    snippetTs: `import { Component } from '@angular/core';
import {
  MbbizPaginationComponent,
  type MbbizPaginationRangeFormatter,
  type MbbizPaginationSummaryFormatter,
} from 'mbbiz';

@Component({
  selector: 'app-pagination-quick-maximum-demo',
  standalone: true,
  imports: [MbbizPaginationComponent],
  template: \`
    <mbbiz-pagination
      ariaLabel="Quick pagination last page"
      mode="quick-jumper"
      [total]="18000"
      [pageCount]="18000"
      [pageIndex]="18000"
      [rangeFormatter]="rangeFormatter"
      [summaryFormatter]="summaryFormatter"
    />
  \`,
})
export class PaginationQuickMaximumDemoComponent {
  readonly rangeFormatter: MbbizPaginationRangeFormatter = () =>
    'Đã hiển thị 17990 - 18000 trên 18000 kết quả';
  readonly summaryFormatter: MbbizPaginationSummaryFormatter = (summary) =>
    \`Trang \${new Intl.NumberFormat('vi-VN').format(summary.pageIndex)} / \${new Intl.NumberFormat('vi-VN').format(summary.pageCount)}\`;
}`,
  },
  {
    id: 'quick-input-active',
    title: 'Quick Jumper Input Active',
    description: 'Quick jumper input active state uses the focused border treatment from the Figma node.',
    tags: ['selector=mbbiz-pagination', 'quickInputActive=true'],
    variant: 'quick-input-active',
    snippetTs: `import { Component } from '@angular/core';
import {
  MbbizPaginationComponent,
  type MbbizPaginationRangeFormatter,
  type MbbizPaginationSummaryFormatter,
} from 'mbbiz';

@Component({
  selector: 'app-pagination-quick-input-active-demo',
  standalone: true,
  imports: [MbbizPaginationComponent],
  template: \`
    <mbbiz-pagination
      ariaLabel="Quick pagination active input"
      mode="quick-jumper"
      [total]="18000"
      [pageCount]="18000"
      [pageIndex]="23"
      [quickInputActive]="true"
      [rangeFormatter]="rangeFormatter"
      [summaryFormatter]="summaryFormatter"
    />
  \`,
})
export class PaginationQuickInputActiveDemoComponent {
  readonly rangeFormatter: MbbizPaginationRangeFormatter = () =>
    'Đã hiển thị 91 - 100 trên 18000 kết quả';
  readonly summaryFormatter: MbbizPaginationSummaryFormatter = (summary) =>
    \`Trang \${new Intl.NumberFormat('vi-VN').format(summary.pageIndex)} / \${new Intl.NumberFormat('vi-VN').format(summary.pageCount)}\`;
}`,
  },
];

export const PAGINATION_API_ROWS: PaginationApiRow[] = [
  { property: 'total', description: 'Total record count used to calculate display range and pages.', type: 'number', defaultValue: '0' },
  { property: 'pageIndex', description: 'Controlled one-based current page.', type: 'number', defaultValue: '1' },
  { property: 'pageCount', description: 'Optional explicit page count. When omitted, page count is calculated from total and pageSize.', type: 'number | null', defaultValue: 'null' },
  { property: 'pageSize', description: 'Number of records per page for range calculation.', type: 'number', defaultValue: '10' },
  { property: 'disabled', description: 'Disables navigation, jumper trigger, and quick input.', type: 'boolean', defaultValue: 'false' },
  { property: 'mode', description: 'Controls whether the component renders page list, quick jumper, or switches automatically after threshold.', type: 'MbbizPaginationMode', defaultValue: "'auto'" },
  { property: 'pageWindow', description: 'Maximum number of visible page buttons in page-list mode.', type: 'number', defaultValue: '5' },
  { property: 'quickJumperThreshold', description: 'Auto mode switches to quick jumper when page count exceeds this threshold.', type: 'number', defaultValue: '100' },
  { property: 'showTotal', description: 'Toggles the left-side range text.', type: 'boolean', defaultValue: 'true' },
  { property: 'openJump', description: 'Controlled open state for dropdown jumper panel.', type: 'boolean', defaultValue: 'false' },
  { property: 'jumpActive', description: 'Forces active border state on the dropdown jumper trigger.', type: 'boolean', defaultValue: 'false' },
  { property: 'quickInputActive', description: 'Forces active border state on the quick jumper input.', type: 'boolean', defaultValue: 'false' },
  { property: 'quickJumpValue', description: 'Controlled quick jumper input display value.', type: 'string | number | null', defaultValue: 'null' },
  { property: 'rangeFormatter', description: 'Custom formatter for the displayed result range.', type: 'MbbizPaginationRangeFormatter | null', defaultValue: 'null' },
  { property: 'summaryFormatter', description: 'Custom formatter for quick jumper page summary.', type: 'MbbizPaginationSummaryFormatter | null', defaultValue: 'null' },
  { property: 'ariaLabel', description: 'Accessible label for the pagination nav element.', type: 'string', defaultValue: "'Pagination'" },
];

export const PAGINATION_OUTPUT_ROWS: PaginationApiRow[] = [
  { property: 'pageIndexChange', description: 'Emits the next one-based page after navigation, dropdown selection, or quick input submit.', type: 'output<number>', defaultValue: '-' },
  { property: 'openJumpChange', description: 'Emits dropdown jumper open state after trigger, outside click, or page selection.', type: 'output<boolean>', defaultValue: '-' },
];

export const PAGINATION_TYPE_ROWS: PaginationApiRow[] = [
  { property: 'MbbizPaginationMode', description: 'Rendering mode for page-list and quick-jumper variants.', type: "'auto' | 'page-list' | 'quick-jumper'", defaultValue: "'auto'" },
  { property: 'MbbizPaginationRange', description: 'Range payload sent to rangeFormatter.', type: '{ start: number; end: number; total: number }', defaultValue: '-' },
  { property: 'MbbizPaginationSummary', description: 'Summary payload sent to summaryFormatter.', type: '{ pageIndex: number; pageCount: number }', defaultValue: '-' },
  { property: 'MbbizPaginationPageItem', description: 'Internal page button model.', type: '{ page: number; active: boolean }', defaultValue: '-' },
];

export const PAGINATION_VARIABLE_GROUPS: PaginationVariableGroup[] = [
  {
    title: 'Text and Icon',
    rows: [
      { token: 'text/primary', value: 'darkblue/1000', appliesTo: 'Main text, page summary, and quick jumper label', notes: '' },
      { token: 'text/secondary', value: 'darkblue/500', appliesTo: 'Range text and inactive page numbers', notes: 'Used by total range and page-list numbers.' },
      { token: 'icon/neutral1', value: 'darkblue/1000', appliesTo: 'Enabled navigation icons', notes: 'Used by single and double navigation buttons.' },
      { token: 'text/brand-primary1', value: 'blue/500', appliesTo: 'Active dropdown option text', notes: 'Used inside open jumper panel.' },
    ],
  },
  {
    title: 'Surface and Border',
    rows: [
      { token: 'background/primary', value: 'white/100%', appliesTo: 'Dropdown trigger, quick input, and dropdown panel background', notes: 'Keeps controls on the docs surface.' },
      { token: 'border/brand-primary3', value: 'blue/300', appliesTo: 'Default trigger and quick input border', notes: 'Default border state.' },
      { token: 'border/brand-tertiary', value: 'turquoise/400', appliesTo: 'Active trigger, open panel, focused quick input', notes: 'Used for active and focus treatment.' },
      { token: 'border/quaternary', value: 'darkblue/300', appliesTo: 'Dropdown jumper internal scrollbar thumb', notes: 'Matches compact scrollbar treatment.' },
    ],
  },
  {
    title: 'Active and Disabled State',
    rows: [
      { token: 'background/brand-tertiary2', value: 'turquoise/400', appliesTo: 'Active page chip background', notes: 'Used in page-list mode.' },
      { token: 'text/primary', value: 'darkblue/1000', appliesTo: 'Active page chip text', notes: 'Text on active page background.' },
      { token: 'text/tertiary', value: 'darkblue/400', appliesTo: 'Quick jumper input placeholder', notes: 'Shown when quick input is empty.' },
      { token: 'text/disable4', value: 'grayscale/400', appliesTo: 'Disabled nav icon, disabled page number, disabled border', notes: 'Used by disabled controls.' },
      { token: 'background/disable3', value: 'grayscale/200', appliesTo: 'Disabled trigger and quick input background', notes: 'Disabled control surface.' },
      { token: 'text/disable1', value: 'grayscale/600', appliesTo: 'Disabled range, summary, and quick label text', notes: 'Disabled text role.' },
    ],
  }
];

export const PAGINATION_VARIABLE_NOTES = [
  'The mapped docs page intentionally mirrors the preview cases only; API and token tables are generated by the code skill.',
  'Auto mode switches to quick jumper when the resolved page count is greater than quickJumperThreshold.',
];
