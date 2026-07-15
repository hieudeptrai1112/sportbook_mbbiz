export type InputTagDemoVariant =
  | 'interactive'
  | 'overflow'
  | 'renderTag'
  | 'validation'
  | 'error'
  | 'disabled';

export interface InputTagDescriptionPart {
  text?: string;
  code?: string;
}

export interface InputTagDemoSection {
  id: string;
  title: string;
  descriptionParts: InputTagDescriptionPart[];
  tags: string[];
  variant: InputTagDemoVariant;
  snippetTs: string;
}

export interface InputTagApiRow {
  property: string;
  description: string;
  type: string;
  defaultValue: string;
}

export interface InputTagVariableRow {
  token: string;
  value: string;
  appliesTo: string;
  notes: string;
}

export interface InputTagVariableGroup {
  title: string;
  rows: InputTagVariableRow[];
}

export const INPUT_TAG_DEMO_SECTIONS: InputTagDemoSection[] = [
  {
    id: 'interactive',
    title: 'Interactive',
    descriptionParts: [
      { text: 'Create removable tags from typed text. Press ' },
      { code: 'Enter' },
      { text: ' to create a tag; ' },
      { code: 'allowClear' },
      { text: ' clears all tags and the current input value.' },
    ],
    tags: ['selector=mbbiz-input-tag', 'allowClear=true', 'saveOnBlur=true'],
    variant: 'interactive',
    snippetTs: `import { Component, signal } from '@angular/core';
import { MbbizInputTagComponent, type MbbizInputTagValue } from 'mbbiz';

@Component({
  selector: 'app-input-tag-interactive-demo',
  standalone: true,
  imports: [MbbizInputTagComponent],
  template: \`
    <mbbiz-input-tag
      inputId="input-tag-interactive"
      placeholder="Input and press Enter"
      [allowClear]="true"
      [saveOnBlur]="true"
      [value]="value()"
      [tags]="tags()"
      (valueChange)="value.set($event)"
      (tagsChange)="tags.set($event)"
    />
  \`,
})
export class InputTagInteractiveDemoComponent {
  readonly value = signal('');
  readonly tags = signal<MbbizInputTagValue[]>([]);
}`,
  },
  {
    id: 'overflow',
    title: 'Overflow',
    descriptionParts: [
      { code: 'maxTagCount' },
      { text: ' limits visible tags and exposes the remaining tags through an overflow indicator.' },
    ],
    tags: ['selector=mbbiz-input-tag', 'maxTagCount=3', 'maxTagCount=responsive'],
    variant: 'overflow',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizInputTagComponent } from 'mbbiz';

@Component({
  selector: 'app-input-tag-overflow-demo',
  standalone: true,
  imports: [MbbizInputTagComponent],
  template: \`
    <mbbiz-input-tag
      inputId="input-tag-max-count"
      [tags]="['1', '2', '3', '4', '5']"
      [maxTagCount]="3"
    />

    <mbbiz-input-tag
      inputId="input-tag-responsive"
      [tags]="['label 1', 'label 2', 'label 3', 'label 4', 'label 5']"
      [maxTagCount]="{ count: 1, render: renderMore }"
    />
  \`,
})
export class InputTagOverflowDemoComponent {
  readonly renderMore = (hiddenTagCount: number) => \`+\${hiddenTagCount} More\`;
}`,
  },
  {
    id: 'render-tag',
    title: 'Render Tag',
    descriptionParts: [
      { code: 'renderTag' },
      { text: ' customizes each chip label and visual tone while keeping the same input behavior.' },
    ],
    tags: ['selector=mbbiz-input-tag', 'renderTag=custom', 'allowClear=true'],
    variant: 'renderTag',
    snippetTs: `import { Component } from '@angular/core';
import {
  MbbizInputTagComponent,
  type MbbizInputTagRenderFn,
} from 'mbbiz';

@Component({
  selector: 'app-input-tag-render-demo',
  standalone: true,
  imports: [MbbizInputTagComponent],
  template: \`
    <mbbiz-input-tag
      inputId="input-tag-render"
      placeholder="Color tags"
      [allowClear]="true"
      [tags]="['arcoblue', 'orange', 'lime']"
      [renderTag]="renderTag"
    />
  \`,
})
export class InputTagRenderDemoComponent {
  readonly renderTag: MbbizInputTagRenderFn = ({ value, label }) => {
    const toneByValue = {
      arcoblue: 'brand',
      orange: 'warning',
      lime: 'success',
    } as const;

    return {
      label,
      tone: toneByValue[value as keyof typeof toneByValue] ?? 'brand',
    };
  };
}`,
  },
  {
    id: 'validation',
    title: 'Validation',
    descriptionParts: [
      { code: 'validate' },
      { text: ' blocks invalid tag creation and keeps the typed value visible for correction.' },
    ],
    tags: ['selector=mbbiz-input-tag', 'validate=email', 'allowClear=true'],
    variant: 'validation',
    snippetTs: `import { Component, signal } from '@angular/core';
import {
  MbbizInputTagComponent,
  type MbbizInputTagValidateFn,
  type MbbizInputTagValue,
} from 'mbbiz';

@Component({
  selector: 'app-input-tag-validation-demo',
  standalone: true,
  imports: [MbbizInputTagComponent],
  template: \`
    <mbbiz-input-tag
      inputId="input-tag-email"
      placeholder="Input email and press Enter"
      [allowClear]="true"
      [value]="value()"
      [tags]="tags()"
      [validate]="validateEmail"
      (valueChange)="value.set($event)"
      (tagsChange)="tags.set($event)"
    />
  \`,
})
export class InputTagValidationDemoComponent {
  readonly value = signal('');
  readonly tags = signal<MbbizInputTagValue[]>([]);

  readonly validateEmail: MbbizInputTagValidateFn = (inputValue, tags) => {
    const candidate = inputValue.trim().toLowerCase();
    const isEmail = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(candidate);
    const duplicated = tags.some((tag) => (typeof tag === 'string' ? tag : tag.value) === candidate);

    return candidate && isEmail && !duplicated ? { value: candidate, label: candidate } : false;
  };
}`,
  },
  {
    id: 'error',
    title: 'Error',
    descriptionParts: [
      { code: 'status="error"' },
      { text: ' renders the invalid state without changing the tag creation API.' },
    ],
    tags: ['selector=mbbiz-input-tag', 'status=error', 'showTrailingClear=true'],
    variant: 'error',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizInputTagComponent } from 'mbbiz';

@Component({
  selector: 'app-input-tag-error-demo',
  standalone: true,
  imports: [MbbizInputTagComponent],
  template: \`
    <mbbiz-input-tag
      inputId="input-tag-error"
      placeholder="Input text"
      status="error"
      [showTrailingClear]="true"
    />
  \`,
})
export class InputTagErrorDemoComponent {}`,
  },
  {
    id: 'disabled',
    title: 'Disabled',
    descriptionParts: [
      { code: 'disabled=true' },
      { text: ' prevents typing, tag deletion, and clear interaction.' },
    ],
    tags: ['selector=mbbiz-input-tag', 'disabled=true'],
    variant: 'disabled',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizInputTagComponent } from 'mbbiz';

@Component({
  selector: 'app-input-tag-disabled-demo',
  standalone: true,
  imports: [MbbizInputTagComponent],
  template: \`
    <mbbiz-input-tag
      inputId="input-tag-disabled"
      placeholder="Input text"
      [disabled]="true"
    />
  \`,
})
export class InputTagDisabledDemoComponent {}`,
  },
];

export const INPUT_TAG_API_ROWS: InputTagApiRow[] = [
  {
    property: 'tags',
    description: 'Controlled tag values rendered as removable chips.',
    type: 'readonly MbbizInputTagValue[]',
    defaultValue: '[]',
  },
  {
    property: 'value',
    description: 'Controlled text value currently being typed inside the input.',
    type: 'string',
    defaultValue: "''",
  },
  {
    property: 'placeholder',
    description: 'Placeholder shown when there are no visible tags and no typed value.',
    type: 'string',
    defaultValue: "'Input text'",
  },
  {
    property: 'disabled',
    description: 'Disables typing, clear, and tag removal.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'readOnly',
    description: 'Prevents editing while keeping the current visual state readable.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'status',
    description: 'Visual status for default, error, or disabled presentation.',
    type: "'default' | 'error' | 'disabled'",
    defaultValue: "'default'",
  },
  {
    property: 'allowClear',
    description: 'Shows a trailing clear action when tags or typed value exist.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'showTrailingClear',
    description: 'Forces the trailing clear affordance for static docs or validation states.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'saveOnBlur',
    description: 'Creates a tag from the typed value when the input loses focus.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'labelInValue',
    description: 'Allows object values with separate value and label fields.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'tokenSeparators',
    description: 'Splits pasted or typed text into tags when a separator is entered.',
    type: 'readonly string[]',
    defaultValue: '[]',
  },
  {
    property: 'maxTagCount',
    description: 'Limits visible tags by count or responsive measurement.',
    type: "number | 'responsive' | { count: number | 'responsive'; render?: (...) => string }",
    defaultValue: 'null',
  },
  {
    property: 'validate',
    description: 'Validates and optionally transforms typed text before creating a tag.',
    type: 'MbbizInputTagValidateFn',
    defaultValue: 'dedupe non-empty value',
  },
  {
    property: 'renderTag',
    description: 'Customizes chip label, closability, tone, or class name.',
    type: 'MbbizInputTagRenderFn | null',
    defaultValue: 'null',
  },
  {
    property: 'valueChange',
    description: 'Emits when the typed input value changes.',
    type: 'output<string>',
    defaultValue: '-',
  },
  {
    property: 'tagsChange',
    description: 'Emits the next tag list after creation, removal, or clear.',
    type: 'output<MbbizInputTagValue[]>',
    defaultValue: '-',
  },
  {
    property: 'tagRemove',
    description: 'Emits the removed tag value before the next tag list is emitted.',
    type: 'output<MbbizInputTagValue>',
    defaultValue: '-',
  },
  {
    property: 'clearRequest',
    description: 'Emits when the trailing clear action clears tags and typed value.',
    type: 'output<void>',
    defaultValue: '-',
  },
];

export const INPUT_TAG_VARIABLE_GROUPS: InputTagVariableGroup[] = [
  {
    title: 'Container',
    rows: [
      { token: 'background/primary', value: 'white/100%', appliesTo: 'Container background', notes: 'Surface used by default and disabled shells.' },
      { token: 'border/brand-primary3', value: 'blue/300', appliesTo: 'Default border', notes: 'Base border before hover/focus/error/disabled overrides.' },
      { token: 'border/brand-tertiary', value: 'turquoise/400', appliesTo: 'Hover and focus border', notes: 'Interactive border state from the component runtime.' },
      { token: 'radius/md', value: '4px', appliesTo: 'Container and tag radius', notes: 'Shared radius for the input shell and chips.' },
    ],
  },
  {
    title: 'Status',
    rows: [
      { token: 'background/error-secondary', value: 'red/400', appliesTo: 'Error border and error chip text', notes: 'Activated by status="error".' },
      { token: 'border/disable2', value: 'grayscale/400', appliesTo: 'Disabled border', notes: 'Activated by disabled=true.' },
      { token: 'text/disable1', value: 'grayscale/600', appliesTo: 'Disabled placeholder and input text', notes: 'Keeps disabled value readable without interactive affordance.' },
    ],
  },
  {
    title: 'Chip',
    rows: [
      { token: 'background/brand-primary4', value: 'blue/200', appliesTo: 'Default chip background', notes: 'Used by normal tags and overflow examples.' },
      { token: 'text/primary3', value: 'darkblue/700', appliesTo: 'Default chip text and remove icon', notes: 'Shared color for label and clear icon in a chip.' },
      { token: 'background/error-tertiary', value: 'red/100', appliesTo: 'Error chip background', notes: 'Used when the input tag status is error.' },
    ],
  }
];

export const INPUT_TAG_VARIABLE_NOTES = [
  'The input shell is 300px wide in the component implementation; docs cards should not add an extra border around the component itself.',
  'Hover and focus are runtime states. Static docs should demo the default state first and let interaction drive hover/focus.',
  'Advanced API such as labelInValue and tokenSeparators is documented for completeness but is not shown as a separate preview use case unless a matching Figma node is approved.',
];
