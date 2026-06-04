import { TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

export type Sportbook6vnMessageType = 'inform' | 'info' | 'warning' | 'error' | 'success' | 'loading';

export type Sportbook6vnMessageContent =
  | string
  | TemplateRef<{ $implicit: Sportbook6vnMessageRef | null; data?: unknown }>;

export interface Sportbook6vnMessageOptions {
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

export interface Sportbook6vnMessageData {
  content: Sportbook6vnMessageContent;
  createdAt: Date;
  messageId: string;
  onClose: Subject<boolean>;
  options: Required<Omit<Sportbook6vnMessageOptions, 'data' | 'title' | 'top'>> &
    Pick<Sportbook6vnMessageOptions, 'data' | 'title' | 'top'>;
  type: Sportbook6vnMessageType;
}

export interface Sportbook6vnMessageRef {
  messageId: string;
  onClose: Subject<boolean>;
}
