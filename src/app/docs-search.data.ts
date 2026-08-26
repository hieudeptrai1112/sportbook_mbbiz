export type DocsPageId =
  | 'buttons'
  | 'buttonMapping'
  | 'buttonLink'
  | 'inputField'
  | 'form'
  | 'inputTag'
  | 'breadcrumb'
  | 'navigationBar'
  | 'steps'
  | 'tab'
  | 'dropdown'
  | 'radio'
  | 'checkbox'
  | 'switch'
  | 'badge'
  | 'status'
  | 'message'
  | 'modal'
  | 'table'
  | 'pagination'
  | 'datepicker'
  | 'uploadFile'
  | 'iconography'
  | 'illustration'
  | 'pageHeaderPattern'
  | 'footerPattern'
  | 'stepProcessPattern'
  | 'formPattern'
  | 'introduction'
  | 'installation'
  | 'color'
  | 'tokens'
  | 'spacing'
  | 'layout'
  | 'typography';

export type DocsNavGroup = 'Getting Started' | 'Design Tokens' | 'Components' | 'Pattern';

export interface DocsSearchEntry {
  id: string;
  label: string;
  group: DocsNavGroup;
  page: DocsPageId;
  keywords: readonly string[];
}

export const DOCS_SEARCH_ENTRIES: readonly DocsSearchEntry[] = [
  {
    id: 'introduction',
    label: 'Introduction',
    group: 'Getting Started',
    page: 'introduction',
    keywords: ['intro', 'overview', 'getting started', 'mbbiz'],
  },
  {
    id: 'installation',
    label: 'Installation',
    group: 'Getting Started',
    page: 'installation',
    keywords: ['install', 'npm', 'setup', 'getting started'],
  },
  {
    id: 'color',
    label: 'Palette',
    group: 'Design Tokens',
    page: 'color',
    keywords: ['color', 'palette', 'swatch', 'primitive'],
  },
  {
    id: 'tokens',
    label: 'Colors',
    group: 'Design Tokens',
    page: 'tokens',
    keywords: ['semantic', 'alias', 'token', 'color'],
  },
  {
    id: 'spacing',
    label: 'Spacing',
    group: 'Design Tokens',
    page: 'spacing',
    keywords: ['space', 'gap', 'padding', 'margin'],
  },
  {
    id: 'layout',
    label: 'Layout',
    group: 'Design Tokens',
    page: 'layout',
    keywords: ['grid', 'container', 'breakpoint'],
  },
  {
    id: 'typography',
    label: 'Typography',
    group: 'Design Tokens',
    page: 'typography',
    keywords: ['font', 'text style', 'type', 'averta'],
  },
  {
    id: 'buttons',
    label: 'Buttons',
    group: 'Components',
    page: 'buttons',
    keywords: ['button', 'cta', 'primary', 'secondary'],
  },
  {
    id: 'buttonLink',
    label: 'Button Link',
    group: 'Components',
    page: 'buttonLink',
    keywords: ['link', 'text button', 'hyperlink'],
  },
  {
    id: 'inputField',
    label: 'Input Field',
    group: 'Components',
    page: 'inputField',
    keywords: ['input', 'text field', 'affix', 'password', 'search', 'textarea'],
  },
  {
    id: 'iconography',
    label: 'Iconography',
    group: 'Components',
    page: 'iconography',
    keywords: ['icon', 'svg', 'glyph'],
  },
  {
    id: 'illustration',
    label: 'Illustration',
    group: 'Components',
    page: 'illustration',
    keywords: ['illustration', 'empty state', 'artwork'],
  },
  {
    id: 'breadcrumb',
    label: 'Breadcrumb',
    group: 'Components',
    page: 'breadcrumb',
    keywords: ['breadcrumb', 'path', 'navigation'],
  },
  {
    id: 'navigationBar',
    label: 'Navigation Bar',
    group: 'Components',
    page: 'navigationBar',
    keywords: ['navigation', 'sidebar', 'menu', 'maker', 'checker', '1user', 'nav', 'level 2', 'submenu'],
  },
  {
    id: 'steps',
    label: 'Step',
    group: 'Components',
    page: 'steps',
    keywords: ['steps', 'wizard', 'progress'],
  },
  {
    id: 'tab',
    label: 'Tab',
    group: 'Components',
    page: 'tab',
    keywords: ['tabs', 'segment'],
  },
  {
    id: 'dropdown',
    label: 'Dropdown',
    group: 'Components',
    page: 'dropdown',
    keywords: ['select', 'droplist', 'combobox', 'menu'],
  },
  {
    id: 'form',
    label: 'Form',
    group: 'Components',
    page: 'form',
    keywords: ['form', 'field', 'validation', 'data entry'],
  },
  {
    id: 'inputTag',
    label: 'Input Tag',
    group: 'Components',
    page: 'inputTag',
    keywords: ['tag', 'chip', 'multi value'],
  },
  {
    id: 'datepicker',
    label: 'Date Picker',
    group: 'Components',
    page: 'datepicker',
    keywords: ['date', 'calendar', 'range', 'time', 'month', 'year'],
  },
  {
    id: 'uploadFile',
    label: 'Upload File',
    group: 'Components',
    page: 'uploadFile',
    keywords: ['upload', 'file', 'attachment', 'dropzone'],
  },
  {
    id: 'radio',
    label: 'Radio',
    group: 'Components',
    page: 'radio',
    keywords: ['radio', 'option', 'choice'],
  },
  {
    id: 'checkbox',
    label: 'Checkbox',
    group: 'Components',
    page: 'checkbox',
    keywords: ['checkbox', 'tick', 'multi select'],
  },
  {
    id: 'switch',
    label: 'Switch',
    group: 'Components',
    page: 'switch',
    keywords: ['switch', 'toggle'],
  },
  {
    id: 'badge',
    label: 'Badge',
    group: 'Components',
    page: 'badge',
    keywords: ['badge', 'label', 'pill', 'tag'],
  },
  {
    id: 'status',
    label: 'Status',
    group: 'Components',
    page: 'status',
    keywords: ['status', 'state', 'indicator'],
  },
  {
    id: 'message',
    label: 'Message',
    group: 'Components',
    page: 'message',
    keywords: ['message', 'alert', 'toast', 'banner'],
  },
  {
    id: 'modal',
    label: 'Modal',
    group: 'Components',
    page: 'modal',
    keywords: ['modal', 'dialog', 'popup'],
  },
  {
    id: 'table',
    label: 'Table',
    group: 'Components',
    page: 'table',
    keywords: ['table', 'grid', 'data display'],
  },
  {
    id: 'pagination',
    label: 'Pagination',
    group: 'Components',
    page: 'pagination',
    keywords: ['pagination', 'pager', 'pages'],
  },
  {
    id: 'formPattern',
    label: 'Form Pattern',
    group: 'Pattern',
    page: 'formPattern',
    keywords: ['form pattern', 'layout', 'pattern'],
  },
  {
    id: 'footerPattern',
    label: 'Footer',
    group: 'Pattern',
    page: 'footerPattern',
    keywords: ['footer', 'pattern'],
  },
  {
    id: 'pageHeaderPattern',
    label: 'Page header',
    group: 'Pattern',
    page: 'pageHeaderPattern',
    keywords: ['page header', 'header', 'pattern'],
  },
  {
    id: 'stepProcessPattern',
    label: 'Step process',
    group: 'Pattern',
    page: 'stepProcessPattern',
    keywords: ['step process', 'wizard', 'pattern'],
  },
];
