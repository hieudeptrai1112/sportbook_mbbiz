import type {
  MbbizTooltipPosition,
  MbbizTooltipSide,
} from '../../projects/mbbiz/src/lib/components/tooltip/tooltip.types';

export type TooltipDemoVariant = 'default' | 'positions' | 'hover';

export interface TooltipDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  variant: TooltipDemoVariant;
}

export interface TooltipPositionCase {
  position: MbbizTooltipPosition;
  side: MbbizTooltipSide;
  label: string;
}

export const TOOLTIP_DEMO_SECTIONS: TooltipDemoSection[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'Baseline tooltip: Position=Top, Side=Left.',
    tags: ['selector=mbbiz-tooltip', 'position=top', 'side=left'],
    variant: 'default',
  },
  {
    id: 'positions',
    title: 'Position',
    description: 'Twelve Figma placements: Top/Bottom × Left/Right/Center and Left/Right × Top/Center/Bottom.',
    tags: ['selector=mbbiz-tooltip', 'position=top/bottom/left/right', 'side=left/right/center/top/bottom'],
    variant: 'positions',
  },
  {
    id: 'hover',
    title: 'Hover',
    description: 'Hover each trigger to open the same twelve Position + Side placements.',
    tags: ['selector=mbbiz-tooltip', 'trigger=true', 'position=top/bottom/left/right'],
    variant: 'hover',
  },
];

export const TOOLTIP_POSITION_CASES: TooltipPositionCase[] = [
  { position: 'top', side: 'left', label: 'Top / Left' },
  { position: 'bottom', side: 'left', label: 'Bottom / Left' },
  { position: 'right', side: 'top', label: 'Right / Top' },
  { position: 'left', side: 'top', label: 'Left / Top' },
  { position: 'top', side: 'right', label: 'Top / Right' },
  { position: 'bottom', side: 'right', label: 'Bottom / Right' },
  { position: 'right', side: 'center', label: 'Right / Center' },
  { position: 'left', side: 'center', label: 'Left / Center' },
  { position: 'top', side: 'center', label: 'Top / Center' },
  { position: 'bottom', side: 'center', label: 'Bottom / Center' },
  { position: 'right', side: 'bottom', label: 'Right / Bottom' },
  { position: 'left', side: 'bottom', label: 'Left / Bottom' },
];

export const TOOLTIP_VARIABLE_GROUPS = [
  {
    title: 'Tooltip Color Tokens',
    rows: [
      {
        token: 'background/black',
        value: 'neutral/1000',
        appliesTo: 'Tooltip body and arrow fill',
        notes: 'Maps to --mbbiz-color-tooltip-bg from Alias/Neutral/1000.',
      },
      {
        token: 'text/white',
        value: 'white/100%',
        appliesTo: 'Tooltip label',
        notes: 'Maps to --mbbiz-color-tooltip-text from Alias/Neutral/100.',
      },
    ],
  },
  {
    title: 'Tooltip Sizing Specs',
    rows: [
      {
        token: 'tooltip/padding',
        value: '12px 16px',
        appliesTo: 'Body padding',
        notes: 'Figma Body: py 12 / px 16.',
      },
      {
        token: 'tooltip/radius',
        value: '4px',
        appliesTo: 'Body corner radius',
        notes: 'Maps to --mbbiz-radius-md.',
      },
      {
        token: 'tooltip/max-width',
        value: '224px',
        appliesTo: 'Single-line label cap',
        notes: 'Figma: < 224 Width, không tự xuống dòng.',
      },
      {
        token: 'tooltip/arrow',
        value: '12×8',
        appliesTo: 'Pointer size',
        notes: 'Rotated to 8×12 on Left/Right.',
      },
      {
        token: 'tooltip/arrow-inset',
        value: '12px',
        appliesTo: 'Pointer offset from the aligned edge',
        notes: 'Figma Arrow pl/pr 12 on Top/Bottom sides.',
      },
      {
        token: 'tooltip/type',
        value: 'H2/Sub-Header/16-SemiBold',
        appliesTo: 'Label typography',
        notes: '16 / 24 / 0.25px.',
      },
    ],
  },
];

export const TOOLTIP_VARIABLE_NOTES = [
  'Color rows map to CSS custom properties implemented by mbbiz-tooltip.',
  'Placement is Position + Side, matching the Figma component set — not a single placement enum.',
];
