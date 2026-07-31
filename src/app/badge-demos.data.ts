export type BadgeDemoVariant = 'default' | 'status' | 'description';

export interface BadgeDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  variant: BadgeDemoVariant;
}

export const BADGE_DEMO_SECTIONS: BadgeDemoSection[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'Baseline neutral pill badge.',
    tags: ['selector=mbbiz-badge', 'status=invalid'],
    variant: 'default',
  },
  {
    id: 'status',
    title: 'Status',
    description: 'Status presets map to the approved color set from Figma.',
    tags: [
      'selector=mbbiz-badge',
      'status=invalid/overdue/unfinished/renew-loan/pending/completed/failed',
    ],
    variant: 'status',
  },
  {
    id: 'description',
    title: 'Description',
    description: 'Optional supporting text appears below the pill.',
    tags: ['selector=mbbiz-badge', 'showDescription=true'],
    variant: 'description',
  },
];

export const BADGE_VARIABLE_GROUPS = [
  {
    title: 'Badge Color Tokens',
    rows: [
      { token: 'background/disable2',       value: 'grayscale/300',    appliesTo: 'Neutral / invalid pill background',       notes: 'Maps to --mbbiz-color-badge-neutral-bg.' },
      { token: 'text/disable2',             value: 'grayscale/500',    appliesTo: 'Neutral / invalid pill text',             notes: 'Maps to --mbbiz-color-badge-neutral-text.' },
      { token: 'background/warning-tertiary', value: 'orange/100',    appliesTo: 'Overdue pill background',                  notes: 'Maps to --mbbiz-color-badge-orange-bg.' },
      { token: 'text/on-warning',           value: 'orange/500',       appliesTo: 'Overdue pill text',                       notes: 'Maps to --mbbiz-color-badge-orange-text.' },
      { token: 'background/secondary',      value: 'darkblue/200',     appliesTo: 'Unfinished soft blue background',         notes: 'Maps to --mbbiz-color-badge-blue-soft-bg.' },
      { token: 'text/brand-primary1',       value: 'blue/500',         appliesTo: 'Unfinished soft blue text',               notes: 'Maps to --mbbiz-color-badge-blue-text.' },
      { token: 'background/brand-primary1', value: 'blue/500',         appliesTo: 'Renew-loan solid blue background',        notes: 'Maps to --mbbiz-color-badge-blue-solid-bg.' },
      { token: 'background/brand-primary4', value: 'blue/200',         appliesTo: 'Pending pill background',                 notes: 'Maps to --mbbiz-color-badge-dark-blue-bg.' },
      { token: 'text/secondary',            value: 'darkblue/500',     appliesTo: 'Pending pill text',                       notes: 'Maps to --mbbiz-color-badge-dark-blue-text.' },
      { token: 'background/success-secondary', value: 'green/400',     appliesTo: 'Completed pill background',               notes: 'Maps to --mbbiz-color-badge-green-bg.' },
      { token: 'background/error-secondary', value: 'red/400',         appliesTo: 'Failed pill background',                  notes: 'Maps to --mbbiz-color-badge-red-bg.' },
      { token: 'text/white',                value: 'white/100%',       appliesTo: 'Text on solid green, red, and blue pills', notes: 'Maps to --mbbiz-color-badge-on-solid.' },
      { token: 'text/primary',              value: 'darkblue/1000',    appliesTo: 'Optional description text',               notes: 'Maps to --mbbiz-color-badge-description.' },
    ],
  },
  {
    title: 'Badge Sizing Specs',
    rows: [
      {
        token: 'badge/min-height',
        value: '24px',
        appliesTo: 'Pill label height',
        notes: 'Fixed visual spec.',
      },
      {
        token: 'badge/padding',
        value: '4px 12px',
        appliesTo: 'Pill horizontal and vertical padding',
        notes: 'Fixed visual spec.',
      },
      {
        token: 'badge/radius',
        value: '20px',
        appliesTo: 'Pill corner radius',
        notes: 'Fixed visual spec.',
      },
      {
        token: 'badge/gap',
        value: '4px',
        appliesTo: 'Pill to description gap',
        notes: 'Component layout gap.',
      },
    ],
  },
];

export const BADGE_VARIABLE_NOTES = [
  'Color rows map to CSS custom properties implemented by mbbiz-badge.',
  'Status presets remap to the same color token layer rather than introducing separate status token names.',
];
