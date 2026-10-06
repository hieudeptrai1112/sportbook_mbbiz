import type {
  InputSemanticBindingGroup,
  InputVariableGroup,
} from './input-field-demos.data';

export type PriceRangeDemoVariant = 'default' | 'error' | 'disabled';

export interface PriceRangeDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  variant: PriceRangeDemoVariant;
}

export const PRICE_RANGE_DEMO_SECTIONS: PriceRangeDemoSection[] = [
  {
    id: 'default',
    title: 'Default',
    description:
      'Large dual amount field. Hover and focus use border/active; typing fills Từ/Đến with dotted thousands.',
    tags: ['selector=mbbiz-price-range', 'size=large', 'state=default/hover/active/filled'],
    variant: 'default',
  },
  {
    id: 'error',
    title: 'Error',
    description: 'Lỗi khi không nhập thông tin / Vui lòng chọn thông tin.',
    tags: ['selector=mbbiz-price-range', 'status=error'],
    variant: 'error',
  },
  {
    id: 'disabled',
    title: 'Disabled',
    description: 'Disabled field uses background/disable3 and border/disable2; inputs cannot be edited.',
    tags: ['selector=mbbiz-price-range', 'disabled=true'],
    variant: 'disabled',
  },
];

export const PRICE_RANGE_SEMANTIC_BINDING_GROUPS: InputSemanticBindingGroup[] = [
  {
    title: 'Surface + Border',
    description:
      'Same state axis as Input/floating-label: white surface, then border swaps by interaction. Aliases below are bound on Figma 20186:14700 after the latest edit.',
    rows: [
      {
        componentToken: 'ds/price-range/color/background/default',
        semanticAlias: 'background/primary',
        appliesTo: 'State=Default, Hover, Active, Filled, Error',
        notes: 'Same surface alias as Input Field / floating-label.',
      },
      {
        componentToken: 'ds/price-range/color/background/disabled',
        semanticAlias: 'background/disable3',
        appliesTo: 'State=Disable',
        notes: 'Same disabled surface as Input/floating-label.',
      },
      {
        componentToken: 'ds/price-range/color/border/default',
        semanticAlias: 'border/info',
        appliesTo: 'State=Default, Filled/Normal',
        notes:
          'Bound on the Figma component. Shared Input Field family default border.',
      },
      {
        componentToken: 'ds/price-range/color/border/interactive',
        semanticAlias: 'border/active',
        appliesTo: 'State=Hover, Active/Start, Active/End, Filled/Active',
        notes:
          'Bound on the Figma component. Shared Input Field family hover/focus border.',
      },
      {
        componentToken: 'ds/price-range/color/border/error',
        semanticAlias: 'border/error1',
        appliesTo: 'State=Error/Default, Error/Filled',
        notes:
          'Figma Price Range uses error1 (#F00000). Same as the Input Field family error stroke.',
      },
      {
        componentToken: 'ds/price-range/color/border/disabled',
        semanticAlias: 'border/disable2',
        appliesTo: 'State=Disable',
        notes: 'Same disabled border as the Input Field family.',
      },
    ],
  },
  {
    title: 'Text + Cursor',
    description:
      'Label, placeholder, value, and caret follow the floating-label text roles. Caret is now text/active.',
    rows: [
      {
        componentToken: 'ds/price-range/color/text/title',
        semanticAlias: 'text/secondary',
        appliesTo: 'All states',
        notes: 'Label Khoảng tiền (VNĐ). Same role as floating-label title.',
      },
      {
        componentToken: 'ds/price-range/color/text/placeholder',
        semanticAlias: 'text/tertiary',
        appliesTo: 'State=Default, Hover, Active empty, Error/Default',
        notes: 'Từ số tiền / Đến số tiền. Same as Input Field placeholder.',
      },
      {
        componentToken: 'ds/price-range/color/text/content',
        semanticAlias: 'text/primary',
        appliesTo: 'State=Filled/Normal, Filled/Active, Error/Filled',
        notes: 'Filled amounts 1.000.000 / 10.000.000. Same as Input Field content.',
      },
      {
        componentToken: 'ds/price-range/color/text/cursor',
        semanticAlias: 'text/active',
        appliesTo: 'State=Active/Start, Active/End',
        notes:
          'Bound caret after the Figma edit. Shared Input Field family caret.',
      },
      {
        componentToken: 'ds/price-range/color/text/disabled',
        semanticAlias: 'text/disable1',
        appliesTo: 'State=Disable',
        notes: 'Disabled label, placeholder, and value. Same as Input Field.',
      },
      {
        componentToken: 'ds/price-range/color/text/error',
        semanticAlias: 'text/error',
        appliesTo: 'State=Error/Default, Error/Filled',
        notes: 'Error message row. Price Range–only; Input/basic has no message row.',
      },
    ],
  },
  {
    title: 'Icon',
    description:
      'A Linear/Right switches alias by content state. A Bold/Error is only on the error row.',
    rows: [
      {
        componentToken: 'ds/price-range/color/icon/separator-empty',
        semanticAlias: 'icon/neutral5',
        appliesTo: 'State=Default, Hover, Active, Error/Default',
        notes: 'Empty Từ/Đến arrow. Matches placeholder text/tertiary.',
      },
      {
        componentToken: 'ds/price-range/color/icon/separator-filled',
        semanticAlias: 'icon/neutral4',
        appliesTo: 'State=Filled/Normal, Filled/Active, Error/Filled',
        notes: 'Filled arrow. Darker than the empty-state glyph.',
      },
      {
        componentToken: 'ds/price-range/color/icon/separator-disabled',
        semanticAlias: 'icon/disable1',
        appliesTo: 'State=Disable',
        notes: 'Same disabled icon alias as Input/affix.',
      },
      {
        componentToken: 'ds/price-range/color/icon/error',
        semanticAlias: 'icon/error',
        appliesTo: 'State=Error/Default, Error/Filled',
        notes: 'A Bold/Error 20px beside the message.',
      },
    ],
  },
];

