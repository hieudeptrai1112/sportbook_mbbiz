export type BadgeDemoVariant = 'default' | 'notification' | 'role';

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
    description: 'Figma A Badge/ Normal defaults to Type=Notification, Status=Reminder.',
    tags: ['selector=mbbiz-badge', 'type=notification', 'status=reminder'],
    variant: 'default',
  },
  {
    id: 'notification',
    title: 'Notification',
    description:
      '24px notification badges: Reminder, Balance, Done, Error, Warning, Remind, Bee, Information.',
    tags: [
      'selector=mbbiz-badge',
      'type=notification',
      'status=reminder/balance/done/error/warning/remind/bee/information',
    ],
    variant: 'notification',
  },
  {
    id: 'role',
    title: 'Role',
    description: 'Role pills for Maker (Người tạo) and Checker (Người duyệt).',
    tags: ['selector=mbbiz-badge', 'type=role', 'status=maker/checker'],
    variant: 'role',
  },
];

export const BADGE_VARIABLE_GROUPS = [
  {
    title: 'Badge Color Tokens',
    rows: [
      {
        token: 'background/brand-primary1',
        value: 'blue/500',
        appliesTo: 'Reminder and Balance circle',
        notes: 'Maps to --mbbiz-color-badge-notification-primary.',
      },
      {
        token: 'background/success-primary',
        value: 'green/500',
        appliesTo: 'Done circle',
        notes: 'Maps to --mbbiz-color-badge-notification-success.',
      },
      {
        token: 'background/error-primary',
        value: 'red/500',
        appliesTo: 'Error circle',
        notes: 'Maps to --mbbiz-color-badge-notification-error.',
      },
      {
        token: 'background/brand-secondary1',
        value: 'purple/500',
        appliesTo: 'Remind circle',
        notes: 'Maps to --mbbiz-color-badge-notification-secondary.',
      },
      {
        token: 'background/brand-primary4',
        value: 'blue/200',
        appliesTo: 'Bee circle and Role pill background',
        notes: 'Maps to --mbbiz-color-badge-role-bg.',
      },
      {
        token: 'text/brand-primary1',
        value: 'blue/500',
        appliesTo: 'Role label and Information icon',
        notes: 'Maps to --mbbiz-color-badge-role-text.',
      },
      {
        token: 'icon/white',
        value: 'white/100%',
        appliesTo: 'Glyph on solid notification circles',
        notes: 'Maps to --mbbiz-color-badge-icon-on-solid.',
      },
    ],
  },
  {
    title: 'Badge Sizing Specs',
    rows: [
      {
        token: 'badge/notification-size',
        value: '24px',
        appliesTo: 'Notification badge box',
        notes: 'Fixed visual spec from A Badge/ Normal.',
      },
      {
        token: 'badge/role-height',
        value: '32px',
        appliesTo: 'Role pill min-height',
        notes: 'Padding 8px 16px on 12/16 type.',
      },
      {
        token: 'badge/role-radius',
        value: '20px',
        appliesTo: 'Role pill and Bee/Balance circles',
        notes: 'Fixed visual spec.',
      },
    ],
  },
];

export const BADGE_VARIABLE_NOTES = [
  'Information uses mbiz-icon (A Bold/Info). Error, Warning, Remind, and Bee use Figma-exported assets from A Badge/ Normal.',
  'Reminder, Balance, and Check also use Figma-exported assets from A Badge/ Normal.',
];
