export type DropdownDemoVariant =
  | 'basic'
  | 'multiple'
  | 'tag'
  | 'insideLabel'
  | 'searchable'
  | 'tagDroplist'
  | 'status'
  | 'disabled'
  | 'emptyStates';

export interface DropdownDescriptionPart {
  text?: string;
  code?: string;
}

export interface DropdownDemoSection {
  id: string;
  title: string;
  descriptionParts: DropdownDescriptionPart[];
  tags: string[];
  variant: DropdownDemoVariant;
  snippetTs: string;
}

export interface DropdownApiRow {
  property: string;
  description: string;
  type: string;
  defaultValue: string;
}

export interface DropdownVariableRow {
  token: string;
  value: string;
  appliesTo: string;
  notes: string;
}

export interface DropdownVariableGroup {
  title: string;
  rows: DropdownVariableRow[];
}

const OPTIONS_DECLARATION = `  readonly items: readonly Sportbook6vnDropdownItem[] = [
    { id: 'option-1', label: 'Option 1' },
    { id: 'option-2', label: 'Option 2' },
    { id: 'option-3', label: 'Option 3' },
    { id: 'option-4', label: 'Option 4' },
    { id: 'option-5', label: 'Option 5' },
    { id: 'option-6', label: 'Option 6' },
  ];`;

