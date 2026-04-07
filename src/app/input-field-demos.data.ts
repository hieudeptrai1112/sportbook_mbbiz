export type InputCodeType = 'js' | 'ts';

export interface InputDemoAction {
  label: string;
  meta?: string;
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
    id: 'input-basic',
    title: 'input/basic',
    description:
      'Component set with 9 states from Figma: default, hover, focus, typing, filled, error, error-typing, error-filled, disabled.',
    tags: ['state=default|hover|focus|typing|filled|error|error-typing|error-filled|disabled'],
    actions: [
      { label: 'default' },
      { label: 'hover' },
      { label: 'focus' },
      { label: 'typing' },
      { label: 'filled' },
      { label: 'error' },
      { label: 'error-typing' },
      { label: 'error-filled' },
      { label: 'disabled' },
    ],
    codeJs:
      '<app-ds-input variant="basic" state="default" />\n' +
      '<app-ds-input variant="basic" state="hover" />\n' +
      '<app-ds-input variant="basic" state="focus" />\n' +
      '<app-ds-input variant="basic" state="typing" />\n' +
      '<app-ds-input variant="basic" state="filled" />\n' +
      '<app-ds-input variant="basic" state="error" />\n' +
      '<app-ds-input variant="basic" state="error-typing" />\n' +
      '<app-ds-input variant="basic" state="error-filled" />\n' +
      '<app-ds-input variant="basic" state="disabled" />',
    snippetHtml: `<section class="input-demo-grid">
  <app-ds-input
    *ngFor="let state of basicStates"
    variant="basic"
    [state]="state"
  />
</section>`,
    snippetTs: `import { Component } from '@angular/core';

@Component({
  selector: 'app-input-basic-demo',
  standalone: true,
  templateUrl: './input-basic-demo.component.html',
})
export class InputBasicDemoComponent {
  readonly basicStates = [
    'default',
    'hover',
    'focus',
    'typing',
    'filled',
    'error',
    'error-typing',
    'error-filled',
    'disabled',
  ] as const;
}`,
  },
  {
    id: 'input-textarea',
    title: 'input/textarea',
    description:
      'Textarea keeps the same 9-state axis as basic, with multiline container in Figma.',
    tags: ['state=default|hover|focus|typing|filled|error|error-typing|error-filled|disabled'],
    actions: [
      { label: 'default' },
      { label: 'focus' },
      { label: 'typing' },
      { label: 'error' },
      { label: 'error-typing' },
      { label: 'disabled' },
    ],
    codeJs:
      '<app-ds-input variant="textarea" state="default" />\n' +
      '<app-ds-input variant="textarea" state="focus" />\n' +
      '<app-ds-input variant="textarea" state="typing" />\n' +
      '<app-ds-input variant="textarea" state="error" />\n' +
      '<app-ds-input variant="textarea" state="error-typing" />\n' +
      '<app-ds-input variant="textarea" state="disabled" />',
    snippetHtml: `<section class="input-demo-grid">
  <app-ds-input
    variant="textarea"
    [state]="textareaState"
    [rows]="4"
  />
</section>`,
    snippetTs: `import { Component } from '@angular/core';

@Component({
  selector: 'app-input-textarea-demo',
  standalone: true,
  templateUrl: './input-textarea-demo.component.html',
})
export class InputTextareaDemoComponent {
  textareaState:
    | 'default'
    | 'hover'
    | 'focus'
    | 'typing'
    | 'filled'
    | 'error'
    | 'error-typing'
    | 'error-filled'
    | 'disabled' = 'default';
}`,
  },
  {
    id: 'input-password',
    title: 'input/password',
    description:
      'Password uses 2 axes in Figma: contentMode (hide/unhide) and state (default/focus/typing/filled/error/disabled).',
    tags: ['contentMode=hide|unhide', 'state=default|focus|typing|filled|error|disabled'],
    actions: [
      { label: 'hide · default' },
      { label: 'hide · typing' },
      { label: 'hide · error' },
      { label: 'unhide · default' },
      { label: 'unhide · typing' },
      { label: 'unhide · disabled' },
    ],
    codeJs:
      '<app-ds-input variant="password" contentMode="hide" state="default" />\n' +
      '<app-ds-input variant="password" contentMode="hide" state="typing" />\n' +
      '<app-ds-input variant="password" contentMode="hide" state="error" />\n' +
      '<app-ds-input variant="password" contentMode="unhide" state="default" />\n' +
      '<app-ds-input variant="password" contentMode="unhide" state="typing" />\n' +
      '<app-ds-input variant="password" contentMode="unhide" state="disabled" />',
    snippetHtml: `<section class="input-demo-grid">
  <app-ds-input
    variant="password"
    [contentMode]="revealed ? 'unhide' : 'hide'"
    [state]="passwordState"
  />
  <button type="button" (click)="revealed = !revealed">
    {{ revealed ? 'Hide' : 'Show' }}
  </button>
</section>`,
    snippetTs: `import { Component } from '@angular/core';

@Component({
  selector: 'app-input-password-demo',
  standalone: true,
  templateUrl: './input-password-demo.component.html',
})
export class InputPasswordDemoComponent {
  revealed = false;
  passwordState: 'default' | 'focus' | 'typing' | 'filled' | 'error' | 'disabled' = 'default';
}`,
  },
  {
    id: 'input-email',
    title: 'input/email',
    description:
      'Email variant uses 2 axes in Figma: emailTyped (no/yes) + 9 state options including error-typing and error-filled.',
    tags: ['emailTyped=no|yes', 'state=default|hover|focus|typing|filled|error|error-typing|error-filled|disabled'],
    actions: [
      { label: 'emailTyped=no · default' },
      { label: 'emailTyped=no · error' },
      { label: 'emailTyped=yes · filled' },
      { label: 'emailTyped=yes · error' },
      { label: 'emailTyped=yes · error-typing' },
      { label: 'emailTyped=yes · disabled' },
    ],
    codeJs:
      '<app-ds-input variant="email" emailTyped="no" state="default" />\n' +
      '<app-ds-input variant="email" emailTyped="no" state="error" />\n' +
      '<app-ds-input variant="email" emailTyped="yes" state="filled" />\n' +
      '<app-ds-input variant="email" emailTyped="yes" state="error" />\n' +
      '<app-ds-input variant="email" emailTyped="yes" state="error-typing" />\n' +
      '<app-ds-input variant="email" emailTyped="yes" state="disabled" />',
    snippetHtml: `<section class="input-demo-grid">
  <app-ds-input
    variant="email"
    [emailTyped]="hasEmail ? 'yes' : 'no'"
    [state]="emailState"
  />
</section>`,
    snippetTs: `import { Component } from '@angular/core';

@Component({
  selector: 'app-input-email-demo',
  standalone: true,
  templateUrl: './input-email-demo.component.html',
})
export class InputEmailDemoComponent {
  hasEmail = false;
  emailState:
    | 'default'
    | 'hover'
    | 'focus'
    | 'typing'
    | 'filled'
    | 'error'
    | 'error-typing'
    | 'error-filled'
    | 'disabled' = 'default';
}`,
  },
  {
    id: 'input-search',
    title: 'input/search',
    description:
      'Search keeps the same 9-state axis as basic with dedicated search interaction visuals in Figma.',
    tags: ['state=default|hover|focus|typing|filled|error|error-typing|error-filled|disabled'],
    actions: [
      { label: 'default' },
      { label: 'typing' },
      { label: 'filled' },
      { label: 'error' },
      { label: 'disabled' },
    ],
    codeJs:
      '<app-ds-input variant="search" state="default" />\n' +
      '<app-ds-input variant="search" state="typing" />\n' +
      '<app-ds-input variant="search" state="filled" />\n' +
      '<app-ds-input variant="search" state="error" />\n' +
      '<app-ds-input variant="search" state="disabled" />',
    snippetHtml: `<section class="input-demo-grid">
  <app-ds-input
    variant="search"
    [state]="searchState"
    (submit)="onSearch($event)"
  />
</section>`,
    snippetTs: `import { Component } from '@angular/core';

@Component({
  selector: 'app-input-search-demo',
  standalone: true,
  templateUrl: './input-search-demo.component.html',
})
export class InputSearchDemoComponent {
  searchState:
    | 'default'
    | 'hover'
    | 'focus'
    | 'typing'
    | 'filled'
    | 'error'
    | 'error-typing'
    | 'error-filled'
    | 'disabled' = 'default';

  onSearch(value: string) {
    console.log('search submit', value);
  }
}`,
  },
  {
    id: 'input-affix-icon',
    title: 'input/affix-icon',
    description:
      'Affix icon uses affixMode axis (prefix/suffix/both) plus full 9-state matrix in Figma.',
    tags: ['affixMode=prefix|suffix|both', 'state=default|hover|focus|typing|filled|error|error-typing|error-filled|disabled'],
    actions: [
      { label: 'prefix · default' },
      { label: 'suffix · default' },
      { label: 'both · default' },
      { label: 'both · typing' },
      { label: 'both · error' },
      { label: 'both · disabled' },
    ],
    codeJs:
      '<app-ds-input variant="affix-icon" affixMode="prefix" state="default" />\n' +
      '<app-ds-input variant="affix-icon" affixMode="suffix" state="default" />\n' +
      '<app-ds-input variant="affix-icon" affixMode="both" state="default" />\n' +
      '<app-ds-input variant="affix-icon" affixMode="both" state="typing" />\n' +
      '<app-ds-input variant="affix-icon" affixMode="both" state="error" />\n' +
      '<app-ds-input variant="affix-icon" affixMode="both" state="disabled" />',
    snippetHtml: `<section class="input-demo-grid">
  <app-ds-input
    variant="affix-icon"
    [affixMode]="affixMode"
    [state]="iconState"
  >
    <ng-container dsInputPrefix>...</ng-container>
    <ng-container dsInputSuffix>...</ng-container>
  </app-ds-input>
</section>`,
    snippetTs: `import { Component } from '@angular/core';

@Component({
  selector: 'app-input-affix-icon-demo',
  standalone: true,
  templateUrl: './input-affix-icon-demo.component.html',
})
export class InputAffixIconDemoComponent {
  affixMode: 'prefix' | 'suffix' | 'both' = 'both';
  iconState:
    | 'default'
    | 'hover'
    | 'focus'
    | 'typing'
    | 'filled'
    | 'error'
    | 'error-typing'
    | 'error-filled'
    | 'disabled' = 'default';
}`,
  },
  {
    id: 'input-affix-label',
    title: 'input/affix-label',
    description:
      'Affix label uses labelMode axis (front/post/both) plus full 9-state matrix in Figma.',
    tags: ['labelMode=front|post|both', 'state=default|hover|focus|typing|filled|error|error-typing|error-filled|disabled'],
    actions: [
      { label: 'front · default' },
      { label: 'post · default' },
      { label: 'both · default' },
      { label: 'both · typing' },
      { label: 'both · error' },
      { label: 'both · disabled' },
    ],
    codeJs:
      '<app-ds-input variant="affix-label" labelMode="front" state="default" />\n' +
      '<app-ds-input variant="affix-label" labelMode="post" state="default" />\n' +
      '<app-ds-input variant="affix-label" labelMode="both" state="default" />\n' +
      '<app-ds-input variant="affix-label" labelMode="both" state="typing" />\n' +
      '<app-ds-input variant="affix-label" labelMode="both" state="error" />\n' +
      '<app-ds-input variant="affix-label" labelMode="both" state="disabled" />',
    snippetHtml: `<section class="input-demo-grid">
  <app-ds-input
    variant="affix-label"
    [labelMode]="labelMode"
    [state]="labelState"
  />
</section>`,
    snippetTs: `import { Component } from '@angular/core';

@Component({
  selector: 'app-input-affix-label-demo',
  standalone: true,
  templateUrl: './input-affix-label-demo.component.html',
})
export class InputAffixLabelDemoComponent {
  labelMode: 'front' | 'post' | 'both' = 'both';
  labelState:
    | 'default'
    | 'hover'
    | 'focus'
    | 'typing'
    | 'filled'
    | 'error'
    | 'error-typing'
    | 'error-filled'
    | 'disabled' = 'default';
}`,
  },
  {
    id: 'input-verification',
    title: 'input/verification',
    description:
      'Verification variant in Figma uses a dedicated 6-state flow: default, hover, typing, filled, timeout, error.',
    tags: ['state=default|hover|typing|filled|timeout|error'],
    actions: [
      { label: 'default' },
      { label: 'hover' },
      { label: 'typing' },
      { label: 'filled' },
      { label: 'timeout' },
      { label: 'error' },
    ],
    codeJs:
      '<app-ds-input variant="verification" state="default" />\n' +
      '<app-ds-input variant="verification" state="hover" />\n' +
      '<app-ds-input variant="verification" state="typing" />\n' +
      '<app-ds-input variant="verification" state="filled" />\n' +
      '<app-ds-input variant="verification" state="timeout" />\n' +
      '<app-ds-input variant="verification" state="error" />',
    snippetHtml: `<section class="input-demo-grid">
  <app-ds-input
    variant="verification"
    [state]="verificationState"
  />
  <button type="button" (click)="startTimeout()">Start timeout</button>
</section>`,
    snippetTs: `import { Component } from '@angular/core';

@Component({
  selector: 'app-input-verification-demo',
  standalone: true,
  templateUrl: './input-verification-demo.component.html',
})
export class InputVerificationDemoComponent {
  verificationState: 'default' | 'hover' | 'typing' | 'filled' | 'timeout' | 'error' = 'default';

  startTimeout() {
    this.verificationState = 'timeout';
  }
}`,
  },
  {
    id: 'input-floating-label',
    title: 'input/floating-label',
    description:
      'Floating label keeps the same 9-state axis as basic and updates label position by interaction.',
    tags: ['state=default|hover|focus|typing|filled|error|error-typing|error-filled|disabled'],
    actions: [
      { label: 'default' },
      { label: 'focus' },
      { label: 'typing' },
      { label: 'filled' },
      { label: 'error' },
      { label: 'disabled' },
    ],
    codeJs:
      '<app-ds-input variant="floating-label" state="default" />\n' +
      '<app-ds-input variant="floating-label" state="focus" />\n' +
      '<app-ds-input variant="floating-label" state="typing" />\n' +
      '<app-ds-input variant="floating-label" state="filled" />\n' +
      '<app-ds-input variant="floating-label" state="error" />\n' +
      '<app-ds-input variant="floating-label" state="disabled" />',
    snippetHtml: `<section class="input-demo-grid">
  <app-ds-input
    variant="floating-label"
    [state]="floatingState"
  />
</section>`,
    snippetTs: `import { Component } from '@angular/core';

@Component({
  selector: 'app-input-floating-label-demo',
  standalone: true,
  templateUrl: './input-floating-label-demo.component.html',
})
export class InputFloatingLabelDemoComponent {
  floatingState:
    | 'default'
    | 'hover'
    | 'focus'
    | 'typing'
    | 'filled'
    | 'error'
    | 'error-typing'
    | 'error-filled'
    | 'disabled' = 'default';
}`,
  },
];

