import type { MbbizModalType } from './modal.types';

export const MBBIZ_MODAL_ILLUSTRATION_BASE_PATH = '/assets/illustrations/a-illustration';

export const MBBIZ_MODAL_ILLUSTRATION_FILE: Record<MbbizModalType, string> = {
  warning: 'warning.png',
  success: 'success.png',
  error: 'error.png',
  confirm: 'confirm.png',
  destructive: 'delete.png',
  notification: 'notification.png',
};
