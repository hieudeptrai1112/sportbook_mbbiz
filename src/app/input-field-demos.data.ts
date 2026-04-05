import type { DsSearchBarState } from './components/ds-search-bar/ds-search-bar.component';

export type InputCodeType = 'js' | 'ts';

export interface InputDemoAction {
  text: string;
  state: DsSearchBarState;
  showDelete?: boolean;
}

export interface InputDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  actions: InputDemoAction[];
  codeJs: string;
  codeTs?: string;
  snippetHtml?: string;
  snippetTs?: string;
}

export interface InputApiRow {
  property: string;
  description: string;
  type: string;
  defaultValue: string;
}

export interface InputSemanticBindingRow {
  componentToken: string;
  semanticAlias: string;
  appliesTo: string;
  notes: string;
}

export interface InputSemanticBindingGroup {
  title: string;
  description: string;
  rows: InputSemanticBindingRow[];
}

export interface InputVariableRow {
  token: string;
  value: string;
  appliesTo: string;
  notes: string;
}

export interface InputVariableGroup {
  title: string;
  description: string;
  rows: InputVariableRow[];
}

export const INPUT_DEMO_SECTIONS: InputDemoSection[] = [
  {
    id: 'default-hover',
    title: 'Default · Hover',
    description: 'Base state uses placeholder text with search icon. Hover only changes border emphasis.',
    tags: ['State=Default/Hover', 'Text variable', 'Search icon'],
    actions: [
      { text: 'Tìm kiếm', state: 'default' },
      { text: 'Tìm kiếm', state: 'hover' },
    ],
    codeJs: `<app-ds-search-bar text="Tìm kiếm" state="default" />\n<app-ds-search-bar text="Tìm kiếm" state="hover" />`,
    codeTs: `import { DsSearchBarComponent } from './components/ds-search-bar/ds-search-bar.component';`,
    snippetHtml: `<section class="button-demo-preview">
  <app-ds-search-bar
    [text]="query || 'Tìm kiếm'"
    [state]="isHovering ? 'hover' : 'default'"
    (mouseenter)="isHovering = true"
    (mouseleave)="isHovering = false"
  />
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsSearchBarComponent } from './components/ds-search-bar/ds-search-bar.component';

@Component({
  selector: 'app-input-default-hover-demo',
  standalone: true,
  imports: [DsSearchBarComponent],
  templateUrl: './input-default-hover-demo.component.html',
})
export class InputDefaultHoverDemoComponent {
  query = '';
  isHovering = false;
}`,
  },
  {
    id: 'focus-typing',
    title: 'Focus · Typing',
    description: 'Focus shows cursor color. Typing state displays entered text and optional clear icon.',
    tags: ['State=Focus/Typing', 'Show Delete', 'Cursor color'],
    actions: [
      { text: 'l', state: 'focus' },
      { text: 'Tìm kiếm', state: 'typing', showDelete: true },
      { text: 'Tìm kiếm', state: 'typing', showDelete: false },
    ],
    codeJs: `<app-ds-search-bar text="l" state="focus" />\n<app-ds-search-bar text="Tìm kiếm" state="typing" [showDelete]="true" />\n<app-ds-search-bar text="Tìm kiếm" state="typing" [showDelete]="false" />`,
    codeTs: `import { DsSearchBarComponent } from './components/ds-search-bar/ds-search-bar.component';`,
    snippetHtml: `<section class="button-demo-preview">
  <app-ds-search-bar
    [text]="query || 'Tìm kiếm'"
    [state]="state"
    [showDelete]="showDelete"
  />
</section>

<section class="button-demo-preview">
  <app-ds-button label="Focus" shape="rectangle" tone="secondary" size="small" state="default" (click)="state = 'focus'" />
  <app-ds-button label="Typing" shape="rectangle" tone="secondary" size="small" state="default" (click)="state = 'typing'" />
  <app-ds-button label="Toggle delete" shape="rectangle" tone="secondary" size="small" state="default" (click)="showDelete = !showDelete" />
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsButtonComponent } from './components/ds-button/ds-button.component';
import { DsSearchBarComponent, DsSearchBarState } from './components/ds-search-bar/ds-search-bar.component';

@Component({
  selector: 'app-input-focus-typing-demo',
  standalone: true,
  imports: [DsButtonComponent, DsSearchBarComponent],
  templateUrl: './input-focus-typing-demo.component.html',
})
export class InputFocusTypingDemoComponent {
  query = 'Tìm kiếm';
  state: DsSearchBarState = 'focus';
  showDelete = true;
}`,
  },
  {
    id: 'filled-states',
    title: 'Filled · Default & Active',
    description: 'Filled states keep white surface, while border and text tokens differentiate passive vs active.',
    tags: ['State=Filled/Default', 'State=Filled/Active'],
    actions: [
      { text: 'Tìm kiếm', state: 'filled-default' },
      { text: 'Tìm kiếm', state: 'filled-active' },
    ],
    codeJs: `<app-ds-search-bar text="Tìm kiếm" state="filled-default" />\n<app-ds-search-bar text="Tìm kiếm" state="filled-active" />`,
    codeTs: `import { DsSearchBarComponent } from './components/ds-search-bar/ds-search-bar.component';`,
    snippetHtml: `<section class="button-demo-preview">
  <app-ds-search-bar
    [text]="query"
    [state]="isActive ? 'filled-active' : 'filled-default'"
  />
</section>

<section class="button-demo-preview">
  <app-ds-button label="Toggle active" shape="rectangle" tone="secondary" size="small" state="default" (click)="isActive = !isActive" />
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsButtonComponent } from './components/ds-button/ds-button.component';
import { DsSearchBarComponent } from './components/ds-search-bar/ds-search-bar.component';

@Component({
  selector: 'app-input-filled-demo',
  standalone: true,
  imports: [DsButtonComponent, DsSearchBarComponent],
  templateUrl: './input-filled-demo.component.html',
})
export class InputFilledDemoComponent {
  query = 'Tìm kiếm';
  isActive = false;
}`,
  },
];

