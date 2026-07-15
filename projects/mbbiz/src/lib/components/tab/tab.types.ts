export type MbbizTabVariant = 'pill' | 'underlined';

export type MbbizTabSize = 'large' | 'small';

export interface MbbizTabItem {
  id?: string;
  label: string;
  disabled?: boolean;
  count?: number | string | null;
  ariaLabel?: string;
}

export interface MbbizTabChangeEvent {
  index: number;
  item: MbbizTabItem;
}