export const INPUT_API_ROWS: InputApiRow[] = [
  {
    property: 'variant',
    description: 'Input family member from Figma component set.',
    type: "'basic' | 'textarea' | 'search' | 'password' | 'email' | 'verification' | 'affix-icon' | 'affix-label' | 'floating-label'",
    defaultValue: "'basic'",
  },
  {
    property: 'state',
    description: 'Primary visual state axis. Verification has dedicated timeout flow.',
    type: "'default' | 'hover' | 'focus' | 'typing' | 'filled' | 'error' | 'error-typing' | 'error-filled' | 'disabled' | 'timeout'",
    defaultValue: "'default'",
  },
  {
    property: 'value',
    description: 'Current input value rendered by the field.',
    type: 'string',
    defaultValue: "''",
  },
  {
    property: 'placeholder',
    description: 'Placeholder text when value is empty.',
    type: 'string',
    defaultValue: "''",
  },
  {
    property: 'contentMode',
    description: 'Password-specific axis for hide/unhide content.',
    type: "'hide' | 'unhide'",
    defaultValue: "'hide'",
  },
  {
    property: 'emailTyped',
    description: 'Email variant axis indicating whether email text is entered.',
    type: "'no' | 'yes'",
    defaultValue: "'no'",
  },
  {
    property: 'affixMode',
    description: 'Affix icon mode for prefix/suffix/both slot composition.',
    type: "'prefix' | 'suffix' | 'both'",
    defaultValue: "'prefix'",
  },
  {
    property: 'labelMode',
    description: 'Affix label mode for front/post/both label composition.',
    type: "'front' | 'post' | 'both'",
    defaultValue: "'front'",
  },
];

