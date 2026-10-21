export type MbbizTagColor = 'neutral' | 'orange' | 'blue' | 'dark-blue' | 'green' | 'red';

export type MbbizTagStatus =
  | 'invalid'
  | 'overdue'
  | 'unfinished'
  | 'renew-loan'
  | 'pending'
  | 'completed'
  | 'failed';

export interface MbbizTagPresetConfig {
  color: MbbizTagColor;
}
