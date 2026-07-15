export type BadgeDemoVariant = 'default' | 'status' | 'description';

export interface BadgeDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  variant: BadgeDemoVariant;
}

export const BADGE_DEMO_SECTIONS: BadgeDemoSection[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'Baseline neutral pill badge.',
    tags: ['selector=mbbiz-badge', 'status=invalid'],
    variant: 'default',
  },
  {
    id: 'status',
    title: 'Status',
    description: 'Status presets map to the approved color set from Figma.',
    tags: [
      'selector=mbbiz-badge',
      'status=invalid/overdue/unfinished/renew-loan/pending/completed/failed',
    ],
    variant: 'status',
  },
  {
    id: 'description',
    title: 'Description',
    description: 'Optional supporting text appears below the pill.',
    tags: ['selector=mbbiz-badge', 'showDescription=true'],
    variant: 'description',
  },
];
