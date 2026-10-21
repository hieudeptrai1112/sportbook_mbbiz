export interface AvatarDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  variant: 'basic' | 'type' | 'shape' | 'text' | 'group';
}

export interface AvatarApiRow {
  property: string;
  description: string;
  type: string;
  defaultValue: string;
}

export interface AvatarVariableGroup {
  title: string;
  rows: { token: string; value: string; appliesTo: string; notes: string }[];
}

export const AVATAR_DEMO_SECTIONS: AvatarDemoSection[] = [
  {
    id: 'basic',
    title: 'Basic',
    description:
      'Figma 18143:329006 is the 50px default mark. large, default, and small follow the ng-zorro size names, with default locked to that 50px symbol.',
    tags: ['selector=mbbiz-avatar', 'size=large|default|small'],
    variant: 'basic',
  },
  {
    id: 'type',
    title: 'Type',
    description:
      'Same three content types as nz-avatar: image, icon, and letters. A failed image falls back to the Figma mark.',
    tags: ['src', 'icon', 'text'],
    variant: 'type',
  },
  {
    id: 'shape',
    title: 'Shape',
    description: 'Circle is the Figma shape. Square uses the same fill, border, and shadow with a 4px radius.',
    tags: ['shape=circle|square'],
    variant: 'shape',
  },
  {
    id: 'text',
    title: 'Autoset Font Size',
    description: 'Letter avatars shrink to fit the inner width, using the same gap idea as nz-avatar.',
    tags: ['text', 'gap=4'],
    variant: 'text',
  },
  {
    id: 'group',
    title: 'Avatar Group',
    description: 'mbbiz-avatar-group stacks avatars with an 8px overlap, the same grouping case as nz-avatar-group.',
    tags: ['selector=mbbiz-avatar-group', 'overlap=8'],
    variant: 'group',
  },
];

export const AVATAR_API_ROWS: AvatarApiRow[] = [
  { property: 'src', description: 'Image URL. On load error the Figma mark is shown.', type: 'string | null', defaultValue: 'null' },
  { property: 'srcSet', description: 'Native image srcset.', type: 'string | null', defaultValue: 'null' },
  { property: 'alt', description: 'Image alternative text and accessible name when set.', type: 'string', defaultValue: "''" },
  { property: 'text', description: 'Letter avatar. Used when there is no image or icon.', type: 'string | null', defaultValue: 'null' },
  { property: 'icon', description: 'mbiz-icon name. Used when there is no image.', type: 'string | null', defaultValue: 'null' },
  { property: 'shape', description: 'Circle matches Figma. Square uses a 4px radius.', type: "'circle' | 'square'", defaultValue: "'circle'" },
  { property: 'size', description: 'Named size or a pixel number. default is the 50px Figma symbol.', type: "'large' | 'default' | 'small' | number", defaultValue: "'default'" },
  { property: 'gap', description: 'Horizontal inset used when scaling long letter text.', type: 'number', defaultValue: '4' },
  { property: 'error', description: 'Emits when the image fails to load, after the fallback mark is shown.', type: 'output<Event>', defaultValue: '-' },
];

export const AVATAR_GROUP_API_ROWS: AvatarApiRow[] = [
  { property: 'overlap', description: 'How far each following avatar overlaps the previous one.', type: 'number', defaultValue: '8' },
];

export const AVATAR_VARIABLE_GROUPS: AvatarVariableGroup[] = [
  {
    title: 'Avatar Color',
    rows: [
      { token: 'avatar/fill', value: '#CAD8FF', appliesTo: 'Default, icon, and text fill', notes: 'Figma homeLanding_img_avatarDefault. No semantic alias at this hex.' },
      { token: 'avatar/border', value: '#89A1F6', appliesTo: '1px border', notes: 'Figma stroke.' },
      { token: 'shadow/s2', value: '0 2px 6px rgb(30 93 252 / 15%)', appliesTo: 'Avatar shadow', notes: 'Figma shadow/s2.' },
      { token: 'icon/brand-primary1', value: '#141ED2', appliesTo: 'Icon and letter color', notes: '--color-semantic-icon-brand-primary1.' },
    ],
  },
  {
    title: 'Avatar Layout',
    rows: [
      { token: 'avatar/default', value: '50px', appliesTo: 'Figma symbol', notes: 'Node 18143:329006.' },
      { token: 'avatar/large', value: '64px', appliesTo: 'size=large', notes: 'Named like nz-avatar large. Not a separate Figma frame.' },
      { token: 'avatar/small', value: '32px', appliesTo: 'size=small', notes: 'Named like nz-avatar small.' },
      { token: 'avatar/mark', value: '35×43.66', appliesTo: 'Default illustration', notes: 'Placed at the Figma inset and clipped by the circle.' },
      { token: 'avatar/group-overlap', value: '8px', appliesTo: 'mbbiz-avatar-group', notes: 'Same grouping idea as nz-avatar-group.' },
    ],
  },
];

export const AVATAR_VARIABLE_NOTES = [
  'Avatar maps Figma node 18143:329006. The default content is that illustration, not a generic user icon.',
  'Case split follows nz-avatar: image, icon, text, shape, named size, autoset letters, and group. Badge and responsive size maps are not in this Figma node.',
  'large and small are size names from ng-zorro. Only the 50px default is drawn in Figma; the other sizes scale that same canvas.',
];
