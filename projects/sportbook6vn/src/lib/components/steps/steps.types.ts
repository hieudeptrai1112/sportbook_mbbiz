export type Sportbook6vnStepsDirection = 'horizontal' | 'vertical';
export type Sportbook6vnStepsSize = 'default' | 'badge';
export type Sportbook6vnStepStatus = 'wait' | 'process' | 'finish' | 'error';

export interface Sportbook6vnStepItem {
  title: string;
  description?: string | null;
  disabled?: boolean;
  status?: Sportbook6vnStepStatus;
}
