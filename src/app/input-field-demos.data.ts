import type {
  DsInputBasicInteractiveMode,
  DsInputBasicState,
} from './components/ds-input-basic/ds-input-basic.component';
import type {
  DsTextAreaInteractiveMode,
  DsTextAreaState,
} from './components/ds-text-area/ds-text-area.component';

export type InputCodeType = 'js' | 'ts';
export type InputDemoComponent = 'input-basic' | 'text-area';
export type InputDemoState = DsInputBasicState | DsTextAreaState;
export type InputDemoInteractiveMode = DsInputBasicInteractiveMode | DsTextAreaInteractiveMode;

export interface InputDemoAction {
  value: string;
  state: InputDemoState;
  placeholder?: string;
  width?: number;
  maxLength?: number;
}

export interface InputDemoSection {
  id: string;
  component: InputDemoComponent;
  title: string;
  description: string;
  tags: string[];
  actions: InputDemoAction[];
  interactive?: boolean;
  interactiveStates?: InputDemoState[];
  interactiveMode?: InputDemoInteractiveMode;
  interactivePlaceholder?: string;
  interactiveWidth?: number;
  interactiveMaxLength?: number;
  showDisabledCompanion?: boolean;
  disabledCompanionValue?: string;
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
    component: 'input-basic',
    title: 'Basic',
    description:
      'Interactive baseline for Input/basic. Hover, focus, typing, and filled states are rendered from real input behavior.',
    tags: ['variant=input/basic', 'states=default/hover/focus/typing/filled', 'size=350 x 52'],
    interactive: true,
    interactiveStates: ['default', 'hover', 'focus', 'typing', 'filled'],
    interactiveMode: 'default',
    interactivePlaceholder: 'Enter something',
    interactiveWidth: 350,
    actions: [{ value: '', state: 'default', placeholder: 'Enter something', width: 350 }],
    codeJs: `<app-ds-input-basic [interactive]="true" placeholder="Enter something" [width]="350" />`,
    codeTs: `import { DsInputBasicComponent } from './components/ds-input-basic/ds-input-basic.component';`,
    snippetHtml: `<section class="button-demo-preview input-demo-preview">
  <app-ds-input-basic
    [interactive]="true"
    placeholder="Enter something"
    [width]="350"
  />
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsInputBasicComponent } from './components/ds-input-basic/ds-input-basic.component';

@Component({
  selector: 'app-input-basic-demo',
  standalone: true,
  imports: [DsInputBasicComponent],
  template: \`
    <section class="button-demo-preview input-demo-preview">
      <app-ds-input-basic [interactive]="true" placeholder="Enter something" [width]="350" />
    </section>
  \`,
})
export class InputBasicDemoComponent {}`,
  },
  {
    id: 'status',
    component: 'input-basic',
    title: 'Status',
    description:
      'Status-driven branch from Figma. Error states are merged into one interactive preview; disabled remains a separate locked state.',
    tags: ['status=error/disabled', 'states=error/error-typing/error-filled + disabled', 'size=350 x 52'],
    interactive: true,
    interactiveMode: 'error',
    interactivePlaceholder: 'Input text',
    interactiveWidth: 350,
    showDisabledCompanion: true,
    disabledCompanionValue: 'Input text',
    actions: [{ value: 'Input text', state: 'disabled', width: 350 }],
    codeJs: `<app-ds-input-basic [interactive]="true" interactiveMode="error" placeholder="Input text" [width]="350" />
<app-ds-input-basic value="Input text" state="disabled" [width]="350" />`,
    codeTs: `import { DsInputBasicComponent } from './components/ds-input-basic/ds-input-basic.component';`,
    snippetHtml: `<section class="button-demo-preview input-demo-preview">
  <app-ds-input-basic [interactive]="true" interactiveMode="error" placeholder="Input text" [width]="350" />
  <app-ds-input-basic value="Input text" state="disabled" [width]="350" />
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsInputBasicComponent } from './components/ds-input-basic/ds-input-basic.component';

@Component({
  selector: 'app-input-basic-status-demo',
  standalone: true,
  imports: [DsInputBasicComponent],
  template: \`
    <section class="button-demo-preview input-demo-preview">
      <app-ds-input-basic [interactive]="true" interactiveMode="error" placeholder="Input text" [width]="350" />
      <app-ds-input-basic value="Input text" state="disabled" [width]="350" />
    </section>
  \`,
})
export class InputBasicStatusDemoComponent {}`,
  },
  {
    id: 'textarea-basic',
    component: 'text-area',
    title: 'Textarea · Basic',
    description:
      'Interactive baseline for input/textarea from Figma. Hover, focus, typing, and filled states are rendered in one live preview.',
    tags: ['variant=input/textarea', 'states=default/hover/focus/typing/filled', 'size=250 x 124'],
    interactive: true,
    interactiveStates: ['default', 'hover', 'focus', 'typing', 'filled'],
    interactiveMode: 'default',
    interactivePlaceholder: 'Input text',
    interactiveWidth: 250,
    interactiveMaxLength: 100,
    actions: [{ value: '', state: 'default', placeholder: 'Input text', width: 250, maxLength: 100 }],
    codeJs: `<app-ds-text-area [interactive]="true" placeholder="Input text" [width]="250" [maxLength]="100" />`,
    codeTs: `import { DsTextAreaComponent } from './components/ds-text-area/ds-text-area.component';`,
    snippetHtml: `<section class="button-demo-preview input-demo-preview">
  <app-ds-text-area
    [interactive]="true"
    placeholder="Input text"
    [width]="250"
    [maxLength]="100"
  />
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsTextAreaComponent } from './components/ds-text-area/ds-text-area.component';

@Component({
  selector: 'app-textarea-basic-demo',
  standalone: true,
  imports: [DsTextAreaComponent],
  template: \`
    <section class="button-demo-preview input-demo-preview">
      <app-ds-text-area [interactive]="true" placeholder="Input text" [width]="250" [maxLength]="100" />
    </section>
  \`,
})
export class TextareaBasicDemoComponent {}`,
  },
  {
    id: 'textarea-status',
    component: 'text-area',
    title: 'Textarea · Status',
    description:
      'Status-driven branch from Figma. Error states are merged into one interactive preview while disabled remains as a separate locked sample.',
    tags: [
      'status=error/disabled',
      'states=error/error-typing/error-filled + disabled',
      'size=250 x 124',
    ],
    interactive: true,
    interactiveMode: 'error',
    interactivePlaceholder: 'Input text',
    interactiveWidth: 250,
    interactiveMaxLength: 100,
    showDisabledCompanion: true,
    disabledCompanionValue: 'Input text',
    actions: [{ value: 'Input text', state: 'disabled', width: 250, maxLength: 100 }],
    codeJs: `<app-ds-text-area [interactive]="true" interactiveMode="error" placeholder="Input text" [width]="250" [maxLength]="100" />
<app-ds-text-area value="Input text" state="disabled" [width]="250" [maxLength]="100" />`,
    codeTs: `import { DsTextAreaComponent } from './components/ds-text-area/ds-text-area.component';`,
    snippetHtml: `<section class="button-demo-preview input-demo-preview">
  <app-ds-text-area [interactive]="true" interactiveMode="error" placeholder="Input text" [width]="250" [maxLength]="100" />
  <app-ds-text-area value="Input text" state="disabled" [width]="250" [maxLength]="100" />
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsTextAreaComponent } from './components/ds-text-area/ds-text-area.component';

@Component({
  selector: 'app-textarea-status-demo',
  standalone: true,
  imports: [DsTextAreaComponent],
  template: \`
    <section class="button-demo-preview input-demo-preview">
      <app-ds-text-area [interactive]="true" interactiveMode="error" placeholder="Input text" [width]="250" [maxLength]="100" />
      <app-ds-text-area value="Input text" state="disabled" [width]="250" [maxLength]="100" />
    </section>
  \`,
})
export class TextareaStatusDemoComponent {}`,
  },
];