export const DROPDOWN_DEMO_SECTIONS: DropdownDemoSection[] = [
  {
    id: 'basic',
    title: 'Basic Select',
    descriptionParts: [
      { text: 'There are ' },
      { code: 'empty' },
      { text: ' and ' },
      { code: 'selected' },
      { text: ' single-select trigger states. Droplist content appears only after user interaction.' },
    ],
    tags: ['selector=sportbook6vn-dropdown', 'mode=single', 'state=closed'],
    variant: 'basic',
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnDropdownComponent, type Sportbook6vnDropdownItem } from 'sportbook6vn';

@Component({
  selector: 'app-dropdown-basic-demo',
  standalone: true,
  imports: [Sportbook6vnDropdownComponent],
  template: \`
    <sportbook6vn-dropdown placeholder="Lựa chọn" [items]="items" />

    <sportbook6vn-dropdown placeholder="Lựa chọn" value="option-1" [items]="items" />
  \`,
})
export class DropdownBasicDemoComponent {
${OPTIONS_DECLARATION}
}`,
  },
  {
    id: 'multiple',
    title: 'Multiple Select',
    descriptionParts: [
      { code: 'mode="multiple"' },
      { text: ' displays a selected-value summary while keeping the same closed trigger behavior.' },
    ],
    tags: ['selector=sportbook6vn-dropdown', 'mode=multiple', 'values=string[]'],
    variant: 'multiple',
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnDropdownComponent, type Sportbook6vnDropdownItem } from 'sportbook6vn';

@Component({
  selector: 'app-dropdown-multiple-demo',
  standalone: true,
  imports: [Sportbook6vnDropdownComponent],
  template: \`
    <sportbook6vn-dropdown mode="multiple" placeholder="Lựa chọn" [items]="items" />

    <sportbook6vn-dropdown
      mode="multiple"
      placeholder="Lựa chọn"
      [items]="items"
      [values]="['option-1', 'option-2', 'option-3']"
    />
  \`,
})
export class DropdownMultipleDemoComponent {
${OPTIONS_DECLARATION}
}`,
  },
  {
    id: 'tag-select',
    title: 'Tag Select',
    descriptionParts: [
      { code: 'sportbook6vn-dropdown-tag' },
      { text: ' renders selected items as removable chips and collapses overflow into a ' },
      { code: '+N' },
      { text: ' indicator.' },
    ],
    tags: ['selector=sportbook6vn-dropdown-tag', 'maxVisibleTags=2', 'overflow=+N'],
    variant: 'tag',
    snippetTs: `import { Component } from '@angular/core';
import {
  Sportbook6vnDropdownTagComponent,
  type Sportbook6vnDropdownItem,
} from 'sportbook6vn';

@Component({
  selector: 'app-dropdown-tag-demo',
  standalone: true,
  imports: [Sportbook6vnDropdownTagComponent],
  template: \`
    <sportbook6vn-dropdown-tag placeholder="Lựa chọn" [items]="items" />

    <sportbook6vn-dropdown-tag
      placeholder="Lựa chọn"
      [items]="items"
      [values]="['option-1', 'option-2']"
    />

    <sportbook6vn-dropdown-tag
      placeholder="Lựa chọn"
      [items]="items"
      [values]="['option-1', 'option-2', 'option-3', 'option-4']"
    />
  \`,
})
export class DropdownTagDemoComponent {
${OPTIONS_DECLARATION}
}`,
  },
  {
    id: 'inside-label',
    title: 'Inside Label',
    descriptionParts: [
      { code: 'labelMode="inside"' },
      { text: ' keeps the field label inside the trigger for both single and multiple select.' },
    ],
    tags: ['selector=sportbook6vn-dropdown', 'labelMode=inside', 'title=Title'],
    variant: 'insideLabel',
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnDropdownComponent, type Sportbook6vnDropdownItem } from 'sportbook6vn';

@Component({
  selector: 'app-dropdown-inside-label-demo',
  standalone: true,
  imports: [Sportbook6vnDropdownComponent],
  template: \`
    <sportbook6vn-dropdown
      title="Title"
      labelMode="inside"
      value="option-1"
      [items]="items"
    />

    <sportbook6vn-dropdown
      title="Title"
      labelMode="inside"
      mode="multiple"
      [items]="items"
      [values]="['option-1', 'option-2']"
    />
  \`,
})
export class DropdownInsideLabelDemoComponent {
${OPTIONS_DECLARATION}
}`,
  },
  {
    id: 'searchable-droplist',
    title: 'Searchable Droplist',
    descriptionParts: [
      { code: 'searchBehavior="auto"' },
      { text: ' shows search when option count is greater than ' },
      { code: 'searchThreshold' },
      { text: '. The trigger stays closed in the docs preview until opened by the user.' },
    ],
    tags: ['selector=sportbook6vn-dropdown', 'searchBehavior=auto', 'searchThreshold=5'],
    variant: 'searchable',
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnDropdownComponent, type Sportbook6vnDropdownItem } from 'sportbook6vn';

@Component({
  selector: 'app-dropdown-searchable-demo',
  standalone: true,
  imports: [Sportbook6vnDropdownComponent],
  template: \`
    <sportbook6vn-dropdown
      placeholder="Lựa chọn"
      [items]="items"
      searchBehavior="auto"
      [searchThreshold]="5"
    />

    <sportbook6vn-dropdown
      mode="multiple"
      placeholder="Lựa chọn"
      [items]="items"
      searchBehavior="auto"
      [searchThreshold]="5"
    />
  \`,
})
export class DropdownSearchableDemoComponent {
${OPTIONS_DECLARATION}
}`,
  },
  {
    id: 'tag-droplist',
    title: 'Tag Droplist',
    descriptionParts: [
      { text: 'Tag droplist uses the same ' },
      { code: 'items' },
      { text: ' source as select and keeps selected tags inside the trigger.' },
    ],
    tags: ['selector=sportbook6vn-dropdown-tag', 'searchBehavior=auto', 'state=closed'],
    variant: 'tagDroplist',
    snippetTs: `import { Component } from '@angular/core';
import {
  Sportbook6vnDropdownTagComponent,
  type Sportbook6vnDropdownItem,
} from 'sportbook6vn';

@Component({
  selector: 'app-dropdown-tag-droplist-demo',
  standalone: true,
  imports: [Sportbook6vnDropdownTagComponent],
  template: \`
    <sportbook6vn-dropdown-tag
      placeholder="Lựa chọn"
      [items]="items"
      [values]="['option-1', 'option-2', 'option-3', 'option-4']"
    />
  \`,
})
export class DropdownTagDroplistDemoComponent {
${OPTIONS_DECLARATION}
}`,
  },
  {
    id: 'status',
    title: 'Status',
    descriptionParts: [
      { code: 'status="error"' },
      { text: ' renders the error border for single, multiple, and tag select triggers.' },
    ],
    tags: ['selector=sportbook6vn-dropdown', 'selector=sportbook6vn-dropdown-tag', 'status=error'],
    variant: 'status',
    snippetTs: `import { Component } from '@angular/core';
import {
  Sportbook6vnDropdownComponent,
  Sportbook6vnDropdownTagComponent,
  type Sportbook6vnDropdownItem,
} from 'sportbook6vn';

@Component({
  selector: 'app-dropdown-status-demo',
  standalone: true,
  imports: [Sportbook6vnDropdownComponent, Sportbook6vnDropdownTagComponent],
  template: \`
    <sportbook6vn-dropdown status="error" placeholder="Lựa chọn" [items]="items" />

    <sportbook6vn-dropdown
      mode="multiple"
      status="error"
      placeholder="Lựa chọn"
      [items]="items"
      [values]="['option-1', 'option-2']"
    />

    <sportbook6vn-dropdown-tag status="error" placeholder="Lựa chọn" [items]="items" />
  \`,
})
export class DropdownStatusDemoComponent {
${OPTIONS_DECLARATION}
}`,
  },
  {
    id: 'disabled',
    title: 'Disabled',
    descriptionParts: [
      { code: 'disabled=true' },
      { text: ' prevents opening, selection, and tag removal while keeping the current value visible.' },
    ],
    tags: ['selector=sportbook6vn-dropdown', 'selector=sportbook6vn-dropdown-tag', 'disabled=true'],
    variant: 'disabled',
    snippetTs: `import { Component } from '@angular/core';
import {
  Sportbook6vnDropdownComponent,
  Sportbook6vnDropdownTagComponent,
  type Sportbook6vnDropdownItem,
} from 'sportbook6vn';

@Component({
  selector: 'app-dropdown-disabled-demo',
  standalone: true,
  imports: [Sportbook6vnDropdownComponent, Sportbook6vnDropdownTagComponent],
  template: \`
    <sportbook6vn-dropdown placeholder="Lựa chọn" [items]="items" [disabled]="true" />

    <sportbook6vn-dropdown
      mode="multiple"
      placeholder="Lựa chọn"
      [items]="items"
      [values]="['option-1', 'option-2']"
      [disabled]="true"
    />

    <sportbook6vn-dropdown-tag
      placeholder="Lựa chọn"
      [items]="items"
      [values]="['option-1', 'option-2', 'option-3']"
      [disabled]="true"
    />
  \`,
})
export class DropdownDisabledDemoComponent {
${OPTIONS_DECLARATION}
}`,
  },
  {
    id: 'empty-states',
    title: 'Empty States',
    descriptionParts: [
      { code: 'emptyState' },
      { text: ' controls no-data, search-no-data, api-error, and loading droplist content.' },
    ],
    tags: ['selector=sportbook6vn-dropdown', 'emptyState=no-data/search-no-data/api-error/loading'],
    variant: 'emptyStates',
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnDropdownComponent, type Sportbook6vnDropdownItem } from 'sportbook6vn';

@Component({
  selector: 'app-dropdown-empty-state-demo',
  standalone: true,
  imports: [Sportbook6vnDropdownComponent],
  template: \`
    <sportbook6vn-dropdown placeholder="Lựa chọn" [items]="[]" emptyState="no-data" />

    <sportbook6vn-dropdown placeholder="Lựa chọn" [items]="items" emptyState="search-no-data" />

    <sportbook6vn-dropdown placeholder="Lựa chọn" [items]="items" emptyState="api-error" />

    <sportbook6vn-dropdown placeholder="Lựa chọn" [items]="items" emptyState="loading" />
  \`,
})
export class DropdownEmptyStateDemoComponent {
${OPTIONS_DECLARATION}
}`,
  },
];

export const DROPDOWN_API_ROWS: DropdownApiRow[] = [
  {
    property: 'items',
    description: 'Option list rendered in the droplist.',
    type: 'readonly Sportbook6vnDropdownItem[]',
    defaultValue: '[]',
  },
  {
    property: 'mode',
    description: 'Selection mode for a single selected value or multiple selected values.',
    type: "'single' | 'multiple'",
    defaultValue: "'single'",
  },
  {
    property: 'value',
    description: 'Controlled selected option id for single-select mode.',
    type: 'string | null',
    defaultValue: 'null',
  },
  {
    property: 'values',
    description: 'Controlled selected option ids for multiple-select mode.',
    type: 'readonly string[]',
    defaultValue: '[]',
  },
  {
    property: 'placeholder',
    description: 'Text shown when no option is selected.',
    type: 'string',
    defaultValue: "'Lựa chọn'",
  },
  {
    property: 'title',
    description: 'Label used by outside or inside label variants.',
    type: 'string',
    defaultValue: "'Title'",
  },
  {
    property: 'labelMode',
    description: 'Controls whether the label is outside the trigger or inside the trigger.',
    type: "'outside' | 'inside'",
    defaultValue: "'outside'",
  },
  {
    property: 'status',
    description: 'Visual validation status for the trigger.',
    type: "'default' | 'error'",
    defaultValue: "'default'",
  },
  {
    property: 'disabled',
    description: 'Disables opening and selection.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'open',
    description: 'Controls whether the droplist is open.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'searchBehavior',
    description: 'Controls whether search is auto, always visible, or hidden.',
    type: "'auto' | 'always' | 'never'",
    defaultValue: "'auto'",
  },
  {
    property: 'searchThreshold',
    description: 'Minimum option count that enables search when searchBehavior is auto.',
    type: 'number',
    defaultValue: '5',
  },
  {
    property: 'emptyState',
    description: 'Droplist empty or loading state rendered when open.',
    type: "'none' | 'no-data' | 'search-no-data' | 'api-error' | 'loading'",
    defaultValue: "'none'",
  },
  {
    property: 'valueChange',
    description: 'Emits the selected option id in single-select mode.',
    type: 'output<string | null>',
    defaultValue: '-',
  },
  {
    property: 'valuesChange',
    description: 'Emits selected option ids in multiple-select mode.',
    type: 'output<string[]>',
    defaultValue: '-',
  },
  {
    property: 'openChange',
    description: 'Emits when the trigger opens or closes.',
    type: 'output<boolean>',
    defaultValue: '-',
  },
];

export const DROPDOWN_TAG_API_ROWS: DropdownApiRow[] = [
  {
    property: 'items',
    description: 'Option list rendered in the tag droplist.',
    type: 'readonly Sportbook6vnDropdownItem[]',
    defaultValue: '[]',
  },
  {
    property: 'values',
    description: 'Controlled selected option ids rendered as chips.',
    type: 'readonly string[]',
    defaultValue: '[]',
  },
  {
    property: 'placeholder',
    description: 'Text shown when no tag is selected.',
    type: 'string',
    defaultValue: "'Lựa chọn'",
  },
  {
    property: 'maxVisibleTags',
    description: 'Number of chips shown before collapsing the rest into +N.',
    type: 'number',
    defaultValue: '2',
  },
  {
    property: 'status',
    description: 'Visual validation status for the tag trigger.',
    type: "'default' | 'error'",
    defaultValue: "'default'",
  },
  {
    property: 'disabled',
    description: 'Disables opening, selection, and chip removal.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'open',
    description: 'Controls whether the tag droplist is open.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'emptyState',
    description: 'Droplist empty or loading state rendered when open.',
    type: "'none' | 'no-data' | 'search-no-data' | 'api-error' | 'loading'",
    defaultValue: "'none'",
  },
  {
    property: 'valuesChange',
    description: 'Emits selected option ids after select, unselect, or chip removal.',
    type: 'output<string[]>',
    defaultValue: '-',
  },
  {
    property: 'openChange',
    description: 'Emits when the tag trigger opens or closes.',
    type: 'output<boolean>',
    defaultValue: '-',
  },
];

export const DROPDOWN_VARIABLE_GROUPS: DropdownVariableGroup[] = [
  {
    title: 'Trigger',
    rows: [
      {
        token: '--sportbook6vn-color-dropdown-border-default',
        value: '#dae4ff',
        appliesTo: 'Default trigger border',
        notes: 'Used by closed select and tag triggers.',
      },
      {
        token: '--sportbook6vn-color-dropdown-border-active',
        value: '#52dddd',
        appliesTo: 'Hover, focus, and open trigger border',
        notes: 'Interactive accent border from the Figma state set.',
      },
      {
        token: '--sportbook6vn-color-dropdown-border-error',
        value: '#f00000',
        appliesTo: 'Error trigger border',
        notes: 'Activated by status="error".',
      },
      {
        token: '--sportbook6vn-color-dropdown-border-disabled',
        value: '#cccccc',
        appliesTo: 'Disabled trigger border',
        notes: 'Activated by disabled=true.',
      },
      {
        token: '--sportbook6vn-radius-md',
        value: '4px',
        appliesTo: 'Trigger and droplist radius',
        notes: 'Shared radius for select shell, search box, and dropdown panel.',
      },
    ],
  },
  {
    title: 'Text And Icon',
    rows: [
      {
        token: '--sportbook6vn-color-dropdown-text-placeholder',
        value: '#9bafc8',
        appliesTo: 'Placeholder text',
        notes: 'Shown when no value is selected.',
      },
      {
        token: '--sportbook6vn-color-dropdown-text-default',
        value: '#192d39',
        appliesTo: 'Selected value and option text',
        notes: 'Primary text in trigger and droplist options.',
      },
      {
        token: '--sportbook6vn-color-dropdown-icon',
        value: '#192d39',
        appliesTo: 'Chevron icon',
        notes: 'Used by closed and open trigger icons.',
      },
      {
        token: '--sportbook6vn-color-text-brand',
        value: '#141ed2',
        appliesTo: 'Selected checkbox and search icon',
        notes: 'Brand accent for selected multiple options and search action.',
      },
    ],
  },
  {
    title: 'Tag',
    rows: [
      {
        token: '--sportbook6vn-color-dropdown-tag-background',
        value: '#dae4ff',
        appliesTo: 'Selected tag background',
        notes: 'Used by tag select chips and overflow examples.',
      },
      {
        token: '--sportbook6vn-color-dropdown-tag-text',
        value: '#435870',
        appliesTo: 'Selected tag text',
        notes: 'Shared by chip label and remove icon.',
      },
      {
        token: '--sportbook6vn-color-dropdown-tag-background-error',
        value: '#ffe3e3',
        appliesTo: 'Error tag background',
        notes: 'Used when tag trigger status is error.',
      },
    ],
  },
];

export const DROPDOWN_VARIABLE_NOTES = [
  'Dropdown trigger width is 250px in the component implementation; docs wrappers should not stretch it unless the use case requires layout comparison.',
  'Search, scrollbar, and empty-state illustrations are droplist content. Static docs should keep triggers closed unless the use case explicitly demonstrates open behavior.',
  'Tag overflow uses maxVisibleTags=2 by default and collapses additional selected values into +N.',
];
