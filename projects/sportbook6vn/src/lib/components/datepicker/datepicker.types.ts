export type Sportbook6vnDatepickerMode = 'single' | 'range';
export type Sportbook6vnDatepickerContent = 'day' | 'interest' | 'month' | 'year' | 'time';
export type Sportbook6vnDatepickerField = 'trigger' | 'input';
export type Sportbook6vnDatepickerRangeActive = 'start' | 'end';
export type Sportbook6vnDatepickerSize = 'large' | 'medium';
export type Sportbook6vnDatepickerStatus = 'default' | 'error';
export type Sportbook6vnDatepickerCellState =
  | 'default'
  | 'active'
  | 'range-start'
  | 'range-middle'
  | 'range-end'
  | 'disabled'
  | 'present'
  | 'today';

export interface Sportbook6vnDatepickerCell {
  label: string;
  value: string;
  caption?: string;
  state?: Sportbook6vnDatepickerCellState;
  disabled?: boolean;
}

export interface Sportbook6vnDatepickerRangeValue {
  start: string | null;
  end: string | null;
}
