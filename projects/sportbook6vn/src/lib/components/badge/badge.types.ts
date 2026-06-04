export type Sportbook6vnBadgeColor = 'neutral' | 'orange' | 'blue' | 'dark-blue' | 'green' | 'red';

export type Sportbook6vnBadgeStatus =
  | 'invalid'
  | 'overdue'
  | 'unfinished'
  | 'renew-loan'
  | 'pending'
  | 'completed'
  | 'failed';

export interface Sportbook6vnBadgePresetConfig {
  color: Sportbook6vnBadgeColor;
}
