export const CHECKBOX_VARIABLE_GROUPS = [
  {
    title: 'Checkbox Color Tokens',
    rows: [
      { token: 'border/secondary',           value: 'darkblue/500',  appliesTo: 'Unchecked control border',         notes: 'Maps to --mbbiz-color-checkbox-border-default.' },
      { token: 'border/tertiary',            value: 'darkblue/400',  appliesTo: 'Unchecked hover border',           notes: 'Maps to --mbbiz-color-checkbox-border-hover.' },
      { token: 'border/quaternary',          value: 'darkblue/300',  appliesTo: 'Unchecked pressed border',         notes: 'Maps to --mbbiz-color-checkbox-border-pressed.' },
      { token: 'background/brand-tertiary2', value: 'turquoise/400', appliesTo: 'Checked and indeterminate fill',   notes: 'Maps to --mbbiz-color-checkbox-selected-default.' },
      { token: '--mbbiz-color-checkbox-selected-hover',   value: '#84EDED', appliesTo: 'Checked hover fill',        notes: 'Orphan — no matching alias. Maps to --mbbiz-color-checkbox-selected-hover.' },
      { token: '--mbbiz-color-checkbox-selected-pressed', value: '#29D0D0', appliesTo: 'Checked pressed fill',      notes: 'Orphan — no matching alias. Maps to --mbbiz-color-checkbox-selected-pressed.' },
      { token: 'icon/white',                 value: 'white/100%',    appliesTo: 'Check and indeterminate glyph',   notes: 'Maps to --mbbiz-color-checkbox-icon.' },
      { token: 'background/disable3',        value: 'grayscale/200', appliesTo: 'Disabled unchecked background',   notes: 'Maps to --mbbiz-color-checkbox-background-disabled.' },
      { token: 'border/disable2',            value: 'grayscale/400', appliesTo: 'Disabled unchecked border',       notes: 'Maps to --mbbiz-color-checkbox-border-disabled.' },
      { token: 'background/disable1',        value: 'grayscale/400', appliesTo: 'Disabled checked fill',           notes: 'Maps to --mbbiz-color-checkbox-selected-disabled.' },
      { token: 'text/primary',               value: 'darkblue/1000', appliesTo: 'Default label text',              notes: 'Maps to --mbbiz-color-text-field.' },
      { token: 'text/disable1',              value: 'grayscale/600', appliesTo: 'Disabled label text',             notes: 'Maps to --mbbiz-color-text-disabled.' },
      { token: 'border/error1',              value: 'red/500',       appliesTo: 'Error control border',            notes: 'Reuses --mbbiz-color-dropdown-border-error.' },
    ],
  },
  {
    title: 'Checkbox Sizing Specs',
    rows: [
      {
        token: 'control size',
        value: '20px × 20px',
        appliesTo: 'Checkbox square',
        notes: 'Fixed visual spec.',
      },
      {
        token: 'glyph size',
        value: '12px × 12px',
        appliesTo: 'Check and minus icons',
        notes: 'Fixed visual spec.',
      },
      {
        token: 'label gap',
        value: '8px',
        appliesTo: 'Space between control and label',
        notes: 'Component layout gap.',
      },
      {
        token: 'horizontal group gap',
        value: '18px',
        appliesTo: 'Checkbox group horizontal options',
        notes: 'Group layout gap.',
      },
      {
        token: 'vertical group gap',
        value: '12px',
        appliesTo: 'Checkbox group vertical options',
        notes: 'Group layout gap.',
      },
    ],
  },
];

export const CHECKBOX_VARIABLE_NOTES = [
  'Color rows map to CSS custom properties implemented by mbbiz-checkbox.',
  'Checkbox group inherits the same control colors and only adds layout gap.',
];
