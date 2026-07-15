export type MbbizBadgeColor = 'neutral' | 'orange' | 'blue' | 'dark-blue' | 'green' | 'red';

export type MbbizBadgeStatus =
  | 'invalid'
  | 'overdue'
  | 'unfinished'
  | 'renew-loan'
  | 'pending'
  | 'completed'
  | 'failed';

export interface MbbizBadgePresetConfig {
  color: MbbizBadgeColor;
}
