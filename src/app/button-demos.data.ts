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

export interface ButtonVariableRow {
  token: string;
  value: string;
  appliesTo: string;
  notes: string;
}

export interface ButtonVariableGroup {
  title: string;
  description: string;
  rows: ButtonVariableRow[];
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

export const BUTTON_VARIABLE_GROUPS: ButtonVariableGroup[] = [
  {
    title: 'Core Layout',
    description: 'Shared spacing, padding, radius, and width tokens used by all button variants.',
    rows: [
      {
        token: 'ds/button/spacing/xs',
        value: '4',
        appliesTo: 'All variants',
        notes: 'Gap between icon and label.',
      },
      {
        token: 'ds/button/padding/default',
        value: '20',
        appliesTo: 'Rectangle + Pill',
        notes: 'Horizontal padding baseline.',
      },
      {
        token: 'ds/button/radius/rectangle',
        value: '4',
        appliesTo: 'Rectangle',
        notes: 'Corner radius for rectangle shape.',
      },
      {
        token: 'ds/button/radius/pill',
        value: '20',
        appliesTo: 'Pill',
        notes: 'Corner radius for pill shape.',
      },
      {
        token: 'width/l',
        value: '128',
        appliesTo: 'Size=Large',
        notes: 'Minimum width token referenced by large size variants.',
      },
      {
        token: 'ds/button/font/lineheight/large',
        value: '24',
        appliesTo: 'Large text style',
        notes: 'Line-height linked by typography style token.',
      },
    ],
  },
  {
    title: 'Rectangle Color Roles',
    description: 'Color tokens bound to rectangle shape across primary and secondary types.',
    rows: [
      {
        token: 'ds/button/color/background/rectangle/primary/default-1',
        value: '#141ED2',
        appliesTo: 'Primary + Default',
        notes: 'Gradient start color.',
      },
      {
        token: 'ds/button/color/background/rectangle/primary/default-2',
        value: '#0075FF',
        appliesTo: 'Primary + Default',
        notes: 'Gradient end color.',
      },
      {
        token: 'ds/button/color/background/rectangle/primary/hover-1',
        value: '#3949D6',
        appliesTo: 'Primary + Hover',
        notes: 'Hover gradient start.',
      },
      {
        token: 'ds/button/color/background/rectangle/primary/hover-2',
        value: '#2C87F6',
        appliesTo: 'Primary + Hover',
        notes: 'Hover gradient end.',
      },
      {
        token: 'ds/button/color/background/rectangle/primary/pressed-1',
        value: '#606AD5',
        appliesTo: 'Primary + Pressed',
        notes: 'Pressed gradient start.',
      },
      {
        token: 'ds/button/color/background/rectangle/primary/pressed-2',
        value: '#569AED',
        appliesTo: 'Primary + Pressed',
        notes: 'Pressed gradient end.',
      },
      {
        token: 'ds/button/color/background/rectangle/primary/disabled',
        value: '#D8D8D8',
        appliesTo: 'Primary + Disabled',
        notes: 'Disabled background.',
      },
      {
        token: 'ds/button/color/text/rectangle/secondary/default',
        value: '#141ED2',
        appliesTo: 'Secondary + Default',
        notes: 'Text color mirrors border token.',
      },
      {
        token: 'ds/button/color/text/rectangle/secondary/hover',
        value: '#5F7EEB',
        appliesTo: 'Secondary + Hover',
        notes: 'Text color mirrors border token.',
      },
      {
        token: 'ds/button/color/text/rectangle/secondary/pressed',
        value: '#A3B7FD',
        appliesTo: 'Secondary + Pressed',
        notes: 'Text color mirrors border token.',
      },
      {
        token: 'ds/button/color/text/rectangle/secondary/disabled',
        value: '#9B9B9B',
        appliesTo: 'Secondary + Disabled',
        notes: 'Disabled text and border for rectangle secondary.',
      },
    ],
  },
  {
    title: 'Pill Color Roles',
    description: 'Color tokens bound to pill shape across primary and secondary types.',
    rows: [
      {
        token: 'ds/button/color/background/pill/primary/default',
        value: '#141ED2',
        appliesTo: 'Primary + Default',
        notes: 'Solid background for pill primary.',
      },
      {
        token: 'ds/button/color/background/pill/primary/hover',
        value: '#5F7EEB',
        appliesTo: 'Primary + Hover',
        notes: 'Hover background.',
      },
      {
        token: 'ds/button/color/background/pill/primary/pressed',
        value: '#A3B7FD',
        appliesTo: 'Primary + Pressed',
        notes: 'Pressed background.',
      },
      {
        token: 'ds/button/color/background/pill/primary/disabled',
        value: '#DAE4FF',
        appliesTo: 'Primary + Disabled',
        notes: 'Disabled background.',
      },
      {
        token: 'ds/button/color/border/pill/secondary/default',
        value: '#141ED2',
        appliesTo: 'Secondary + Default',
        notes: 'Border color for outlined pill.',
      },
      {
        token: 'ds/button/color/border/pill/secondary/hover',
        value: '#5F7EEB',
        appliesTo: 'Secondary + Hover',
        notes: 'Border color for hover.',
      },
      {
        token: 'ds/button/color/border/pill/secondary/pressed',
        value: '#A3B7FD',
        appliesTo: 'Secondary + Pressed',
        notes: 'Border color for pressed state.',
      },
      {
        token: 'ds/button/color/border/pill/secondary/disabled',
        value: '#DAE4FF',
        appliesTo: 'Secondary + Disabled',
        notes: 'Border color for disabled state.',
      },
    ],
  },
  {
    title: 'Typography Styles',
    description: 'Text style tokens referenced by size variants in the Figma component.',
    rows: [
      {
        token: 'H2/Sub-Header/Normal/16-SemiBold',
        value: 'Averta Std CY, 16 / 24, 600',
        appliesTo: 'Size=Large',
        notes: 'Large label style.',
      },
      {
        token: 'H3/Normal/14-SemiBold',
        value: 'Averta Std CY, 14 / 20, 600',
        appliesTo: 'Size=Medium',
        notes: 'Medium label style.',
      },
      {
        token: 'Body Copy (Data & Nav)/Normal/12-Semibold',
        value: 'Averta Std CY, 12 / 16, 600',
        appliesTo: 'Size=Small',
        notes: 'Small label style.',
      },
    ],
  },
];

export const BUTTON_VARIABLE_NOTES: string[] = [
  "The variant axis in Figma is named 'Retangle'; implementation should keep the behavior but normalize naming to 'Rectangle' in code.",
  "The same spacing value appears in multiple token names: 'ds/button/spacing/xs', 'spacing/xs', and 'size-xs'.",
  "Large width token uses generic naming ('width/l') instead of button-scoped namespace.",
  "Disabled secondary color differs between shapes: rectangle uses '#9B9B9B' while pill uses '#DAE4FF'.",
];
