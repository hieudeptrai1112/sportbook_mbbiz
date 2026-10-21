export type StatusDemoVariant = 'default' | 'colors';

export interface StatusDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  variant: StatusDemoVariant;
}


export const STATUS_DEMO_SECTIONS: StatusDemoSection[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'Baseline neutral status with compact dot and text.',
    tags: ['selector=mbbiz-status', 'status=invalid'],
    variant: 'default',
  },
  {
    id: 'colors',
    title: 'Colors',
    description: 'Color set from the approved Figma status node.',
    tags: ['selector=mbbiz-status', 'color=neutral/orange/blue/dark-blue/green/red'],
    variant: 'colors',
  },
];

export const STATUS_VARIABLE_GROUPS = [
  {
    title: 'Status Color Tokens',
    rows: [
      { token: 'background/disable1',      value: 'grayscale/400',  appliesTo: 'Neutral dot and label',        notes: 'Maps to --mbbiz-color-status-neutral.' },
      { token: 'background/warning-primary', value: 'orange/500',   appliesTo: 'Orange / overdue state',       notes: 'Maps to --mbbiz-color-status-orange.' },
      { token: 'background/brand-primary1', value: 'blue/500',      appliesTo: 'Blue / processing state',      notes: 'Maps to --mbbiz-color-status-blue.' },
      { token: 'text/secondary',            value: 'darkblue/500',  appliesTo: 'Dark-blue / pending state',    notes: 'Maps to --mbbiz-color-status-dark-blue.' },
      { token: 'background/success-primary', value: 'green/500',    appliesTo: 'Green / completed state',      notes: 'Maps to --mbbiz-color-status-green.' },
      { token: 'background/error-primary',  value: 'red/500',       appliesTo: 'Red / failed state',           notes: 'Maps to --mbbiz-color-status-red.' },
      { token: 'text/primary',              value: 'darkblue/1000', appliesTo: 'Optional description text',    notes: 'Maps to --mbbiz-color-status-description.' },
    ],
  },
  {
    title: 'Status Sizing Specs',
    rows: [
      {
        token: 'status/dot/size',
        value: '8px × 8px',
        appliesTo: 'Status indicator dot',
        notes: 'Fixed visual spec.',
      },
      {
        token: 'status/content/gap',
        value: '4px',
        appliesTo: 'Dot to label gap',
        notes: 'Component layout gap.',
      },
      {
        token: 'status/stack/gap',
        value: '4px',
        appliesTo: 'Content to description gap',
        notes: 'Component layout gap.',
      },
    ],
  },
];

export const STATUS_VARIABLE_NOTES = [
  'Color rows map to CSS custom properties implemented by mbbiz-status.',
  'Each color preset sets a single --mbbiz-status-color used by both the dot and the label.',
];
