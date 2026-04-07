import type { DsInputBasicState } from './components/ds-input-basic/ds-input-basic.component';

export type InputCodeType = 'js' | 'ts';

export interface InputDemoAction {
  value: string;
  state: DsInputBasicState;
}

export interface InputDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  actions: InputDemoAction[];
  interactive?: boolean;
  interactiveStates?: DsInputBasicState[];
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

export interface InputStateContractRow {
  key: string;
  role: string;
  values: string;
  notes: string;
}

export const INPUT_DEMO_SECTIONS: InputDemoSection[] = [
  {
    id: 'basic',
    title: 'Basic',
    description:
      'Interactive baseline for Input/basic. Switch between neutral interaction states and sample value to match Figma behavior.',
    tags: ['variant=input/basic', 'states=default/hover/focus/typing/filled', 'size=250 x 52'],
    interactive: true,
    interactiveStates: ['default', 'hover', 'focus', 'typing', 'filled'],
    actions: [{ value: 'Input text', state: 'default' }],
    codeJs: `<app-ds-input-basic [value]="playgroundValue" [state]="playgroundState" />`,
    codeTs: `import { DsInputBasicState } from './components/ds-input-basic/ds-input-basic.component';`,
    snippetHtml: `<section class="button-demo-preview input-demo-preview input-demo-preview--playground">
  <app-ds-input-basic [value]="playgroundValue" [state]="playgroundState" />
</section>

<section class="button-demo-preview input-demo-preview input-demo-preview--controls">
  <app-ds-button
    *ngFor="let state of playgroundStates"
    [label]="state"
    shape="rectangle"
    tone="secondary"
    size="small"
    [state]="playgroundState === state ? 'pressed' : 'default'"
    (click)="playgroundState = state"
  />

  <app-ds-button
    [label]="playgroundValue ? 'Set empty value' : 'Set sample value'"
    shape="rectangle"
    tone="secondary"
    size="small"
    state="default"
    (click)="playgroundValue = playgroundValue ? '' : 'Input text'"
  />
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsButtonComponent } from './components/ds-button/ds-button.component';
import {
  DsInputBasicComponent,
  DsInputBasicState,
} from './components/ds-input-basic/ds-input-basic.component';

@Component({
  selector: 'app-input-basic-playground-demo',
  standalone: true,
  imports: [DsButtonComponent, DsInputBasicComponent],
  templateUrl: './input-basic-playground-demo.component.html',
})
export class InputBasicPlaygroundDemoComponent {
  playgroundValue = 'Input text';
  playgroundState: DsInputBasicState = 'default';

  readonly playgroundStates: DsInputBasicState[] = [
    'default',
    'hover',
    'focus',
    'typing',
    'filled',
    'error',
    'error-typing',
    'error-filled',
    'disabled',
  ];
}`,
  },
  {
    id: 'status',
    title: 'Status',
    description:
      'Status-driven branch from Figma. Error and disabled variants keep geometry but switch semantic border/text aliases.',
    tags: ['status=error/disabled', 'states=error/error-typing/error-filled/disabled'],
    actions: [
      { value: 'Input text', state: 'error' },
      { value: 'Input text', state: 'error-typing' },
      { value: 'Input text', state: 'error-filled' },
      { value: 'Input text', state: 'disabled' },
    ],
    codeJs: `<app-ds-input-basic value="Input text" state="error" />
<app-ds-input-basic value="Input text" state="error-typing" />
<app-ds-input-basic value="Input text" state="error-filled" />
<app-ds-input-basic value="Input text" state="disabled" />`,
    codeTs: `import { DsInputBasicComponent } from './components/ds-input-basic/ds-input-basic.component';`,
    snippetHtml: `<section class="button-demo-preview input-demo-preview">
  <app-ds-input-basic value="Input text" state="error" />
  <app-ds-input-basic value="Input text" state="error-typing" />
  <app-ds-input-basic value="Input text" state="error-filled" />
  <app-ds-input-basic value="Input text" state="disabled" />
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsInputBasicComponent } from './components/ds-input-basic/ds-input-basic.component';

@Component({
  selector: 'app-input-basic-status-demo',
  standalone: true,
  imports: [DsInputBasicComponent],
  templateUrl: './input-basic-status-demo.component.html',
})
export class InputBasicStatusDemoComponent {}`,
  },
];

