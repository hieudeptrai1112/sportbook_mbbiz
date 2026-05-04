export type ButtonMappingShape = 'rectangle' | 'pill';
export type ButtonMappingVariant = 'primary' | 'secondary';
export type ButtonMappingSize = 'lg' | 'md' | 'sm';

export interface ButtonMappingDemoSection {
  id: string;
  title: string;
  description: string;
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
  disabled?: boolean;
  showStartIcon?: boolean;
}

export interface ButtonMappingApiRow {
  property: string;
  description: string;
  type: string;
  defaultValue: string;
}

const SIZE_SCALE: readonly ButtonMappingSize[] = ['lg', 'md', 'sm'] as const;
const START_ICON = `<svg sportbook6vnButtonStartIcon aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M10 4.25V15.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M4.25 10H15.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>`;
const LABEL = 'Text';

const toClassName = (id: string): string =>
  id
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const buildButtonAttrs = (
  shape: ButtonMappingShape,
  variant: ButtonMappingVariant,
  size: ButtonMappingSize,
  disabled = false,
): string => {
  const attrs = [`shape="${shape}"`, `variant="${variant}"`, `size="${size}"`];
  if (disabled) {
    attrs.push('[disabled]="true"');
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
  const attrs = buildButtonAttrs(action.shape, action.variant, action.size, action.disabled ?? false);
  if (action.showStartIcon) {
    return `      <sportbook6vn-button ${attrs}>
        ${START_ICON}
        ${action.label}
      </sportbook6vn-button>`;
  }

  return `      <sportbook6vn-button ${attrs}>${action.label}</sportbook6vn-button>`;
};

const buildSnippetHtml = (groups: ButtonMappingDemoGroup[]): string => `<section class="button-mapping-preview">
${groups
  .map(
    (group) => `  <div class="button-state-group">
    <h4>${group.label}</h4>
    <div class="button-row">
${group.actions.map(buildButtonMarkup).join('\n')}
    </div>
  </div>`,
  )
  .join('\n\n')}
</section>`;

const buildSnippetStyles = (): string => `    .button-mapping-preview {
      display: grid;
      gap: 24px;
    }

    .button-state-group {
      display: grid;
      gap: 12px;
    }

    .button-state-group h4 {
      margin: 0;
      color: #596a82;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .button-row {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: center;
    }
  `;

const buildSnippetTs = (
  id: string,
  groups: ButtonMappingDemoGroup[],
): string => `import { Component } from '@angular/core';
import { Sportbook6vnButtonComponent } from 'sportbook6vn';

@Component({
  selector: 'app-${id}-mapping-demo',
  standalone: true,
  imports: [Sportbook6vnButtonComponent],
  template: \`
${buildSnippetHtml(groups)}
  \`,
  styles: [\`
${buildSnippetStyles()}
  \`],
})
export class ${toClassName(id)}MappingDemoComponent {}`;

const makeSection = (
  id: string,
  title: string,
  description: string,
  tags: string[],
  groups: ButtonMappingDemoGroup[],
): ButtonMappingDemoSection => ({
  id,
  title,
  description,
  tags,
  groups,
  snippetTs: buildSnippetTs(id, groups),
});

export const BUTTON_MAPPING_DEMO_SECTIONS: ButtonMappingDemoSection[] = [
  makeSection(
    'basic',
    'Basic',
    'Use case cơ bản từ preview: primary/secondary và pill variants ở size large.',
    ['selector=sportbook6vn-button', 'use-case=basic', 'size=lg'],
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
  ),
  makeSection(
    'size',
    'Size',
    'Scale size theo từng tổ hợp shape/variant đã chốt trên preview.',
    ['selector=sportbook6vn-button', 'use-case=size', 'sizes=lg/md/sm'],
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
  ),
  makeSection(
    'shape',
    'Shape',
    'So sánh shape rectangle và pill ở size large, giữ đủ primary/secondary.',
    ['selector=sportbook6vn-button', 'use-case=shape', 'shape=rectangle/pill'],
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
  ),
  makeSection(
    'with-icon',
    'With icon',
    'Leading icon theo preview. Trailing icon và both sides đang được tạm ẩn.',
    ['selector=sportbook6vn-button', 'use-case=with-icon', 'slot=startIcon'],
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
  ),
  makeSection(
    'disabled',
    'Disabled',
    'Disabled chỉ demo một size đại diện cho mỗi tổ hợp shape/variant, đúng theo preview.',
    ['selector=sportbook6vn-button', 'use-case=disabled', 'size=lg'],
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
  ),
];

export const BUTTON_MAPPING_API_ROWS: ButtonMappingApiRow[] = [
  {
    property: 'variant',
    description: 'Visual variant axis from Figma (Primary / Secondary).',
    type: "'primary' | 'secondary'",
    defaultValue: "'primary'",
  },
  {
    property: 'size',
    description: 'Size axis from Figma (Large / Medium / Small).',
    type: "'lg' | 'md' | 'sm'",
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
    description: 'Shows loading state and blocks click interaction.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'fullWidth',
    description: 'Expands button width to fill its container.',
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
    property: '[sportbook6vnButtonStartIcon]',
    description: 'Content projection slot for leading icon.',
    type: 'Projected slot',
    defaultValue: '-',
  },
  {
    property: '[sportbook6vnButtonEndIcon]',
    description: 'Content projection slot for trailing icon.',
    type: 'Projected slot',
    defaultValue: '-',
  },
];