export const INPUT_API_ROWS: InputApiRow[] = [
  {
    property: 'text',
    description: 'Displayed value/placeholder text inside the search bar.',
    type: 'string',
    defaultValue: "'Tìm kiếm'",
  },
  {
    property: 'state',
    description: 'Visual state mapped from Figma variant axis.',
    type: "'default' | 'hover' | 'focus' | 'typing' | 'filled-default' | 'filled-active'",
    defaultValue: "'default'",
  },
  {
    property: 'showDelete',
    description: 'Shows the clear icon in typing state.',
    type: 'boolean',
    defaultValue: 'true',
  },
  {
    property: 'showSearchIcon',
    description: 'Toggles the trailing search icon.',
    type: 'boolean',
    defaultValue: 'true',
  },
];

export const INPUT_SEMANTIC_BINDING_GROUPS: InputSemanticBindingGroup[] = [
  {
    title: 'Surface + Border',
    description: 'Background stays white in all states; border token changes by interaction state.',
    rows: [
      {
        componentToken: 'ds/search-bar/color/background/default',
        semanticAlias: 'background/primary',
        appliesTo: 'State=Default',
        notes: 'Base surface color.',
      },
      {
        componentToken: 'ds/search-bar/color/background/hover',
        semanticAlias: 'background/primary',
        appliesTo: 'State=Hover',
        notes: 'Hover keeps the same surface token.',
      },
      {
        componentToken: 'ds/search-bar/color/background/focus',
        semanticAlias: 'background/primary',
        appliesTo: 'State=Focus',
        notes: 'Focus keeps the same surface token.',
      },
      {
        componentToken: 'ds/search-bar/color/background/filled-default',
        semanticAlias: 'background/primary',
        appliesTo: 'State=Filled/Default',
        notes: 'Filled default surface.',
      },
      {
        componentToken: 'ds/search-bar/color/background/filled-active',
        semanticAlias: 'background/primary',
        appliesTo: 'State=Filled/Active',
        notes: 'Filled active surface.',
      },
      {
        componentToken: 'ds/search-bar/color/border/default',
        semanticAlias: 'border/brand-primary3',
        appliesTo: 'State=Default',
        notes: 'Default outline.',
      },
      {
        componentToken: 'ds/search-bar/color/border/hover',
        semanticAlias: 'border/brand-tertiary',
        appliesTo: 'State=Hover',
        notes: 'Hover outline.',
      },
      {
        componentToken: 'ds/search-bar/color/border/focus',
        semanticAlias: 'border/brand-tertiary',
        appliesTo: 'State=Focus',
        notes: 'Focus outline.',
      },
      {
        componentToken: 'ds/search-bar/color/border/typing',
        semanticAlias: 'border/brand-tertiary',
        appliesTo: 'State=Typing',
        notes: 'Typing outline.',
      },
      {
        componentToken: 'ds/search-bar/color/border/filled-default',
        semanticAlias: 'border/brand-primary3',
        appliesTo: 'State=Filled/Default',
        notes: 'Filled default outline.',
      },
      {
        componentToken: 'ds/search-bar/color/border/filled-active',
        semanticAlias: 'border/brand-tertiary',
        appliesTo: 'State=Filled/Active',
        notes: 'Filled active outline.',
      },
    ],
  },
  {
    title: 'Text',
    description: 'Placeholder/content and cursor text map to semantic text aliases.',
    rows: [
      {
        componentToken: 'ds/search-bar/color/text/placeholder/default',
        semanticAlias: 'text/tertiary',
        appliesTo: 'State=Default',
        notes: 'Placeholder text in resting state.',
      },
      {
        componentToken: 'ds/search-bar/color/text/placeholder/hover',
        semanticAlias: 'text/tertiary',
        appliesTo: 'State=Hover',
        notes: 'Placeholder text on hover.',
      },
      {
        componentToken: 'ds/search-bar/color/text/placeholder/typing',
        semanticAlias: 'text/primary',
        appliesTo: 'State=Typing',
        notes: 'Typed text color.',
      },
      {
        componentToken: 'ds/search-bar/color/text/placeholder/filled-default',
        semanticAlias: 'text/primary',
        appliesTo: 'State=Filled/Default',
        notes: 'Filled default content text.',
      },
      {
        componentToken: 'ds/search-bar/color/text/placeholder/filled-active',
        semanticAlias: 'text/primary',
        appliesTo: 'State=Filled/Active',
        notes: 'Filled active content text.',
      },
      {
        componentToken: 'ds/search-bar/color/text/cursor',
        semanticAlias: 'text/brand-tertiary2',
        appliesTo: 'State=Focus/Typing',
        notes: 'Cursor indicator color.',
      },
    ],
  },
  {
    title: 'Icons',
    description: 'Search and clear icons use one shared semantic icon alias.',
    rows: [
      {
        componentToken: 'ds/search-bar/color/icon/default',
        semanticAlias: 'icon/brand-primary1',
        appliesTo: 'Search + Clear icon',
        notes: 'Default icon color.',
      },
    ],
  },
];

