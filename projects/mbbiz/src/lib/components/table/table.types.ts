import type { MbbizItemFileKind } from '../item-file/item-file.types';
import type {
  MbbizButtonShape,
  MbbizButtonSize,
  MbbizButtonVariant,
} from '../button/button.types';

export type MbbizTableCellType =
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

export type MbbizTableAlign = 'left' | 'center' | 'right';
export type MbbizTableFixed = 'left' | 'right';
export type MbbizTableSortOrder = 'ascend' | 'descend' | null;
export type MbbizTableSize = 'default' | 'compact';
export type MbbizTableStatusTone = 'success' | 'error' | 'warning' | 'neutral' | 'info';
export type MbbizTableAlertTone = 'error' | 'warning' | 'info';
export type MbbizTableIconName = 'trash' | 'eye';

export interface MbbizTableOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface MbbizTableColumn {
  key: string;
  title: string;
  type?: MbbizTableCellType;
  width?: number | string;
  align?: MbbizTableAlign;
  headerAlign?: MbbizTableAlign;
  fixed?: MbbizTableFixed;
  sortable?: boolean;
  sortOrder?: MbbizTableSortOrder;
  placeholder?: string;
  options?: readonly MbbizTableOption[];
  disabled?: boolean;
  buttonVariant?: MbbizButtonVariant;
  buttonSize?: MbbizButtonSize;
  buttonShape?: MbbizButtonShape;
}

export interface MbbizTableStatusCell {
  label: string;
  tone?: MbbizTableStatusTone;
}

export interface MbbizTableFileCell {
  kind?: MbbizItemFileKind;
  name?: string;
  alt?: string;
}

export interface MbbizTableCurrencyCell {
  code?: string;
  label?: string;
  flagSrc?: string;
  flagAlt?: string;
}

export interface MbbizTableRemindCell {
  iconSrc?: string;
  alt?: string;
  label?: string;
}

export interface MbbizTableActionCell {
  label?: string;
  value?: string | number;
  disabled?: boolean;
  variant?: MbbizButtonVariant;
  size?: MbbizButtonSize;
  shape?: MbbizButtonShape;
}

export interface MbbizTableIconAction {
  icon?: MbbizTableIconName;
  label?: string;
  value?: string | number;
  disabled?: boolean;
}

export interface MbbizTableIconCell {
  icon?: MbbizTableIconName;
  label?: string;
  value?: string | number;
  disabled?: boolean;
  icons?: readonly MbbizTableIconAction[];
}

export interface MbbizTableCheckboxCell {
  label?: string;
  value?: boolean;
  disabled?: boolean;
}

export interface MbbizTableInputCell {
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
}

export interface MbbizTableDropdownCell {
  value?: string | number | null;
  placeholder?: string;
  disabled?: boolean;
  options?: readonly MbbizTableOption[];
}

export interface MbbizTableAlertCell {
  label?: string;
  tone?: MbbizTableAlertTone;
}

export type MbbizTableCellValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | MbbizTableStatusCell
  | MbbizTableFileCell
  | MbbizTableCurrencyCell
  | MbbizTableRemindCell
  | MbbizTableActionCell
  | MbbizTableIconCell
  | MbbizTableCheckboxCell
  | MbbizTableInputCell
  | MbbizTableDropdownCell
  | MbbizTableAlertCell;

export type MbbizTableRow = Record<string, MbbizTableCellValue>;

export interface MbbizTableRowEvent {
  row: MbbizTableRow;
  rowKey: string;
  rowIndex: number;
}

export interface MbbizTableCellEvent extends MbbizTableRowEvent {
  column: MbbizTableColumn;
  value: MbbizTableCellValue;
}

export interface MbbizTableCellValueChange extends MbbizTableCellEvent {
  nextValue: string | number | boolean | null;
}

export interface MbbizTableSortChange {
  column: MbbizTableColumn;
  order: MbbizTableSortOrder;
}