export const INPUT_SEMANTIC_BINDING_GROUPS: InputSemanticBindingGroup[] = [
  {
    title: 'Shared Surface + Border',
    description:
      'Observed in input/basic, input/search, input/email, input/affix-icon, input/affix-label, and input/floating-label.',
    rows: [
      {
        componentToken: 'input/*/surface/default',
        semanticAlias: 'background/primary',
        appliesTo: 'default|hover|focus|typing|filled',
        notes: 'Primary field surface.',
      },
      {
        componentToken: 'input/*/border/default',
        semanticAlias: 'border/brand-primary3',
        appliesTo: 'default|filled',
        notes: 'Default and filled border.',
      },
      {
        componentToken: 'input/*/border/active',
        semanticAlias: 'border/brand-tertiary',
        appliesTo: 'hover|focus|typing',
        notes: 'Interactive border for hover/focus/typing.',
      },
      {
        componentToken: 'input/*/border/error',
        semanticAlias: 'border/error2',
        appliesTo: 'error|error-typing|error-filled',
        notes: 'Error border color.',
      },
      {
        componentToken: 'input/*/state/disabled',
        semanticAlias: 'background/disable3 + border/disable2 + text/disable1',
        appliesTo: 'disabled',
        notes: 'Disabled state styling in semantic aliases.',
      },
    ],
  },
  {
    title: 'Text + Cursor',
    description:
      'Text aliases used across Input family according to Figma variable bindings.',
    rows: [
      {
        componentToken: 'input/*/text/placeholder',
        semanticAlias: 'text/tertiary',
        appliesTo: 'default|hover',
        notes: 'Placeholder in resting and hover states.',
      },
      {
        componentToken: 'input/*/text/value',
        semanticAlias: 'text/primary',
        appliesTo: 'typing|filled',
        notes: 'Typed value and filled content.',
      },
      {
        componentToken: 'input/*/text/cursor',
        semanticAlias: 'text/brand-tertiary2',
        appliesTo: 'focus|typing',
        notes: 'Cursor visual color.',
      },
      {
        componentToken: 'input/email/text/error',
        semanticAlias: 'text/error',
        appliesTo: 'email + error states',
        notes: 'Email validation error text.',
      },
      {
        componentToken: 'input/email/text/assistive',
        semanticAlias: 'text/primary3',
        appliesTo: 'email helper lines',
        notes: 'Secondary support text in email variant.',
      },
    ],
  },
  {
    title: 'Icons + Special Cases',
    description:
      'Icon and special background aliases observed in search/password/email/affix variants.',
    rows: [
      {
        componentToken: 'input/search/icon/search',
        semanticAlias: 'icon/brand-primary1',
        appliesTo: 'search',
        notes: 'Search icon color.',
      },
      {
        componentToken: 'input/password/icon/toggle',
        semanticAlias: 'icon/brand-primary1',
        appliesTo: 'password',
        notes: 'Hide/unhide icon.',
      },
      {
        componentToken: 'input/email/icon/error',
        semanticAlias: 'icon/error',
        appliesTo: 'email + error states',
        notes: 'Email error indicator icon.',
      },
      {
        componentToken: 'input/email/icon/support',
        semanticAlias: 'icon/neutral3',
        appliesTo: 'email',
        notes: 'Secondary helper icon.',
      },
      {
        componentToken: 'input/email/background/error',
        semanticAlias: 'background/error-tertiary',
        appliesTo: 'email + error states',
        notes: 'Error support surface.',
      },
    ],
  },
];

