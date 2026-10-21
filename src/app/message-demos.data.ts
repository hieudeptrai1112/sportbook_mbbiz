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

export const MESSAGE_VARIABLE_GROUPS = [
  {
    title: 'Message Color Tokens',
    rows: [
      { token: 'background/primary',           value: 'white/100%',    appliesTo: 'Inform and loading surface',  notes: 'Maps to --mbbiz-color-message-inform-bg.' },
      { token: 'border/brand-primary3',         value: 'blue/300',      appliesTo: 'Inform and loading border',   notes: 'Maps to --mbbiz-color-message-inform-border.' },
      { token: 'icon/brand-primary1',           value: 'blue/500',      appliesTo: 'Inform and loading icon',     notes: 'Maps to --mbbiz-color-message-inform-icon.' },
      { token: 'background/warning-tertiary',   value: 'orange/100',    appliesTo: 'Warning surface',             notes: 'Maps to --mbbiz-color-message-warning-bg.' },
      { token: 'border/warning',                value: 'orange/300',    appliesTo: 'Warning border',              notes: 'Maps to --mbbiz-color-message-warning-border.' },
      { token: 'icon/warning',                  value: 'orange/500',    appliesTo: 'Warning icon',                notes: 'Maps to --mbbiz-color-message-warning-icon.' },
      { token: 'background/error-tertiary',     value: 'red/100',       appliesTo: 'Error surface',               notes: 'Maps to --mbbiz-color-message-error-bg.' },
      { token: 'border/error3',                 value: 'red/300',       appliesTo: 'Error border',                notes: 'Maps to --mbbiz-color-message-error-border.' },
      { token: 'icon/error',                    value: 'red/500',       appliesTo: 'Error icon',                  notes: 'Maps to --mbbiz-color-message-error-icon.' },
      { token: 'background/success-quaternary', value: 'green/100',     appliesTo: 'Success surface',             notes: 'Maps to --mbbiz-color-message-success-bg.' },
      { token: 'border/success',                value: 'green/300',     appliesTo: 'Success border',              notes: 'Maps to --mbbiz-color-message-success-border.' },
      { token: 'icon/success',                  value: 'green/500',     appliesTo: 'Success icon',                notes: 'Maps to --mbbiz-color-message-success-icon.' },
      { token: 'text/primary',                  value: 'darkblue/1000', appliesTo: 'Message body text',           notes: 'Maps to --mbbiz-color-message-text.' },
      { token: 'icon/neutral1',                 value: 'darkblue/1000', appliesTo: 'Dismiss icon',                notes: 'Maps to --mbbiz-color-message-close.' },
    ],
  },
  {
    title: 'Message Layout Specs',
    rows: [
      {
        token: 'message/width',
        value: '350px',
        appliesTo: 'Default message width',
        notes: 'Fixed visual spec.',
      },
      {
        token: 'message/min-height',
        value: '48px',
        appliesTo: 'Message shell height',
        notes: 'Fixed visual spec.',
      },
      {
        token: 'message/padding',
        value: '12px 16px',
        appliesTo: 'Message shell padding',
        notes: 'Fixed visual spec.',
      },
      {
        token: 'message/gap',
        value: '8px',
        appliesTo: 'Icon to content gap',
        notes: 'Component layout gap.',
      },
      {
        token: 'message/icon/size',
        value: '24px × 24px',
        appliesTo: 'Leading status icon',
        notes: 'Fixed visual spec.',
      },
      {
        token: 'message/shadow',
        value: '0 4px 24px rgba(0,0,0,0.1)',
        appliesTo: 'Message elevation',
        notes: 'Maps to --mbbiz-shadow-message.',
      },
    ],
  },
];

export const MESSAGE_VARIABLE_NOTES = [
  'Color rows map to CSS custom properties implemented by mbbiz-message.',
  'Loading reuses the inform color set; type variants only swap bg, border, and icon.',
];
