import type { MbbizModalType } from 'mbbiz';

export type ModalDemoVariant = MbbizModalType;

export interface ModalDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  variant: ModalDemoVariant;
  showPagination?: boolean;
}

export const MODAL_DEMO_SECTIONS: ModalDemoSection[] = [
  {
    id: 'warning',
    title: 'Warning',
    description: 'Status dialog with illustration, text link, and three stacked pill actions.',
    tags: ['selector=mbbiz-modal', 'type=warning'],
    variant: 'warning',
  },
  {
    id: 'success',
    title: 'Success',
    description: 'Completed-task dialog with a solid primary and two outline actions.',
    tags: ['selector=mbbiz-modal', 'type=success'],
    variant: 'success',
  },
  {
    id: 'error',
    title: 'Error',
    description: 'Failure dialog with error code, text link, support CTA, and two outline actions.',
    tags: ['selector=mbbiz-modal', 'type=error'],
    variant: 'error',
  },
  {
    id: 'confirm',
    title: 'Confirm',
    description: 'Decision dialog with Xác nhận, secondary, and Đóng actions.',
    tags: ['selector=mbbiz-modal', 'type=confirm'],
    variant: 'confirm',
  },
  {
    id: 'destructive',
    title: 'Destructive',
    description: 'Delete confirmation with Xóa, secondary, and Đóng actions.',
    tags: ['selector=mbbiz-modal', 'type=destructive'],
    variant: 'destructive',
  },
  {
    id: 'notification',
    title: 'Notification',
    description: 'Informational dialog with a solid primary and two outline actions.',
    tags: ['selector=mbbiz-modal', 'type=notification'],
    variant: 'notification',
  },
];

export const MODAL_VARIABLE_GROUPS = [
  {
    title: 'Modal Color Tokens',
    rows: [
      { token: 'background/primary', value: 'white/100%', appliesTo: 'Dialog panel background', notes: 'Maps to --mbbiz-color-surface-primary.' },
      { token: 'text/primary', value: 'darkblue/1000', appliesTo: 'Title, description, and error code', notes: 'Maps to --mbbiz-color-text-field / #192D39.' },
      { token: 'icon/neutral4', value: 'darkblue/500', appliesTo: 'Close icon A Linear/Cancel', notes: 'Maps to --color-semantic-icon-neutral4 / #6D83A7.' },
      { token: 'hyperlink/default', value: 'blue/700', appliesTo: 'Optional text link', notes: 'Reuses mbbiz-button-link tokens.' },
      { token: 'background/brand-secondary1', value: 'purple/500', appliesTo: 'Secondary outline brand override', notes: 'Local modal override for pill outline buttons.' },
      { token: 'modal/shadow', value: '0 8px 32px rgba(0,0,0,0.16)', appliesTo: 'Dialog elevation', notes: 'Figma Modal effect.' },
    ],
  },
  {
    title: 'Modal Layout Specs',
    rows: [
      { token: 'modal/width', value: '400px', appliesTo: 'Host and panel width', notes: 'Host width is min(100%, 400px).' },
      { token: 'modal/radius', value: '4px', appliesTo: 'Panel corner radius', notes: 'Maps to --mbbiz-radius-md.' },
      { token: 'modal/padding', value: '28px', appliesTo: 'Panel padding', notes: 'Figma padding 28.' },
      { token: 'modal/gap', value: '32px', appliesTo: 'Hero-to-actions stack gap', notes: 'Figma column gap 32.' },
      { token: 'modal/illustration', value: '164px', appliesTo: 'Centered illustration', notes: 'A Illustration assets from /assets/illustrations/a-illustration.' },
      { token: 'modal/close', value: '24px / 16px 16px', appliesTo: 'Close icon size and offset', notes: 'A Linear/Cancel, absolute top-right.' },
      { token: 'modal/actions/gap', value: '12px', appliesTo: 'Stacked full-width pill actions', notes: 'Primary solid, secondary outline.' },
    ],
  },
];

export const MODAL_VARIABLE_NOTES = [
  'Modal maps Figma node 3582:174031 types Warning, Success, Error, Confirm, Destructive, and Notification.',
  'Illustrations reuse the design-system A Illustration PNGs. Nested Button and Button Link tokens still apply, with local pill hover overrides.',
];
