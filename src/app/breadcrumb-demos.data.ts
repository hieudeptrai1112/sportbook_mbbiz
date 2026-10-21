export type BreadcrumbDemoVariant = 'amount' | 'state';

export interface BreadcrumbDescriptionPart {
  text?: string;
  code?: string;
}

export interface BreadcrumbDemoSection {
  id: string;
  title: string;
  descriptionParts: BreadcrumbDescriptionPart[];
  tags: string[];
  variant: BreadcrumbDemoVariant;
  snippetTs: string;
}

export interface BreadcrumbApiRow {
  property: string;
  description: string;
  type: string;
  defaultValue: string;
}

export interface BreadcrumbVariableRow {
  token: string;
  value: string;
  appliesTo: string;
  notes: string;
}

export interface BreadcrumbVariableGroup {
  title: string;
  rows: BreadcrumbVariableRow[];
}

export const BREADCRUMB_DEMO_SECTIONS: BreadcrumbDemoSection[] = [
  {
    id: 'amount',
    title: 'Amount',
    descriptionParts: [
      { code: 'amount="1..5"' },
      { text: ' renders the NG-Zorro breadcrumb structure with Mbbiz item spacing and separator styling.' },
    ],
    tags: ['selector=mbbiz-breadcrumb', 'source=ng-zorro-antd/breadcrumb', 'figma=node 3164:13861'],
    variant: 'amount',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizBreadcrumbComponent } from 'mbbiz';

@Component({
  selector: 'app-breadcrumb-amount-demo',
  standalone: true,
  imports: [MbbizBreadcrumbComponent],
  template: \`
    <mbbiz-breadcrumb [amount]="1" />
    <mbbiz-breadcrumb [amount]="2" />
    <mbbiz-breadcrumb [amount]="3" />
    <mbbiz-breadcrumb [amount]="4" />
    <mbbiz-breadcrumb [amount]="5" />
  \`,
})
export class BreadcrumbAmountDemoComponent {}`,
  },
  {
    id: 'state',
    title: 'State',
    descriptionParts: [
      { code: 'state="default"' },
      { text: ' starts from the default breadcrumb state; hover and focus are driven by real link interaction.' },
    ],
    tags: ['selector=mbbiz-breadcrumb', 'states=default first/hover/focus', 'figma=node 3164:13801'],
    variant: 'state',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizBreadcrumbComponent } from 'mbbiz';

@Component({
  selector: 'app-breadcrumb-state-demo',
  standalone: true,
  imports: [MbbizBreadcrumbComponent],
  template: \`
    <mbbiz-breadcrumb [amount]="2" />
  \`,
})
export class BreadcrumbStateDemoComponent {}`,
  },
];

export const BREADCRUMB_API_ROWS: BreadcrumbApiRow[] = [
  { property: 'items', description: 'Explicit breadcrumb items. When omitted, amount generates Page items for previews.', type: 'readonly MbbizBreadcrumbItem[]', defaultValue: '[]' },
  { property: 'amount', description: 'Number of generated breadcrumb items when items is empty.', type: 'number', defaultValue: '3' },
  { property: 'state', description: 'Forced visual state for docs and QA snapshots.', type: "'default' | 'hover' | 'focus'", defaultValue: "'default'" },
  { property: 'ariaLabel', description: 'Accessible label for the breadcrumb nav region.', type: 'string', defaultValue: "'Breadcrumb'" },
  { property: 'itemClick', description: 'Emits the selected item when a non-disabled breadcrumb item is clicked.', type: 'output<MbbizBreadcrumbItem>', defaultValue: '-' },
];

export const BREADCRUMB_VARIABLE_GROUPS: BreadcrumbVariableGroup[] = [
  {
    title: 'Breadcrumb Color Tokens',
    rows: [
      { token: 'text/secondary', value: 'darkblue/500', appliesTo: 'Default item text', notes: '' },
      { token: 'text/primary', value: 'darkblue/1000', appliesTo: 'Hover item text', notes: '' },
      { token: 'text/primary2', value: 'darkblue/800', appliesTo: 'Focus item text', notes: '' },
      { token: 'icon/neutral4', value: 'darkblue/500', appliesTo: 'Default separator icon', notes: 'Separator inherits item color.' },
      { token: 'breadcrumb/gap/item', value: '4px', appliesTo: 'Label to separator and item to item gap', notes: 'Matches Figma auto layout gap.' },
      { token: 'breadcrumb/icon/size', value: '20px', appliesTo: 'Separator box', notes: 'Contains the 5 x 8.333 chevron path from Figma.' },
    ],
  }
];

export const BREADCRUMB_VARIABLE_NOTES = [
  'The component wraps NG-Zorro nz-breadcrumb and overrides Ant breadcrumb color, separator margin, and final-item color.',
  'The chevron separator path is taken from the Figma asset and rendered inline so the component does not depend on expiring asset URLs.',
];
