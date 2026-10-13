export interface DrawerDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export const DRAWER_DEMO_SECTIONS: DrawerDemoSection[] = [
  {
    id: 'basic',
    title: 'Basic',
    description:
      'Open a 736px right panel with Figma header, close, mask, and projected body. Click the mask, press Esc, or use the X to close.',
    tags: ['selector=mbbiz-drawer', 'placement=right', 'width=736'],
  },
];

export const DRAWER_VARIABLE_GROUPS = [
  {
    title: 'Drawer Color Tokens',
    rows: [
      {
        token: 'overlay/primary',
        value: 'black/50%',
        appliesTo: 'Mask fill',
        notes: 'Maps to --color-semantic-overlay-primary / #00000080.',
      },
      {
        token: 'background/primary',
        value: 'white/100%',
        appliesTo: 'Panel fill',
        notes: 'Maps to --color-semantic-background-primary.',
      },
      {
        token: 'text/primary',
        value: 'darkblue/1000',
        appliesTo: 'Title and body copy',
        notes: 'Maps to Alias/Semantic1/1000 / #192D39.',
      },
      {
        token: 'icon/neutral4',
        value: 'darkblue/500',
        appliesTo: 'Close icon A Linear/Cancel',
        notes: 'Maps to --color-semantic-icon-neutral4 / #6D83A7.',
      },
    ],
  },
  {
    title: 'Drawer Layout Specs',
    rows: [
      { token: 'drawer/width', value: '736px', appliesTo: 'Right panel', notes: 'Figma Ưu đãi width. Zorro nzSize=large.' },
      { token: 'drawer/padding', value: '24px', appliesTo: 'Panel inner padding', notes: 'Figma Content padding 24.' },
      { token: 'drawer/header', value: '32px', appliesTo: 'Title row height', notes: 'H1 24-Semibold with 24px close.' },
      { token: 'drawer/header-gap', value: '16px', appliesTo: 'Title-to-close gap', notes: '648 title + 16 + 24 close = 688.' },
      { token: 'drawer/body-offset', value: '40px', appliesTo: 'Header-to-body gap', notes: 'Figma body starts at y=72.' },
      { token: 'drawer/body-gap', value: '12px', appliesTo: 'Stacked body lines', notes: 'H2 Sub-Header 16-Regular / 24 line-height.' },
    ],
  },
];

export const DRAWER_VARIABLE_NOTES = [
  'Drawer maps Figma node 25303:225221 Basic. Wraps nz-drawer for overlay, slide, mask click, and Esc. Consumers use mbbiz-drawer, not nz-drawer.',
  'v1 is right placement at 736px with title, alinear_cancel close, and ng-content body. The Figma footer is hidden and not in the API.',
];