export const INPUT_VARIABLE_GROUPS: InputVariableGroup[] = [
  {
    title: 'Core Layout',
    description: 'Sizing, spacing, and radius tokens from Figma variable definitions.',
    rows: [
      {
        token: 'ds/search-bar/padding/default',
        value: '12',
        appliesTo: 'All states',
        notes: 'Internal horizontal + vertical padding.',
      },
      {
        token: 'ds/search-bar/spacing/xs',
        value: '4',
        appliesTo: 'Content + icon gap',
        notes: 'Space between text and icons.',
      },
      {
        token: 'ds/search-bar/radius/default',
        value: '4',
        appliesTo: 'Container',
        notes: 'Input corner radius.',
      },
      {
        token: 'ds/search-bar/iconsize/search',
        value: '24',
        appliesTo: 'Search icon',
        notes: 'Trailing search icon size.',
      },
      {
        token: 'ds/search-bar/iconsize/clear',
        value: '20',
        appliesTo: 'Clear icon',
        notes: 'Typing clear icon size.',
      },
    ],
  },
  {
    title: 'Typography Styles',
    description: 'Text style token used by placeholder/content text.',
    rows: [
      {
        token: 'Body Copy (Data & Nav)/Normal/14-Regular',
        value: 'Averta Std CY, 14 / 20, 400, letter-spacing 0.25',
        appliesTo: 'Text content',
        notes: 'Default text style for placeholder and typed content.',
      },
    ],
  },
];

export const INPUT_GUIDELINES = {
  designers: [
    'Use this component for quick filtering or lookup actions with a single-line query.',
    'Use Focus or Typing states only when cursor/interaction context needs to be shown.',
    'Keep helper or surrounding labels outside the field; this component only handles inline value/placeholder.',
  ],
  developers: [
    'Drive visual state through the `state` input for deterministic docs and QA screenshots.',
    'Use `showDelete` only in typing flows; keep it off when value clearing is not supported.',
    'Prefer semantic color aliases in style bindings; avoid direct hardcoded hex in implementation code.',
  ],
};

export const INPUT_ACCESSIBILITY = [
  'Provide an external `<label>` or `aria-label` when embedding this component in forms.',
  'Expose focus state from keyboard navigation the same way as pointer focus.',
  'Keep icon buttons reachable and descriptive if clear/search actions become interactive controls.',
];

export const INPUT_SPACING_RULES = [
  'Container height is fixed at 60px in current Figma component.',
  'Use 12px internal padding and 4px gap between text and icon slots.',
  'Search icon is 24px and clear icon is 20px; do not scale independently from token values.',
];

export const INPUT_VARIABLE_NOTES: string[] = [
  'Figma variant axis includes six states: Default, Hover, Focus, Typing, Filled/Default, Filled/Active.',
  'State `Typing` includes optional visibility for `Show Delete` boolean property.',
  'All mappings in this page are derived from node 19067:37003 variable definitions.',
];
