import type {
  DsInputBasicInteractiveMode,
  DsInputBasicState,
} from './components/ds-input-basic/ds-input-basic.component';
import type {
  DsInputSearchInteractiveMode,
  DsInputSearchState,
} from './components/ds-input-search/ds-input-search.component';
import type {
  DsTextAreaInteractiveMode,
  DsTextAreaState,
} from './components/ds-text-area/ds-text-area.component';
import type {
  DsInputPasswordContentMode,
  DsInputPasswordInteractiveMode,
  DsInputPasswordState,
} from './components/ds-input-password/ds-input-password.component';
import type {
  DsInputFloatingLabelInteractiveMode,
  DsInputFloatingLabelState,
} from './components/ds-input-floating-label/ds-input-floating-label.component';
import type {
  DsInputAffixInteractiveMode,
  DsInputAffixMode,
  DsInputAffixState,
} from './components/ds-input-affix/ds-input-affix.component';

export type InputCodeType = 'js' | 'ts';
export type InputDemoComponent =
  | 'input-basic'
  | 'input-affix'
  | 'input-search'
  | 'text-area'
  | 'input-password'
  | 'input-floating-label';
export type InputDemoState =
  | DsInputBasicState
  | DsInputAffixState
  | DsInputSearchState
  | DsTextAreaState
  | DsInputPasswordState
  | DsInputFloatingLabelState;
export type InputDemoInteractiveMode =
  | DsInputBasicInteractiveMode
  | DsInputAffixInteractiveMode
  | DsInputSearchInteractiveMode
  | DsTextAreaInteractiveMode
  | DsInputPasswordInteractiveMode
  | DsInputFloatingLabelInteractiveMode;

