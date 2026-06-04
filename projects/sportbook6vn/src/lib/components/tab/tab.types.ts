export type Sportbook6vnTabVariant = 'pill' | 'underlined';

export type Sportbook6vnTabSize = 'large' | 'small';

export interface Sportbook6vnTabItem {
  id?: string;
  label: string;
  disabled?: boolean;
  count?: number | string | null;
  ariaLabel?: string;
}

export interface Sportbook6vnTabChangeEvent {
  index: number;
  item: Sportbook6vnTabItem;
}
