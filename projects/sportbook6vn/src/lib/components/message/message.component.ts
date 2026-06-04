import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, input, output, signal } from '@angular/core';

import type { Sportbook6vnMessageContent, Sportbook6vnMessageData, Sportbook6vnMessageType } from './message.types';

type Sportbook6vnNormalizedMessageType = Exclude<Sportbook6vnMessageType, 'info'>;

const DEFAULT_CONTENT: Record<Exclude<Sportbook6vnMessageType, 'info' | 'loading'>, string> = {
  inform: 'Informative inform.',
  warning: 'Warning inform with dismiss button.',
  error: 'Error inform with dismiss button.',
  success: 'Success inform with dismiss button.',
};

@Component({
  selector: 'sportbook6vn-message',
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class Sportbook6vnMessageComponent implements OnInit, OnDestroy {
  readonly type = input<Sportbook6vnMessageType>('inform');
  readonly content = input<Sportbook6vnMessageContent | null>(null);
  readonly title = input<string | null>(null);
  readonly showTitle = input(false);
  readonly closable = input(false);
  readonly duration = input(0);
  readonly pauseOnHover = input(true);
  readonly animate = input(true);
  readonly instance = input<Sportbook6vnMessageData | null>(null);

  readonly closed = output<{ id: string | null; userAction: boolean }>();

  private eraseTimer: ReturnType<typeof setTimeout> | null = null;
  private eraseTimingStart = 0;
  private eraseTTL = 0;
  private initialized = false;

  protected readonly leaving = signal(false);
  protected readonly normalizedType = computed<Sportbook6vnNormalizedMessageType>(() => {
    const type = this.instance()?.type ?? this.type();
    return type === 'info' ? 'inform' : type;
  });
  protected readonly messageClass = computed(() =>
    [
      'sportbook6vn-message',
      `sportbook6vn-message--${this.normalizedType()}`,
      this.instance()?.options.className ?? '',
      this.shouldAnimate() ? 'sportbook6vn-message--animated' : '',
      this.leaving() ? 'sportbook6vn-message--leaving' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
  protected readonly resolvedContent = computed(() => {
    const instance = this.instance();
    if (instance) {
      return instance.content;
    }

    const content = this.content();
    if (content) {
      return content;
    }

    const type = this.normalizedType();
    return type === 'loading' ? 'Loading...' : DEFAULT_CONTENT[type];
  });
  protected readonly resolvedTitle = computed(() => this.instance()?.options.title ?? this.title());
  protected readonly shouldShowTitle = computed(() => this.instance()?.options.showTitle ?? this.showTitle());
  protected readonly shouldShowClose = computed(() => this.instance()?.options.closable ?? this.closable());
  protected readonly shouldAnimate = computed(() => this.instance()?.options.animate ?? this.animate());
  protected readonly templateData = computed(() => this.instance()?.options.data);
  protected readonly messageRef = computed(() => {
    const instance = this.instance();
    return instance ? { messageId: instance.messageId, onClose: instance.onClose } : null;
  });
  protected readonly resolvedTextContent = computed(() => {
    const content = this.resolvedContent();
    return typeof content === 'string' ? content : '';
  });
  protected readonly resolvedTemplateContent = computed(() => {
    const content = this.resolvedContent();
    return typeof content === 'string' ? null : content;
  });

  ngOnInit(): void {
    this.initialized = true;
    this.startAutoClose();
  }

  ngOnDestroy(): void {
    this.clearEraseTimeout();
  }

  protected onEnter(): void {
    const pauseOnHover = this.instance()?.options.pauseOnHover ?? this.pauseOnHover();
    if (!pauseOnHover || this.eraseTimer === null) {
      return;
    }

    this.eraseTTL -= Date.now() - this.eraseTimingStart;
    this.clearEraseTimeout();
  }

  protected onLeave(): void {
    const pauseOnHover = this.instance()?.options.pauseOnHover ?? this.pauseOnHover();
    if (!pauseOnHover || this.eraseTTL <= 0) {
      return;
    }

    this.startEraseTimeout();
  }

  protected closeFromUser(): void {
    this.close(true);
  }

  private startAutoClose(): void {
    const duration = this.instance()?.options.duration ?? this.duration();
    if (!this.initialized || duration <= 0) {
      return;
    }

    this.eraseTTL = duration;
    this.startEraseTimeout();
  }

  private startEraseTimeout(): void {
    this.clearEraseTimeout();
    this.eraseTimingStart = Date.now();
    this.eraseTimer = setTimeout(() => this.close(false), this.eraseTTL);
  }

  private clearEraseTimeout(): void {
    if (this.eraseTimer) {
      clearTimeout(this.eraseTimer);
      this.eraseTimer = null;
    }
  }

  private close(userAction: boolean): void {
    this.clearEraseTimeout();

    if (this.shouldAnimate()) {
      this.leaving.set(true);
      setTimeout(() => this.emitClosed(userAction), 180);
      return;
    }

    this.emitClosed(userAction);
  }

  private emitClosed(userAction: boolean): void {
    this.closed.emit({ id: this.instance()?.messageId ?? null, userAction });
  }
}
