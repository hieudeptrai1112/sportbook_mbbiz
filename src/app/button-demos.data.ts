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

export interface ButtonSemanticBindingRow {
  componentToken: string;
  semanticAlias: string;
  appliesTo: string;
  notes: string;
}

export interface ButtonSemanticBindingGroup {
  title: string;
  description: string;
  rows: ButtonSemanticBindingRow[];
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

export const BUTTON_SEMANTIC_BINDING_GROUPS: ButtonSemanticBindingGroup[] = [
  {
    title: 'Rectangle · Primary (Gradient)',
    description: 'Primary rectangle states map directly to semantic gradient and on-brand text aliases.',
    rows: [
      {
        componentToken: 'ds/button/color/background/rectangle/primary/default-1',
        semanticAlias: 'color/semantic/background/gradient1-left',
        appliesTo: 'State=Default',
        notes: 'Gradient start for default state.',
      },
      {
        componentToken: 'ds/button/color/background/rectangle/primary/default-2',
        semanticAlias: 'color/semantic/background/gradient1-right',
        appliesTo: 'State=Default',
        notes: 'Gradient end for default state.',
      },
      {
        componentToken: 'ds/button/color/background/rectangle/primary/hover-1',
        semanticAlias: 'color/semantic/background/gradient2-left',
        appliesTo: 'State=Hover',
        notes: 'Gradient start for hover state.',
      },
      {
        componentToken: 'ds/button/color/background/rectangle/primary/hover-2',
        semanticAlias: 'color/semantic/background/gradient2-right',
        appliesTo: 'State=Hover',
        notes: 'Gradient end for hover state.',
      },
      {
        componentToken: 'ds/button/color/background/rectangle/primary/pressed-1',
        semanticAlias: 'color/semantic/background/gradient3-left',
        appliesTo: 'State=Pressed',
        notes: 'Gradient start for pressed state.',
      },
      {
        componentToken: 'ds/button/color/background/rectangle/primary/pressed-2',
        semanticAlias: 'color/semantic/background/gradient3-right',
        appliesTo: 'State=Pressed',
        notes: 'Gradient end for pressed state.',
      },
      {
        componentToken: 'ds/button/color/background/rectangle/primary/disabled',
        semanticAlias: 'color/semantic/background/disable2',
        appliesTo: 'State=Disabled',
        notes: 'Disabled background role.',
      },
      {
        componentToken: 'ds/button/color/text/rectangle/primary/default',
        semanticAlias: 'color/semantic/text/brand-on-primary',
        appliesTo: 'Default + Hover + Pressed',
        notes: 'Text on top of brand gradients.',
      },
      {
        componentToken: 'ds/button/color/text/rectangle/primary/disabled',
        semanticAlias: 'color/semantic/text/disable3',
        appliesTo: 'State=Disabled',
        notes: 'Disabled text contrast token.',
      },
    ],
  },
  {
    title: 'Rectangle · Secondary (Outline)',
    description: 'Secondary rectangle state colors use semantic border/text brand and disabled aliases.',
    rows: [
      {
        componentToken: 'ds/button/color/border/rectangle/secondary/default',
        semanticAlias: 'color/semantic/border/brand-primary1',
        appliesTo: 'State=Default',
        notes: 'Border role for default outlined state.',
      },
      {
        componentToken: 'ds/button/color/text/rectangle/secondary/default',
        semanticAlias: 'color/semantic/text/brand-primary1',
        appliesTo: 'State=Default',
        notes: 'Text role aligned with border.',
      },
      {
        componentToken: 'ds/button/color/border/rectangle/secondary/hover',
        semanticAlias: 'color/semantic/border/brand-primary2',
        appliesTo: 'State=Hover',
        notes: 'Border role for hover outlined state.',
      },
      {
        componentToken: 'ds/button/color/text/rectangle/secondary/hover',
        semanticAlias: 'color/semantic/text/brand-primary2',
        appliesTo: 'State=Hover',
        notes: 'Text role aligned with hover border.',
      },
      {
        componentToken: 'ds/button/color/border/rectangle/secondary/pressed',
        semanticAlias: 'color/semantic/border/brand-primary3',
        appliesTo: 'State=Pressed',
        notes: 'Border role for pressed outlined state.',
      },
      {
        componentToken: 'ds/button/color/text/rectangle/secondary/pressed',
        semanticAlias: 'color/semantic/text/brand-primary3',
        appliesTo: 'State=Pressed',
        notes: 'Text role aligned with pressed border.',
      },
      {
        componentToken: 'ds/button/color/border/rectangle/secondary/disabled',
        semanticAlias: 'color/semantic/border/disable1',
        appliesTo: 'State=Disabled',
        notes: 'Disabled border role.',
      },
      {
        componentToken: 'ds/button/color/text/rectangle/secondary/disabled',
        semanticAlias: 'color/semantic/text/disable2',
        appliesTo: 'State=Disabled',
        notes: 'Disabled text role.',
      },
    ],
  },
  {
    title: 'Pill · Primary',
    description: 'Pill primary uses solid brand background roles with on-brand text.',
    rows: [
      {
        componentToken: 'ds/button/color/background/pill/primary/default',
        semanticAlias: 'color/semantic/background/brand-primary1',
        appliesTo: 'State=Default',
        notes: 'Solid brand fill (default).',
      },
      {
        componentToken: 'ds/button/color/background/pill/primary/hover',
        semanticAlias: 'color/semantic/background/brand-primary2',
        appliesTo: 'State=Hover',
        notes: 'Solid brand fill (hover).',
      },
      {
        componentToken: 'ds/button/color/background/pill/primary/pressed',
        semanticAlias: 'color/semantic/background/brand-primary3',
        appliesTo: 'State=Pressed',
        notes: 'Solid brand fill (pressed).',
      },
      {
        componentToken: 'ds/button/color/background/pill/primary/disabled',
        semanticAlias: 'color/semantic/background/brand-primary4',
        appliesTo: 'State=Disabled',
        notes: 'Disabled fill for brand pill.',
      },
      {
        componentToken: 'ds/button/color/text/pill/primary/default',
        semanticAlias: 'color/semantic/text/brand-on-primary',
        appliesTo: 'Default + Hover + Pressed',
        notes: 'Text role on brand background.',
      },
      {
        componentToken: 'ds/button/color/text/pill/primary/disabled',
        semanticAlias: 'color/semantic/text/disable3',
        appliesTo: 'State=Disabled',
        notes: 'Disabled text role.',
      },
    ],
  },
  {
    title: 'Pill · Secondary (Outline)',
    description: 'Pill secondary states bind to semantic border/text aliases, including disabled role.',
    rows: [
      {
        componentToken: 'ds/button/color/border/pill/secondary/default',
        semanticAlias: 'color/semantic/border/brand-primary1',
        appliesTo: 'State=Default',
        notes: 'Outlined border role.',
      },
      {
        componentToken: 'ds/button/color/text/pill/secondary/default',
        semanticAlias: 'color/semantic/text/brand-primary1',
        appliesTo: 'State=Default',
        notes: 'Text role aligned with outlined border.',
      },
      {
        componentToken: 'ds/button/color/border/pill/secondary/hover',
        semanticAlias: 'color/semantic/border/brand-primary2',
        appliesTo: 'State=Hover',
        notes: 'Outlined border role on hover.',
      },
      {
        componentToken: 'ds/button/color/text/pill/secondary/hover',
        semanticAlias: 'color/semantic/text/brand-primary2',
        appliesTo: 'State=Hover',
        notes: 'Text role aligned with hover border.',
      },
      {
        componentToken: 'ds/button/color/border/pill/secondary/pressed',
        semanticAlias: 'color/semantic/border/brand-primary3',
        appliesTo: 'State=Pressed',
        notes: 'Outlined border role on pressed.',
      },
      {
        componentToken: 'ds/button/color/text/pill/secondary/pressed',
        semanticAlias: 'color/semantic/text/brand-primary3',
        appliesTo: 'State=Pressed',
        notes: 'Text role aligned with pressed border.',
      },
      {
        componentToken: 'ds/button/color/border/pill/secondary/disabled',
        semanticAlias: 'color/semantic/border/brand-primary4',
        appliesTo: 'State=Disabled',
        notes: 'Disabled border role.',
      },
      {
        componentToken: 'ds/button/color/text/pill/secondary/disabled',
        semanticAlias: 'color/semantic/text/brand-primary4',
        appliesTo: 'State=Disabled',
        notes: 'Disabled text role.',
      },
    ],
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
        appliesTo: 'Size=Large',
        notes: 'Line-height linked by typography style token.',
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
  "Color variables are now bound to semantic aliases so Button docs use the same source of truth as the Tokens page.",
  "The variant axis in Figma is named 'Retangle'; implementation should keep the behavior but normalize naming to 'Rectangle' in code.",
  "The same spacing value appears in multiple token names: 'ds/button/spacing/xs', 'spacing/xs', and 'size-xs'.",
  "Large width token uses generic naming ('width/l') instead of button-scoped namespace.",
];
