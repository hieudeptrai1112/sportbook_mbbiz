import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  createComponent,
  inject,
} from '@angular/core';
import { Subject } from 'rxjs';

import { MbbizMessageContainerComponent } from './message-container.component';
import type {
  MbbizMessageContent,
  MbbizMessageData,
  MbbizMessageOptions,
  MbbizMessageRef,
  MbbizMessageType,
} from './message.types';

const MESSAGE_DEFAULT_OPTIONS = {
  animate: true,
  className: '',
  closable: false,
  duration: 5000,
  maxStack: 7,
  pauseOnHover: true,
  showTitle: false,
} satisfies Required<Omit<MbbizMessageOptions, 'data' | 'title' | 'top'>>;

@Injectable({ providedIn: 'root' })
export class MbbizMessageService {
  private readonly appRef = inject(ApplicationRef);
  private readonly document = inject(DOCUMENT);
  private readonly environmentInjector = inject(EnvironmentInjector);

  private containerRef: ComponentRef<MbbizMessageContainerComponent> | null = null;
  private counter = 0;

  info(content: MbbizMessageContent, options?: MbbizMessageOptions): MbbizMessageRef {
    return this.create('inform', content, options);
  }

  inform(content: MbbizMessageContent, options?: MbbizMessageOptions): MbbizMessageRef {
    return this.create('inform', content, options);
  }

  warning(content: MbbizMessageContent, options?: MbbizMessageOptions): MbbizMessageRef {
    return this.create('warning', content, options);
  }

  error(content: MbbizMessageContent, options?: MbbizMessageOptions): MbbizMessageRef {
    return this.create('error', content, options);
  }

  success(content: MbbizMessageContent, options?: MbbizMessageOptions): MbbizMessageRef {
    return this.create('success', content, options);
  }

  loading(content: MbbizMessageContent, options?: MbbizMessageOptions): MbbizMessageRef {
    return this.create('loading', content, options);
  }

  create(
    type: MbbizMessageType,
    content: MbbizMessageContent,
    options?: MbbizMessageOptions,
  ): MbbizMessageRef {
    const container = this.withContainer();
    const onClose = new Subject<boolean>();
    const messageId = `mbbiz-message-${this.counter++}`;
    const data: MbbizMessageData = {
      content,
      createdAt: new Date(),
      messageId,
      onClose,
      options: {
        ...MESSAGE_DEFAULT_OPTIONS,
        ...options,
      },
      type,
    };

    container.create(data);
    return { messageId, onClose };
  }

  remove(id?: string): void {
    if (!this.containerRef) {
      return;
    }

    if (id) {
      this.containerRef.instance.remove(id);
      return;
    }

    this.containerRef.instance.removeAll();
  }

  private withContainer(): MbbizMessageContainerComponent {
    if (this.containerRef) {
      return this.containerRef.instance;
    }

    const containerRef = createComponent(MbbizMessageContainerComponent, {
      environmentInjector: this.environmentInjector,
    });
    this.appRef.attachView(containerRef.hostView);
    this.document.body.appendChild(containerRef.location.nativeElement);
    containerRef.instance.allRemoved.subscribe(() => this.disposeContainer(containerRef));
    this.containerRef = containerRef;

    return containerRef.instance;
  }

  private disposeContainer(containerRef: ComponentRef<MbbizMessageContainerComponent>): void {
    if (this.containerRef !== containerRef) {
      return;
    }

    this.appRef.detachView(containerRef.hostView);
    containerRef.destroy();
    this.containerRef = null;
  }
}
