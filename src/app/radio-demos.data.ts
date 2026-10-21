export type RadioDemoVariant = 'basic' | 'disabled' | 'group' | 'verticalGroup';

export interface RadioDescriptionPart {
  text?: string;
  code?: string;
}

export interface RadioDemoSection {
  id: string;
  title: string;
  descriptionParts: RadioDescriptionPart[];
  tags: string[];
  variant: RadioDemoVariant;
  snippetTs: string;
}

export interface RadioApiRow {
  property: string;
  description: string;
  type: string;
  defaultValue: string;
}

export interface RadioVariableRow {
  token: string;
  value: string;
  appliesTo: string;
  notes: string;
}

export interface RadioVariableGroup {
  title: string;
  rows: RadioVariableRow[];
}

const RADIO_GROUP_OPTIONS = `  readonly options: readonly MbbizRadioGroupOption[] = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
    { label: 'C', value: 'c' },
    { label: 'D', value: 'd' },
  ];`;

export const RADIO_DEMO_SECTIONS: RadioDemoSection[] = [
  {
    id: 'basic',
    title: 'Basic Radio',
    descriptionParts: [
      { text: 'There are ' },
      { code: 'unchecked' },
      { text: ' and ' },
      { code: 'checked' },
      { text: ' radio states.' },
    ],
    tags: ['selector=mbbiz-radio', 'states=unchecked/checked'],
    variant: 'basic',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizRadioComponent } from 'mbbiz';

@Component({
  selector: 'app-radio-basic-demo',
  standalone: true,
  imports: [MbbizRadioComponent],
  template: \`
    <mbbiz-radio label="Radio" />
    <mbbiz-radio label="Checked Radio" [defaultChecked]="true" />
  \`,
})
export class RadioBasicDemoComponent {}`,
  },
  {
    id: 'disabled',
    title: 'Disabled Radio',
    descriptionParts: [
      { text: 'Set ' },
      { code: '[disabled]="true"' },
      { text: ' to block selection while preserving unchecked and checked visual states.' },
    ],
    tags: ['selector=mbbiz-radio', 'disabled=true', 'states=unchecked/checked'],
    variant: 'disabled',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizRadioComponent } from 'mbbiz';

@Component({
  selector: 'app-radio-disabled-demo',
  standalone: true,
  imports: [MbbizRadioComponent],
  template: \`
    <mbbiz-radio label="Disabled Radio" [disabled]="true" />
    <mbbiz-radio label="Disabled Checked Radio" [defaultChecked]="true" [disabled]="true" />
  \`,
})
export class RadioDisabledDemoComponent {}`,
  },
  {
    id: 'group',
    title: 'Radio Group',
    descriptionParts: [
      { code: 'mbbiz-radio-group' },
      { text: ' selects one option from an ' },
      { code: 'options' },
      { text: ' array.' },
    ],
    tags: ['selector=mbbiz-radio-group', 'direction=horizontal', 'value=a'],
    variant: 'group',
    snippetTs: `import { Component, signal } from '@angular/core';
import {
  MbbizRadioGroupComponent,
  type MbbizRadioGroupOption,
} from 'mbbiz';

@Component({
  selector: 'app-radio-group-demo',
  standalone: true,
  imports: [MbbizRadioGroupComponent],
  template: \`
    <mbbiz-radio-group
      name="payment-method"
      [options]="options"
      [value]="value()"
      (valueChange)="value.set($event)"
    />
  \`,
})
export class RadioGroupDemoComponent {
${RADIO_GROUP_OPTIONS}
  readonly value = signal<string | number | null>('a');
}`,
  },
  {
    id: 'vertical-group',
    title: 'Vertical Radio Group',
    descriptionParts: [
      { code: 'direction="vertical"' },
      { text: ' stacks the same single-selection behavior into a vertical layout.' },
    ],
    tags: ['selector=mbbiz-radio-group', 'direction=vertical', 'value=a'],
    variant: 'verticalGroup',
    snippetTs: `import { Component, signal } from '@angular/core';
import {
  MbbizRadioGroupComponent,
  type MbbizRadioGroupOption,
} from 'mbbiz';

@Component({
  selector: 'app-radio-vertical-group-demo',
  standalone: true,
  imports: [MbbizRadioGroupComponent],
  template: \`
    <mbbiz-radio-group
      name="payment-method-vertical"
      direction="vertical"
      [options]="options"
      [value]="value()"
      (valueChange)="value.set($event)"
    />
  \`,
})
export class RadioVerticalGroupDemoComponent {
${RADIO_GROUP_OPTIONS}
  readonly value = signal<string | number | null>('a');
}`,
  },
];

export const RADIO_API_ROWS: RadioApiRow[] = [
  {
    property: 'inputId',
    description: 'Native input id used for label association.',
    type: 'string | null',
    defaultValue: 'null',
  },
  {
    property: 'label',
    description: 'Text label rendered next to the radio control.',
    type: 'string | null',
    defaultValue: 'null',
  },
  {
    property: 'checked',
    description: 'Controlled checked state. Leave null to use internal state.',
    type: 'boolean | null',
    defaultValue: 'null',
  },
  {
    property: 'defaultChecked',
    description: 'Initial checked state for uncontrolled usage.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'disabled',
    description: 'Prevents user selection and applies the disabled visual state.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'name',
    description: 'Native radio name for form grouping.',
    type: 'string | null',
    defaultValue: 'null',
  },
  {
    property: 'value',
    description: 'Native radio value used by forms and radio groups.',
    type: 'string | number | null',
    defaultValue: 'null',
  },
  {
    property: '(checkedChange)',
    description: 'Emits the next checked state after a user selection.',
    type: 'EventEmitter<boolean>',
    defaultValue: '-',
  },
  {
    property: '(select)',
    description: 'Emits when the radio is selected by the user.',
    type: 'EventEmitter<void>',
    defaultValue: '-',
  },
];

export const RADIO_GROUP_API_ROWS: RadioApiRow[] = [
  {
    property: 'options',
    description: 'Option list rendered as radio items.',
    type: 'readonly MbbizRadioGroupOption[]',
    defaultValue: '[]',
  },
  {
    property: 'value',
    description: 'Controlled selected option value.',
    type: 'string | number | null',
    defaultValue: 'null',
  },
  {
    property: 'defaultValue',
    description: 'Initial selected value for uncontrolled usage.',
    type: 'string | number | null',
    defaultValue: 'null',
  },
  {
    property: 'direction',
    description: 'Layout direction for the option list.',
    type: "'horizontal' | 'vertical'",
    defaultValue: "'horizontal'",
  },
  {
    property: 'disabled',
    description: 'Disables all options in the group.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'name',
    description: 'Shared native radio name applied to all group options.',
    type: 'string | null',
    defaultValue: 'null',
  },
  {
    property: '(valueChange)',
    description: 'Emits the selected option value.',
    type: 'EventEmitter<string | number | null>',
    defaultValue: '-',
  },
  {
    property: '(change)',
    description: 'Emits a change event payload with the selected value.',
    type: 'EventEmitter<{ value: string | number | null }>',
    defaultValue: '-',
  },
];

export const RADIO_VARIABLE_GROUPS: RadioVariableGroup[] = [
  {
    title: 'Radio Color Tokens',
    rows: [
      { token: 'border/secondary', value: 'darkblue/500', appliesTo: 'Unchecked control border', notes: 'Default unchecked state.' },
      { token: 'background/brand-tertiary2', value: 'turquoise/400', appliesTo: 'Selected control and dot', notes: 'Default selected state.' },
      { token: 'background/disable3', value: 'grayscale/200', appliesTo: 'Disabled control background', notes: 'Disabled unchecked background.' },
      { token: 'border/disable2', value: 'grayscale/400', appliesTo: 'Disabled control border', notes: 'Disabled unchecked border.' },
      { token: 'background/disable1', value: 'grayscale/400', appliesTo: 'Disabled selected control', notes: 'Disabled selected state.' },
      { token: 'text/primary', value: 'darkblue/1000', appliesTo: 'Radio label text', notes: 'Default label color.' },
      { token: 'text/disable1', value: 'grayscale/600', appliesTo: 'Disabled label text', notes: 'Disabled label color.' },
    ],
  },
  {
    title: 'Radio Sizing Specs',
    rows: [
      { token: 'control size', value: '20px × 20px', appliesTo: 'Radio circle', notes: 'Fixed visual spec.' },
      { token: 'selected dot size', value: '8px × 8px', appliesTo: 'Selected inner dot', notes: 'Fixed visual spec.' },
      { token: 'label gap', value: '8px', appliesTo: 'Space between control and label', notes: 'Component layout gap.' },
      { token: 'horizontal group gap', value: '18px', appliesTo: 'Radio group horizontal options', notes: 'Group layout gap.' },
      { token: 'vertical group gap', value: '12px', appliesTo: 'Radio group vertical options', notes: 'Group layout gap.' },
    ],
  }
];

export const RADIO_VARIABLE_NOTES = [
  'Color rows map to CSS custom properties implemented by mbbiz-radio.',
  'Sizing rows are fixed component specs because the current Figma node does not define a size scale for Radio.',
];