export const INPUT_API_ROWS: InputApiRow[] = [
  {
    property: 'value',
    description: 'Displayed input value or placeholder-like copy used in docs preview.',
    type: 'string',
    defaultValue: "'Input text'",
  },
  {
    property: 'state',
    description:
      'Visual state axis mapped directly from Figma component set. Intended for docs/QA preview and deterministic rendering.',
    type: "'default' | 'hover' | 'focus' | 'typing' | 'filled' | 'error' | 'disabled' | 'error-typing' | 'error-filled'",
    defaultValue: "'default'",
  },
];

export const INPUT_STATE_CONTRACT_ROWS: InputStateContractRow[] = [
  {
    key: 'status',
    role: 'Business and validation state from app/form logic.',
    values: "'default' | 'error' | 'warning'",
    notes: 'Recommended external API surface for production forms.',
  },
  {
    key: 'disabled',
    role: 'Interaction lock from app logic.',
    values: 'boolean',
    notes: 'When true, must override status and interaction visual branches.',
  },
  {
    key: 'state (visual)',
    role: 'Deterministic visual rendering state used by docs and QA.',
    values:
      "'default' | 'hover' | 'focus' | 'typing' | 'filled' | 'error' | 'disabled' | 'error-typing' | 'error-filled'",
    notes: 'Should be derived from runtime signals, not used as primary business API.',
  },
];

export const INPUT_STATE_PRIORITY_RULES: string[] = [
  '`disabled=true` always maps to visual `disabled`.',
  'If not disabled and `status=error`: map to `error`, `error-typing`, or `error-filled` depending on typing/value state.',
  'If not disabled and `status=warning`: keep interaction branch (`default/hover/focus/typing/filled`) but apply warning helper messaging.',
  'If `status=default`: map by interaction signals (`focus`, `typing`, `filled`, fallback `default` or `hover`).',
];

export const INPUT_STATE_CONTRACT_SNIPPET = `type InputStatus = 'default' | 'error' | 'warning';
type InputVisualState =
  | 'default'
  | 'hover'
  | 'focus'
  | 'typing'
  | 'filled'
  | 'error'
  | 'error-typing'
  | 'error-filled'
  | 'disabled';

interface InputRuntime {
  disabled: boolean;
  status: InputStatus;
  isFocused: boolean;
  isTyping: boolean;
  hasValue: boolean;
  isHover: boolean;
}

export function deriveInputVisualState(runtime: InputRuntime): InputVisualState {
  if (runtime.disabled) return 'disabled';

  if (runtime.status === 'error') {
    if (runtime.isTyping) return 'error-typing';
    if (runtime.hasValue) return 'error-filled';
    return 'error';
  }

  if (runtime.isTyping) return 'typing';
  if (runtime.isFocused) return 'focus';
  if (runtime.hasValue) return 'filled';
  if (runtime.isHover) return 'hover';
  return 'default';
}`;

export const INPUT_SEMANTIC_BINDING_GROUPS: InputSemanticBindingGroup[] = [
  {
    title: 'Surface + Border',
    description: 'Container uses one white surface token and swaps border aliases by interaction state.',
    rows: [
      {
        componentToken: 'ds/input-basic/color/background/default',
        semanticAlias: 'background/primary',
        appliesTo: 'All states',
        notes: 'Base surface for every variant state.',
      },
      {
        componentToken: 'ds/input-basic/color/border/default',
        semanticAlias: 'border/brand-primary3',
        appliesTo: 'State=Default, Filled',
        notes: 'Base neutral border.',
      },
      {
        componentToken: 'ds/input-basic/color/border/interactive',
        semanticAlias: 'border/brand-tertiary',
        appliesTo: 'State=Hover, Focus, Typing, Filled Active',
        notes: 'Interactive emphasis border.',
      },
      {
        componentToken: 'ds/input-basic/color/border/error',
        semanticAlias: 'background/error-secondary',
        appliesTo: 'State=Error, Error Typing, Error Filled',
        notes: 'Validation error border.',
      },
      {
        componentToken: 'ds/input-basic/color/border/disabled',
        semanticAlias: 'border/disable2',
        appliesTo: 'State=Disabled',
        notes: 'Disabled border.',
      },
    ],
  },
  {
    title: 'Text + Cursor',
    description: 'Text color changes based on value state, with cursor token shown in focus and typing.',
    rows: [
      {
        componentToken: 'ds/input-basic/color/text/placeholder',
        semanticAlias: 'text/tertiary',
        appliesTo: 'State=Default, Hover, Error',
        notes: 'Placeholder/content fallback text.',
      },
      {
        componentToken: 'ds/input-basic/color/text/content',
        semanticAlias: 'text/primary',
        appliesTo: 'State=Typing, Filled, Error Typing, Error Filled',
        notes: 'Content text when value is present.',
      },
      {
        componentToken: 'ds/input-basic/color/text/cursor',
        semanticAlias: 'text/brand-tertiary2',
        appliesTo: 'State=Focus, Typing, Error Typing',
        notes: 'Caret indicator color.',
      },
      {
        componentToken: 'ds/input-basic/color/text/disabled',
        semanticAlias: 'text/disable1',
        appliesTo: 'State=Disabled',
        notes: 'Disabled text contrast.',
      },
    ],
  },
];

