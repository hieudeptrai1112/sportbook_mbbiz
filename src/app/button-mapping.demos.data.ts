export type ButtonMappingShape = 'rectangle' | 'pill';
export type ButtonMappingVariant = 'primary' | 'secondary';
export type ButtonMappingSize = 'xl' | 'lg' | 'md' | 'sm';
export type ButtonMappingTone = 'primary' | 'secondary';
export type ButtonMappingAppearance = 'solid' | 'outline' | 'text-link';

export interface ButtonMappingDescriptionPart {
  text?: string;
  code?: string;
}

export interface ButtonMappingDemoSection {
  id: string;
  title: string;
  description: string;
  descriptionParts: ButtonMappingDescriptionPart[];
  tags: string[];
  groups: ButtonMappingDemoGroup[];
  snippetTs: string;
}

export interface ButtonMappingDemoGroup {
  label: string;
  actions: ButtonMappingDemoAction[];
}

export interface ButtonMappingDemoAction {
  label: string;
  shape: ButtonMappingShape;
  variant: ButtonMappingVariant;
  size: ButtonMappingSize;
  tone?: ButtonMappingTone;
  appearance?: ButtonMappingAppearance;
  disabled?: boolean;
  loading?: boolean;
  showStartIcon?: boolean;
}

export interface ButtonMappingApiRow {
  property: string;
  description: string;
  type: string;
  defaultValue: string;
}

const SIZE_SCALE: readonly ButtonMappingSize[] = ['lg', 'md', 'sm'] as const;
const LABEL = 'Text';

const toClassName = (id: string): string =>
  id
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const buildButtonAttrs = (action: ButtonMappingDemoAction): string => {
  const attrs = [`shape="${action.shape}"`];
  if (action.tone) {
    attrs.push(`tone="${action.tone}"`);
  } else {
    attrs.push(`variant="${action.variant}"`);
  }
  if (action.appearance) {
    attrs.push(`appearance="${action.appearance}"`);
  }
  attrs.push(`size="${action.size}"`);
  if (action.disabled) {
    attrs.push('[disabled]="true"');
  }
  if (action.loading) {
    attrs.push('[loading]="true"');
  }
  return attrs.join(' ');
};

const makeButtonAction = (
  shape: ButtonMappingShape,
  variant: ButtonMappingVariant,
  size: ButtonMappingSize,
  overrides: Partial<ButtonMappingDemoAction> = {},
): ButtonMappingDemoAction => ({
  label: LABEL,
  shape,
  variant,
  size,
  ...overrides,
});

const makeSizeScaleActions = (
  shape: ButtonMappingShape,
  variant: ButtonMappingVariant,
): ButtonMappingDemoAction[] => SIZE_SCALE.map((size) => makeButtonAction(shape, variant, size));

const buildButtonMarkup = (action: ButtonMappingDemoAction): string => {
  const attrs = buildButtonAttrs(action);
  if (action.showStartIcon) {
    return `    <mbbiz-button ${attrs}>
      <span mbbizButtonStartIcon aria-hidden="true">+</span>
      ${action.label}
    </mbbiz-button>`;
  }

  return `    <mbbiz-button ${attrs}>${action.label}</mbbiz-button>`;
};

const buildSnippetTemplate = (groups: ButtonMappingDemoGroup[]): string =>
  groups
    .map(
      (group) => `    <!-- ${group.label} -->
${group.actions.map(buildButtonMarkup).join('\n')}`,
    )
    .join('\n\n');

const buildSnippetTs = (
  id: string,
  groups: ButtonMappingDemoGroup[],
): string => `import { Component } from '@angular/core';
import { MbbizButtonComponent } from 'mbbiz';

@Component({
  selector: 'app-button-${id}-demo',
  standalone: true,
  imports: [MbbizButtonComponent],
  template: \`
${buildSnippetTemplate(groups)}
  \`,
})
export class Button${toClassName(id)}DemoComponent {}`;

const makeSection = (
  id: string,
  title: string,
  description: string,
  tags: string[],
  groups: ButtonMappingDemoGroup[],
  descriptionParts: ButtonMappingDescriptionPart[] = [{ text: description }],
): ButtonMappingDemoSection => ({
  id,
  title,
  description,
  descriptionParts,
  tags,
  groups,
  snippetTs: buildSnippetTs(id, groups),
});

