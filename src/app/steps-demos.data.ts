export type StepsDemoVariant = 'number' | 'number-process' | 'vertical';

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

export interface StepsNumberMatrixRow {
  amount: number;
  currents: number[];
}

export interface StepsVerticalItem {
  title: string;
  description: string;
}

export interface StepsNumberProcessCard {
  amount: number;
  height: number;
}

export const STEPS_NUMBER_MATRIX: StepsNumberMatrixRow[] = [
  { amount: 2, currents: [0, 1] },
  { amount: 3, currents: [0, 1, 2] },
  { amount: 4, currents: [0, 1, 2, 3] },
  { amount: 5, currents: [0, 1, 2, 3, 4] },
  { amount: 6, currents: [0, 1, 2, 3, 4, 5] },
];

export const STEPS_NUMBER_PROCESS_CARDS: StepsNumberProcessCard[] = [
  { amount: 3, height: 276 },
  { amount: 4, height: 334 },
  { amount: 5, height: 392 },
  { amount: 6, height: 450 },
];

export const STEPS_VERTICAL_ITEMS: StepsVerticalItem[] = [
  { title: 'Finished', description: 'This is a description.' },
  { title: 'In Progress', description: 'This is a description.' },
  { title: 'Waiting', description: 'This is a description.' },
];

export const STEPS_DEMO_SECTIONS: StepsDemoSection[] = [
  {
    id: 'number',
    title: 'Number',
    descriptionParts: [
      { code: 'amount="2..6"' },
      { text: ' renders vertical numbered steps with one active step at a time.' },
    ],
    tags: ['selector=sportbook6vn-steps', 'variant=number', 'figma=3898:183544/183582/183493/183674'],
    variant: 'number',
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnStepsComponent } from 'sportbook6vn';

@Component({
  selector: 'app-steps-number-demo',
  standalone: true,
  imports: [Sportbook6vnStepsComponent],
  template: \`
    <sportbook6vn-steps [amount]="4" [current]="0" />
    <sportbook6vn-steps [amount]="4" [current]="1" />
    <sportbook6vn-steps [amount]="4" [current]="2" />
    <sportbook6vn-steps [amount]="4" [current]="3" />
  \`,
})
export class StepsNumberDemoComponent {}`,
  },
  {
    id: 'number-process',
    title: 'Number Process',
    descriptionParts: [
      { code: 'current="0"' },
      { text: ' keeps the first step active across three to six step flows with a save action.' },
    ],
    tags: ['selector=sportbook6vn-steps', 'variant=number-process', 'figma=5061:56421'],
    variant: 'number-process',
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnButtonComponent, Sportbook6vnStepsComponent } from 'sportbook6vn';

@Component({
  selector: 'app-steps-number-process-demo',
  standalone: true,
  imports: [Sportbook6vnButtonComponent, Sportbook6vnStepsComponent],
  template: \`
    @for (amount of [3, 4, 5, 6]; track amount) {
      <section class="steps-process-card">
        <sportbook6vn-steps [amount]="amount" [current]="0" />
        <sportbook6vn-button variant="secondary" size="sm" shape="pill" [fullWidth]="true">
          Lưu phương án
        </sportbook6vn-button>
        <p>Lưu lần cuối 16:23 hôm nay</p>
      </section>
    }
  \`,
})
export class StepsNumberProcessDemoComponent {}`,
  },
  {
    id: 'vertical',
    title: 'Vertical',
    descriptionParts: [{ text: 'A simple step bar in the vertical direction.' }],
    tags: ['selector=sportbook6vn-steps', 'variant=vertical', 'steps=3'],
    variant: 'vertical',
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnStepItem, Sportbook6vnStepsComponent } from 'sportbook6vn';

@Component({
  selector: 'app-steps-vertical-demo',
  standalone: true,
  imports: [Sportbook6vnStepsComponent],
  template: \`
    <sportbook6vn-steps [items]="items" [current]="1" inactiveMarker="outline" />
  \`,
})
export class StepsVerticalDemoComponent {
  readonly items: readonly Sportbook6vnStepItem[] = [
    { title: 'Finished', description: 'This is a description.' },
    { title: 'In Progress', description: 'This is a description.' },
    { title: 'Waiting', description: 'This is a description.' },
  ];
}`,
  },
];

export const STEPS_API_ROWS: StepsApiRow[] = [
  { property: 'items', description: 'Explicit step items. When omitted, amount generates Text items for preview matrices.', type: 'readonly Sportbook6vnStepItem[]', defaultValue: '[]' },
  { property: 'amount', description: 'Number of generated steps when items is empty. Values are clamped from 1 to 6.', type: 'number', defaultValue: '3' },
  { property: 'current', description: 'Zero-based active step index.', type: 'number', defaultValue: '0' },
  { property: 'startIndex', description: 'Number shown on the first step marker.', type: 'number', defaultValue: '1' },
  { property: 'generatedTitle', description: 'Label used by generated preview steps.', type: 'string', defaultValue: "'Text'" },
  { property: 'inactiveMarker', description: 'Marker style used by waiting steps.', type: "'filled' | 'outline'", defaultValue: "'filled'" },
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
  'Vertical demos can use explicit items to show finished, active, and waiting content in one flow.',
];
