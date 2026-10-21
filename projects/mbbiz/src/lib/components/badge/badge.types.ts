export type MbbizBadgeType = 'notification' | 'role';

export type MbbizBadgeNotificationStatus =
  | 'reminder'
  | 'balance'
  | 'done'
  | 'error'
  | 'warning'
  | 'remind'
  | 'bee'
  | 'information';

export type MbbizBadgeRoleStatus = 'maker' | 'checker';

export type MbbizBadgeStatus = MbbizBadgeNotificationStatus | MbbizBadgeRoleStatus;
