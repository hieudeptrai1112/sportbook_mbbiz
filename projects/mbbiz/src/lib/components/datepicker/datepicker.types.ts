export type MbbizDatepickerMode = 'single' | 'range';
export type MbbizDatepickerContent = 'day' | 'interest' | 'month' | 'year' | 'time';
export type MbbizDatepickerField = 'trigger' | 'input';
export type MbbizDatepickerRangeActive = 'start' | 'end';
export type MbbizDatepickerSize = 'large' | 'medium';
export type MbbizDatepickerStatus = 'default' | 'error';
export type MbbizDatepickerCellState =
  | 'default'
  | 'active'
  | 'range-start'
  | 'range-middle'
  | 'range-end'
  | 'disabled'
  | 'present'
  | 'today';

export interface MbbizDatepickerCell {
  label: string;
  value: string;
  caption?: string;
  state?: MbbizDatepickerCellState;
  disabled?: boolean;
}

export interface MbbizDatepickerRangeValue {
  start: string | null;
  end: string | null;
}
