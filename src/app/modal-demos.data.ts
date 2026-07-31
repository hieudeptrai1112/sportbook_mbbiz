export type ModalDemoVariant = 'default' | 'single' | 'one-field' | 'no-close';

export interface ModalDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  variant: ModalDemoVariant;
}


export const MODAL_DEMO_SECTIONS: ModalDemoSection[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'Two-field dialog with double actions and close control.',
    tags: ['selector=mbbiz-modal', 'actionLayout=double', 'showClose=true'],
    variant: 'default',
  },
  {
    id: 'single',
    title: 'Single Action',
    description: 'Primary-only footer for confirm-style dialogs.',
    tags: ['selector=mbbiz-modal', 'actionLayout=single'],
    variant: 'single',
  },
  {
    id: 'one-field',
    title: 'One Field',
    description: 'Body can hide the second input while keeping the same shell.',
    tags: ['selector=mbbiz-modal', 'showSecondField=false'],
    variant: 'one-field',
  },
  {
    id: 'no-close',
    title: 'Without Close',
    description: 'Close icon can be removed when dismiss must go through actions.',
    tags: ['selector=mbbiz-modal', 'showClose=false'],
    variant: 'no-close',
  },
];

export const MODAL_VARIABLE_GROUPS = [
  {
    title: 'Modal Color Tokens',
    rows: [
      { token: 'background/primary',        value: 'white/100%',   appliesTo: 'Dialog panel and header background', notes: 'Maps to --mbbiz-color-surface-primary.' },
      { token: 'text/primary',              value: 'darkblue/1000', appliesTo: 'Modal title and field label text',  notes: 'Maps to --mbbiz-color-text-field.' },
      { token: 'icon/neutral1',             value: 'darkblue/1000', appliesTo: 'Close icon',                        notes: 'Maps to --mbbiz-color-message-close.' },
      { token: 'background/brand-secondary1', value: 'purple/500', appliesTo: 'Secondary action brand override',   notes: 'Local modal brand override for secondary buttons.' },
      { token: 'modal/shadow',              value: '0 20px 64px rgba(15,23,42,0.08)', appliesTo: 'Dialog elevation', notes: 'Hardcoded panel shadow.' },
    ],
  },
  {
    title: 'Modal Layout Specs',
    rows: [
      {
        token: 'modal/max-width',
        value: '1000px',
        appliesTo: 'Host max width',
        notes: 'Host width is min(100%, 1000px).',
      },
      {
        token: 'modal/radius',
        value: '4px',
        appliesTo: 'Panel corner radius',
        notes: 'Fixed visual spec.',
      },
      {
        token: 'modal/header/padding',
        value: '16px 28px',
        appliesTo: 'Header padding',
        notes: 'Fixed visual spec.',
      },
      {
        token: 'modal/body/padding',
        value: '28px',
        appliesTo: 'Body padding',
        notes: 'Fixed visual spec.',
      },
      {
        token: 'modal/body/gap',
        value: '20px',
        appliesTo: 'Field stack gap',
        notes: 'Body grid gap.',
      },
      {
        token: 'modal/footer/padding',
        value: '16px 20px',
        appliesTo: 'Footer padding',
        notes: 'Fixed visual spec.',
      },
      {
        token: 'modal/actions/gap',
        value: '16px',
        appliesTo: 'Double-action button gap',
        notes: 'Action row gap.',
      },
      {
        token: 'modal/actions/double/width',
        value: '272px',
        appliesTo: 'Double action cluster width',
        notes: 'Centered footer action cluster.',
      },
      {
        token: 'modal/actions/single/min-width',
        value: '200px',
        appliesTo: 'Single primary button min width',
        notes: 'Confirm-style footer.',
      },
    ],
  },
];

export const MODAL_VARIABLE_NOTES = [
  'Modal currently uses local shell colors rather than --mbbiz-color-modal-* theme aliases.',
  'Field controls and footer buttons inherit Input and Button component tokens under the modal overrides.',
];
