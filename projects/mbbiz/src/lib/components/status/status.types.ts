export type MbbizStatusColor = 'neutral' | 'orange' | 'blue' | 'dark-blue' | 'green' | 'red';

export type MbbizStatusPreset =
  | 'invalid'
  | 'overdue'
  | 'unfinished'
  | 'renew-loan'
  | 'pending'
  | 'completed'
  | 'failed';

export interface MbbizStatusPresetConfig {
  color: MbbizStatusColor;
  label: string;
}
