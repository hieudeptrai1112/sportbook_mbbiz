export type MbbizBreadcrumbState = 'default' | 'hover' | 'focus';

export interface MbbizBreadcrumbItem {
  label: string;
  href?: string | null;
  disabled?: boolean;
}
