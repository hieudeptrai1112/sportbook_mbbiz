export interface NumericScaleRow {
  alias: string;
  proposed: string;
  primitive: string;
  value: string;
}

export interface TypographyScaleGroup {
  title: string;
  rows: NumericScaleRow[];
}

export const SPACING_SCALE_ROWS: NumericScaleRow[] = [
  { alias: 'spacing/n', proposed: 'semantic/spacing/none', primitive: 'spacing/0', value: '0px' },
  { alias: 'spacing/xxs', proposed: 'semantic/spacing/xxs', primitive: 'spacing/2', value: '2px' },
  { alias: 'spacing/xs', proposed: 'semantic/spacing/xs', primitive: 'spacing/4', value: '4px' },
  { alias: 'spacing/s', proposed: 'semantic/spacing/s', primitive: 'spacing/8', value: '8px' },
  { alias: 'spacing/m', proposed: 'semantic/spacing/m', primitive: 'spacing/12', value: '12px' },
  { alias: 'spacing/l', proposed: 'semantic/spacing/l', primitive: 'spacing/16', value: '16px' },
  { alias: 'spacing/xl', proposed: 'semantic/spacing/xl', primitive: 'spacing/20', value: '20px' },
  { alias: 'spacing/2xl', proposed: 'semantic/spacing/2xl', primitive: 'spacing/24', value: '24px' },
  { alias: 'spacing/3xl', proposed: 'semantic/spacing/3xl', primitive: 'spacing/28', value: '28px' },
  { alias: 'spacing/4xl', proposed: 'semantic/spacing/4xl', primitive: 'spacing/32', value: '32px' },
  { alias: 'spacing/5xl', proposed: 'semantic/spacing/5xl', primitive: 'spacing/40', value: '40px' },
];

export const RADIUS_SCALE_ROWS: NumericScaleRow[] = [
  { alias: 'radius/xxs', proposed: 'semantic/radius/xxs', primitive: 'spacing/2', value: '2px' },
  { alias: 'radius/xs', proposed: 'semantic/radius/xs', primitive: 'spacing/4', value: '4px' },
  { alias: 'radius/s', proposed: 'semantic/radius/s', primitive: 'spacing/8', value: '8px' },
  { alias: 'radius/m', proposed: 'semantic/radius/m', primitive: 'spacing/12', value: '12px' },
  { alias: 'radius/l', proposed: 'semantic/radius/l', primitive: 'spacing/16', value: '16px' },
  { alias: 'radius/xl', proposed: 'semantic/radius/xl', primitive: 'spacing/20', value: '20px' },
  { alias: 'radius/2xl', proposed: 'semantic/radius/2xl', primitive: 'spacing/28', value: '28px' },
  { alias: 'radius/3xl', proposed: 'semantic/radius/3xl', primitive: 'spacing/32', value: '32px' },
  { alias: 'radius/4xl', proposed: 'semantic/radius/4xl', primitive: 'spacing/40', value: '40px' },
  { alias: 'radius/round', proposed: 'semantic/radius/full', primitive: 'spacing/999', value: '999px' },
];

export const ICON_SIZE_SCALE_ROWS: NumericScaleRow[] = [
  { alias: 'iconsize/xs', proposed: 'semantic/icon-size/xs', primitive: 'spacing/16', value: '16px' },
  { alias: 'iconsize/s', proposed: 'semantic/icon-size/s', primitive: 'spacing/20', value: '20px' },
  { alias: 'iconsize/m', proposed: 'semantic/icon-size/m', primitive: 'spacing/24', value: '24px' },
  { alias: 'iconsize/l', proposed: 'semantic/icon-size/l', primitive: 'spacing/28', value: '28px' },
  { alias: 'iconsize/xl', proposed: 'semantic/icon-size/xl', primitive: 'spacing/32', value: '32px' },
  { alias: 'iconsize/2xl', proposed: 'semantic/icon-size/2xl', primitive: 'spacing/40', value: '40px' },
];

export const TYPOGRAPHY_SCALE_GROUPS: TypographyScaleGroup[] = [
  {
    title: 'Font Size',
    rows: [
      { alias: 'font/size/xs', proposed: 'semantic/typography/font-size/xs', primitive: 'spacing/10', value: '10px' },
      { alias: 'font/size/s', proposed: 'semantic/typography/font-size/s', primitive: 'spacing/12', value: '12px' },
      { alias: 'font/size/m', proposed: 'semantic/typography/font-size/m', primitive: 'spacing/14', value: '14px' },
      { alias: 'font/size/l', proposed: 'semantic/typography/font-size/l', primitive: 'spacing/16', value: '16px' },
      { alias: 'font/size/xl', proposed: 'semantic/typography/font-size/xl', primitive: 'spacing/20', value: '20px' },
      { alias: 'font/size/2xl', proposed: 'semantic/typography/font-size/2xl', primitive: 'spacing/24', value: '24px' },
    ],
  },
  {
    title: 'Line Height',
    rows: [
      { alias: 'font/lineheight/xs', proposed: 'semantic/typography/line-height/xs', primitive: 'spacing/12', value: '12px' },
      { alias: 'font/lineheight/s', proposed: 'semantic/typography/line-height/s', primitive: 'spacing/16', value: '16px' },
      { alias: 'font/lineheight/m', proposed: 'semantic/typography/line-height/m', primitive: 'spacing/20', value: '20px' },
      { alias: 'font/lineheight/l', proposed: 'semantic/typography/line-height/l', primitive: 'spacing/24', value: '24px' },
      { alias: 'font/lineheight/xl', proposed: 'semantic/typography/line-height/xl', primitive: 'spacing/28', value: '28px' },
      { alias: 'font/lineheight/2xl', proposed: 'semantic/typography/line-height/2xl', primitive: 'spacing/32', value: '32px' },
    ],
  },
  {
    title: 'Font Weight',
    rows: [
      {
        alias: 'font/weight/s',
        proposed: 'semantic/typography/font-weight/regular',
        primitive: 'typography/font-weight-regular',
        value: 'regular',
      },
      {
        alias: 'font/weight/m',
        proposed: 'semantic/typography/font-weight/semibold',
        primitive: 'typography/font-weight-semibold',
        value: 'semibold',
      },
    ],
  },
];
