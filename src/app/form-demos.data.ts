export const FORM_VARIABLE_GROUPS = [
  {
    title: 'Form Color Tokens',
    rows: [
      { token: 'text/primary',        value: 'darkblue/1000', appliesTo: 'Outer field label text', notes: 'Docs preview label color from Figma form shell.' },
      { token: 'text/error',          value: 'red/400',       appliesTo: 'Required asterisk',      notes: 'Docs preview required mark.' },
      { token: 'icon/brand-primary1', value: 'blue/500',      appliesTo: 'Label info icon',        notes: 'Docs preview helper icon color.' },
      { token: 'background/primary',  value: 'white/100%',    appliesTo: 'Form shell surface',     notes: 'Preview card background.' },
    ],
  },
  {
    title: 'Form Layout Specs',
    rows: [
      {
        token: 'form/shell/padding',
        value: '28px',
        appliesTo: 'Form shell padding',
        notes: 'Matches Figma node 10880:59561.',
      },
      {
        token: 'form/shell/gap',
        value: '20px',
        appliesTo: 'Vertical gap between fields',
        notes: 'Matches Figma auto-layout gap.',
      },
      {
        token: 'form/field/gap',
        value: '4px',
        appliesTo: 'Label row to control gap',
        notes: 'Outer-label field stack.',
      },
      {
        token: 'form/label/gap',
        value: '4px',
        appliesTo: 'Label text to required mark',
        notes: 'Inline label cluster gap.',
      },
      {
        token: 'form/label-row/gap',
        value: '8px',
        appliesTo: 'Label cluster to info icon',
        notes: 'Label row auto-layout gap.',
      },
    ],
  },
];

export const FORM_VARIABLE_NOTES = [
  'Form is a docs composition pattern, not a standalone library component.',
  'Field control colors inherit from Dropdown (and related input) Component Token tables.',
];
