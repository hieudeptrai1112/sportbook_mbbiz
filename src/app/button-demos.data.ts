export type ButtonCodeType = 'js' | 'ts';

export type DsButtonShape = 'rectangle' | 'pill';
export type DsButtonTone = 'primary' | 'secondary';
export type DsButtonState = 'default' | 'hover' | 'pressed' | 'disabled';
export type DsButtonSize = 'large' | 'medium' | 'small';

export interface ButtonDemoAction {
  label: string;
  shape?: DsButtonShape;
  tone?: DsButtonTone;
  state?: DsButtonState;
  size?: DsButtonSize;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
}

export interface ButtonDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  actions: ButtonDemoAction[];
  codeJs: string;
  codeTs?: string;
}

export interface ButtonApiRow {
  property: string;
  description: string;
  type: string;
  defaultValue: string;
}

export const BUTTON_DEMO_SECTIONS: ButtonDemoSection[] = [
  {
    id: 'rectangle-primary',
    title: 'Rectangle · Primary',
    description:
      'Primary rectangle button from Figma includes gradient background and four semantic states.',
    tags: ['shape=rectangle', 'tone=primary', 'states=default/hover/pressed/disabled'],
    actions: [
      { label: 'Text', shape: 'rectangle', tone: 'primary', state: 'default', size: 'large' },
      { label: 'Text', shape: 'rectangle', tone: 'primary', state: 'hover', size: 'large' },
      { label: 'Text', shape: 'rectangle', tone: 'primary', state: 'pressed', size: 'large' },
      { label: 'Text', shape: 'rectangle', tone: 'primary', state: 'disabled', size: 'large' },
    ],
    codeJs: `<app-ds-button label="Text" shape="rectangle" tone="primary" state="default" size="large" />
<app-ds-button label="Text" shape="rectangle" tone="primary" state="hover" size="large" />
<app-ds-button label="Text" shape="rectangle" tone="primary" state="pressed" size="large" />
<app-ds-button label="Text" shape="rectangle" tone="primary" state="disabled" size="large" />`,
    codeTs: `import { DsButtonComponent } from './components/ds-button/ds-button.component';`,
  },
  {
    id: 'rectangle-secondary',
    title: 'Rectangle · Secondary',
    description:
      'Secondary rectangle button is border-only and uses role colors for each interaction state.',
    tags: ['shape=rectangle', 'tone=secondary', 'outlined'],
    actions: [
      { label: 'Text', shape: 'rectangle', tone: 'secondary', state: 'default', size: 'large' },
      { label: 'Text', shape: 'rectangle', tone: 'secondary', state: 'hover', size: 'large' },
      { label: 'Text', shape: 'rectangle', tone: 'secondary', state: 'pressed', size: 'large' },
      { label: 'Text', shape: 'rectangle', tone: 'secondary', state: 'disabled', size: 'large' },
    ],
    codeJs: `<app-ds-button label="Text" shape="rectangle" tone="secondary" state="default" size="large" />
<app-ds-button label="Text" shape="rectangle" tone="secondary" state="hover" size="large" />
<app-ds-button label="Text" shape="rectangle" tone="secondary" state="pressed" size="large" />
<app-ds-button label="Text" shape="rectangle" tone="secondary" state="disabled" size="large" />`,
    codeTs: `import { DsButtonComponent } from './components/ds-button/ds-button.component';`,
  },
  {
    id: 'size-scale',
    title: 'Size Scale',
    description:
      'The component supports large, medium and small sizes for both rectangle and pill shapes.',
    tags: ['size=large/medium/small', 'shape=rectangle/pill'],
    actions: [
      { label: 'Text', shape: 'rectangle', tone: 'primary', state: 'default', size: 'large' },
      { label: 'Text', shape: 'rectangle', tone: 'primary', state: 'default', size: 'medium' },
      { label: 'Text', shape: 'rectangle', tone: 'primary', state: 'default', size: 'small' },
      { label: 'Text', shape: 'pill', tone: 'primary', state: 'default', size: 'large' },
      { label: 'Text', shape: 'pill', tone: 'primary', state: 'default', size: 'medium' },
      { label: 'Text', shape: 'pill', tone: 'primary', state: 'default', size: 'small' },
    ],
    codeJs: `<app-ds-button label="Text" shape="rectangle" tone="primary" size="large" />
<app-ds-button label="Text" shape="rectangle" tone="primary" size="medium" />
<app-ds-button label="Text" shape="rectangle" tone="primary" size="small" />
<app-ds-button label="Text" shape="pill" tone="primary" size="large" />
<app-ds-button label="Text" shape="pill" tone="primary" size="medium" />
<app-ds-button label="Text" shape="pill" tone="primary" size="small" />`,
    codeTs: `import { DsButtonComponent } from './components/ds-button/ds-button.component';`,
  },
  {
    id: 'pill-secondary',
    title: 'Pill · Secondary',
    description:
      'Pill secondary variant keeps transparent background and rounded radius (20px) across states.',
    tags: ['shape=pill', 'tone=secondary', 'radius=20px'],
    actions: [
      { label: 'Text', shape: 'pill', tone: 'secondary', state: 'default', size: 'medium' },
      { label: 'Text', shape: 'pill', tone: 'secondary', state: 'hover', size: 'medium' },
      { label: 'Text', shape: 'pill', tone: 'secondary', state: 'pressed', size: 'medium' },
      { label: 'Text', shape: 'pill', tone: 'secondary', state: 'disabled', size: 'medium' },
    ],
    codeJs: `<app-ds-button label="Text" shape="pill" tone="secondary" state="default" size="medium" />
<app-ds-button label="Text" shape="pill" tone="secondary" state="hover" size="medium" />
<app-ds-button label="Text" shape="pill" tone="secondary" state="pressed" size="medium" />
<app-ds-button label="Text" shape="pill" tone="secondary" state="disabled" size="medium" />`,
    codeTs: `import { DsButtonComponent } from './components/ds-button/ds-button.component';`,
  },
  {
    id: 'with-icons',
    title: 'With Icons',
    description:
      'Toggle left and right icon slots to match Figma properties Show Icon Left and Show Icon Right.',
    tags: ['showLeftIcon', 'showRightIcon'],
    actions: [
      {
        label: 'Text',
        shape: 'rectangle',
        tone: 'primary',
        state: 'default',
        size: 'medium',
        showLeftIcon: true,
      },
      {
        label: 'Text',
        shape: 'rectangle',
        tone: 'primary',
        state: 'default',
        size: 'medium',
        showRightIcon: true,
      },
      {
        label: 'Text',
        shape: 'pill',
        tone: 'secondary',
        state: 'hover',
        size: 'medium',
        showLeftIcon: true,
        showRightIcon: true,
      },
    ],
    codeJs: `<app-ds-button label="Text" shape="rectangle" tone="primary" size="medium" [showLeftIcon]="true" />
<app-ds-button label="Text" shape="rectangle" tone="primary" size="medium" [showRightIcon]="true" />
<app-ds-button label="Text" shape="pill" tone="secondary" state="hover" size="medium" [showLeftIcon]="true" [showRightIcon]="true" />`,
    codeTs: `import { DsButtonComponent } from './components/ds-button/ds-button.component';`,
  },
];

export const BUTTON_API_ROWS: ButtonApiRow[] = [
  {
    property: 'shape',
    description: 'Visual silhouette based on Figma variant axis.',
    type: "'rectangle' | 'pill'",
    defaultValue: "'rectangle'",
  },
  {
    property: 'tone',
    description: 'Color style axis mapped from Primary / Secondary.',
    type: "'primary' | 'secondary'",
    defaultValue: "'primary'",
  },
  {
    property: 'state',
    description: 'Displays explicit visual state for documentation and QA.',
    type: "'default' | 'hover' | 'pressed' | 'disabled'",
    defaultValue: "'default'",
  },
  {
    property: 'size',
    description: 'Maps to Large, Medium and Small size variants from Figma.',
    type: "'large' | 'medium' | 'small'",
    defaultValue: "'large'",
  },
  {
    property: 'label',
    description: 'Text content rendered in the button.',
    type: 'string',
    defaultValue: "'Text'",
  },
  {
    property: 'showLeftIcon',
    description: 'Shows the left icon slot (+) when true.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'showRightIcon',
    description: 'Shows the right icon slot (+) when true.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'buttonType',
    description: 'Native button type attribute.',
    type: "'button' | 'submit' | 'reset'",
    defaultValue: "'button'",
  },
];
