export type TabDemoVariant = 'default' | 'type' | 'size' | 'disabled-count';

export interface TabDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  variant: TabDemoVariant;
}

export const TAB_DEMO_SECTIONS: TabDemoSection[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'Baseline large pill tab with three items.',
    tags: ['selector=mbbiz-tab', 'variant=pill', 'size=large'],
    variant: 'default',
  },
  {
    id: 'type',
    title: 'Type',
    description: 'Pill and underlined variants use the same item API.',
    tags: ['selector=mbbiz-tab', 'variant=pill/underlined'],
    variant: 'type',
  },
  {
    id: 'size',
    title: 'Size',
    description: 'Small size switches typography and vertical padding for both variants.',
    tags: ['selector=mbbiz-tab', 'size=small'],
    variant: 'size',
  },
  {
    id: 'disabled-count',
    title: 'Disabled and Count',
    description: 'Disabled pill and underlined count states are controlled from item data.',
    tags: ['selector=mbbiz-tab', 'disabled=true', 'count=12'],
    variant: 'disabled-count',
  },
];
