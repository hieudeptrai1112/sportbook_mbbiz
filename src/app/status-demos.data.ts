export type StatusDemoVariant = 'default' | 'colors';

export interface StatusDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  variant: StatusDemoVariant;
}

export const STATUS_DEMO_SECTIONS: StatusDemoSection[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'Baseline neutral status with compact dot and text.',
    tags: ['selector=mbbiz-status', 'status=invalid'],
    variant: 'default',
  },
  {
    id: 'colors',
    title: 'Colors',
    description: 'Color set from the approved Figma status node.',
    tags: ['selector=mbbiz-status', 'color=neutral/orange/blue/dark-blue/green/red'],
    variant: 'colors',
  },
];