export interface InputDemoAction {
  value: string;
  state: InputDemoState;
  affixMode?: DsInputAffixMode;
  title?: string;
  contentMode?: DsInputPasswordContentMode;
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
  interactiveAffixMode?: DsInputAffixMode;
  interactiveTitle?: string;
  interactiveContentMode?: DsInputPasswordContentMode;
  interactivePlaceholder?: string;
  interactiveWidth?: number;
  interactiveMaxLength?: number;
  showDisabledCompanion?: boolean;
  disabledCompanionValue?: string;
  disabledCompanionContentMode?: DsInputPasswordContentMode;
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
    id: 'floating-label-basic',
    component: 'input-floating-label',
    title: 'Floating Label · Basic',
    description:
      'Interactive baseline for input/floating-label from Figma. Preview supports default, hover, focus, typing, and filled from real input behavior.',
    tags: ['variant=input/floating-label', 'states=default/hover/focus/typing/filled', 'size=250 x 52'],
    interactive: true,
    interactiveStates: ['default', 'hover', 'focus', 'typing', 'filled'],
    interactiveMode: 'default',
    interactiveTitle: 'Title',
    interactivePlaceholder: 'Input text',
    interactiveWidth: 250,
    actions: [{ value: '', state: 'default', title: 'Title', placeholder: 'Input text', width: 250 }],
    codeJs: `<app-ds-input-floating-label [interactive]="true" title="Title" placeholder="Input text" [width]="250" />`,
    codeTs: `import { DsInputFloatingLabelComponent } from './components/ds-input-floating-label/ds-input-floating-label.component';`,
    snippetHtml: `<section class="button-demo-preview input-demo-preview">
  <app-ds-input-floating-label
    [interactive]="true"
    title="Title"
    placeholder="Input text"
    [width]="250"
  />
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsInputFloatingLabelComponent } from './components/ds-input-floating-label/ds-input-floating-label.component';

@Component({
  selector: 'app-input-floating-label-demo',
  standalone: true,
  imports: [DsInputFloatingLabelComponent],
  template: \`
    <section class="button-demo-preview input-demo-preview">
      <app-ds-input-floating-label [interactive]="true" title="Title" placeholder="Input text" [width]="250" />
    </section>
  \`,
})
export class InputFloatingLabelDemoComponent {}`,
  },
  {
    id: 'floating-label-status',
    component: 'input-floating-label',
    title: 'Floating Label · Status',
    description:
      'Status branch from Figma. Error states are merged into one interactive preview while disabled remains a separate locked sample.',
    tags: ['status=error/disabled', 'states=error/error-typing/error-filled + disabled', 'size=250 x 52'],
    interactive: true,
    interactiveMode: 'error',
    interactiveTitle: 'Title',
    interactivePlaceholder: 'Input text',
    interactiveWidth: 250,
    showDisabledCompanion: true,
    disabledCompanionValue: 'Input text',
    actions: [{ value: 'Input text', state: 'disabled', title: 'Title', placeholder: 'Input text', width: 250 }],
    codeJs: `<app-ds-input-floating-label [interactive]="true" interactiveMode="error" title="Title" placeholder="Input text" [width]="250" />
<app-ds-input-floating-label value="Input text" state="disabled" title="Title" placeholder="Input text" [width]="250" />`,
    codeTs: `import { DsInputFloatingLabelComponent } from './components/ds-input-floating-label/ds-input-floating-label.component';`,
    snippetHtml: `<section class="button-demo-preview input-demo-preview">
  <app-ds-input-floating-label [interactive]="true" interactiveMode="error" title="Title" placeholder="Input text" [width]="250" />
  <app-ds-input-floating-label value="Input text" state="disabled" title="Title" placeholder="Input text" [width]="250" />
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsInputFloatingLabelComponent } from './components/ds-input-floating-label/ds-input-floating-label.component';

@Component({
  selector: 'app-input-floating-label-status-demo',
  standalone: true,
  imports: [DsInputFloatingLabelComponent],
  template: \`
    <section class="button-demo-preview input-demo-preview">
      <app-ds-input-floating-label [interactive]="true" interactiveMode="error" title="Title" placeholder="Input text" [width]="250" />
      <app-ds-input-floating-label value="Input text" state="disabled" title="Title" placeholder="Input text" [width]="250" />
    </section>
  \`,
})
export class InputFloatingLabelStatusDemoComponent {}`,
  },
  {
    id: 'affix-basic',
    component: 'input-affix',
    title: 'Affix · Basic',
    description:
      'Interactive baseline for input/affix from Figma. Preview supports default, hover, focus, typing, and filled with real input behavior.',
    tags: ['variant=input/affix', 'affixMode=prefix', 'states=default/hover/focus/typing/filled', 'size=250 x 52'],
    interactive: true,
    interactiveStates: ['default', 'hover', 'focus', 'typing', 'filled'],
    interactiveMode: 'default',
    interactiveAffixMode: 'prefix',
    interactivePlaceholder: 'Input text',
    interactiveWidth: 250,
    actions: [{ value: '', state: 'default', affixMode: 'prefix', placeholder: 'Input text', width: 250 }],
    codeJs: `<app-ds-input-affix [interactive]="true" affixMode="prefix" placeholder="Input text" [width]="250" />`,
    codeTs: `import { DsInputAffixComponent } from './components/ds-input-affix/ds-input-affix.component';`,
    snippetHtml: `<section class="button-demo-preview input-demo-preview">
  <app-ds-input-affix [interactive]="true" affixMode="prefix" placeholder="Input text" [width]="250" />
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsInputAffixComponent } from './components/ds-input-affix/ds-input-affix.component';

@Component({
  selector: 'app-input-affix-demo',
  standalone: true,
  imports: [DsInputAffixComponent],
  template: \`
    <section class="button-demo-preview input-demo-preview">
      <app-ds-input-affix [interactive]="true" affixMode="prefix" placeholder="Input text" [width]="250" />
    </section>
  \`,
})
export class InputAffixDemoComponent {}`,
  },
  {
    id: 'affix-modes',
    component: 'input-affix',
    title: 'Affix · Prefix / Suffix / Both',
    description:
      'Composition axis from Figma. Prefix and suffix can host text or icon content; this matrix shows the three default mode variants.',
    tags: ['affixMode=prefix/suffix/both', 'state=default', 'size=250 x 52'],
    actions: [
      { value: '', state: 'default', affixMode: 'prefix', placeholder: 'Input text', width: 250 },
      { value: '', state: 'default', affixMode: 'suffix', placeholder: 'Input text', width: 250 },
      { value: '', state: 'default', affixMode: 'both', placeholder: 'Input text', width: 250 },
    ],
    codeJs: `<app-ds-input-affix affixMode="prefix" placeholder="Input text" [width]="250" />
<app-ds-input-affix affixMode="suffix" placeholder="Input text" [width]="250" />
<app-ds-input-affix affixMode="both" placeholder="Input text" [width]="250" />`,
    codeTs: `import { DsInputAffixComponent } from './components/ds-input-affix/ds-input-affix.component';`,
    snippetHtml: `<section class="button-demo-preview input-demo-preview">
  <app-ds-input-affix affixMode="prefix" placeholder="Input text" [width]="250" />
  <app-ds-input-affix affixMode="suffix" placeholder="Input text" [width]="250" />
  <app-ds-input-affix affixMode="both" placeholder="Input text" [width]="250" />
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsInputAffixComponent } from './components/ds-input-affix/ds-input-affix.component';

@Component({
  selector: 'app-input-affix-modes-demo',
  standalone: true,
  imports: [DsInputAffixComponent],
  template: \`
    <section class="button-demo-preview input-demo-preview">
      <app-ds-input-affix affixMode="prefix" placeholder="Input text" [width]="250" />
      <app-ds-input-affix affixMode="suffix" placeholder="Input text" [width]="250" />
      <app-ds-input-affix affixMode="both" placeholder="Input text" [width]="250" />
    </section>
  \`,
})
export class InputAffixModesDemoComponent {}`,
  },
  {
    id: 'affix-status',
    component: 'input-affix',
    title: 'Affix · Status',
    description:
      'Status branch from Figma. Error states are merged into one interactive preview while disabled remains a separate locked sample.',
    tags: ['status=error/disabled', 'states=error/error-typing/error-filled + disabled', 'affixMode=prefix', 'size=250 x 52'],
    interactive: true,
    interactiveMode: 'error',
    interactiveAffixMode: 'prefix',
    interactivePlaceholder: 'Input text',
    interactiveWidth: 250,
    showDisabledCompanion: true,
    disabledCompanionValue: 'Input text',
    actions: [{ value: 'Input text', state: 'disabled', affixMode: 'prefix', placeholder: 'Input text', width: 250 }],
    codeJs: `<app-ds-input-affix [interactive]="true" interactiveMode="error" affixMode="prefix" placeholder="Input text" [width]="250" />
<app-ds-input-affix value="Input text" state="disabled" affixMode="prefix" placeholder="Input text" [width]="250" />`,
    codeTs: `import { DsInputAffixComponent } from './components/ds-input-affix/ds-input-affix.component';`,
    snippetHtml: `<section class="button-demo-preview input-demo-preview">
  <app-ds-input-affix [interactive]="true" interactiveMode="error" affixMode="prefix" placeholder="Input text" [width]="250" />
  <app-ds-input-affix value="Input text" state="disabled" affixMode="prefix" placeholder="Input text" [width]="250" />
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsInputAffixComponent } from './components/ds-input-affix/ds-input-affix.component';

@Component({
  selector: 'app-input-affix-status-demo',
  standalone: true,
  imports: [DsInputAffixComponent],
  template: \`
    <section class="button-demo-preview input-demo-preview">
      <app-ds-input-affix [interactive]="true" interactiveMode="error" affixMode="prefix" placeholder="Input text" [width]="250" />
      <app-ds-input-affix value="Input text" state="disabled" affixMode="prefix" placeholder="Input text" [width]="250" />
    </section>
  \`,
})
export class InputAffixStatusDemoComponent {}`,
  },
  {
    id: 'search-basic',
    component: 'input-search',
    title: 'Search · Basic',
    description:
      'Interactive baseline for input/search from Figma. Preview supports default, hover, focus, typing, and filled with live input behavior.',
    tags: ['variant=input/search', 'states=default/hover/focus/typing/filled', 'size=250 x 52'],
    interactive: true,
    interactiveStates: ['default', 'hover', 'focus', 'typing', 'filled'],
    interactiveMode: 'default',
    interactivePlaceholder: 'Input text',
    interactiveWidth: 250,
    actions: [{ value: '', state: 'default', placeholder: 'Input text', width: 250 }],
    codeJs: `<app-ds-input-search [interactive]="true" placeholder="Input text" [width]="250" />`,
    codeTs: `import { DsInputSearchComponent } from './components/ds-input-search/ds-input-search.component';`,
    snippetHtml: `<section class="button-demo-preview input-demo-preview">
  <app-ds-input-search [interactive]="true" placeholder="Input text" [width]="250" />
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsInputSearchComponent } from './components/ds-input-search/ds-input-search.component';

@Component({
  selector: 'app-input-search-demo',
  standalone: true,
  imports: [DsInputSearchComponent],
  template: \`
    <section class="button-demo-preview input-demo-preview">
      <app-ds-input-search [interactive]="true" placeholder="Input text" [width]="250" />
    </section>
  \`,
})
export class InputSearchDemoComponent {}`,
  },
  {
    id: 'search-status',
    component: 'input-search',
    title: 'Search · Status',
    description:
      'Status-driven branch from Figma. Error states are merged into one interactive preview while disabled remains a separate locked sample.',
    tags: ['status=error/disabled', 'states=error/error-typing/error-filled + disabled', 'size=250 x 52'],
    interactive: true,
    interactiveMode: 'error',
    interactivePlaceholder: 'Input text',
    interactiveWidth: 250,
    showDisabledCompanion: true,
    disabledCompanionValue: 'Input text',
    actions: [{ value: 'Input text', state: 'disabled', width: 250 }],
    codeJs: `<app-ds-input-search [interactive]="true" interactiveMode="error" placeholder="Input text" [width]="250" />
<app-ds-input-search value="Input text" state="disabled" [width]="250" />`,
    codeTs: `import { DsInputSearchComponent } from './components/ds-input-search/ds-input-search.component';`,
    snippetHtml: `<section class="button-demo-preview input-demo-preview">
  <app-ds-input-search [interactive]="true" interactiveMode="error" placeholder="Input text" [width]="250" />
  <app-ds-input-search value="Input text" state="disabled" [width]="250" />
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsInputSearchComponent } from './components/ds-input-search/ds-input-search.component';

@Component({
  selector: 'app-input-search-status-demo',
  standalone: true,
  imports: [DsInputSearchComponent],
  template: \`
    <section class="button-demo-preview input-demo-preview">
      <app-ds-input-search [interactive]="true" interactiveMode="error" placeholder="Input text" [width]="250" />
      <app-ds-input-search value="Input text" state="disabled" [width]="250" />
    </section>
  \`,
})
export class InputSearchStatusDemoComponent {}`,
  },
  {
    id: 'password-basic',
    component: 'input-password',
    title: 'Password',
    description:
      'Interactive baseline for input/password from Figma. Toggle hide/unhide and type directly to move through default, focus, typing, and filled states.',
    tags: ['variant=input/password', 'contentMode=hide/unhide', 'states=default/focus/typing/filled', 'size=307 x 52'],
    interactive: true,
    interactiveMode: 'default',
    interactiveTitle: 'Title',
    interactiveContentMode: 'hide',
    interactiveWidth: 307,
    actions: [{ value: '', state: 'default', title: 'Title', contentMode: 'hide', width: 307 }],
    codeJs: `<app-ds-input-password [interactive]="true" title="Title" [width]="307" />`,
    codeTs: `import { DsInputPasswordComponent } from './components/ds-input-password/ds-input-password.component';`,
    snippetHtml: `<section class="button-demo-preview input-demo-preview">
  <app-ds-input-password [interactive]="true" title="Title" [width]="307" />
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsInputPasswordComponent } from './components/ds-input-password/ds-input-password.component';

@Component({
  selector: 'app-input-password-demo',
  standalone: true,
  imports: [DsInputPasswordComponent],
  template: \`
    <section class="button-demo-preview input-demo-preview">
      <app-ds-input-password [interactive]="true" title="Title" [width]="307" />
    </section>
  \`,
})
export class InputPasswordDemoComponent {}`,
  },
  {
    id: 'password-status',
    component: 'input-password',
    title: 'Password · Status',
    description:
      'Error branch stays interactive for typing and hide/unhide behavior. Disabled remains a separate fixed sample from the same Figma set.',
    tags: ['status=error/disabled', 'contentMode=hide/unhide', 'size=307 x 52'],
    interactive: true,
    interactiveMode: 'error',
    interactiveTitle: 'Title',
    interactiveContentMode: 'hide',
    interactiveWidth: 307,
    showDisabledCompanion: true,
    disabledCompanionValue: 'Input text',
    disabledCompanionContentMode: 'hide',
    actions: [{ value: 'Input text', state: 'disabled', title: 'Title', contentMode: 'hide', width: 307 }],
    codeJs: `<app-ds-input-password [interactive]="true" interactiveMode="error" title="Title" [width]="307" />
<app-ds-input-password value="Input text" state="disabled" title="Title" contentMode="hide" [width]="307" />`,
    codeTs: `import { DsInputPasswordComponent } from './components/ds-input-password/ds-input-password.component';`,
    snippetHtml: `<section class="button-demo-preview input-demo-preview">
  <app-ds-input-password [interactive]="true" interactiveMode="error" title="Title" [width]="307" />
  <app-ds-input-password value="Input text" state="disabled" title="Title" contentMode="hide" [width]="307" />
</section>`,
    snippetTs: `import { Component } from '@angular/core';
import { DsInputPasswordComponent } from './components/ds-input-password/ds-input-password.component';

@Component({
  selector: 'app-input-password-status-demo',
  standalone: true,
  imports: [DsInputPasswordComponent],
  template: \`
    <section class="button-demo-preview input-demo-preview">
      <app-ds-input-password [interactive]="true" interactiveMode="error" title="Title" [width]="307" />
      <app-ds-input-password value="Input text" state="disabled" title="Title" contentMode="hide" [width]="307" />
    </section>
  \`,
})
export class InputPasswordStatusDemoComponent {}`,
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
    description:
      'Displayed value in field area. Used by Input/basic, input/floating-label, input/search, input/password, and input/textarea.',
    type: 'string',
    defaultValue: "''",
  },
  {
    property: 'state',
    description:
      'Visual state axis mapped directly from Figma component set. Intended for docs/QA preview and deterministic rendering across the full Input family.',
    type: "'default' | 'hover' | 'focus' | 'typing' | 'filled' | 'error' | 'disabled' | 'error-typing' | 'error-filled'",
    defaultValue: "'default'",
  },
  {
    property: 'placeholder',
    description:
      'Placeholder text shown when value is empty (Input/basic, input/floating-label, input/search, and input/textarea).',
    type: 'string',
    defaultValue:
      "'Enter something' (Input/basic), 'Input text' (input/floating-label + input/search + Textarea)",
  },
  {
    property: 'affixMode (Affix)',
    description:
      'Composition mode for input/affix. Chooses prefix-only, suffix-only, or both-side affix layout from Figma.',
    type: "'prefix' | 'suffix' | 'both'",
    defaultValue: "'prefix'",
  },
  {
    property: 'prefixText / suffixText (Affix)',
    description:
      'Text content shown in prefix/suffix slots when affix mode uses text-based slots.',
    type: 'string',
    defaultValue: "'VND'",
  },
  {
    property: 'title (Password + Floating Label)',
    description:
      'Top title row token from Figma. Used by input/password and input/floating-label for label text above the value line.',
    type: 'string',
    defaultValue: "'Title'",
  },
  {
    property: 'contentMode (Password)',
    description: 'Controls password visibility icon mode and text masking.',
    type: "'hide' | 'unhide'",
    defaultValue: "'hide'",
  },
  {
    property: 'width',
    description: 'Fixed width in docs preview.',
    type: 'number',
    defaultValue:
      '250 (input/floating-label + input/search + Textarea), 307 (Password), 350 in interactive Input/basic demos',
  },
  {
    property: 'interactive',
    description: 'Enable live interaction rendering in preview demos.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'interactiveMode',
    description: 'Interactive state derivation strategy (used in status previews).',
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
    title: 'Floating Label · Surface + Border',
    description:
      'Input/floating-label uses the same semantic border progression as Input/basic and adds disabled surface override.',
    rows: [
      {
        componentToken: 'ds/input-floating-label/color/background/default',
        semanticAlias: 'background/primary',
        appliesTo: 'State=Default, Hover, Focus, Typing, Filled, Error*',
        notes: 'Base surface for active states.',
      },
      {
        componentToken: 'ds/input-floating-label/color/background/disabled',
        semanticAlias: 'background/disable3',
        appliesTo: 'State=Disabled',
        notes: 'Disabled surface from Figma alias.',
      },
      {
        componentToken: 'ds/input-floating-label/color/border/default',
        semanticAlias: 'border/brand-primary3',
        appliesTo: 'State=Default, Filled',
        notes: 'Base border.',
      },
      {
        componentToken: 'ds/input-floating-label/color/border/interactive',
        semanticAlias: 'border/brand-tertiary',
        appliesTo: 'State=Hover, Focus, Typing',
        notes: 'Interactive border for hover/focus/typing.',
      },
      {
        componentToken: 'ds/input-floating-label/color/border/error',
        semanticAlias: 'border/error2',
        appliesTo: 'State=Error, Error Typing, Error Filled',
        notes: 'Validation border in error branch.',
      },
      {
        componentToken: 'ds/input-floating-label/color/border/disabled',
        semanticAlias: 'border/disable2',
        appliesTo: 'State=Disabled',
        notes: 'Disabled border.',
      },
    ],
  },
  {
    title: 'Floating Label · Text + Cursor',
    description:
      'Input/floating-label title, value, and cursor follow semantic aliases with dedicated disabled text mapping.',
    rows: [
      {
        componentToken: 'ds/input-floating-label/color/text/title',
        semanticAlias: 'text/secondary',
        appliesTo: 'All states',
        notes: 'Top title row.',
      },
      {
        componentToken: 'ds/input-floating-label/color/text/placeholder',
        semanticAlias: 'text/tertiary',
        appliesTo: 'State=Default, Hover, Error',
        notes: 'Placeholder text.',
      },
      {
        componentToken: 'ds/input-floating-label/color/text/content',
        semanticAlias: 'text/primary',
        appliesTo: 'State=Typing, Filled, Error Typing, Error Filled',
        notes: 'Content text when value is present.',
      },
      {
        componentToken: 'ds/input-floating-label/color/text/cursor',
        semanticAlias: 'text/brand-tertiary2',
        appliesTo: 'State=Focus, Typing, Error Typing',
        notes: 'Caret indicator.',
      },
      {
        componentToken: 'ds/input-floating-label/color/text/disabled',
        semanticAlias: 'text/disable1',
        appliesTo: 'State=Disabled',
        notes: 'Disabled value contrast.',
      },
    ],
  },
  {
    title: 'Affix · Surface + Border',
    description:
      'Input/affix keeps white surface and follows the same semantic border progression as Input/basic across default, interactive, error, and disabled states.',
    rows: [
      {
        componentToken: 'ds/input-affix/color/background/default',
        semanticAlias: 'background/primary',
        appliesTo: 'All states',
        notes: 'Base surface.',
      },
      {
        componentToken: 'ds/input-affix/color/border/default',
        semanticAlias: 'border/brand-primary3',
        appliesTo: 'State=Default, Filled',
        notes: 'Neutral border.',
      },
      {
        componentToken: 'ds/input-affix/color/border/interactive',
        semanticAlias: 'border/brand-tertiary',
        appliesTo: 'State=Hover, Focus, Typing',
        notes: 'Interactive emphasis border.',
      },
      {
        componentToken: 'ds/input-affix/color/border/error',
        semanticAlias: 'border/error2',
        appliesTo: 'State=Error, Error Typing, Error Filled',
        notes: 'Validation border.',
      },
      {
        componentToken: 'ds/input-affix/color/border/disabled',
        semanticAlias: 'border/disable2',
        appliesTo: 'State=Disabled',
        notes: 'Disabled border.',
      },
    ],
  },
  {
    title: 'Affix · Text + Slot Content',
    description:
      'Input/affix text, cursor, prefix/suffix text slots, and both-mode icons map to semantic aliases to avoid hardcoded colors.',
    rows: [
      {
        componentToken: 'ds/input-affix/color/text/placeholder',
        semanticAlias: 'text/tertiary',
        appliesTo: 'State=Default, Hover, Focus, Error',
        notes: 'Placeholder text.',
      },
      {
        componentToken: 'ds/input-affix/color/text/content',
        semanticAlias: 'text/primary',
        appliesTo: 'State=Typing, Filled, Error Typing, Error Filled',
        notes: 'Main content text.',
      },
      {
        componentToken: 'ds/input-affix/color/text/cursor',
        semanticAlias: 'text/brand-tertiary2',
        appliesTo: 'State=Focus, Typing, Error Typing',
        notes: 'Caret color.',
      },
      {
        componentToken: 'ds/input-affix/color/text/disabled',
        semanticAlias: 'text/disable1',
        appliesTo: 'State=Disabled',
        notes: 'Disabled text contrast.',
      },
      {
        componentToken: 'ds/input-affix/color/slot/text',
        semanticAlias: 'text/primary',
        appliesTo: 'Mode=Prefix or Suffix',
        notes: 'Prefix/suffix currency text.',
      },
      {
        componentToken: 'ds/input-affix/color/slot/icon',
        semanticAlias: 'icon/brand-primary1',
        appliesTo: 'Mode=Both',
        notes: 'Book/info icon color.',
      },
      {
        componentToken: 'ds/input-affix/color/slot/icon/disabled',
        semanticAlias: 'icon/disable1',
        appliesTo: 'Mode=Both + State=Disabled',
        notes: 'Disabled icon color.',
      },
    ],
  },
  {
    title: 'Search · Surface + Border',
    description:
      'Input/search keeps the same surface model as Input/basic and swaps border aliases by interaction, error, and disabled states.',
    rows: [
      {
        componentToken: 'ds/input-search/color/background/default',
        semanticAlias: 'background/primary',
        appliesTo: 'All states',
        notes: 'Base surface for search field.',
      },
      {
        componentToken: 'ds/input-search/color/border/default',
        semanticAlias: 'border/brand-primary3',
        appliesTo: 'State=Default, Filled',
        notes: 'Base border.',
      },
      {
        componentToken: 'ds/input-search/color/border/interactive',
        semanticAlias: 'border/brand-tertiary',
        appliesTo: 'State=Hover, Focus, Typing',
        notes: 'Interactive border for hover/focus/typing.',
      },
      {
        componentToken: 'ds/input-search/color/border/error',
        semanticAlias: 'border/error2',
        appliesTo: 'State=Error, Error Typing, Error Filled',
        notes: 'Validation border in error branch.',
      },
      {
        componentToken: 'ds/input-search/color/border/disabled',
        semanticAlias: 'background/disable1',
        appliesTo: 'State=Disabled',
        notes: 'Figma maps disabled border to disable background alias.',
      },
    ],
  },
  {
    title: 'Search · Text + Icon',
    description:
      'Input/search text, cursor, search icon, and clear icon are bound to semantic aliases so preview and implementation stay in sync.',
    rows: [
      {
        componentToken: 'ds/input-search/color/text/placeholder',
        semanticAlias: 'text/tertiary',
        appliesTo: 'State=Default, Hover, Focus',
        notes: 'Placeholder text.',
      },
      {
        componentToken: 'ds/input-search/color/text/content',
        semanticAlias: 'text/primary',
        appliesTo: 'State=Typing, Filled, Error, Error Typing, Error Filled',
        notes: 'Content text color.',
      },
      {
        componentToken: 'ds/input-search/color/text/cursor',
        semanticAlias: 'text/brand-tertiary2',
        appliesTo: 'State=Focus, Typing, Error Typing',
        notes: 'Caret color.',
      },
      {
        componentToken: 'ds/input-search/color/text/disabled',
        semanticAlias: 'text/disable1',
        appliesTo: 'State=Disabled',
        notes: 'Disabled text color.',
      },
      {
        componentToken: 'ds/input-search/color/icon/search',
        semanticAlias: 'icon/brand-primary1',
        appliesTo: 'All states',
        notes: 'Suffix search icon color.',
      },
      {
        componentToken: 'ds/input-search/color/icon/clear',
        semanticAlias: 'icon/brand-primary1',
        appliesTo: 'State=Typing',
        notes: 'Clear icon appears only during typing state.',
      },
    ],
  },
  {
    title: 'Password · Border + Surface',
    description:
      'Input/password keeps transparent surface and swaps semantic underline aliases by state from the Figma component set.',
    rows: [
      {
        componentToken: 'ds/input-password/color/border/default',
        semanticAlias: 'border/tertiary',
        appliesTo: 'State=Default, Filled, Disabled',
        notes: 'Underline baseline.',
      },
      {
        componentToken: 'ds/input-password/color/border/interactive',
        semanticAlias: 'border/brand-tertiary',
        appliesTo: 'State=Focus, Typing',
        notes: 'Underline active color.',
      },
      {
        componentToken: 'ds/input-password/color/border/error',
        semanticAlias: 'border/error2',
        appliesTo: 'State=Error',
        notes: 'Validation underline color.',
      },
    ],
  },
  {
    title: 'Password · Text + Icon',
    description:
      'Password text, caret, and eye icon are all bound to semantic aliases to match hide/unhide variants without hardcoded component colors.',
    rows: [
      {
        componentToken: 'ds/input-password/color/text/title',
        semanticAlias: 'text/primary4',
        appliesTo: 'Title row + default placeholder',
        notes: '12px title and default placeholder color.',
      },
      {
        componentToken: 'ds/input-password/color/text/content',
        semanticAlias: 'text/primary',
        appliesTo: 'State=Typing, Filled, Error',
        notes: 'Main password text (masked or unmasked).',
      },
      {
        componentToken: 'ds/input-password/color/text/cursor',
        semanticAlias: 'text/brand-tertiary2',
        appliesTo: 'State=Focus, Typing',
        notes: 'Caret color.',
      },
      {
        componentToken: 'ds/input-password/color/text/disabled',
        semanticAlias: 'text/disable1',
        appliesTo: 'State=Disabled',
        notes: 'Disabled text contrast.',
      },
      {
        componentToken: 'ds/input-password/color/icon/toggle',
        semanticAlias: 'icon/brand-primary1',
        appliesTo: 'Hide + Unhide icon',
        notes: 'Eye icon color.',
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
    title: 'Floating Label Core Layout',
    description: 'Non-color variables extracted from input/floating-label Figma component set.',
    rows: [
      {
        token: 'ds/input-floating-label/width/default',
        value: '250',
        appliesTo: 'All states',
        notes: 'Fixed field width in component set.',
      },
      {
        token: 'ds/input-floating-label/height/default',
        value: '52',
        appliesTo: 'All states',
        notes: 'Fixed field height in component set.',
      },
      {
        token: 'ds/input-floating-label/padding/default',
        value: '12 x 10',
        appliesTo: 'Container',
        notes: 'Horizontal and vertical inner padding.',
      },
      {
        token: 'ds/input-floating-label/radius/default',
        value: '4',
        appliesTo: 'Container',
        notes: 'Corner radius.',
      },
      {
        token: 'ds/input-floating-label/spacing/xs',
        value: '2',
        appliesTo: 'Text and cursor',
        notes: 'Gap between content and cursor marker.',
      },
    ],
  },
  {
    title: 'Floating Label Typography Styles',
    description: 'Typography styles used by input/floating-label title and value rows.',
    rows: [
      {
        token: 'Body Copy (Data & Nav)/Normal/14-Regular',
        value: 'Averta Std CY, 14 / 20, 400, letter-spacing 0.25',
        appliesTo: 'Title + Input text + placeholder',
        notes: 'Shared style for both rows.',
      },
    ],
  },
  {
    title: 'Search Core Layout',
    description: 'Non-color variables extracted from input/search Figma component set.',
    rows: [
      {
        token: 'ds/input-search/width/default',
        value: '250',
        appliesTo: 'All states',
        notes: 'Fixed field width.',
      },
      {
        token: 'ds/input-search/height/default',
        value: '52',
        appliesTo: 'All states',
        notes: 'Fixed field height.',
      },
      {
        token: 'ds/input-search/padding/default',
        value: '12 x 16',
        appliesTo: 'Input wrapper',
        notes: 'Horizontal and vertical inner padding.',
      },
      {
        token: 'ds/input-search/radius/default',
        value: '4',
        appliesTo: 'Container',
        notes: 'Container corner radius.',
      },
      {
        token: 'ds/input-search/spacing/xs',
        value: '4',
        appliesTo: 'Text and icon wrapper',
        notes: 'Gap used inside input wrapper.',
      },
      {
        token: 'ds/input-search/iconsize/search',
        value: '24',
        appliesTo: 'Suffix search icon',
        notes: 'Search icon size token.',
      },
      {
        token: 'ds/input-search/iconsize/clear',
        value: '20',
        appliesTo: 'Clear icon in typing state',
        notes: 'Clear icon size token.',
      },
    ],
  },
  {
    title: 'Search Typography Styles',
    description: 'Typography style used by input/search text and placeholder states.',
    rows: [
      {
        token: 'Body Copy (Data & Nav)/Normal/14-Regular',
        value: 'Averta Std CY, 14 / 20, 400, letter-spacing 0.25',
        appliesTo: 'Input text / placeholder / typing content',
        notes: 'Shared text style for search input.',
      },
    ],
  },
  {
    title: 'Affix Core Layout',
    description: 'Non-color variables extracted from input/affix Figma component set.',
    rows: [
      {
        token: 'ds/input-affix/width/default',
        value: '250',
        appliesTo: 'All states',
        notes: 'Fixed field width in component set.',
      },
      {
        token: 'ds/input-affix/height/default',
        value: '52',
        appliesTo: 'All states',
        notes: 'Fixed field height in component set.',
      },
      {
        token: 'ds/input-affix/padding/default',
        value: '12 x 16',
        appliesTo: 'Container',
        notes: 'Horizontal and vertical inner padding.',
      },
      {
        token: 'ds/input-affix/radius/default',
        value: '4',
        appliesTo: 'Container',
        notes: 'Container corner radius.',
      },
      {
        token: 'ds/input-affix/spacing/xs',
        value: '4',
        appliesTo: 'Prefix/content/suffix spacing',
        notes: 'Gap between slot content and input content area.',
      },
      {
        token: 'ds/input-affix/spacing/cursor',
        value: '2',
        appliesTo: 'Typing cursor',
        notes: 'Gap between content text and cursor marker.',
      },
      {
        token: 'ds/input-affix/iconsize/default',
        value: '20',
        appliesTo: 'Both-mode icon slots',
        notes: 'Book/info icon size.',
      },
    ],
  },
  {
    title: 'Affix Typography Styles',
    description: 'Typography style shared by input content, placeholder, and prefix/suffix text slots.',
    rows: [
      {
        token: 'Body Copy (Data & Nav)/Normal/14-Regular',
        value: 'Averta Std CY, 14 / 20, 400, letter-spacing 0.25',
        appliesTo: 'Input text / placeholder / prefix-suffix text',
        notes: 'Shared text style across all affix modes.',
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
  'Container width is 250 and height is 52 in Input/basic, input/floating-label, and input/search components (Password uses width 307).',
  'Input/basic + input/search use padding 12 x 16. Input/floating-label uses padding 12 x 10 with two 20px text rows.',
  'Keep 4px gap between content and icon/cursor area in Input/basic + input/search; use 2px gap in input/floating-label.',
];

export const INPUT_VARIABLE_NOTES: string[] = [
  'This page documents `input/basic`, `input/floating-label`, `input/search`, `input/password`, and `input/textarea` from the Input family outline.',
  'State axis is normalized to machine-friendly values: default, hover, focus, typing, filled, error, disabled, error-typing, error-filled.',
  'Production API is recommended to expose `status` + `disabled`, then derive visual `state` internally for consistency.',
  'Do not alter geometry, typography, or visual token mapping unless the Figma source component is updated.',
];
