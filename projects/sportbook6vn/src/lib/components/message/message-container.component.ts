import { Component, output, signal } from '@angular/core';

import { Sportbook6vnMessageComponent } from './message.component';
import type { Sportbook6vnMessageData } from './message.types';

@Component({
  selector: 'sportbook6vn-message-container',
  imports: [Sportbook6vnMessageComponent],
  templateUrl: './message-container.component.html',
  styleUrl: './message-container.component.scss',
})
export class Sportbook6vnMessageContainerComponent {
  readonly allRemoved = output<void>();

  protected readonly instances = signal<Sportbook6vnMessageData[]>([]);
  protected readonly top = signal('32px');
  private maxStack = 7;

  create(data: Sportbook6vnMessageData): Sportbook6vnMessageData {
    const maxStack = data.options.maxStack;
    this.maxStack = Number.isFinite(maxStack) && maxStack > 0 ? Math.round(maxStack) : this.maxStack;
    if (data.options.top !== undefined) {
      this.top.set(this.toCssPixel(data.options.top));
    }

    this.instances.update((current) => [...current, data].slice(-this.maxStack));
    return data;
  }

  remove(id: string | null, userAction = false): void {
    if (!id) {
      return;
    }

    const instance = this.instances().find((item) => item.messageId === id);
    if (!instance) {
      return;
    }

    this.instances.update((current) => current.filter((item) => item.messageId !== id));
    instance.onClose.next(userAction);
    instance.onClose.complete();

    if (this.instances().length === 0) {
      this.allRemoved.emit();
    }
  }

  removeAll(): void {
    const current = this.instances();
    this.instances.set([]);
    current.forEach((instance) => {
      instance.onClose.next(false);
      instance.onClose.complete();
    });
    this.allRemoved.emit();
  }

  protected trackMessage(_index: number, instance: Sportbook6vnMessageData): string {
    return instance.messageId;
  }

  private toCssPixel(value: number | string): string {
    if (typeof value === 'number') {
      return `${value}px`;
    }

    return value;
  }
}
