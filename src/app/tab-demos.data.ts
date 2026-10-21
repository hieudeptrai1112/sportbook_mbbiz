export type TabDemoVariant = 'default' | 'type' | 'size' | 'disabled-count';

export interface TabDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  variant: TabDemoVariant;
}


export const TAB_DEMO_SECTIONS: TabDemoSection[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'Baseline large pill tab with three items.',
    tags: ['selector=mbbiz-tab', 'variant=pill', 'size=large'],
    variant: 'default',
  },
  {
    id: 'type',
    title: 'Type',
    description: 'Pill and underlined variants use the same item API.',
    tags: ['selector=mbbiz-tab', 'variant=pill/underlined'],
    variant: 'type',
  },
  {
    id: 'size',
    title: 'Size',
    description: 'Small size switches typography and vertical padding for both variants.',
    tags: ['selector=mbbiz-tab', 'size=small'],
    variant: 'size',
  },
  {
    id: 'disabled-count',
    title: 'Disabled and Count',
    description: 'Disabled pill and underlined count states are controlled from item data.',
    tags: ['selector=mbbiz-tab', 'disabled=true', 'count=12'],
    variant: 'disabled-count',
  },
];

export const TAB_VARIABLE_GROUPS = [
  {
    title: 'Tab Color Tokens',
    rows: [
      { token: 'text/secondary',            value: 'darkblue/500',  appliesTo: 'Default item label',                notes: 'Maps to --mbbiz-color-tab-text.' },
      { token: 'text/brand-primary1',       value: 'blue/500',      appliesTo: 'Underlined active label and focus ring', notes: 'Maps to --mbbiz-color-tab-active-text.' },
      { token: 'background/brand-tertiary2', value: 'turquoise/400', appliesTo: 'Pill active background',            notes: 'Maps to --mbbiz-color-tab-pill-active-bg.' },
      { token: 'text/on-brand-tertiary',    value: 'darkblue/1000', appliesTo: 'Pill active label',                 notes: 'Maps to --mbbiz-color-tab-pill-active-text.' },
      { token: 'border/brand-primary3',     value: 'blue/300',      appliesTo: 'Underlined track border',           notes: 'Maps to --mbbiz-color-tab-line.' },
      { token: 'background/disable3',       value: 'grayscale/200', appliesTo: 'Disabled active pill background',   notes: 'Maps to --mbbiz-color-tab-disabled-bg.' },
      { token: 'text/disable4',             value: 'grayscale/400', appliesTo: 'Disabled item label',               notes: 'Maps to --mbbiz-color-tab-disabled-text.' },
      { token: 'background/error-secondary', value: 'red/400',      appliesTo: 'Count badge background',            notes: 'Maps to --mbbiz-color-tab-count-bg.' },
      { token: 'text/on-error',             value: 'white/100%',    appliesTo: 'Count badge text',                  notes: 'Maps to --mbbiz-color-tab-count-text.' },
    ],
  },
  {
    title: 'Tab Sizing Specs',
    rows: [
      {
        token: 'tab/item/gap',
        value: '16px',
        appliesTo: 'Space between tab items',
        notes: 'Tab list layout gap.',
      },
      {
        token: 'tab/label/gap',
        value: '8px',
        appliesTo: 'Label to count badge gap',
        notes: 'Item internal gap.',
      },
      {
        token: 'tab/count/min-size',
        value: '16px',
        appliesTo: 'Count badge min width and height',
        notes: 'Fixed visual spec.',
      },
      {
        token: 'tab/font/large',
        value: '14 / 20',
        appliesTo: 'Large size typography',
        notes: 'font-size / line-height.',
      },
      {
        token: 'tab/font/small',
        value: '12 / 16',
        appliesTo: 'Small size typography',
        notes: 'font-size / line-height.',
      },
    ],
  },
];

export const TAB_VARIABLE_NOTES = [
  'Color rows map to CSS custom properties implemented by mbbiz-tab.',
  'Pill and underlined variants share the same color token layer and differ mainly by active treatment.',
];
