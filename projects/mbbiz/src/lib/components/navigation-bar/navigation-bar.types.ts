export type MbbizNavigationBarVariant = 'maker' | 'checker' | '1user';

export type MbbizNavigationItemState = 'default' | 'hover' | 'active' | 'disabled' | 'comingSoon';

export interface MbbizNavigationSubItem {
  id: string;
  label: string;
  disabled?: boolean;
  comingSoon?: boolean;
  showNew?: boolean;
  favourite?: boolean;
  children?: readonly MbbizNavigationSubItem[];
  /** Preview-only override. Runtime uses hover, activeId, and expand. */
  state?: MbbizNavigationItemState;
}

export interface MbbizNavigationBarItem {
  id: string;
  label: string;
  /** @mbbiz/icon name used for default, hover, and disabled. */
  icon: string;
  /** Filled @mbbiz/icon name used for the active state. Falls back to `icon`. */
  iconActive?: string;
  href?: string | null;
  disabled?: boolean;
  showNew?: boolean;
  children?: readonly MbbizNavigationSubItem[];
  /** Preview-only override. Runtime uses activeId + :hover + disabled. */
  state?: MbbizNavigationItemState;
}

export interface MbbizNavigationItemClick {
  item: MbbizNavigationBarItem | MbbizNavigationSubItem;
  index: number;
  level: 1 | 2 | 3;
}
