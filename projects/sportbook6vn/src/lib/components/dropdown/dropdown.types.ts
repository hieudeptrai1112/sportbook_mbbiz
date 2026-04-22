export interface Sportbook6vnDropdownItem {
  id: string;
  label: string;
  disabled?: boolean;
  imageUrl?: string | null;
}

export type Sportbook6vnDropdownMode = 'single' | 'multiple';

export type Sportbook6vnDropdownLabelMode = 'outside' | 'inside';

export type Sportbook6vnDropdownStatus = 'default' | 'error';

export type Sportbook6vnDropdownSearchBehavior = 'auto' | 'always' | 'never';

export type Sportbook6vnDropdownEmptyState =
  | 'none'
  | 'no-data'
  | 'search-no-data'
  | 'api-error'
  | 'loading';
