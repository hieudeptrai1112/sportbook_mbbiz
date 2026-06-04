export type Sportbook6vnStatusColor = 'neutral' | 'orange' | 'blue' | 'dark-blue' | 'green' | 'red';

export type Sportbook6vnStatusPreset =
  | 'invalid'
  | 'overdue'
  | 'unfinished'
  | 'renew-loan'
  | 'pending'
  | 'completed'
  | 'failed';

export interface Sportbook6vnStatusPresetConfig {
  color: Sportbook6vnStatusColor;
  label: string;
}
