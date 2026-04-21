export type ButtonMappingCodeType = 'js' | 'ts';
export type ButtonMappingShape = 'rectangle' | 'pill';
export type ButtonMappingVariant = 'primary' | 'secondary';
export type ButtonMappingSize = 'lg' | 'md' | 'sm';

export interface ButtonMappingDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  shape: ButtonMappingShape;
  variant: ButtonMappingVariant;
  snippetHtml: string;
  snippetTs: string;
}

export interface ButtonMappingApiRow {
  property: string;
  description: string;
  type: string;
  defaultValue: string;
}

const SIZE_SCALE: readonly ButtonMappingSize[] = ['lg', 'md', 'sm'] as const;
const START_ICON = `<svg sportbook6vnButtonStartIcon aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M10 4.25V15.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M4.25 10H15.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>`;
const END_ICON = `<svg sportbook6vnButtonEndIcon aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M10 4.25V15.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M4.25 10H15.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>`;

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
  const attrs = [`size="${size}"`];
  if (shape === 'pill') {
    attrs.push('shape="pill"');
  }
  if (variant === 'secondary') {
    attrs.push('variant="secondary"');
  }
  if (disabled) {
    attrs.push('[disabled]="true"');
  }
  return attrs.join(' ');
};

const buildDefaultButtonRow = (
  shape: ButtonMappingShape,
  variant: ButtonMappingVariant,
): string =>
  SIZE_SCALE.map(
    (size) => `    <sportbook6vn-button ${buildButtonAttrs(shape, variant, size)}>Text</sportbook6vn-button>`,
  ).join('\n');

const buildDisabledButtonRow = (
  shape: ButtonMappingShape,
  variant: ButtonMappingVariant,
): string =>
  SIZE_SCALE.map(
    (size) =>
      `    <sportbook6vn-button ${buildButtonAttrs(shape, variant, size, true)}>Text</sportbook6vn-button>`,
  ).join('\n');

const buildWithIconButtonRow = (shape: ButtonMappingShape, variant: ButtonMappingVariant): string => `    <sportbook6vn-button ${buildButtonAttrs(shape, variant, 'lg')}>
      ${START_ICON}
      Text
    </sportbook6vn-button>
    <sportbook6vn-button ${buildButtonAttrs(shape, variant, 'md')}>
      Text
      ${END_ICON}
    </sportbook6vn-button>
    <sportbook6vn-button ${buildButtonAttrs(shape, variant, 'sm')}>
      ${START_ICON}
      Text
      ${END_ICON}
    </sportbook6vn-button>`;

const buildSnippetHtml = (shape: ButtonMappingShape, variant: ButtonMappingVariant): string => `<section class="button-mapping-preview">
  <div class="button-state-group">
    <h4>Default</h4>
    <div class="button-row">
${buildDefaultButtonRow(shape, variant)}
    </div>
  </div>

  <div class="button-state-group">
    <h4>With icon</h4>
    <div class="button-row">
${buildWithIconButtonRow(shape, variant)}
    </div>
  </div>

  <div class="button-state-group">
    <h4>Disabled</h4>
    <div class="button-row">
${buildDisabledButtonRow(shape, variant)}
    </div>
  </div>
</section>`;

const buildSnippetTs = (id: string): string => `import { Component } from '@angular/core';
import { Sportbook6vnButtonComponent } from 'sportbook6vn';

@Component({
  selector: 'app-${id}-mapping-demo',
  standalone: true,
  imports: [Sportbook6vnButtonComponent],
  templateUrl: './${id}-mapping-demo.component.html',
})
export class ${toClassName(id)}MappingDemoComponent {}`;

const makeSection = (
  id: string,
  title: string,
  description: string,
  tags: string[],
  shape: ButtonMappingShape,
  variant: ButtonMappingVariant,
): ButtonMappingDemoSection => ({
  id,
  title,
  description,
  tags,
  shape,
  variant,
  snippetHtml: buildSnippetHtml(shape, variant),
  snippetTs: buildSnippetTs(id),
});

export const BUTTON_MAPPING_DEMO_SECTIONS: ButtonMappingDemoSection[] = [
  makeSection(
    'rectangle-primary',
    'Rectangle · Primary',
    'Wrapper map 1:1 theo bộ rectangle primary từ preview, gồm default, with icon, disabled.',
    ['selector=sportbook6vn-button', 'shape=rectangle', 'variant=primary', 'sizes=lg/md/sm'],
    'rectangle',
    'primary',
  ),
  makeSection(
    'rectangle-secondary',
    'Rectangle · Secondary',
    'Wrapper map 1:1 cho rectangle secondary với cùng ma trận trạng thái và kích thước.',
    ['selector=sportbook6vn-button', 'shape=rectangle', 'variant=secondary', 'sizes=lg/md/sm'],
    'rectangle',
    'secondary',
  ),
  makeSection(
    'pill-primary',
    'Pill · Primary',
    'Wrapper map 1:1 cho pill primary, giữ cùng bố cục state và icon như preview.',
    ['selector=sportbook6vn-button', 'shape=pill', 'variant=primary', 'sizes=lg/md/sm'],
    'pill',
    'primary',
  ),
  makeSection(
    'pill-secondary',
    'Pill · Secondary',
    'Wrapper map 1:1 cho pill secondary, bao gồm default, with icon, disabled.',
    ['selector=sportbook6vn-button', 'shape=pill', 'variant=secondary', 'sizes=lg/md/sm'],
    'pill',
    'secondary',
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