export const BUTTON_MAPPING_DEMO_SECTIONS: ButtonMappingDemoSection[] = [
  makeSection(
    'theme',
    'Theme',
    'Brand themes restyle this page only. Rectangle solid secondary uses the gradient. Solid primary uses background/brand-secondary.',
    ['selector=mbbiz-button', 'use-case=theme', 'tone=primary/secondary'],
    [
      {
        label: 'Solid secondary · gradient',
        actions: [
          makeButtonAction('rectangle', 'primary', 'xl', { tone: 'secondary', appearance: 'solid' }),
          makeButtonAction('rectangle', 'primary', 'xl', {
            tone: 'secondary',
            appearance: 'solid',
            disabled: true,
          }),
        ],
      },
      {
        label: 'Outline primary',
        actions: [
          makeButtonAction('rectangle', 'primary', 'xl', { tone: 'primary', appearance: 'outline' }),
          makeButtonAction('pill', 'primary', 'lg', { tone: 'primary', appearance: 'text-link' }),
        ],
      },
      {
        label: 'Solid primary · brand',
        actions: [
          makeButtonAction('rectangle', 'primary', 'xl', { tone: 'primary', appearance: 'solid' }),
          makeButtonAction('pill', 'primary', 'lg', { tone: 'primary', appearance: 'solid' }),
          makeButtonAction('pill', 'secondary', 'lg', { tone: 'secondary', appearance: 'outline' }),
        ],
      },
    ],
    [
      { text: 'Use the brand switch above. ' },
      { code: 'tone' },
      { text: ' and ' },
      { code: 'appearance' },
      { text: ' follow the Figma Type and Style axes.' },
    ],
  ),
  makeSection(
    'basic',
    'Basic',
    'There are primary, secondary, pill primary, and pill secondary button variants.',
    ['selector=mbbiz-button', 'use-case=basic', 'size=lg'],
    [
      {
        label: 'Primary and secondary',
        actions: [
          makeButtonAction('rectangle', 'primary', 'lg'),
          makeButtonAction('rectangle', 'secondary', 'lg'),
        ],
      },
      {
        label: 'Pill variants',
        actions: [
          makeButtonAction('pill', 'primary', 'lg'),
          makeButtonAction('pill', 'secondary', 'lg'),
        ],
      },
    ],
    [
      { text: 'There are ' },
      { code: 'primary' },
      { text: ', ' },
      { code: 'secondary' },
      { text: ', ' },
      { code: 'pill primary' },
      { text: ', and ' },
      { code: 'pill secondary' },
      { text: ' button variants.' },
    ],
  ),
  makeSection(
    'size',
    'Size',
    'Buttons support large, medium, and small sizes across rectangle and pill shapes.',
    ['selector=mbbiz-button', 'use-case=size', 'sizes=lg/md/sm'],
    [
      {
        label: 'Rectangle / Primary',
        actions: makeSizeScaleActions('rectangle', 'primary'),
      },
      {
        label: 'Rectangle / Secondary',
        actions: makeSizeScaleActions('rectangle', 'secondary'),
      },
      {
        label: 'Pill / Primary',
        actions: makeSizeScaleActions('pill', 'primary'),
      },
      {
        label: 'Pill / Secondary',
        actions: makeSizeScaleActions('pill', 'secondary'),
      },
    ],
    [
      { text: 'Buttons support ' },
      { code: 'lg' },
      { text: ', ' },
      { code: 'md' },
      { text: ', and ' },
      { code: 'sm' },
      { text: ' sizes across ' },
      { code: 'rectangle' },
      { text: ' and ' },
      { code: 'pill' },
      { text: ' shapes.' },
    ],
  ),
  makeSection(
    'shape',
    'Shape',
    'Buttons can be rendered as rectangle or pill shapes.',
    ['selector=mbbiz-button', 'use-case=shape', 'shape=rectangle/pill'],
    [
      {
        label: 'Rectangle',
        actions: [
          makeButtonAction('rectangle', 'primary', 'lg'),
          makeButtonAction('rectangle', 'secondary', 'lg'),
        ],
      },
      {
        label: 'Pill',
        actions: [
          makeButtonAction('pill', 'primary', 'lg'),
          makeButtonAction('pill', 'secondary', 'lg'),
        ],
      },
    ],
    [
      { text: 'Buttons can be rendered as ' },
      { code: 'rectangle' },
      { text: ' or ' },
      { code: 'pill' },
      { text: ' shapes.' },
    ],
  ),
  makeSection(
    'with-icon',
    'With icon',
    'Use the start icon slot to display an icon before the label.',
    ['selector=mbbiz-button', 'use-case=with-icon', 'slot=startIcon'],
    [
      {
        label: 'Leading icon',
        actions: [
          makeButtonAction('rectangle', 'primary', 'lg', { showStartIcon: true }),
          makeButtonAction('rectangle', 'secondary', 'lg', { showStartIcon: true }),
          makeButtonAction('pill', 'primary', 'lg', { showStartIcon: true }),
          makeButtonAction('pill', 'secondary', 'lg', { showStartIcon: true }),
        ],
      },
    ],
    [
      { text: 'Use ' },
      { code: 'mbbizButtonStartIcon' },
      { text: ' to display an icon before the label.' },
    ],
  ),
  makeSection(
    'disabled',
    'Disabled',
    'Disabled buttons prevent interaction and use muted visual styles.',
    ['selector=mbbiz-button', 'use-case=disabled', 'size=lg'],
    [
      {
        label: 'Rectangle / Primary',
        actions: [makeButtonAction('rectangle', 'primary', 'lg', { disabled: true })],
      },
      {
        label: 'Rectangle / Secondary',
        actions: [makeButtonAction('rectangle', 'secondary', 'lg', { disabled: true })],
      },
      {
        label: 'Pill / Primary',
        actions: [makeButtonAction('pill', 'primary', 'lg', { disabled: true })],
      },
      {
        label: 'Pill / Secondary',
        actions: [makeButtonAction('pill', 'secondary', 'lg', { disabled: true })],
      },
    ],
    [
      { text: 'Set ' },
      { code: '[disabled]="true"' },
      { text: ' to prevent interaction and use muted visual styles.' },
    ],
  ),
  makeSection(
    'loading',
    'Loading',
    'Loading keeps the label and shows a spinner beside it.',
    ['selector=mbbiz-button', 'use-case=loading', 'state=loading'],
    [
      {
        label: 'States',
        actions: [
          makeButtonAction('rectangle', 'primary', 'xl', {
            tone: 'secondary',
            appearance: 'solid',
            loading: true,
          }),
          makeButtonAction('rectangle', 'primary', 'xl', {
            tone: 'primary',
            appearance: 'outline',
            loading: true,
          }),
          makeButtonAction('pill', 'primary', 'lg', {
            tone: 'primary',
            appearance: 'solid',
            loading: true,
          }),
          makeButtonAction('pill', 'secondary', 'lg', {
            tone: 'secondary',
            appearance: 'outline',
            loading: true,
          }),
          makeButtonAction('pill', 'primary', 'lg', {
            tone: 'primary',
            appearance: 'text-link',
            loading: true,
          }),
        ],
      },
    ],
    [
      { text: 'Set ' },
      { code: '[loading]="true"' },
      { text: ' to show the spinner and block clicks. The label stays visible.' },
    ],
  ),
];

