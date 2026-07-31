export type SwitchDemoVariant = 'default' | 'size' | 'states' | 'disabled';

export interface SwitchDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  variant: SwitchDemoVariant;
}


export const SWITCH_DEMO_SECTIONS: SwitchDemoSection[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'Baseline medium switch in off and on states.',
    tags: ['selector=mbbiz-switch', 'size=m', 'checked=true/false'],
    variant: 'default',
  },
  {
    id: 'size',
    title: 'Size',
    description: 'Medium and large track sizes from the approved switch control.',
    tags: ['selector=mbbiz-switch', 'size=m/l'],
    variant: 'size',
  },
  {
    id: 'states',
    title: 'Interaction States',
    description: 'Loading and pressed interaction states for both off and on tracks.',
    tags: ['selector=mbbiz-switch', 'interactionState=loading/pressed'],
    variant: 'states',
  },
  {
    id: 'disabled',
    title: 'Disabled',
    description: 'Disabled off and on states block interaction while keeping visual state.',
    tags: ['selector=mbbiz-switch', 'disabled=true'],
    variant: 'disabled',
  },
];

export const SWITCH_VARIABLE_GROUPS = [
  {
    title: 'Switch Color Tokens',
    rows: [
      { token: 'border/secondary',           value: 'darkblue/500',  appliesTo: 'Off track background and loading ring', notes: 'Maps to --mbbiz-color-switch-background-inactive-default and --mbbiz-color-switch-loading-ring-inactive.' },
      { token: 'background/brand-tertiary2', value: 'turquoise/400', appliesTo: 'On track background and loading ring',  notes: 'Maps to --mbbiz-color-switch-background-active-default and --mbbiz-color-switch-loading-ring-active.' },
      { token: 'background/brand-tertiary3', value: 'turquoise/300', appliesTo: 'On track while loading',                notes: 'Maps to --mbbiz-color-switch-background-active-loading.' },
      { token: 'background/disable3',        value: 'grayscale/200', appliesTo: 'Disabled off track',                   notes: 'Maps to --mbbiz-color-switch-background-inactive-disabled.' },
      { token: 'background/brand-tertiary4', value: 'turquoise/200', appliesTo: 'Disabled on track',                    notes: 'Maps to --mbbiz-color-switch-background-active-disabled.' },
      { token: 'icon/white',                 value: 'white/100%',    appliesTo: 'Thumb fill',                            notes: 'Maps to --mbbiz-color-switch-thumb.' },
    ],
  },
  {
    title: 'Switch Sizing Specs',
    rows: [
      {
        token: 'switch/track/m',
        value: '32px × 16px',
        appliesTo: 'Medium track',
        notes: 'Fixed visual spec.',
      },
      {
        token: 'switch/thumb/m',
        value: '12px × 12px',
        appliesTo: 'Medium thumb',
        notes: 'Expands to 16px wide when pressed.',
      },
      {
        token: 'switch/track/l',
        value: '40px × 20px',
        appliesTo: 'Large track',
        notes: 'Fixed visual spec.',
      },
      {
        token: 'switch/thumb/l',
        value: '16px × 16px',
        appliesTo: 'Large thumb',
        notes: 'Expands to 20px wide when pressed.',
      },
    ],
  },
];

export const SWITCH_VARIABLE_NOTES = [
  'Color rows map to CSS custom properties implemented by mbbiz-switch.',
  'Theme currently falls back to component defaults when switch CSS variables are not defined on the host theme.',
];