export const PRICE_RANGE_VARIABLE_GROUPS: InputVariableGroup[] = [
  {
    title: 'Price Range Core Layout',
    description: 'Non-color variables bound on Price Range (new) Size=Large.',
    rows: [
      {
        token: 'ds/price-range/width/default',
        value: '336',
        appliesTo: 'All states',
        notes: 'Fixed field width. Min-width 317.',
      },
      {
        token: 'ds/price-range/height/default',
        value: '60',
        appliesTo: 'Default, Hover, Active, Filled, Disable',
        notes: 'Large field height.',
      },
      {
        token: 'ds/price-range/height/error',
        value: '84',
        appliesTo: 'Error/Default, Error/Filled',
        notes: 'Field 60 plus error row.',
      },
      {
        token: 'padding/m',
        value: '12',
        appliesTo: 'Horizontal padding',
        notes: 'Figma padding/m. Vertical padding is a 10px literal.',
      },
      {
        token: 'radius/xs',
        value: '4',
        appliesTo: 'Container',
        notes: 'Same corner radius as Input Field.',
      },
      {
        token: 'stroke/s',
        value: '1',
        appliesTo: 'Container border',
        notes: 'Figma stroke/s.',
      },
      {
        token: 'spacing/s',
        value: '8',
        appliesTo: 'From / arrow / to',
        notes: 'Figma spacing/s between the two amounts and the separator.',
      },
      {
        token: 'spacing/xs',
        value: '4',
        appliesTo: 'Error row',
        notes: 'Gap between field and error message, and icon-to-copy.',
      },
      {
        token: 'iconsize/s',
        value: '20',
        appliesTo: 'A Linear/Right and A Bold/Error',
        notes: 'mbiz-icon size s. Same 20px slot as Input/affix icons.',
      },
    ],
  },
  {
    title: 'Price Range Typography Styles',
    description: 'Shared text style on label, amounts, placeholders, and error copy.',
    rows: [
      {
        token: 'Body Copy (Data & Nav)/Normal/14-Regular',
        value: 'Averta Std CY, 14 / 20, 400, letter-spacing 0.25',
        appliesTo: 'Title + Từ/Đến + error message',
        notes: 'Same typography style as Input/floating-label.',
      },
    ],
  },
];

export const PRICE_RANGE_VARIABLE_NOTES = [
  'Color rows are the aliases bound on Figma OyytFeMw886YfBmpYOxfxr node 20186:14700 after the latest edit.',
  'Table structure matches Input Field: Surface + Border, Text + Cursor, Icon, then Layout & Typography.',
  'Surface is background/primary. Disabled surface is background/disable3 — same pair as Input/floating-label.',
  'Default field chrome is border/info, hover/focus is border/active, error is border/error1 — the shared Input Field family aliases.',
  'Caret is text/active (#52DDDD).',
  'Field glyphs bind icon/* only: empty/filled separator = icon/neutral5 / icon/neutral4, disabled = icon/disable1, error glyph = icon/error. Never bind text/* on an icon.',
  'iconsize/xl, background/black, icon/brand-on-*, and text/on-error on the error glyph come from the icon, not field chrome.',
];