export const BUTTON_MAPPING_API_ROWS: ButtonMappingApiRow[] = [
  {
    property: 'variant',
    description:
      'Legacy axis. Rectangle primary renders the gradient. Rectangle secondary renders the outline. Pill primary is solid. Pill secondary is outline.',
    type: "'primary' | 'secondary'",
    defaultValue: "'primary'",
  },
  {
    property: 'tone',
    description: 'Figma Type. When set, it replaces the legacy variant mapping.',
    type: "'primary' | 'secondary' | null",
    defaultValue: 'null',
  },
  {
    property: 'appearance',
    description: 'Figma Style. When set, it replaces the legacy solid or outline mapping.',
    type: "'solid' | 'outline' | 'text-link' | null",
    defaultValue: 'null',
  },
  {
    property: 'size',
    description: 'Size axis from Figma. Extra large is rectangle only.',
    type: "'xl' | 'lg' | 'md' | 'sm'",
    defaultValue: "'md'",
  },
  {
    property: 'shape',
    description: 'Shape axis from Figma (Rectangle / Pill).',
    type: "'rectangle' | 'pill'",
    defaultValue: "'rectangle'",
  },
  {
    property: 'disabled',
    description: 'Disables interaction and applies disabled visual state.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'loading',
    description: 'Shows a spinner beside the label and blocks click interaction.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'fullWidth',
    description:
      'Expands button width to fill its container. Supported layout API; not part of the current Button Mapping preview scope.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'type',
    description: 'Native button type attribute.',
    type: "'button' | 'submit' | 'reset'",
    defaultValue: "'button'",
  },
  {
    property: 'ariaLabel',
    description: 'Optional accessibility label for icon-only or custom content cases.',
    type: 'string | null',
    defaultValue: 'null',
  },
  {
    property: 'buttonClick',
    description: 'Emits click event after internal disabled/loading guard.',
    type: 'Output<MouseEvent>',
    defaultValue: '-',
  },
  {
    property: '[mbbizButtonStartIcon]',
    description: 'Content projection slot for leading icon. Covered by the current With icon use case.',
    type: 'Projected slot',
    defaultValue: '-',
  },
  {
    property: '[mbbizButtonEndIcon]',
    description:
      'Content projection slot for trailing icon. Supported by the component; temporarily hidden from the current preview mapping scope.',
    type: 'Projected slot',
    defaultValue: '-',
  },
];