export const INPUT_API_ROWS: InputApiRow[] = [
  {
    property: 'value',
    description: 'Displayed value in field area. Used by both Input/basic and Textarea.',
    type: 'string',
    defaultValue: "''",
  },
  {
    property: 'state',
    description:
      'Visual state axis mapped directly from Figma component set. Intended for docs/QA preview and deterministic rendering for both components.',
    type: "'default' | 'hover' | 'focus' | 'typing' | 'filled' | 'error' | 'disabled' | 'error-typing' | 'error-filled'",
    defaultValue: "'default'",
  },
  {
    property: 'placeholder',
    description: 'Placeholder text shown when value is empty.',
    type: 'string',
    defaultValue: "'Enter something' (Input/basic), 'Input text' (Textarea)",
  },
  {
    property: 'width',
    description: 'Fixed width in docs preview.',
    type: 'number',
    defaultValue: '250 (Textarea), 350 in interactive Input/basic demos',
  },
  {
    property: 'interactive',
    description: 'Enable live interaction rendering in preview demos.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'interactiveMode',
    description: 'Interactive state derivation strategy.',
    type: "'default' | 'error'",
    defaultValue: "'default'",
  },
  {
    property: 'maxLength (Textarea)',
    description: 'Maximum length used for character counter rendering.',
    type: 'number',
    defaultValue: '100',
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
  {
    title: 'Textarea · Surface + Border',
    description:
      'Textarea keeps white surface across normal/error branches and uses semantic border aliases for interaction, error, and disabled.',
    rows: [
      {
        componentToken: 'ds/text-area/color/background/default',
        semanticAlias: 'background/primary',
        appliesTo: 'State=Default, Hover, Focus, Typing, Filled, Error*',
        notes: 'Base surface for textarea.',
      },
      {
        componentToken: 'ds/text-area/color/border/default',
        semanticAlias: 'border/brand-primary3',
        appliesTo: 'State=Default, Filled',
        notes: 'Base border.',
      },
      {
        componentToken: 'ds/text-area/color/border/interactive',
        semanticAlias: 'border/brand-tertiary',
        appliesTo: 'State=Hover, Focus, Typing',
        notes: 'Interactive highlight border.',
      },
      {
        componentToken: 'ds/text-area/color/border/error',
        semanticAlias: 'border/error1',
        appliesTo: 'State=Error, Error Typing, Error Filled',
        notes: 'Validation border.',
      },
      {
        componentToken: 'ds/text-area/color/background/disabled',
        semanticAlias: 'background/disable3',
        appliesTo: 'State=Disabled',
        notes: 'Disabled surface.',
      },
      {
        componentToken: 'ds/text-area/color/border/disabled',
        semanticAlias: 'border/disable2',
        appliesTo: 'State=Disabled',
        notes: 'Disabled border.',
      },
    ],
  },
  {
    title: 'Textarea · Text + Counter',
    description:
      'Textarea text/cursor/counter aliases stay consistent with Input/basic while adding disabled and counter-specific tokens.',
    rows: [
      {
        componentToken: 'ds/text-area/color/text/placeholder',
        semanticAlias: 'text/tertiary',
        appliesTo: 'State=Default, Hover, Focus, Error',
        notes: 'Placeholder text color.',
      },
      {
        componentToken: 'ds/text-area/color/text/content',
        semanticAlias: 'text/primary',
        appliesTo: 'State=Typing, Filled, Error Typing, Error Filled',
        notes: 'Typed content color.',
      },
      {
        componentToken: 'ds/text-area/color/text/cursor',
        semanticAlias: 'text/brand-tertiary2',
        appliesTo: 'State=Focus, Typing, Error Typing',
        notes: 'Caret color.',
      },
      {
        componentToken: 'ds/text-area/color/text/placeholder/disabled',
        semanticAlias: 'text/disable1',
        appliesTo: 'State=Disabled',
        notes: 'Disabled placeholder/content color.',
      },
      {
        componentToken: 'ds/text-area/color/text/number',
        semanticAlias: 'text/disable2',
        appliesTo: 'Counter 0/100 or 10/100',
        notes: 'Character counter color.',
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
  {
    title: 'Textarea Core Layout',
    description: 'Non-color variables extracted from input/textarea Figma component set.',
    rows: [
      {
        token: 'ds/text-area/width/default',
        value: '250',
        appliesTo: 'All textarea states',
        notes: 'Fixed width in component set.',
      },
      {
        token: 'ds/text-area/height/content',
        value: '80',
        appliesTo: 'Text content area',
        notes: 'Visible typing region height.',
      },
      {
        token: 'ds/text-area/padding/default',
        value: '12 (x) + 16 (y)',
        appliesTo: 'Textarea container',
        notes: 'Horizontal token from Figma variable and fixed vertical spacing.',
      },
      {
        token: 'ds/text-area/radius/default',
        value: '4',
        appliesTo: 'Textarea container',
        notes: 'Corner radius token.',
      },
      {
        token: 'ds/text-area/spacing/xs',
        value: '4',
        appliesTo: 'Content to counter gap',
        notes: 'Space between text area and counter.',
      },
    ],
  },
  {
    title: 'Textarea Typography Styles',
    description: 'Typography styles used by textarea text and counter.',
    rows: [
      {
        token: 'Body Copy (Data & Nav)/Normal/14-Regular',
        value: 'Averta Std CY, 14 / 20, 400, letter-spacing 0.25',
        appliesTo: 'Textarea placeholder/content/caret row',
        notes: 'Main textarea content style.',
      },
      {
        token: 'Body Copy (Data & Nav)/Normal/12-Regular',
        value: 'Averta Std CY, 12 / 16, 400, letter-spacing 0.25',
        appliesTo: 'Counter (0/100, 10/100)',
        notes: 'Character counter typography.',
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
