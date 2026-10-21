export interface MbbizDropdownItem {
  id: string;
  label: string;
  disabled?: boolean;
  imageUrl?: string | null;
}

export type MbbizDropdownMode = 'single' | 'multiple';

export type MbbizDropdownLabelMode = 'outside' | 'inside';

export type MbbizDropdownStatus = 'default' | 'error';

export type MbbizDropdownSearchBehavior = 'auto' | 'always' | 'never';

export type MbbizDropdownEmptyState =
  | 'none'
  | 'no-data'
  | 'search-no-data'
  | 'api-error'
  | 'loading';
