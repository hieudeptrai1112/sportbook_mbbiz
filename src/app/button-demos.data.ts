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
  snippetHtml?: string;
  snippetTs?: string;
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
    snippetHtml: `<section class="button-demo-preview">
  <app-ds-button
    [label]="isSubmitting ? 'Submitting...' : 'Continue'"
    shape="rectangle"
    tone="primary"
    size="large"
    [state]="isSubmitting ? 'disabled' : primaryState"
    [showLeftIcon]="showLeftIcon"
    [showRightIcon]="showRightIcon"
    (mouseenter)="onPrimaryEnter()"
    (mouseleave)="onPrimaryLeave()"
    (mousedown)="onPrimaryDown()"
    (mouseup)="onPrimaryUp()"
    (blur)="onPrimaryLeave()"
    (click)="onPrimarySubmit()"
  />
</section>

<section class="button-demo-preview">
  <app-ds-button
    label="Left icon"
    shape="rectangle"
    tone="primary"
    size="medium"
    state="default"
    [showLeftIcon]="true"
    (click)="showLeftIcon = !showLeftIcon"
  />
  <app-ds-button
    label="Right icon"
    shape="rectangle"
    tone="primary"
    size="medium"
    state="default"
    [showRightIcon]="true"
    (click)="showRightIcon = !showRightIcon"
  />
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsButtonComponent } from './components/ds-button/ds-button.component';

type ButtonState = 'default' | 'hover' | 'pressed' | 'disabled';

@Component({
  selector: 'app-button-primary-interaction-demo',
  standalone: true,
  imports: [DsButtonComponent],
  templateUrl: './button-primary-interaction-demo.component.html',
})
export class ButtonPrimaryInteractionDemoComponent {
  primaryState: ButtonState = 'default';
  isSubmitting = false;
  showLeftIcon = false;
  showRightIcon = false;

  onPrimaryEnter() {
    if (!this.isSubmitting) this.primaryState = 'hover';
  }

  onPrimaryLeave() {
    if (!this.isSubmitting) this.primaryState = 'default';
  }

  onPrimaryDown() {
    if (!this.isSubmitting) this.primaryState = 'pressed';
  }

  onPrimaryUp() {
    if (!this.isSubmitting) this.primaryState = 'hover';
  }

  async onPrimarySubmit() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.primaryState = 'disabled';

    await new Promise((resolve) => setTimeout(resolve, 1200));

    this.isSubmitting = false;
    this.primaryState = 'default';
  }
}`,
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
    snippetHtml: `<section class="button-demo-preview">
  <app-ds-button
    [label]="isDisabled ? 'Disabled' : 'Secondary action'"
    shape="rectangle"
    tone="secondary"
    size="large"
    [state]="isDisabled ? 'disabled' : selectedState"
  />
  <app-ds-button
    label="Toggle disabled"
    shape="rectangle"
    tone="secondary"
    size="small"
    state="default"
    (click)="isDisabled = !isDisabled"
  />
</section>

<section class="button-demo-preview">
  <app-ds-button
    *ngFor="let state of states"
    [label]="state"
    shape="rectangle"
    tone="secondary"
    size="small"
    [state]="state"
    (click)="selectedState = state"
  />
</section>`,
    snippetTs: `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DsButtonComponent } from './components/ds-button/ds-button.component';

type ButtonState = 'default' | 'hover' | 'pressed' | 'disabled';

@Component({
  selector: 'app-button-secondary-state-demo',
  standalone: true,
  imports: [CommonModule, DsButtonComponent],
  templateUrl: './button-secondary-state-demo.component.html',
})
export class ButtonSecondaryStateDemoComponent {
  states: ButtonState[] = ['default', 'hover', 'pressed', 'disabled'];
  selectedState: ButtonState = 'default';
  isDisabled = false;
}`,
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
    snippetHtml: `<section class="button-demo-preview">
  <app-ds-button
    [label]="'Size: ' + size + ' · Shape: ' + shape"
    [shape]="shape"
    tone="primary"
    state="default"
    [size]="size"
  />
</section>

<section class="button-demo-preview">
  <app-ds-button
    *ngFor="let item of sizeOptions"
    [label]="item"
    shape="rectangle"
    tone="secondary"
    size="small"
    state="default"
    (click)="size = item"
  />
  <app-ds-button
    *ngFor="let item of shapeOptions"
    [label]="item"
    [shape]="item"
    tone="secondary"
    size="small"
    state="default"
    (click)="shape = item"
  />
</section>`,
    snippetTs: `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DsButtonComponent } from './components/ds-button/ds-button.component';

type ButtonShape = 'rectangle' | 'pill';
type ButtonSize = 'large' | 'medium' | 'small';

@Component({
  selector: 'app-button-size-scale-demo',
  standalone: true,
  imports: [CommonModule, DsButtonComponent],
  templateUrl: './button-size-scale-demo.component.html',
})
export class ButtonSizeScaleDemoComponent {
  sizeOptions: ButtonSize[] = ['large', 'medium', 'small'];
  shapeOptions: ButtonShape[] = ['rectangle', 'pill'];

  size: ButtonSize = 'large';
  shape: ButtonShape = 'rectangle';
}`,
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
    snippetHtml: `<section class="button-demo-preview">
  <app-ds-button
    [label]="stateLabel"
    shape="pill"
    tone="secondary"
    size="medium"
    [state]="pillState"
    (mouseenter)="pillState = 'hover'"
    (mouseleave)="pillState = 'default'"
    (mousedown)="pillState = 'pressed'"
    (mouseup)="pillState = 'hover'"
  />
  <app-ds-button
    label="Disable"
    shape="pill"
    tone="secondary"
    size="small"
    state="default"
    (click)="toggleDisabled()"
  />
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsButtonComponent } from './components/ds-button/ds-button.component';

type ButtonState = 'default' | 'hover' | 'pressed' | 'disabled';

@Component({
  selector: 'app-button-pill-secondary-demo',
  standalone: true,
  imports: [DsButtonComponent],
  templateUrl: './button-pill-secondary-demo.component.html',
})
export class ButtonPillSecondaryDemoComponent {
  pillState: ButtonState = 'default';

  get stateLabel() {
    return this.pillState === 'disabled' ? 'Disabled' : 'Secondary';
  }

  toggleDisabled() {
    this.pillState = this.pillState === 'disabled' ? 'default' : 'disabled';
  }
}`,
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
    snippetHtml: `<section class="button-demo-preview">
  <app-ds-button
    label="Action"
    shape="rectangle"
    tone="primary"
    size="medium"
    state="default"
    [showLeftIcon]="showLeftIcon"
    [showRightIcon]="showRightIcon"
    (click)="clickCount = clickCount + 1"
  />
</section>

<section class="button-demo-preview">
  <app-ds-button
    [label]="showLeftIcon ? 'Left icon on' : 'Left icon off'"
    shape="rectangle"
    tone="secondary"
    size="small"
    state="default"
    (click)="showLeftIcon = !showLeftIcon"
  />
  <app-ds-button
    [label]="showRightIcon ? 'Right icon on' : 'Right icon off'"
    shape="rectangle"
    tone="secondary"
    size="small"
    state="default"
    (click)="showRightIcon = !showRightIcon"
  />
  <p>Clicked: {{ clickCount }}</p>
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsButtonComponent } from './components/ds-button/ds-button.component';

@Component({
  selector: 'app-button-icon-demo',
  standalone: true,
  imports: [DsButtonComponent],
  templateUrl: './button-icon-demo.component.html',
})
export class ButtonIconDemoComponent {
  showLeftIcon = true;
  showRightIcon = false;
  clickCount = 0;
}`,
  },
];

