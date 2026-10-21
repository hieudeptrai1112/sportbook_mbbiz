export type MbbizStepsDirection = 'horizontal' | 'vertical';
export type MbbizStepsSize = 'default' | 'badge';
export type MbbizStepStatus = 'wait' | 'process' | 'finish' | 'error';

export interface MbbizStepItem {
  title: string;
  description?: string | null;
  disabled?: boolean;
  status?: MbbizStepStatus;
}
