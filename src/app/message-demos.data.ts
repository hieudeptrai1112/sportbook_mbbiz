import type { MbbizMessageType } from 'mbbiz';

export type MessageDemoVariant = 'default' | 'type' | 'dismissible' | 'service';

export interface MessageDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  variant: MessageDemoVariant;
}

export interface MessageCase {
  type: Extract<MbbizMessageType, 'inform' | 'warning' | 'error' | 'success'>;
  content: string;
}

export const MESSAGE_DEMO_SECTIONS: MessageDemoSection[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'Baseline inform message for non-blocking feedback.',
    tags: ['selector=mbbiz-message', 'type=inform'],
    variant: 'default',
  },
  {
    id: 'type',
    title: 'Type',
    description: 'Inform, warning, error, and success states from the approved preview draft.',
    tags: ['selector=mbbiz-message', 'type=inform/warning/error/success'],
    variant: 'type',
  },
  {
    id: 'dismissible',
    title: 'Dismissible',
    description: 'Close icon is enabled when the message requires manual dismissal.',
    tags: ['selector=mbbiz-message', 'closable=true'],
    variant: 'dismissible',
  },
  {
    id: 'service',
    title: 'Service',
    description: 'Service calls create top messages that auto close after five seconds.',
    tags: ['service=MbbizMessageService', 'duration=5000', 'top=32'],
    variant: 'service',
  },
];

export const MESSAGE_CASES: MessageCase[] = [
  { type: 'inform', content: 'Informative inform.' },
  { type: 'warning', content: 'Warning inform with dismiss button.' },
  { type: 'error', content: 'Error inform with dismiss button.' },
  { type: 'success', content: 'Success inform with dismiss button.' },
];