export const BUTTON_API_ROWS: ButtonApiRow[] = [
  {
    property: 'variant',
    description: 'Visual intent token mapped from Figma (primary or secondary).',
    type: "'primary' | 'secondary'",
    defaultValue: "'primary'",
  },
  {
    property: 'shape',
    description: 'Button silhouette axis from Figma variants.',
    type: "'rectangle' | 'pill'",
    defaultValue: "'rectangle'",
  },
  {
    property: 'size',
    description: 'Size scale used by the component.',
    type: "'lg' | 'md' | 'sm'",
    defaultValue: "'md'",
  },
  {
    property: 'disabled',
    description: 'Disables user interaction and applies disabled style.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'loading',
    description: 'Shows loading spinner and locks interaction while loading.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'fullWidth',
    description: 'Expands the button width to 100% of its container.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'type',
    description: 'Native button type attribute.',
    type: "'button' | 'submit' | 'reset'",
    defaultValue: "'button'",
  },
  {
    property: 'ariaLabel',
    description: 'Accessible label for icon-only or context-specific buttons.',
    type: 'string | null',
    defaultValue: 'null',
  },
  {
    property: '(buttonClick)',
    description: 'Emits click event when button is not disabled/loading.',
    type: 'MouseEvent',
    defaultValue: '-',
  },
  {
    property: '[sportbook6vnButtonStartIcon]',
    description: 'Projected slot for start icon content.',
    type: 'ng-content slot',
    defaultValue: '-',
  },
  {
    property: '[sportbook6vnButtonEndIcon]',
    description: 'Projected slot for end icon content.',
    type: 'ng-content slot',
    defaultValue: '-',
  },
];

