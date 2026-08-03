export type DatepickerDemoVariant =
  | 'singleDate'
  | 'singleDateTime'
  | 'interest'
  | 'singleMonth'
  | 'singleYear'
  | 'rangeDate'
  | 'rangeDateTime'
  | 'rangeMonth'
  | 'rangeYear'
  | 'status';

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


export const DATEPICKER_DEMO_SECTIONS: DatepickerDemoSection[] = [
  {
    id: 'date',
    title: 'Date',
    descriptionParts: [
      { code: 'content="day"' },
      { text: ' renders the default single date input trigger.' },
    ],
    tags: ['selector=mbbiz-datepicker', 'mode=single', 'content=day'],
    variant: 'singleDate',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizDatepickerComponent } from 'mbbiz';

@Component({
  selector: 'app-datepicker-date-demo',
  standalone: true,
  imports: [MbbizDatepickerComponent],
  template: \`
    <mbbiz-datepicker field="input" placeholder="Chọn ngày" />
  \`,
})
export class DatepickerDateDemoComponent {}`,
  },
  {
    id: 'date-time',
    title: 'Date + Time',
    descriptionParts: [
      { code: '[showTime]="true"' },
      { text: ' adds time selection to the day picker.' },
    ],
    tags: ['selector=mbbiz-datepicker', 'mode=single', 'showTime=true'],
    variant: 'singleDateTime',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizDatepickerComponent } from 'mbbiz';

@Component({
  selector: 'app-datepicker-date-time-demo',
  standalone: true,
  imports: [MbbizDatepickerComponent],
  template: \`
    <mbbiz-datepicker field="input" placeholder="Chọn ngày" [showTime]="true" />
  \`,
})
export class DatepickerDateTimeDemoComponent {}`,
  },
  {
    id: 'month',
    title: 'Month',
    descriptionParts: [
      { code: 'content="month"' },
      { text: ' switches the panel to month selection.' },
    ],
    tags: ['selector=mbbiz-datepicker', 'mode=single', 'content=month'],
    variant: 'singleMonth',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizDatepickerComponent } from 'mbbiz';

@Component({
  selector: 'app-datepicker-month-demo',
  standalone: true,
  imports: [MbbizDatepickerComponent],
  template: \`
    <mbbiz-datepicker
      field="input"
      content="month"
      panelLabel="2026"
      placeholder="Chọn tháng"
    />
  \`,
})
export class DatepickerMonthDemoComponent {}`,
  },
  {
    id: 'year',
    title: 'Year',
    descriptionParts: [
      { code: 'content="year"' },
      { text: ' switches the panel to year selection.' },
    ],
    tags: ['selector=mbbiz-datepicker', 'mode=single', 'content=year'],
    variant: 'singleYear',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizDatepickerComponent } from 'mbbiz';

@Component({
  selector: 'app-datepicker-year-demo',
  standalone: true,
  imports: [MbbizDatepickerComponent],
  template: \`
    <mbbiz-datepicker
      field="input"
      content="year"
      panelLabel="2020 - 2031"
      placeholder="Chọn năm"
    />
  \`,
})
export class DatepickerYearDemoComponent {}`,
  },
  {
    id: 'interest',
    title: 'Interest',
    descriptionParts: [
      { code: 'content="interest"' },
      { text: ' renders a single-select interest date calendar with percentage captions.' },
    ],
    tags: ['selector=mbbiz-datepicker', 'mode=single', 'content=interest'],
    variant: 'interest',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizDatepickerComponent } from 'mbbiz';

@Component({
  selector: 'app-datepicker-interest-demo',
  standalone: true,
  imports: [MbbizDatepickerComponent],
  template: \`
    <mbbiz-datepicker
      field="input"
      content="interest"
      panelLabel="Tháng 5 2025"
      placeholder="Interest"
    />
  \`,
})
export class DatepickerInterestDemoComponent {}`,
  },
  {
    id: 'date-to-date',
    title: 'Date To Date',
    descriptionParts: [
      { code: 'mode="range"' },
      { text: ' renders the default start/end date range input.' },
    ],
    tags: ['selector=mbbiz-datepicker', 'mode=range', 'content=day'],
    variant: 'rangeDate',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizDatepickerComponent } from 'mbbiz';

@Component({
  selector: 'app-datepicker-date-range-demo',
  standalone: true,
  imports: [MbbizDatepickerComponent],
  template: \`
    <mbbiz-datepicker
      mode="range"
      field="input"
      startPlaceholder="Từ ngày"
      endPlaceholder="Đến ngày"
    />
  \`,
})
export class DatepickerDateRangeDemoComponent {}`,
  },
  {
    id: 'date-to-date-time',
    title: 'Date To Date + Time',
    descriptionParts: [
      { code: 'mode="range"' },
      { text: ' with ' },
      { code: '[showTime]="true"' },
      { text: ' adds time selection to start/end dates.' },
    ],
    tags: ['selector=mbbiz-datepicker', 'mode=range', 'showTime=true'],
    variant: 'rangeDateTime',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizDatepickerComponent } from 'mbbiz';

@Component({
  selector: 'app-datepicker-date-range-time-demo',
  standalone: true,
  imports: [MbbizDatepickerComponent],
  template: \`
    <mbbiz-datepicker
      mode="range"
      field="input"
      startPlaceholder="Từ ngày"
      endPlaceholder="Đến ngày"
      [showTime]="true"
    />
  \`,
})
export class DatepickerDateRangeTimeDemoComponent {}`,
  },
  {
    id: 'month-to-month',
    title: 'Month To Month',
    descriptionParts: [
      { code: 'content="month"' },
      { text: ' renders month range selection.' },
    ],
    tags: ['selector=mbbiz-datepicker', 'mode=range', 'content=month'],
    variant: 'rangeMonth',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizDatepickerComponent } from 'mbbiz';

@Component({
  selector: 'app-datepicker-month-range-demo',
  standalone: true,
  imports: [MbbizDatepickerComponent],
  template: \`
    <mbbiz-datepicker
      mode="range"
      field="input"
      content="month"
      panelLabel="2026"
      startPlaceholder="Từ tháng"
      endPlaceholder="Đến tháng"
    />
  \`,
})
export class DatepickerMonthRangeDemoComponent {}`,
  },
  {
    id: 'year-to-year',
    title: 'Year To Year',
    descriptionParts: [
      { code: 'content="year"' },
      { text: ' renders year range selection.' },
    ],
    tags: ['selector=mbbiz-datepicker', 'mode=range', 'content=year'],
    variant: 'rangeYear',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizDatepickerComponent } from 'mbbiz';

@Component({
  selector: 'app-datepicker-year-range-demo',
  standalone: true,
  imports: [MbbizDatepickerComponent],
  template: \`
    <mbbiz-datepicker
      mode="range"
      field="input"
      content="year"
      panelLabel="2020 - 2031"
      startPlaceholder="Từ năm"
      endPlaceholder="Đến năm"
    />
  \`,
})
export class DatepickerYearRangeDemoComponent {}`,
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
    tags: ['selector=mbbiz-datepicker', 'status=error', 'disabled=true'],
    variant: 'status',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizDatepickerComponent } from 'mbbiz';

@Component({
  selector: 'app-datepicker-status-demo',
  standalone: true,
  imports: [MbbizDatepickerComponent],
  template: \`
    <mbbiz-datepicker field="input" placeholder="Chọn ngày" status="error" />

    <mbbiz-datepicker field="input" placeholder="Chọn ngày" [disabled]="true" />

    <mbbiz-datepicker
      mode="range"
      field="input"
      startPlaceholder="Từ ngày"
      endPlaceholder="Đến ngày"
      status="error"
    />

    <mbbiz-datepicker
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
  { property: 'dayCells', description: 'Custom day cells for static or business-specific calendars.', type: 'readonly MbbizDatepickerCell[]', defaultValue: 'DEFAULT_DAY_CELLS' },
  { property: 'interestCells', description: 'Interest-rate day cells with optional captions.', type: 'readonly MbbizDatepickerCell[]', defaultValue: 'DEFAULT_INTEREST_CELLS' },
  { property: 'monthCells', description: 'Custom month cells.', type: 'readonly MbbizDatepickerCell[]', defaultValue: 'DEFAULT_MONTH_CELLS' },
  { property: 'yearCells', description: 'Custom year cells.', type: 'readonly MbbizDatepickerCell[]', defaultValue: 'DEFAULT_YEAR_CELLS' },
  { property: 'timeCells', description: 'Custom time cells for simple time lists.', type: 'readonly MbbizDatepickerCell[]', defaultValue: 'DEFAULT_TIME_CELLS' },
];

export const DATEPICKER_OUTPUT_ROWS: DatepickerApiRow[] = [
  { property: 'valueChange', description: 'Emits the selected single value.', type: 'string | null', defaultValue: '-' },
  { property: 'rangeChange', description: 'Emits start/end range updates.', type: 'MbbizDatepickerRangeValue', defaultValue: '-' },
  { property: 'openChange', description: 'Emits panel open state changes.', type: 'boolean', defaultValue: '-' },
  { property: 'resetClick', description: 'Emits when reset is clicked.', type: 'void', defaultValue: '-' },
  { property: 'applyClick', description: 'Emits committed range values when apply is clicked.', type: 'MbbizDatepickerRangeValue', defaultValue: '-' },
];

export const DATEPICKER_VARIABLE_GROUPS = [
  {
    title: 'Trigger And Input',
    rows: [
      { token: 'border/brand-primary3',    value: 'blue/300',      appliesTo: 'Input and range border',       notes: 'Maps to --mbbiz-color-datepicker-panel-divider.' },
      { token: 'border/brand-tertiary',    value: 'turquoise/400', appliesTo: 'Hover and open border',        notes: 'Maps to --mbbiz-color-datepicker-border-hover.' },
      { token: 'border/error1',            value: 'red/500',       appliesTo: 'Error state border',           notes: 'Maps to --mbbiz-color-datepicker-border-error.' },
      { token: 'text/primary',             value: 'darkblue/1000', appliesTo: 'Input text',                   notes: 'Maps to --mbbiz-color-datepicker-text.' },
      { token: 'text/tertiary',            value: 'darkblue/400',  appliesTo: 'Placeholder text',             notes: 'Maps to --mbbiz-color-datepicker-text-placeholder.' },
      { token: 'background/disable3',      value: 'grayscale/200', appliesTo: 'Disabled input background',    notes: 'Maps to --mbbiz-color-datepicker-background-disabled.' },
    ],
  },
  {
    title: 'Panel And Selection',
    rows: [
      { token: 'border/brand-tertiary',        value: 'turquoise/400', appliesTo: 'Panel shell',                      notes: 'Maps to --mbbiz-color-datepicker-panel-border.' },
      { token: 'border/brand-primary3',        value: 'blue/300',      appliesTo: 'Header/body/footer dividers',      notes: 'Maps to --mbbiz-color-datepicker-panel-divider.' },
      { token: 'background/brand-primary1',    value: 'blue/500',      appliesTo: 'Selected date/month/year/time',    notes: 'Maps to --mbbiz-color-datepicker-day-selected-background.' },
      { token: 'background/brand-primary5',    value: 'blue/100',      appliesTo: 'Range middle day cells',           notes: 'Maps to --mbbiz-color-datepicker-day-range-middle.' },
      { token: 'border/brand-primary1',        value: 'blue/500',      appliesTo: 'Today cell outline',               notes: 'Maps to --mbbiz-color-datepicker-day-today-border.' },
      { token: 'background/disable2',          value: 'grayscale/300', appliesTo: 'Time scrollbar thumb',             notes: 'Maps to --mbbiz-color-datepicker-scrollbar-thumb.' },
      { token: 'background/brand-secondary1',  value: 'purple/500',    appliesTo: 'Apply button background',          notes: 'Maps to --mbbiz-color-datepicker-action-apply-background.' },
    ],
  },
];

export const DATEPICKER_VARIABLE_NOTES: string[] = [
  'Date picker keeps panel and trigger in the same component; preview/docs render the real mbbiz-datepicker selector.',
  'Range middle cells use a continuous rectangular background; start/end cells keep rounded caps.',
  'Interest mode is single-select only and uses interestCells captions for percentage labels.',
];
