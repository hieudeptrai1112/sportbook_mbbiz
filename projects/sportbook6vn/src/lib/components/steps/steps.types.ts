export type Sportbook6vnStepsDirection = 'vertical';
export type Sportbook6vnStepsInactiveMarker = 'filled' | 'outline';
export type Sportbook6vnStepsSize = 'default' | 'badge';
export type Sportbook6vnStepStatus = 'wait' | 'process' | 'finish';

export interface Sportbook6vnStepItem {
  title: string;
  description?: string | null;
  disabled?: boolean;
  status?: Sportbook6vnStepStatus;
}
