export type StepsDemoVariant = 'basic';

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

export interface StepsVariableRow {
  token: string;
  value: string;
  appliesTo: string;
  notes: string;
}

export interface StepsVariableGroup {
  title: string;
  rows: StepsVariableRow[];
}

export const STEPS_DEMO_SECTIONS: StepsDemoSection[] = [
  {
    id: 'basic',
    title: 'Basic',
    descriptionParts: [{ text: 'A simple three-step process with the first step active.' }],
    tags: ['selector=sportbook6vn-steps', 'variant=basic', 'steps=3', 'figma=5061:56328'],
    variant: 'basic',
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnStepsComponent } from 'sportbook6vn';

@Component({
  selector: 'app-steps-basic-demo',
  standalone: true,
  imports: [Sportbook6vnStepsComponent],
  template: \`
    <sportbook6vn-steps [amount]="3" [current]="0" />
  \`,
})
export class StepsBasicDemoComponent {}`,
  },
];

export const STEPS_API_ROWS: StepsApiRow[] = [
  { property: 'items', description: 'Explicit step items. When omitted, amount generates Text items for preview matrices.', type: 'readonly Sportbook6vnStepItem[]', defaultValue: '[]' },
  { property: 'amount', description: 'Number of generated steps when items is empty. Values are clamped from 1 to 6.', type: 'number', defaultValue: '3' },
  { property: 'current', description: 'Zero-based active step index.', type: 'number', defaultValue: '0' },
  { property: 'startIndex', description: 'Number shown on the first step marker.', type: 'number', defaultValue: '1' },
  { property: 'generatedTitle', description: 'Label used by generated preview steps.', type: 'string', defaultValue: "'Text'" },
  { property: 'size', description: 'Marker size. Badge mode is reserved for compact progress-only displays.', type: "'default' | 'badge'", defaultValue: "'default'" },
  { property: 'ariaLabel', description: 'Accessible label for the steps navigation region.', type: 'string', defaultValue: "'Steps'" },
  { property: 'clickable', description: 'Allows enabled non-current steps to emit indexChange.', type: 'boolean', defaultValue: 'false' },
  { property: 'indexChange', description: 'Emits the selected zero-based step index when clickable mode is enabled.', type: 'output<number>', defaultValue: '-' },
];

export const STEPS_VARIABLE_GROUPS: StepsVariableGroup[] = [
  {
    title: 'Steps Tokens',
    rows: [
      { token: 'steps/step/default', value: '#6D83A7', appliesTo: 'Inactive marker and label', notes: 'Alias/Semantic1/500.' },
      { token: 'steps/step/active', value: '#7B5FFF', appliesTo: 'Active marker and label', notes: 'Alias/Secondary/500.' },
      { token: 'steps/step/next', value: '#CADBE8', appliesTo: 'Compact next marker', notes: 'Alias/Semantic1/300.' },
      { token: 'steps/line', value: '#A3B7FD', appliesTo: 'Vertical connector', notes: 'Alias/Primary/300.' },
      { token: 'steps/marker/text', value: '#FFFFFF', appliesTo: 'Marker number', notes: 'Alias/Neutral/100/100%.' },
      { token: 'steps/marker/size/default', value: '24px', appliesTo: 'Normal step marker', notes: 'Matches Step Normal and Step Final nodes.' },
      { token: 'steps/marker/size/badge', value: '20px', appliesTo: 'Compact progress marker', notes: 'Matches Badge Progress node.' },
      { token: 'steps/gap/content', value: '16px', appliesTo: 'Marker to text gap', notes: 'Figma auto-layout gap.' },
    ],
  },
];

export const STEPS_VARIABLE_NOTES = [
  'The component uses the same interaction model as a steps control while keeping Sportbook6VN DOM and styling scoped to sportbook6vn-steps.',
  'The basic demo mirrors the approved three-step Figma state with the first step active.',
];
