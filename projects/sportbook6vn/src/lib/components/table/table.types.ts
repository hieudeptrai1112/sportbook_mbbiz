import type { Sportbook6vnItemFileKind } from '../item-file/item-file.types';
import type {
  Sportbook6vnButtonShape,
  Sportbook6vnButtonSize,
  Sportbook6vnButtonVariant,
} from '../button/button.types';

export type Sportbook6vnTableCellType =
  | 'text'
  | 'number'
  | 'currency'
  | 'money'
  | 'money-in'
  | 'money-out'
  | 'time'
  | 'remind'
  | 'reference-number'
  | 'payment-code'
  | 'status'
  | 'file'
  | 'alert'
  | 'checkbox'
  | 'icon'
  | 'button'
  | 'input'
  | 'dropdown';

export type Sportbook6vnTableAlign = 'left' | 'center' | 'right';
export type Sportbook6vnTableFixed = 'left' | 'right';
export type Sportbook6vnTableSortOrder = 'ascend' | 'descend' | null;
export type Sportbook6vnTableSize = 'default' | 'compact';
export type Sportbook6vnTableStatusTone = 'success' | 'error' | 'warning' | 'neutral' | 'info';
export type Sportbook6vnTableAlertTone = 'error' | 'warning' | 'info';
export type Sportbook6vnTableIconName = 'trash' | 'eye';

export interface Sportbook6vnTableOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface Sportbook6vnTableColumn {
  key: string;
  title: string;
  type?: Sportbook6vnTableCellType;
  width?: number | string;
  align?: Sportbook6vnTableAlign;
  headerAlign?: Sportbook6vnTableAlign;
  fixed?: Sportbook6vnTableFixed;
  sortable?: boolean;
  sortOrder?: Sportbook6vnTableSortOrder;
  placeholder?: string;
  options?: readonly Sportbook6vnTableOption[];
  disabled?: boolean;
  buttonVariant?: Sportbook6vnButtonVariant;
  buttonSize?: Sportbook6vnButtonSize;
  buttonShape?: Sportbook6vnButtonShape;
}

export interface Sportbook6vnTableStatusCell {
  label: string;
  tone?: Sportbook6vnTableStatusTone;
}

export interface Sportbook6vnTableFileCell {
  kind?: Sportbook6vnItemFileKind;
  name?: string;
  alt?: string;
}

export interface Sportbook6vnTableCurrencyCell {
  code?: string;
  label?: string;
  flagSrc?: string;
  flagAlt?: string;
}

export interface Sportbook6vnTableRemindCell {
  iconSrc?: string;
  alt?: string;
  label?: string;
}

export interface Sportbook6vnTableActionCell {
  label?: string;
  value?: string | number;
  disabled?: boolean;
  variant?: Sportbook6vnButtonVariant;
  size?: Sportbook6vnButtonSize;
  shape?: Sportbook6vnButtonShape;
}

export interface Sportbook6vnTableIconAction {
  icon?: Sportbook6vnTableIconName;
  label?: string;
  value?: string | number;
  disabled?: boolean;
}

export interface Sportbook6vnTableIconCell {
  icon?: Sportbook6vnTableIconName;
  label?: string;
  value?: string | number;
  disabled?: boolean;
  icons?: readonly Sportbook6vnTableIconAction[];
}

export interface Sportbook6vnTableCheckboxCell {
  label?: string;
  value?: boolean;
  disabled?: boolean;
}

export interface Sportbook6vnTableInputCell {
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
}

export interface Sportbook6vnTableDropdownCell {
  value?: string | number | null;
  placeholder?: string;
  disabled?: boolean;
  options?: readonly Sportbook6vnTableOption[];
}

export interface Sportbook6vnTableAlertCell {
  label?: string;
  tone?: Sportbook6vnTableAlertTone;
}

export type Sportbook6vnTableCellValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Sportbook6vnTableStatusCell
  | Sportbook6vnTableFileCell
  | Sportbook6vnTableCurrencyCell
  | Sportbook6vnTableRemindCell
  | Sportbook6vnTableActionCell
  | Sportbook6vnTableIconCell
  | Sportbook6vnTableCheckboxCell
  | Sportbook6vnTableInputCell
  | Sportbook6vnTableDropdownCell
  | Sportbook6vnTableAlertCell;

export type Sportbook6vnTableRow = Record<string, Sportbook6vnTableCellValue>;

export interface Sportbook6vnTableRowEvent {
  row: Sportbook6vnTableRow;
  rowKey: string;
  rowIndex: number;
}

export interface Sportbook6vnTableCellEvent extends Sportbook6vnTableRowEvent {
  column: Sportbook6vnTableColumn;
  value: Sportbook6vnTableCellValue;
}

export interface Sportbook6vnTableCellValueChange extends Sportbook6vnTableCellEvent {
  nextValue: string | number | boolean | null;
}

export interface Sportbook6vnTableSortChange {
  column: Sportbook6vnTableColumn;
  order: Sportbook6vnTableSortOrder;
}