export const INPUT_VARIABLE_GROUPS: InputVariableGroup[] = [
  {
    title: 'Core Layout',
    description: 'Non-color variables extracted from Input/basic Figma component set.',
    rows: [
      {
        token: 'ds/input-basic/width/default',
        value: '250',
        appliesTo: 'All states',
        notes: 'Fixed field width in component set.',
      },
      {
        token: 'ds/input-basic/height/default',
        value: '52',
        appliesTo: 'All states',
        notes: 'Fixed field height in component set.',
      },
      {
        token: 'ds/input-basic/padding/default',
        value: '12 x 16',
        appliesTo: 'All states',
        notes: 'Horizontal and vertical inner padding.',
      },
      {
        token: 'ds/input-basic/radius/default',
        value: '4',
        appliesTo: 'Container',
        notes: 'Corner radius for Input/basic.',
      },
      {
        token: 'ds/input-basic/spacing/xs',
        value: '4',
        appliesTo: 'Text and cursor',
        notes: 'Gap between text content and cursor marker.',
      },
    ],
  },
  {
    title: 'Typography Styles',
    description: 'Text style token used by placeholder/content text in all states.',
    rows: [
      {
        token: 'Body Copy (Data & Nav)/Normal/14-Regular',
        value: 'Averta Std CY, 14 / 20, 400, letter-spacing 0.25',
        appliesTo: 'Input text / placeholder',
        notes: 'Shared typography style across full state axis.',
      },
    ],
  },
];

export const INPUT_GUIDELINES = {
  designers: [
    'Input/basic is the baseline field and should keep fixed geometry (250x52) unless a responsive token update is approved.',
    'Use `error` branch only for validation outcomes, not as a hover/focus replacement.',
    'Only switch to typing/filled branches when content state really changes.',
  ],
  developers: [
    'Drive UI from `state` input so QA can deterministically reproduce Figma states.',
    'Avoid hardcoded colors; rely on semantic alias CSS variables already mapped in Component Token.',
    'When wiring real form logic, map validation and disabled rules to this same state axis to keep docs and implementation aligned.',
  ],
};

export const INPUT_ACCESSIBILITY = [
  'Bind a real `<label for>` or `aria-label` in production forms; docs preview intentionally focuses on visual state.',
  'Ensure focus state is keyboard reachable and not pointer-only.',
  'Error state should be paired with helper/error text and ARIA live messaging in form contexts.',
];

export const INPUT_SPACING_RULES = [
  'Container width is 250 and height is 52 in the base Figma component.',
  'Use horizontal padding 12 and vertical padding 16 without additional internal wrappers.',
  'Keep 4px gap between typed value and cursor indicator for typing states.',
];

export const INPUT_VARIABLE_NOTES: string[] = [
  'This page documents only `input/basic` from the Input family outline.',
  'State axis is normalized to machine-friendly values: default, hover, focus, typing, filled, error, disabled, error-typing, error-filled.',
  'Production API is recommended to expose `status` + `disabled`, then derive visual `state` internally for consistency.',
  'Do not alter geometry, typography, or visual token mapping unless the Figma source component is updated.',
];
