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

import { Sportbook6vnMessageContainerComponent } from './message-container.component';
import type {
  Sportbook6vnMessageContent,
  Sportbook6vnMessageData,
  Sportbook6vnMessageOptions,
  Sportbook6vnMessageRef,
  Sportbook6vnMessageType,
} from './message.types';

const MESSAGE_DEFAULT_OPTIONS = {
  animate: true,
  className: '',
  closable: false,
  duration: 5000,
  maxStack: 7,
  pauseOnHover: true,
  showTitle: false,
} satisfies Required<Omit<Sportbook6vnMessageOptions, 'data' | 'title' | 'top'>>;

@Injectable({ providedIn: 'root' })
export class Sportbook6vnMessageService {
  private readonly appRef = inject(ApplicationRef);
  private readonly document = inject(DOCUMENT);
  private readonly environmentInjector = inject(EnvironmentInjector);

  private containerRef: ComponentRef<Sportbook6vnMessageContainerComponent> | null = null;
  private counter = 0;

  info(content: Sportbook6vnMessageContent, options?: Sportbook6vnMessageOptions): Sportbook6vnMessageRef {
    return this.create('inform', content, options);
  }

  inform(content: Sportbook6vnMessageContent, options?: Sportbook6vnMessageOptions): Sportbook6vnMessageRef {
    return this.create('inform', content, options);
  }

  warning(content: Sportbook6vnMessageContent, options?: Sportbook6vnMessageOptions): Sportbook6vnMessageRef {
    return this.create('warning', content, options);
  }

  error(content: Sportbook6vnMessageContent, options?: Sportbook6vnMessageOptions): Sportbook6vnMessageRef {
    return this.create('error', content, options);
  }

  success(content: Sportbook6vnMessageContent, options?: Sportbook6vnMessageOptions): Sportbook6vnMessageRef {
    return this.create('success', content, options);
  }

  loading(content: Sportbook6vnMessageContent, options?: Sportbook6vnMessageOptions): Sportbook6vnMessageRef {
    return this.create('loading', content, options);
  }

  create(
    type: Sportbook6vnMessageType,
    content: Sportbook6vnMessageContent,
    options?: Sportbook6vnMessageOptions,
  ): Sportbook6vnMessageRef {
    const container = this.withContainer();
    const onClose = new Subject<boolean>();
    const messageId = `sportbook6vn-message-${this.counter++}`;
    const data: Sportbook6vnMessageData = {
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

  private withContainer(): Sportbook6vnMessageContainerComponent {
    if (this.containerRef) {
      return this.containerRef.instance;
    }

    const containerRef = createComponent(Sportbook6vnMessageContainerComponent, {
      environmentInjector: this.environmentInjector,
    });
    this.appRef.attachView(containerRef.hostView);
    this.document.body.appendChild(containerRef.location.nativeElement);
    containerRef.instance.allRemoved.subscribe(() => this.disposeContainer(containerRef));
    this.containerRef = containerRef;

    return containerRef.instance;
  }

  private disposeContainer(containerRef: ComponentRef<Sportbook6vnMessageContainerComponent>): void {
    if (this.containerRef !== containerRef) {
      return;
    }

    this.appRef.detachView(containerRef.hostView);
    containerRef.destroy();
    this.containerRef = null;
  }
}
