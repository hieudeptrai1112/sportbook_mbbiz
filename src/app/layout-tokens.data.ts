export interface LayoutTokenRow {
  alias: string;
  proposed: string;
  primitive: string;
  value: string;
  appliesTo: string;
  cssVar: string;
}

export interface LayoutTokenGroup {
  id: string;
  title: string;
  description: string;
  rows: LayoutTokenRow[];
}

export const LAYOUT_TOKEN_GROUPS: LayoutTokenGroup[] = [
  {
    id: 'layout-breakpoints',
    title: 'Breakpoints',
    description: 'Arco-aligned viewport thresholds for responsive grid, gutter, and page margin.',
    rows: [
      {
        alias: 'layout/breakpoint/xs',
        proposed: 'semantic/layout/breakpoint/xs',
        primitive: '—',
        value: '0',
        appliesTo: 'Base styles (<576px)',
        cssVar: '--layout-breakpoint-xs',
      },
      {
        alias: 'layout/breakpoint/sm',
        proposed: 'semantic/layout/breakpoint/sm',
        primitive: '—',
        value: '576px',
        appliesTo: 'Small screens (≥576px)',
        cssVar: '--layout-breakpoint-sm',
      },
      {
        alias: 'layout/breakpoint/md',
        proposed: 'semantic/layout/breakpoint/md',
        primitive: '—',
        value: '768px',
        appliesTo: 'Tablet (≥768px)',
        cssVar: '--layout-breakpoint-md',
      },
      {
        alias: 'layout/breakpoint/lg',
        proposed: 'semantic/layout/breakpoint/lg',
        primitive: '—',
        value: '992px',
        appliesTo: 'Desktop (≥992px)',
        cssVar: '--layout-breakpoint-lg',
      },
      {
        alias: 'layout/breakpoint/xl',
        proposed: 'semantic/layout/breakpoint/xl',
        primitive: '—',
        value: '1200px',
        appliesTo: 'Wide desktop (≥1200px)',
        cssVar: '--layout-breakpoint-xl',
      },
      {
        alias: 'layout/breakpoint/xxl',
        proposed: 'semantic/layout/breakpoint/xxl',
        primitive: '—',
        value: '1600px',
        appliesTo: 'Ultra-wide (≥1600px)',
        cssVar: '--layout-breakpoint-xxl',
      },
    ],
  },
  {
    id: 'layout-grid',
    title: 'Grid System',
    description: 'Fixed 24-column grid. Column width is fluid; do not tokenize pixel widths per column.',
    rows: [
      {
        alias: 'layout/grid/columns',
        proposed: 'semantic/layout/grid/columns',
        primitive: '—',
        value: '24',
        appliesTo: 'Logical columns per row (Row / Col span denominator)',
        cssVar: '--layout-grid-columns',
      },
    ],
  },
  {
    id: 'layout-gutter',
    title: 'Grid Gutter',
    description: 'Horizontal gap between Col items. Aliases spacing primitives; responsive from xs → md+.',
    rows: [
      {
        alias: 'layout/grid/gutter/xs',
        proposed: 'semantic/layout/grid/gutter/xs',
        primitive: 'spacing/8',
        value: '8px',
        appliesTo: 'Gutter below sm breakpoint',
        cssVar: '--layout-grid-gutter',
      },
      {
        alias: 'layout/grid/gutter/sm',
        proposed: 'semantic/layout/grid/gutter/sm',
        primitive: 'spacing/16',
        value: '16px',
        appliesTo: 'Gutter from sm to below md',
        cssVar: '--layout-grid-gutter',
      },
      {
        alias: 'layout/grid/gutter/md',
        proposed: 'semantic/layout/grid/gutter/md',
        primitive: 'spacing/24',
        value: '24px',
        appliesTo: 'Default gutter from md and up',
        cssVar: '--layout-grid-gutter',
      },
    ],
  },
  {
    id: 'layout-page-margin',
    title: 'Page Margin',
    description: 'Inline padding from viewport edge to page content.',
    rows: [
      {
        alias: 'layout/page/margin/xs',
        proposed: 'semantic/layout/page/margin/xs',
        primitive: 'spacing/16',
        value: '16px',
        appliesTo: 'Page margin below md',
        cssVar: '--layout-page-margin',
      },
      {
        alias: 'layout/page/margin/md',
        proposed: 'semantic/layout/page/margin/md',
        primitive: 'spacing/24',
        value: '24px',
        appliesTo: 'Page margin from md and up',
        cssVar: '--layout-page-margin',
      },
    ],
  },
  {
    id: 'layout-container',
    title: 'Container Max Width',
    description: 'Optional content cap per breakpoint. Margin grows on wider screens when capped.',
    rows: [
      {
        alias: 'layout/container/max/sm',
        proposed: 'semantic/layout/container/max/sm',
        primitive: '—',
        value: '540px',
        appliesTo: 'Max content width at sm',
        cssVar: '--layout-container-max-width',
      },
      {
        alias: 'layout/container/max/md',
        proposed: 'semantic/layout/container/max/md',
        primitive: '—',
        value: '720px',
        appliesTo: 'Max content width at md',
        cssVar: '--layout-container-max-width',
      },
      {
        alias: 'layout/container/max/lg',
        proposed: 'semantic/layout/container/max/lg',
        primitive: '—',
        value: '960px',
        appliesTo: 'Max content width at lg',
        cssVar: '--layout-container-max-width',
      },
      {
        alias: 'layout/container/max/xl',
        proposed: 'semantic/layout/container/max/xl',
        primitive: '—',
        value: '1140px',
        appliesTo: 'Max content width at xl',
        cssVar: '--layout-container-max-width',
      },
      {
        alias: 'layout/container/max/xxl',
        proposed: 'semantic/layout/container/max/xxl',
        primitive: '—',
        value: '1320px',
        appliesTo: 'Max content width at xxl',
        cssVar: '--layout-container-max-width',
      },
    ],
  },
  {
    id: 'layout-form-col',
    title: 'Form Column Recipes',
    description: 'Span presets for nz-col / Col — ratio units, not pixel tokens.',
    rows: [
      {
        alias: 'ds/form/col/span/full',
        proposed: 'semantic/layout/form/col/full',
        primitive: '—',
        value: '24',
        appliesTo: 'Full-width field (1 per row)',
        cssVar: '—',
      },
      {
        alias: 'ds/form/col/span/half',
        proposed: 'semantic/layout/form/col/half',
        primitive: '—',
        value: '12',
        appliesTo: 'Two fields per row',
        cssVar: '—',
      },
      {
        alias: 'ds/form/col/span/third',
        proposed: 'semantic/layout/form/col/third',
        primitive: '—',
        value: '8',
        appliesTo: 'Three fields per row',
        cssVar: '—',
      },
      {
        alias: 'ds/form/col/span/quarter',
        proposed: 'semantic/layout/form/col/quarter',
        primitive: '—',
        value: '6',
        appliesTo: 'Four fields per row',
        cssVar: '—',
      },
    ],
  },
];
