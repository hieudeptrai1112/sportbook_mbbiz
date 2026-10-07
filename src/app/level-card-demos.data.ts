import type { MbbizLevelCardSize, MbbizLevelCardState } from 'mbbiz';

export interface LevelCardDemoCase {
  state: MbbizLevelCardState;
  label: string;
}

export interface LevelCardDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  size: MbbizLevelCardSize;
}

export const LEVEL_CARD_DEMO_STATES: LevelCardDemoCase[] = [
  { state: 'default', label: 'Default' },
  { state: 'hover', label: 'Hover' },
  { state: 'focus', label: 'Focus' },
  { state: 'disabled', label: 'Disabled' },
  { state: 'loading', label: 'Loading' },
  { state: 'add', label: 'Add' },
  { state: 'delete', label: 'Delete' },
  { state: 'blank', label: 'Blank' },
];

export const LEVEL_CARD_DEMO_SECTIONS: LevelCardDemoSection[] = [
  {
    id: 'large',
    title: 'Large',
    description: '216×100 card. Disabled shows Sắp ra mắt. Add/Delete expose a corner action chip.',
    tags: ['selector=mbbiz-level-card', 'size=lg'],
    size: 'lg',
  },
  {
    id: 'medium',
    title: 'Medium',
    description: '120×100 card. Same states as Large, without the coming-soon tag.',
    tags: ['selector=mbbiz-level-card', 'size=md'],
    size: 'md',
  },
];

export const LEVEL_CARD_VARIABLE_GROUPS = [
  {
    title: 'Level Card Color Tokens',
    rows: [
      { token: 'background/gradient8-1', value: 'white/100%', appliesTo: 'Default, hover, add, delete, blank, loading fill', notes: 'Maps to --color-semantic-background-gradient8-1.' },
      { token: 'background/disable3', value: 'grayscale/200', appliesTo: 'Focus fill', notes: 'Maps to --color-semantic-background-disable3 / #F3F3F3.' },
      { token: 'border/brand-primary4', value: 'blue/200', appliesTo: 'Card stroke', notes: 'Maps to --color-semantic-border-brand-primary4 / #DAE4FF.' },
      { token: 'icon/brand-primary1', value: 'blue/700', appliesTo: 'Default plus icon and add chip', notes: 'Maps to --color-semantic-icon-brand-primary1 / #141ED2.' },
      { token: 'icon/brand-primary3', value: 'blue/300', appliesTo: 'Large blank plus icon', notes: 'Maps to --color-semantic-icon-brand-primary3 / #A3B7FD.' },
      { token: 'background/brand-quaternary5', value: 'darkblue/400', appliesTo: 'Medium blank icon and delete chip', notes: 'Maps to --color-semantic-background-brand-quaternary5 / #9BAFC8.' },
      { token: 'hyperlink/loading', value: 'grayscale/400', appliesTo: 'Disabled plus icon', notes: 'Maps to --color-semantic-hyperlink-loading / #CCCCCC.' },
      { token: 'hyperlink/disabled', value: 'grayscale/500', appliesTo: 'Disabled label', notes: 'Maps to --color-semantic-hyperlink-disabled / #9B9B9B.' },
      { token: 'text/primary', value: 'darkblue/1000', appliesTo: 'Label and loading ring', notes: 'Maps to --mbbiz-color-text-field / #192D39.' },
      { token: 'background/brand-quaternary3', value: 'darkblue/100', appliesTo: 'Sắp ra mắt tag fill', notes: 'Large disabled only.' },
    ],
  },
  {
    title: 'Level Card Layout Specs',
    rows: [
      { token: 'level-card/large', value: '216×100', appliesTo: 'size=lg', notes: 'Figma Size=Large.' },
      { token: 'level-card/medium', value: '120×100', appliesTo: 'size=md', notes: 'Figma Size=Medium.' },
      { token: 'level-card/padding', value: '12px', appliesTo: 'Inner padding', notes: 'padding/m.' },
      { token: 'level-card/gap', value: '24px', appliesTo: 'Icon-to-label stack', notes: 'spacing/2xl.' },
      { token: 'level-card/radius', value: '4px', appliesTo: 'Card corner', notes: 'radius/xs.' },
      { token: 'level-card/icon', value: '32px', appliesTo: 'A Linear/Add', notes: 'iconsize/l.' },
      { token: 'level-card/action', value: '24px', appliesTo: 'Add/Delete chip', notes: 'Overlaps top-right by 13/11.' },
    ],
  },
];

export const LEVEL_CARD_VARIABLE_NOTES = [
  'Level Card maps Figma node 25300:221923 (Card) sizes Large/Medium and states Default, Hover, Focus, Disabled, Loading, Add, Delete, Blank.',
  'Icons reuse @mbbiz/icon alinear_add and alinear_cancel. Loading reuses mbbiz-loading size=m with the on-surface ring color.',
];
