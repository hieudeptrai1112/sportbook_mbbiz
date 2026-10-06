import type { MbbizRatingValue } from '../../projects/mbbiz/src/lib/components/rating/rating.types';

export type RatingDemoVariant = 'default' | 'stars' | 'hover';

export interface RatingDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  variant: RatingDemoVariant;
}

export interface RatingStarCase {
  value: MbbizRatingValue;
  label: string;
}

export const RATING_DEMO_SECTIONS: RatingDemoSection[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'Baseline rating: Star=1.',
    tags: ['selector=mbbiz-rating', 'value=1'],
    variant: 'default',
  },
  {
    id: 'stars',
    title: 'Star',
    description: 'Five Figma variants: Star=1 through Star=5.',
    tags: ['selector=mbbiz-rating', 'value=1/2/3/4/5'],
    variant: 'stars',
  },
  {
    id: 'hover',
    title: 'Hover',
    description: 'Hover a star to preview Alert/200; click to commit Alert/300.',
    tags: ['selector=mbbiz-rating', 'state=default/hover/selected'],
    variant: 'hover',
  },
];

export const RATING_STAR_CASES: RatingStarCase[] = [
  { value: 1, label: 'Star=1' },
  { value: 2, label: 'Star=2' },
  { value: 3, label: 'Star=3' },
  { value: 4, label: 'Star=4' },
  { value: 5, label: 'Star=5' },
];

export const RATING_VARIABLE_GROUPS = [
  {
    title: 'Rating Color Tokens',
    rows: [
      {
        token: 'icon/disable3',
        value: 'grayscale/400',
        appliesTo: 'Default empty star (A Linear/Star)',
        notes: 'Maps to --mbbiz-color-rating-empty from Alias/Neutral/400.',
      },
      {
        token: 'chart/19',
        value: 'orange/200',
        appliesTo: 'Hover star (A Bold/Star)',
        notes: 'Maps to --mbbiz-color-rating-hover from Alias/Alert/200.',
      },
      {
        token: 'background/warning-secondary',
        value: 'orange/300',
        appliesTo: 'Selected star (A Bold/Star)',
        notes: 'Maps to --mbbiz-color-rating-selected from Alias/Alert/300.',
      },
    ],
  },
  {
    title: 'Rating Sizing Specs',
    rows: [
      {
        token: 'rating/star-size',
        value: '24px',
        appliesTo: 'Each star hit area',
        notes: 'Figma A Linear/Star and A Bold/Star are 24×24.',
      },
      {
        token: 'rating/gap',
        value: '12px',
        appliesTo: 'Gap between stars',
        notes: 'Maps to --mbbiz-rating-gap. Figma Rating auto-layout gap 12.',
      },
      {
        token: 'rating/size',
        value: '168 × 24',
        appliesTo: 'Full rating row',
        notes: '5×24 plus 4×12 gap.',
      },
    ],
  },
];

export const RATING_VARIABLE_NOTES = [
  'Color rows map to CSS custom properties implemented by mbbiz-rating.',
  'Star states follow Figma 5028:53716 (Default / Hover / Selected). Rating variants follow 5418:32206 (Star=1–5).',
];
