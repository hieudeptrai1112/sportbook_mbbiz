export type AutoCompleteDemoVariant = 'basic' | 'caseInsensitive' | 'status';

export interface AutoCompleteDemoSection {
  id: string;
  title: string;
  descriptionParts: { text?: string; code?: string }[];
  tags: string[];
  variant: AutoCompleteDemoVariant;
  snippetTs: string;
}

export interface AutoCompleteApiRow {
  property: string;
  description: string;
  type: string;
  defaultValue: string;
}

export interface AutoCompleteVariableRow {
  token: string;
  value: string;
  appliesTo: string;
  notes: string;
}

export interface AutoCompleteVariableGroup {
  title: string;
  rows: AutoCompleteVariableRow[];
}

const BASIC_ITEMS = `  readonly items: readonly MbbizDropdownItem[] = [
    { id: 'ss', label: 'ss' },
    { id: 'ssss', label: 'ssss' },
    { id: 'ssssss', label: 'ssssss' },
  ];`;

const STREET_ITEMS = `  readonly items: readonly MbbizDropdownItem[] = [
    { id: 'burns', label: 'Burns Bay Road' },
    { id: 'downing', label: 'Downing Street' },
    { id: 'wall', label: 'Wall Street' },
  ];`;

export const AUTO_COMPLETE_DEMO_SECTIONS: AutoCompleteDemoSection[] = [
  {
    id: 'basic',
    title: 'Basic Usage',
    descriptionParts: [
      { text: 'Wraps ' },
      { code: 'mbbiz-input' },
      { text: ' with the dropdown droplist. Type ss to see matching options. No match closes the panel. ArrowDown still opens the full list.' },
    ],
    tags: ['selector=mbbiz-auto-complete', 'placeholder=Input text'],
    variant: 'basic',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizAutoCompleteComponent, type MbbizDropdownItem } from 'mbbiz';

@Component({
  selector: 'app-auto-complete-basic-demo',
  standalone: true,
  imports: [MbbizAutoCompleteComponent],
  template: \`
    <mbbiz-auto-complete placeholder="Input text" [items]="items" />
  \`,
})
export class AutoCompleteBasicDemoComponent {
${BASIC_ITEMS}
}`,
  },
  {
    id: 'caseInsensitive',
    title: 'Non-case-sensitive',
    descriptionParts: [
      { text: 'Filter uses ' },
      { code: 'label.toLowerCase().includes(query)' },
      { text: '. Object items reuse ' },
      { code: 'MbbizDropdownItem' },
      { text: '.' },
    ],
    tags: ['selector=mbbiz-auto-complete', 'filter=case-insensitive'],
    variant: 'caseInsensitive',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizAutoCompleteComponent, type MbbizDropdownItem } from 'mbbiz';

@Component({
  selector: 'app-auto-complete-case-demo',
  standalone: true,
  imports: [MbbizAutoCompleteComponent],
  template: \`
    <mbbiz-auto-complete placeholder="Input text" [items]="items" />
  \`,
})
export class AutoCompleteCaseDemoComponent {
${STREET_ITEMS}
}`,
  },
  {
    id: 'status',
    title: 'Status',
    descriptionParts: [
      { text: 'Error uses the Price Range message row: 14-regular, ' },
      { code: 'text/error' },
      { text: ', and A Bold/Error. Disabled still passes through to mbbiz-input.' },
    ],
    tags: ['selector=mbbiz-auto-complete', 'status=error', 'disabled=true'],
    variant: 'status',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizAutoCompleteComponent, type MbbizDropdownItem } from 'mbbiz';

@Component({
  selector: 'app-auto-complete-status-demo',
  standalone: true,
  imports: [MbbizAutoCompleteComponent],
  template: \`
    <mbbiz-auto-complete
      placeholder="Input text"
      status="error"
      errorMessage="Error message"
      [items]="items"
    />

    <mbbiz-auto-complete placeholder="Input text" [disabled]="true" [items]="items" />
  \`,
})
export class AutoCompleteStatusDemoComponent {
${BASIC_ITEMS}
}`,
  },
];

export const AUTO_COMPLETE_API_ROWS: AutoCompleteApiRow[] = [
  { property: 'value', description: 'Free-text value shown in the input.', type: 'string', defaultValue: "''" },
  { property: 'placeholder', description: 'Passed through to mbbiz-input.', type: 'string', defaultValue: "'Input text'" },
  { property: 'items', description: 'Suggestion list. Reuses MbbizDropdownItem.', type: 'readonly MbbizDropdownItem[]', defaultValue: '[]' },
  { property: 'disabled', description: 'Disables the input and blocks the panel.', type: 'boolean', defaultValue: 'false' },
  { property: 'size', description: 'Passed through to mbbiz-input.', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'" },
  { property: 'status', description: 'Passed through to mbbiz-input.', type: "'default' | 'error'", defaultValue: "'default'" },
  { property: 'errorMessage', description: 'Price Range-style error row under the field when status is error.', type: 'string | null', defaultValue: 'null' },
  { property: 'label', description: 'Optional label passed through to mbbiz-input.', type: 'string | null', defaultValue: 'null' },
  { property: 'hint', description: 'Optional hint passed through to mbbiz-input.', type: 'string | null', defaultValue: 'null' },
  { property: 'open', description: 'Controlled open state for the suggestion panel.', type: 'boolean', defaultValue: 'false' },
  { property: 'valueChange', description: 'Emits on type and on option select (label text).', type: 'output<string>', defaultValue: '-' },
  { property: 'itemSelect', description: 'Emits the chosen MbbizDropdownItem.', type: 'output<MbbizDropdownItem>', defaultValue: '-' },
  { property: 'openChange', description: 'Emits when the suggestion panel opens or closes.', type: 'output<boolean>', defaultValue: '-' },
];

export const AUTO_COMPLETE_VARIABLE_GROUPS: AutoCompleteVariableGroup[] = [
  {
    title: 'Input',
    rows: [
      { token: 'border/info', value: 'blue/300', appliesTo: 'Default input border', notes: 'Same chrome as Basic Text Input.' },
      { token: 'border/active', value: 'turquoise/400', appliesTo: 'Hover and focus input border', notes: 'Shared Input Field family interactive border.' },
      { token: 'border/error1', value: 'red/500', appliesTo: 'Error input border', notes: 'Activated by status="error".' },
      { token: 'text/tertiary', value: 'darkblue/400', appliesTo: 'Placeholder', notes: 'Passed through mbbiz-input.' },
      { token: 'text/error', value: 'red/400', appliesTo: 'Error message', notes: 'Same row as Price Range. Maps to --color-semantic-text-error / #F34343.' },
      { token: 'icon/error', value: 'red/500', appliesTo: 'Error icon A Bold/Error', notes: 'Maps to --color-semantic-icon-error / #F00000.' },
    ],
  },
  {
    title: 'Droplist',
    rows: [
      { token: 'border/active', value: 'turquoise/400', appliesTo: 'Open panel border', notes: 'Copied from mbbiz-dropdown panel.' },
      { token: 'text/brand-primary1', value: 'blue/500', appliesTo: 'Selected option label', notes: 'Same selected option treatment as dropdown.' },
      { token: 'text/secondary', value: 'darkblue/500', appliesTo: 'Empty items copy', notes: 'Only if ArrowDown opens an empty items list.' },
    ],
  },
];

export const AUTO_COMPLETE_VARIABLE_NOTES = [
  'Trigger is mbbiz-input (250px). Panel markup is copied from dropdown, not extracted.',
  'The list opens on a matching query or ArrowDown. No match closes the panel. Empty click does not open.',
  'v1 does not include custom input slots, overlay origin, category lookup, backfill, or extra input variants.',
];
