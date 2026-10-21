import { TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

export type MbbizMessageType = 'inform' | 'info' | 'warning' | 'error' | 'success' | 'loading';

export type MbbizMessageContent =
  | string
  | TemplateRef<{ $implicit: MbbizMessageRef | null; data?: unknown }>;

export interface MbbizMessageOptions {
  animate?: boolean;
  className?: string;
  closable?: boolean;
  data?: unknown;
  duration?: number;
  maxStack?: number;
  pauseOnHover?: boolean;
  showTitle?: boolean;
  title?: string | null;
  top?: number | string;
}

export interface MbbizMessageData {
  content: MbbizMessageContent;
  createdAt: Date;
  messageId: string;
  onClose: Subject<boolean>;
  options: Required<Omit<MbbizMessageOptions, 'data' | 'title' | 'top'>> &
    Pick<MbbizMessageOptions, 'data' | 'title' | 'top'>;
  type: MbbizMessageType;
}

export interface MbbizMessageRef {
  messageId: string;
  onClose: Subject<boolean>;
}