export const INPUT_VARIABLE_GROUPS: InputVariableGroup[] = [
  {
    title: 'Core Layout',
    description: 'Layout tokens extracted from Figma bindings in section 19467:7391.',
    rows: [
      {
        token: 'ds/text-area/padding/default',
        value: '12',
        appliesTo: 'input/textarea',
        notes: 'Textarea internal padding.',
      },
      {
        token: 'ds/text-area/radius/default',
        value: '4',
        appliesTo: 'input/textarea',
        notes: 'Textarea corner radius.',
      },
      {
        token: 'ds/text-area/spacing/xs',
        value: '4',
        appliesTo: 'input/textarea',
        notes: 'Gap between value and helper count.',
      },
      {
        token: 'Frame height',
        value: '52',
        appliesTo: 'input/basic|search|password|email|affix-icon|affix-label',
        notes: 'Single-line input family height in Figma set.',
      },
      {
        token: 'Frame height',
        value: '60',
        appliesTo: 'input/floating-label',
        notes: 'Floating label container height.',
      },
      {
        token: 'Frame height',
        value: '132',
        appliesTo: 'input/textarea',
        notes: 'Multiline textarea container height.',
      },
      {
        token: 'Frame size',
        value: '320 x 34',
        appliesTo: 'input/verification',
        notes: 'Verification field dimensions.',
      },
    ],
  },
  {
    title: 'Typography Styles',
    description: 'Typography variables bound in the Input family section.',
    rows: [
      {
        token: 'Body Copy (Data & Nav)/Normal/14-Regular',
        value: 'Averta Std CY, 14 / 20, 400, letter-spacing 0.25',
        appliesTo: 'Most input value + placeholder text',
        notes: 'Primary body text style for input controls.',
      },
      {
        token: 'Body Copy (Data & Nav)/Normal/12-Regular',
        value: 'Averta Std CY, 12 / 16, 400, letter-spacing 0.25',
        appliesTo: 'Textarea count + secondary helper text',
        notes: 'Compact helper/support style.',
      },
      {
        token: 'H3/Normal/14-SemiBold',
        value: 'Averta Std CY, 14 / 20, 600, letter-spacing 0.25',
        appliesTo: 'Password emphasis text',
        notes: 'Semibold text style used in password variant.',
      },
      {
        token: 'H2/Normal/20-Semibold',
        value: 'Averta Std CY, 20 / 28, 600, letter-spacing 0.25',
        appliesTo: 'Verification heading/value emphasis',
        notes: 'Large semibold style in verification flow.',
      },
    ],
  },
];

