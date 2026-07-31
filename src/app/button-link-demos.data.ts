export type ButtonLinkDemoVariant = 'default' | 'size' | 'states' | 'href';

export interface ButtonLinkDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  variant: ButtonLinkDemoVariant;
}


export const BUTTON_LINK_DEMO_SECTIONS: ButtonLinkDemoSection[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'Baseline large underline link button.',
    tags: ['selector=mbbiz-button-link', 'size=lg'],
    variant: 'default',
  },
  {
    id: 'size',
    title: 'Size',
    description: 'Small, medium, and large typography sizes.',
    tags: ['selector=mbbiz-button-link', 'size=sm/md/lg'],
    variant: 'size',
  },
  {
    id: 'states',
    title: 'States',
    description: 'Default, hover, pressed, and disabled color states.',
    tags: ['selector=mbbiz-button-link', 'state=default/hover/pressed/disabled'],
    variant: 'states',
  },
  {
    id: 'href',
    title: 'Anchor Mode',
    description: 'When href is set, the control renders as an anchor instead of a button.',
    tags: ['selector=mbbiz-button-link', 'href=/docs'],
    variant: 'href',
  },
];

export const BUTTON_LINK_VARIABLE_GROUPS = [
  {
    title: 'Button Link Color Tokens',
    rows: [
      { token: 'hyperlink/primary',   value: 'blue/500',      appliesTo: 'Default text color',  notes: 'Maps to --mbbiz-color-button-link-default.' },
      { token: 'text/brand-primary2', value: 'blue/400',      appliesTo: 'Hover text color',    notes: 'Maps to --mbbiz-color-button-link-hover.' },
      { token: 'text/brand-primary3', value: 'blue/300',      appliesTo: 'Pressed text color',  notes: 'Maps to --mbbiz-color-button-link-pressed.' },
      { token: 'hyperlink/disable',   value: 'grayscale/500', appliesTo: 'Disabled text color', notes: 'Maps to --mbbiz-color-button-link-disabled.' },
    ],
  },
  {
    title: 'Button Link Typography Specs',
    rows: [
      {
        token: 'button-link/font/lg',
        value: '16 / 24',
        appliesTo: 'Large size typography',
        notes: 'font-size / line-height with 0.5px letter-spacing.',
      },
      {
        token: 'button-link/font/md',
        value: '14 / 20',
        appliesTo: 'Medium size typography',
        notes: 'font-size / line-height.',
      },
      {
        token: 'button-link/font/sm',
        value: '12 / 16',
        appliesTo: 'Small size typography',
        notes: 'font-size / line-height with 2px vertical padding.',
      },
    ],
  },
];

export const BUTTON_LINK_VARIABLE_NOTES = [
  'Color rows map to CSS custom properties implemented by mbbiz-button-link.',
  'Docs preview uses host classes mbbiz-button-link-preview-hover and mbbiz-button-link-preview-pressed to freeze hover/pressed colors.',
];
