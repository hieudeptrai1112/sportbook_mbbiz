export type StepsDemoVariant = 'basic' | 'states' | 'vertical' | 'vertical-states';

export interface StepsDescriptionPart {
  text?: string;
  code?: string;
}

export interface StepsDemoSection {
  id: string;
  title: string;
  descriptionParts: StepsDescriptionPart[];
  tags: string[];
  variant: StepsDemoVariant;
  snippetTs: string;
}

export interface StepsApiRow {
  property: string;
  description: string;
  type: string;
  defaultValue: string;
}


export const STEPS_DEMO_SECTIONS: StepsDemoSection[] = [
  {
    id: 'horizontal-steps',
    title: 'Horizontal Steps',
    descriptionParts: [
      { text: 'Horizontal progress-dot flow aligned to the approved docs-ready draft.' },
    ],
    tags: ['selector=mbbiz-steps', 'direction=horizontal', 'steps=4', 'figma=3898:182753'],
    variant: 'basic',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizStepsComponent } from 'mbbiz';

@Component({
  selector: 'app-steps-basic-demo',
  standalone: true,
  imports: [MbbizStepsComponent],
  template: \`
    <mbbiz-steps [amount]="3" [current]="0" />
  \`,
})
export class StepsBasicDemoComponent {}`,
  },
  {
    id: 'horizontal-step-states',
    title: 'Horizontal Step States',
    descriptionParts: [
      {
        text: 'Single-step state matrix mapped directly from Figma: Next, In Progress, Done, and Error.',
      },
    ],
    tags: [
      'selector=mbbiz-steps',
      'direction=horizontal',
      'state=next|process|finish|error',
      'figma=3898:182489',
    ],
    variant: 'states',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizStepsComponent } from 'mbbiz';

@Component({
  selector: 'app-steps-states-demo',
  standalone: true,
  imports: [MbbizStepsComponent],
  template: \`
    <mbbiz-steps
      direction="horizontal"
      [items]="[{ title: 'Text', status: 'error' }]"
    />
  \`,
})
export class StepsStatesDemoComponent {}`,
  },
  {
    id: 'vertical-steps',
    title: 'Vertical Step',
    descriptionParts: [{ text: 'Three-step vertical flow aligned to Figma Progress=3 Step, Step=1.' }],
    tags: ['selector=mbbiz-steps', 'direction=vertical', 'steps=3', 'figma=3898:183673'],
    variant: 'vertical',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizStepsComponent } from 'mbbiz';

@Component({
  selector: 'app-steps-vertical-demo',
  standalone: true,
  imports: [MbbizStepsComponent],
  template: \`
    <mbbiz-steps direction="vertical" [amount]="3" [current]="0" />
  \`,
})
export class StepsVerticalDemoComponent {}`,
  },
  {
    id: 'vertical-step-states',
    title: 'Vertical Step States',
    descriptionParts: [
      { text: 'Single-step vertical state pair mapped directly from Figma Step Final variants ' },
      { code: 'Active=No' },
      { text: ' and ' },
      { code: 'Active=Yes' },
      { text: '.' },
    ],
    tags: [
      'selector=mbbiz-steps',
      'direction=vertical',
      'state=active-no|active-yes',
      'figma=3898:183582',
    ],
    variant: 'vertical-states',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizStepsComponent } from 'mbbiz';

@Component({
  selector: 'app-steps-vertical-states-demo',
  standalone: true,
  imports: [MbbizStepsComponent],
  template: \`
    <mbbiz-steps
      direction="vertical"
      [items]="[{ title: 'Text', status: 'process' }]"
    />
  \`,
})
export class StepsVerticalStatesDemoComponent {}`,
  },
];

export const STEPS_API_ROWS: StepsApiRow[] = [
  { property: 'items', description: 'Explicit step items. When omitted, amount generates Text items for preview matrices.', type: 'readonly MbbizStepItem[]', defaultValue: '[]' },
  { property: 'amount', description: 'Number of generated steps when items is empty. Values are clamped from 1 to 6.', type: 'number', defaultValue: '3' },
  { property: 'current', description: 'Zero-based active step index.', type: 'number', defaultValue: '0' },
  { property: 'startIndex', description: 'Number shown on the first step marker.', type: 'number', defaultValue: '1' },
  { property: 'generatedTitle', description: 'Label used by generated preview steps.', type: 'string', defaultValue: "'Text'" },
  { property: 'size', description: 'Marker size. Badge mode is reserved for compact progress-only displays.', type: "'default' | 'badge'", defaultValue: "'default'" },
  { property: 'ariaLabel', description: 'Accessible label for the steps navigation region.', type: 'string', defaultValue: "'Steps'" },
  { property: 'clickable', description: 'Allows enabled non-current steps to emit indexChange.', type: 'boolean', defaultValue: 'false' },
  { property: 'indexChange', description: 'Emits the selected zero-based step index when clickable mode is enabled.', type: 'output<number>', defaultValue: '-' },
];

export const STEPS_VARIABLE_GROUPS = [
  {
    title: 'Steps Color Tokens',
    rows: [
      { token: 'text/secondary',             value: 'darkblue/500',  appliesTo: 'Inactive marker, label, and secondary text', notes: 'Maps to --mbbiz-color-steps-step-default and --mbbiz-color-text-secondary.' },
      { token: 'background/brand-secondary1', value: 'purple/500',   appliesTo: 'Active marker, border, and label',            notes: 'Maps to --mbbiz-color-steps-step-active.' },
      { token: 'border/quaternary',          value: 'darkblue/300',  appliesTo: 'Compact next marker fill',                    notes: 'Maps to --mbbiz-color-steps-step-next.' },
      { token: 'border/brand-primary3',      value: 'blue/300',      appliesTo: 'Horizontal and vertical connector',           notes: 'Maps to --mbbiz-color-steps-line.' },
      { token: 'icon/white',                 value: 'white/100%',    appliesTo: 'Marker number on filled states',              notes: 'Maps to --mbbiz-color-steps-marker-text.' },
      { token: '--mbbiz-steps-error',        value: '#F00000',       appliesTo: 'Error marker, label, and connector',          notes: 'Orphan — hardcoded error accent in component CSS.' },
      { token: '--mbbiz-steps-primary',      value: '#141ED2',       appliesTo: 'Vertical final primary marker',               notes: 'Orphan — local --mbbiz-steps-primary-color.' },
    ],
  },
  {
    title: 'Steps Sizing Specs',
    rows: [
      { token: 'steps/marker/size/default', value: '24px', appliesTo: 'Normal step marker', notes: 'Matches Step Normal and Step Final nodes.' },
      { token: 'steps/marker/size/badge', value: '20px', appliesTo: 'Compact progress marker', notes: 'Matches Badge Progress node.' },
      { token: 'steps/marker/size/small', value: '16px', appliesTo: 'Small marker variant', notes: 'Used by compact progress-only displays.' },
      { token: 'steps/gap/content', value: '16px', appliesTo: 'Marker to text gap', notes: 'Figma auto-layout gap.' },
    ],
  },
];

export const STEPS_VARIABLE_NOTES = [
  'Color rows map to CSS custom properties implemented by mbbiz-steps.',
  'Error and primary accents are currently local component values; prefer promoting them to theme tokens when re-syncing from Figma.',
];