export const INPUT_GUIDELINES = {
  designers: [
    'Use one parent Input family page with child variants: basic, textarea, search, password, email, verification, affix-icon, affix-label, floating-label.',
    'Keep variant keys machine-friendly and stable: state, contentMode, affixMode, labelMode, emailTyped.',
    'Use error-typing and error-filled only where Figma component set defines dedicated states.',
  ],
  developers: [
    'Implement Input as one base component plus variant props that map directly to Figma axes.',
    'Treat prefix/suffix as dynamic slots, not fixed icon-only placeholders.',
    'Keep state rendering deterministic by binding directly from the variant state key.',
  ],
};

export const INPUT_ACCESSIBILITY = [
  'Bind external labels with input id for every variant, including affix and floating-label forms.',
  'Keep focus indication visible in all interactive states, including error and filled states.',
  'For verification + timeout flow, announce status updates via aria-live when countdown expires.',
  'Affix icon/label content should not block keyboard navigation order of the text input element.',
];

export const INPUT_SPACING_RULES = [
  'Single-line variants in this section are 52px high in Figma (basic/search/password/email/affix-icon/affix-label).',
  'Floating label variant is 60px high; textarea is 132px high; verification is 320x34.',
  'Textarea uses explicit local layout tokens: padding=12, radius=4, spacing=4.',
];

export const INPUT_VARIABLE_NOTES: string[] = [
  'Source audited from Figma section node 19467:7391 (input).',
  'Component sets covered: input/basic, input/textarea, input/password, input/email, input/search, input/affix-icon, input/affix-label, input/verification, input/floating-label.',
  'State and axis names follow normalized machine-friendly keys from the latest Figma set.',
];
