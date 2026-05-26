export type DatepickerDemoVariant = 'single' | 'range' | 'status';

export interface DatepickerDescriptionPart {
  text?: string;
  code?: string;
}

export interface DatepickerDemoSection {
  id: string;
  title: string;
  descriptionParts: DatepickerDescriptionPart[];
  tags: string[];
  variant: DatepickerDemoVariant;
  snippetTs: string;
}

export interface DatepickerApiRow {
  property: string;
  description: string;
  type: string;
  defaultValue: string;
}

export interface DatepickerVariableRow {
  token: string;
  value: string;
  appliesTo: string;
  notes: string;
}

export interface DatepickerVariableGroup {
  title: string;
  rows: DatepickerVariableRow[];
}

export const DATEPICKER_DEMO_SECTIONS: DatepickerDemoSection[] = [
  {
    id: 'single-date',
    title: 'Single Date',
    descriptionParts: [
      { code: 'mode="single"' },
      { text: ' covers date, date + time, interest, month, and year cases with the same input trigger.' },
    ],
    tags: ['selector=sportbook6vn-datepicker', 'mode=single', 'content=day/interest/month/year'],
    variant: 'single',
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnDatepickerComponent } from 'sportbook6vn';

@Component({
  selector: 'app-datepicker-single-demo',
  standalone: true,
  imports: [Sportbook6vnDatepickerComponent],
  template: \`
    <sportbook6vn-datepicker field="input" placeholder="Chọn ngày" />

    <sportbook6vn-datepicker field="input" placeholder="Chọn ngày" [showTime]="true" />

    <sportbook6vn-datepicker
      field="input"
      content="interest"
      panelLabel="Tháng 5 2025"
      placeholder="Interest"
    />

    <sportbook6vn-datepicker
      field="input"
      content="month"
      panelLabel="2026"
      placeholder="Chọn tháng"
    />

    <sportbook6vn-datepicker
      field="input"
      content="year"
      panelLabel="2020 - 2031"
      placeholder="Chọn năm"
    />
  \`,
})
export class DatepickerSingleDemoComponent {}`,
  },
  {
    id: 'date-range',
    title: 'Date Range',
    descriptionParts: [
      { code: 'mode="range"' },
      { text: ' covers date to date, date to date + time, month to month, and year to year cases.' },
    ],
    tags: ['selector=sportbook6vn-datepicker', 'mode=range', 'rangeActive=start/end'],
    variant: 'range',
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnDatepickerComponent } from 'sportbook6vn';

@Component({
  selector: 'app-datepicker-range-demo',
  standalone: true,
  imports: [Sportbook6vnDatepickerComponent],
  template: \`
    <sportbook6vn-datepicker
      mode="range"
      field="input"
      startPlaceholder="Từ ngày"
      endPlaceholder="Đến ngày"
    />

    <sportbook6vn-datepicker
      mode="range"
      field="input"
      startPlaceholder="Từ ngày"
      endPlaceholder="Đến ngày"
      [showTime]="true"
    />

    <sportbook6vn-datepicker
      mode="range"
      field="input"
      content="month"
      panelLabel="2026"
      startPlaceholder="Từ tháng"
      endPlaceholder="Đến tháng"
    />

    <sportbook6vn-datepicker
      mode="range"
      field="input"
      content="year"
      panelLabel="2020 - 2031"
      startPlaceholder="Từ năm"
      endPlaceholder="Đến năm"
    />
  \`,
})
export class DatepickerRangeDemoComponent {}`,
  },
  {
    id: 'status',
    title: 'Status',
    descriptionParts: [
      { code: 'status="error"' },
      { text: ' and ' },
      { code: '[disabled]="true"' },
      { text: ' preserve the same geometry for single and range inputs.' },
    ],
    tags: ['selector=sportbook6vn-datepicker', 'status=error', 'disabled=true'],
    variant: 'status',
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnDatepickerComponent } from 'sportbook6vn';

@Component({
  selector: 'app-datepicker-status-demo',
  standalone: true,
  imports: [Sportbook6vnDatepickerComponent],
  template: \`
    <sportbook6vn-datepicker field="input" placeholder="Chọn ngày" status="error" />

    <sportbook6vn-datepicker field="input" placeholder="Chọn ngày" [disabled]="true" />

    <sportbook6vn-datepicker
      mode="range"
      field="input"
      startPlaceholder="Từ ngày"
      endPlaceholder="Đến ngày"
      status="error"
    />

    <sportbook6vn-datepicker
      mode="range"
      field="input"
      startPlaceholder="Từ ngày"
      endPlaceholder="Đến ngày"
      [disabled]="true"
    />
  \`,
})
export class DatepickerStatusDemoComponent {}`,
  },
];

export const DATEPICKER_API_ROWS: DatepickerApiRow[] = [
  { property: 'mode', description: 'Picker mode: one value or a start/end range.', type: "'single' | 'range'", defaultValue: "'single'" },
  { property: 'content', description: 'Panel content type rendered inside the picker.', type: "'day' | 'interest' | 'month' | 'year' | 'time'", defaultValue: "'day'" },
  { property: 'field', description: 'Trigger type. Use input for the DS input-style date picker.', type: "'trigger' | 'input'", defaultValue: "'trigger'" },
  { property: 'placeholder', description: 'Placeholder for single input mode.', type: 'string', defaultValue: "'Lựa chọn'" },
  { property: 'startPlaceholder', description: 'Placeholder for the start range field.', type: 'string', defaultValue: "'Ngày bắt đầu'" },
  { property: 'endPlaceholder', description: 'Placeholder for the end range field.', type: 'string', defaultValue: "'Ngày kết thúc'" },
  { property: 'panelLabel', description: 'Header label for month, year, and interest panels.', type: 'string', defaultValue: "'Tháng 10/2026'" },
  { property: 'rangeActive', description: 'Initial active side for range selection.', type: "'start' | 'end'", defaultValue: "'start'" },
  { property: 'size', description: 'Input size variant.', type: "'large' | 'medium'", defaultValue: "'large'" },
  { property: 'status', description: 'Visual status for input border and validation state.', type: "'default' | 'error'", defaultValue: "'default'" },
  { property: 'value', description: 'Controlled value for single mode.', type: 'string | null', defaultValue: 'null' },
  { property: 'startValue', description: 'Controlled start value for range mode.', type: 'string | null', defaultValue: 'null' },
  { property: 'endValue', description: 'Controlled end value for range mode.', type: 'string | null', defaultValue: 'null' },
  { property: 'open', description: 'Controlled initial open state.', type: 'boolean', defaultValue: 'false' },
  { property: 'disabled', description: 'Disables trigger, input, and panel selection.', type: 'boolean', defaultValue: 'false' },
  { property: 'showTime', description: 'Adds time selection to day/date range panels.', type: 'boolean', defaultValue: 'false' },
  { property: 'dayCells', description: 'Custom day cells for static or business-specific calendars.', type: 'readonly Sportbook6vnDatepickerCell[]', defaultValue: 'DEFAULT_DAY_CELLS' },
  { property: 'interestCells', description: 'Interest-rate day cells with optional captions.', type: 'readonly Sportbook6vnDatepickerCell[]', defaultValue: 'DEFAULT_INTEREST_CELLS' },
  { property: 'monthCells', description: 'Custom month cells.', type: 'readonly Sportbook6vnDatepickerCell[]', defaultValue: 'DEFAULT_MONTH_CELLS' },
  { property: 'yearCells', description: 'Custom year cells.', type: 'readonly Sportbook6vnDatepickerCell[]', defaultValue: 'DEFAULT_YEAR_CELLS' },
  { property: 'timeCells', description: 'Custom time cells for simple time lists.', type: 'readonly Sportbook6vnDatepickerCell[]', defaultValue: 'DEFAULT_TIME_CELLS' },
];

export const DATEPICKER_OUTPUT_ROWS: DatepickerApiRow[] = [
  { property: 'valueChange', description: 'Emits the selected single value.', type: 'string | null', defaultValue: '-' },
  { property: 'rangeChange', description: 'Emits start/end range updates.', type: 'Sportbook6vnDatepickerRangeValue', defaultValue: '-' },
  { property: 'openChange', description: 'Emits panel open state changes.', type: 'boolean', defaultValue: '-' },
  { property: 'resetClick', description: 'Emits when reset is clicked.', type: 'void', defaultValue: '-' },
  { property: 'applyClick', description: 'Emits committed range values when apply is clicked.', type: 'Sportbook6vnDatepickerRangeValue', defaultValue: '-' },
];

export const DATEPICKER_VARIABLE_GROUPS: DatepickerVariableGroup[] = [
  {
    title: 'Trigger And Input',
    rows: [
      { token: 'datepicker/input/border/default', value: '#A3B7FD', appliesTo: 'Input and range border', notes: 'Default input border from approved Figma states.' },
      { token: 'datepicker/input/border/hover', value: '#52DDDD', appliesTo: 'Hover and open border', notes: 'Interactive cyan border used on active picker triggers.' },
      { token: 'datepicker/input/border/error', value: '#F00000', appliesTo: 'Error state border', notes: 'Validation border color.' },
      { token: 'datepicker/input/text/default', value: '#142837', appliesTo: 'Input text', notes: 'Primary date value text.' },
      { token: 'datepicker/input/text/placeholder', value: '#9BAFC8', appliesTo: 'Placeholder text', notes: 'Start/end placeholders and empty single inputs.' },
      { token: 'datepicker/input/background/disabled', value: '#F3F3F3', appliesTo: 'Disabled input background', notes: 'Disabled state fill.' },
    ],
  },
  {
    title: 'Panel And Selection',
    rows: [
      { token: 'datepicker/panel/border', value: '#52DDDD', appliesTo: 'Panel shell', notes: 'Panel outline.' },
      { token: 'datepicker/panel/divider', value: '#A3B7FD', appliesTo: 'Header/body/footer dividers', notes: 'Calendar and time split lines.' },
      { token: 'datepicker/day/selected/background', value: '#141ED2', appliesTo: 'Selected date/month/year/time', notes: 'Primary selected state.' },
      { token: 'datepicker/day/range/background', value: '#E9EFFF', appliesTo: 'Range middle day cells', notes: 'Continuous range fill.' },
      { token: 'datepicker/day/today/border', value: '#141ED2', appliesTo: 'Today cell', notes: 'Today outline and present text color.' },
      { token: 'datepicker/scrollbar/thumb', value: '#B7B7B7', appliesTo: 'Time scrollbar', notes: 'Thin time list scrollbar thumb.' },
      { token: 'datepicker/action/apply/background', value: '#7A5CFF', appliesTo: 'Apply button', notes: 'Footer apply action background.' },
    ],
  },
];

export const DATEPICKER_VARIABLE_NOTES: string[] = [
  'Date picker keeps panel and trigger in the same component; preview/docs render the real sportbook6vn-datepicker selector.',
  'Range middle cells use a continuous rectangular background; start/end cells keep rounded caps.',
  'Interest mode is single-select only and uses interestCells captions for percentage labels.',
];