export const BUTTON_SEMANTIC_BINDING_GROUPS: ButtonSemanticBindingGroup[] = [
  {
    title: 'Rectangle · Primary (Gradient)',
    description: 'Primary rectangle states map directly to semantic gradient and on-brand text aliases.',
    rows: [
      {
        componentToken: 'ds/button/color/background/rectangle/primary/default-1',
        semanticAlias: 'background/gradient1-left',
        appliesTo: 'State=Default',
        notes: 'Gradient start for default state.',
      },
      {
        componentToken: 'ds/button/color/background/rectangle/primary/default-2',
        semanticAlias: 'background/gradient1-right',
        appliesTo: 'State=Default',
        notes: 'Gradient end for default state.',
      },
      {
        componentToken: 'ds/button/color/background/rectangle/primary/hover-1',
        semanticAlias: 'background/gradient2-left',
        appliesTo: 'State=Hover',
        notes: 'Gradient start for hover state.',
      },
      {
        componentToken: 'ds/button/color/background/rectangle/primary/hover-2',
        semanticAlias: 'background/gradient2-right',
        appliesTo: 'State=Hover',
        notes: 'Gradient end for hover state.',
      },
      {
        componentToken: 'ds/button/color/background/rectangle/primary/pressed-1',
        semanticAlias: 'background/gradient3-left',
        appliesTo: 'State=Pressed',
        notes: 'Gradient start for pressed state.',
      },
      {
        componentToken: 'ds/button/color/background/rectangle/primary/pressed-2',
        semanticAlias: 'background/gradient3-right',
        appliesTo: 'State=Pressed',
        notes: 'Gradient end for pressed state.',
      },
      {
        componentToken: 'ds/button/color/background/rectangle/primary/disabled',
        semanticAlias: 'background/disable2',
        appliesTo: 'State=Disabled',
        notes: 'Disabled background role.',
      },
      {
        componentToken: 'ds/button/color/text/rectangle/primary/default',
        semanticAlias: 'text/brand-on-primary',
        appliesTo: 'Default + Hover + Pressed',
        notes: 'Text on top of brand gradients.',
      },
      {
        componentToken: 'ds/button/color/text/rectangle/primary/disabled',
        semanticAlias: 'text/disable3',
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
        semanticAlias: 'background/brand-primary1',
        appliesTo: 'State=Default',
        notes: 'Default outline currently maps to brand background alias.',
      },
      {
        componentToken: 'ds/button/color/text/rectangle/secondary/default',
        semanticAlias: 'text/brand-primary1',
        appliesTo: 'State=Default',
        notes: 'Text role aligned with border.',
      },
      {
        componentToken: 'ds/button/color/border/rectangle/secondary/hover',
        semanticAlias: 'border/brand-primary2',
        appliesTo: 'State=Hover',
        notes: 'Border role for hover outlined state.',
      },
      {
        componentToken: 'ds/button/color/text/rectangle/secondary/hover',
        semanticAlias: 'text/brand-primary2',
        appliesTo: 'State=Hover',
        notes: 'Text role aligned with hover border.',
      },
      {
        componentToken: 'ds/button/color/border/rectangle/secondary/pressed',
        semanticAlias: 'border/brand-primary3',
        appliesTo: 'State=Pressed',
        notes: 'Border role for pressed outlined state.',
      },
      {
        componentToken: 'ds/button/color/text/rectangle/secondary/pressed',
        semanticAlias: 'text/brand-primary3',
        appliesTo: 'State=Pressed',
        notes: 'Text role aligned with pressed border.',
      },
      {
        componentToken: 'ds/button/color/border/rectangle/secondary/disabled',
        semanticAlias: 'border/disable1',
        appliesTo: 'State=Disabled',
        notes: 'Disabled border role.',
      },
      {
        componentToken: 'ds/button/color/text/rectangle/secondary/disabled',
        semanticAlias: 'text/disable2',
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
        semanticAlias: 'background/brand-secondary1',
        appliesTo: 'State=Default',
        notes: 'Solid brand fill (default).',
      },
      {
        componentToken: 'ds/button/color/background/pill/primary/hover',
        semanticAlias: 'background/brand-secondary2',
        appliesTo: 'State=Hover',
        notes: 'Solid brand fill (hover).',
      },
      {
        componentToken: 'ds/button/color/background/pill/primary/pressed',
        semanticAlias: 'background/brand-secondary3',
        appliesTo: 'State=Pressed',
        notes: 'Solid brand fill (pressed).',
      },
      {
        componentToken: 'ds/button/color/background/pill/primary/disabled',
        semanticAlias: 'background/brand-secondary4',
        appliesTo: 'State=Disabled',
        notes: 'Disabled fill for brand pill.',
      },
      {
        componentToken: 'ds/button/color/text/pill/primary/default',
        semanticAlias: 'text/brand-on-primary',
        appliesTo: 'Default + Hover + Pressed',
        notes: 'Text role on brand background.',
      },
      {
        componentToken: 'ds/button/color/text/pill/primary/disabled',
        semanticAlias: 'text/brand-on-primary',
        appliesTo: 'State=Disabled',
        notes: 'Disabled still uses on-primary text alias in current Figma binding.',
      },
      {
        componentToken: 'ds/button/color/icon/pill/primary/default',
        semanticAlias: 'icon/brand-on-primary',
        appliesTo: 'Default + Hover + Pressed + Disabled',
        notes: 'Icon role follows primary text on brand background.',
      },
    ],
  },
  {
    title: 'Pill · Secondary (Outline)',
    description: 'Pill secondary states bind to semantic border/text aliases, including disabled role.',
    rows: [
      {
        componentToken: 'ds/button/color/border/pill/secondary/default',
        semanticAlias: 'border/brand-secondary1',
        appliesTo: 'State=Default',
        notes: 'Default outlined border uses border role.',
      },
      {
        componentToken: 'ds/button/color/text/pill/secondary/default',
        semanticAlias: 'text/brand-secondary1',
        appliesTo: 'State=Default',
        notes: 'Text role aligned with outlined border.',
      },
      {
        componentToken: 'ds/button/color/icon/pill/secondary/default',
        semanticAlias: 'icon/brand-secondary1',
        appliesTo: 'State=Default',
        notes: 'Icon role aligned with outlined border.',
      },
      {
        componentToken: 'ds/button/color/border/pill/secondary/hover',
        semanticAlias: 'border/brand-secondary2',
        appliesTo: 'State=Hover',
        notes: 'Hover outlined border uses border role.',
      },
      {
        componentToken: 'ds/button/color/text/pill/secondary/hover',
        semanticAlias: 'text/brand-secondary2',
        appliesTo: 'State=Hover',
        notes: 'Text role aligned with hover border.',
      },
      {
        componentToken: 'ds/button/color/icon/pill/secondary/hover',
        semanticAlias: 'icon/brand-secondary2',
        appliesTo: 'State=Hover',
        notes: 'Icon role aligned with hover border.',
      },
      {
        componentToken: 'ds/button/color/border/pill/secondary/pressed',
        semanticAlias: 'border/brand-secondary3',
        appliesTo: 'State=Pressed',
        notes: 'Pressed outlined border uses border role.',
      },
      {
        componentToken: 'ds/button/color/text/pill/secondary/pressed',
        semanticAlias: 'text/brand-secondary3',
        appliesTo: 'State=Pressed',
        notes: 'Text role aligned with pressed border.',
      },
      {
        componentToken: 'ds/button/color/icon/pill/secondary/pressed',
        semanticAlias: 'icon/brand-secondary3',
        appliesTo: 'State=Pressed',
        notes: 'Icon role aligned with pressed border.',
      },
      {
        componentToken: 'ds/button/color/border/pill/secondary/disabled',
        semanticAlias: 'border/brand-secondary4',
        appliesTo: 'State=Disabled',
        notes: 'Disabled outlined border uses border role.',
      },
      {
        componentToken: 'ds/button/color/text/pill/secondary/disabled',
        semanticAlias: 'text/brand-secondary4',
        appliesTo: 'State=Disabled',
        notes: 'Disabled text role.',
      },
      {
        componentToken: 'ds/button/color/icon/pill/secondary/disabled',
        semanticAlias: 'icon/brand-secondary4',
        appliesTo: 'State=Disabled',
        notes: 'Disabled icon role.',
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
