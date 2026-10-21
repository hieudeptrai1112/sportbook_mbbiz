import { Component, computed, input } from '@angular/core';
import { IconComponent } from '@mbbiz/icon/angular';

import type {
  MbbizBadgeNotificationStatus,
  MbbizBadgeRoleStatus,
  MbbizBadgeStatus,
  MbbizBadgeType,
} from './badge.types';

const ROLE_LABEL: Record<MbbizBadgeRoleStatus, string> = {
  maker: 'Người tạo',
  checker: 'Người duyệt',
};

const NOTIFICATION_STATUSES: readonly MbbizBadgeNotificationStatus[] = [
  'reminder',
  'balance',
  'done',
  'error',
  'warning',
  'remind',
  'bee',
  'information',
];

const LIBRARY_ICON: Partial<Record<MbbizBadgeNotificationStatus, string>> = {
  information: 'abold_info',
};

@Component({
  selector: 'mbbiz-badge',
  imports: [IconComponent],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class MbbizBadgeComponent {
  readonly type = input<MbbizBadgeType>('notification');
  readonly status = input<MbbizBadgeStatus>('reminder');
  readonly label = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);

  protected readonly resolvedType = computed(() => this.type());

  protected readonly resolvedStatus = computed(() => {
    const type = this.resolvedType();
    const status = this.status();

    if (type === 'role') {
      return status === 'checker' ? 'checker' : 'maker';
    }

    return NOTIFICATION_STATUSES.includes(status as MbbizBadgeNotificationStatus)
      ? (status as MbbizBadgeNotificationStatus)
      : 'reminder';
  });

  protected readonly resolvedLabel = computed(() => {
    if (this.resolvedType() !== 'role') {
      return this.label();
    }

    const status = this.resolvedStatus() as MbbizBadgeRoleStatus;
    return this.label() ?? ROLE_LABEL[status];
  });

  protected readonly libraryIcon = computed(() => {
    if (this.resolvedType() !== 'notification') {
      return null;
    }

    return LIBRARY_ICON[this.resolvedStatus() as MbbizBadgeNotificationStatus] ?? null;
  });

  protected readonly resolvedAriaLabel = computed(
    () => this.ariaLabel() ?? this.resolvedLabel() ?? this.resolvedStatus(),
  );

  protected readonly badgeClass = computed(() =>
    [
      'mbbiz-badge',
      `mbbiz-badge--${this.resolvedType()}`,
      `mbbiz-badge--${this.resolvedStatus()}`,
    ].join(' '),
  );
}
