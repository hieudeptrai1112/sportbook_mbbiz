import type { Sportbook6vnMessageType } from 'sportbook6vn';

export type MessageDemoVariant = 'default' | 'type' | 'dismissible' | 'service';

export interface MessageDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  variant: MessageDemoVariant;
}

export interface MessageCase {
  type: Extract<Sportbook6vnMessageType, 'inform' | 'warning' | 'error' | 'success'>;
  content: string;
}

export const MESSAGE_DEMO_SECTIONS: MessageDemoSection[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'Baseline inform message for non-blocking feedback.',
    tags: ['selector=sportbook6vn-message', 'type=inform'],
    variant: 'default',
  },
  {
    id: 'type',
    title: 'Type',
    description: 'Inform, warning, error, and success states from the approved preview draft.',
    tags: ['selector=sportbook6vn-message', 'type=inform/warning/error/success'],
    variant: 'type',
  },
  {
    id: 'dismissible',
    title: 'Dismissible',
    description: 'Close icon is enabled when the message requires manual dismissal.',
    tags: ['selector=sportbook6vn-message', 'closable=true'],
    variant: 'dismissible',
  },
  {
    id: 'service',
    title: 'Service',
    description: 'Service calls create top messages that auto close after five seconds.',
    tags: ['service=Sportbook6vnMessageService', 'duration=5000', 'top=32'],
    variant: 'service',
  },
];

export const MESSAGE_CASES: MessageCase[] = [
  { type: 'inform', content: 'Informative inform.' },
  { type: 'warning', content: 'Warning inform with dismiss button.' },
  { type: 'error', content: 'Error inform with dismiss button.' },
  { type: 'success', content: 'Success inform with dismiss button.' },
];
