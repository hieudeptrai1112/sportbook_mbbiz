import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

export type DsInputBasicState =
  | 'default'
  | 'hover'
  | 'focus'
  | 'typing'
  | 'filled'
  | 'error'
  | 'disabled'
  | 'error-typing'
  | 'error-filled';

@Component({
  selector: 'app-ds-input-basic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ds-input-basic.component.html',
  styleUrl: './ds-input-basic.component.scss',
})
export class DsInputBasicComponent {
  readonly value = input('');
  readonly state = input<DsInputBasicState>('default');
  readonly placeholder = input('Enter something');
  readonly width = input<number | null>(null);

  protected readonly classes = computed(() => `ds-input-basic ds-input-basic--state-${this.state()}`);

  protected readonly isTypingState = computed(
    () => this.state() === 'typing' || this.state() === 'error-typing',
  );

  protected readonly showCursor = computed(
    () => this.state() === 'focus' || this.state() === 'typing' || this.state() === 'error-typing',
  );

  protected readonly displayValue = computed(() => (this.state() === 'focus' ? '' : this.value()));

  protected readonly displayText = computed(() => this.displayValue() || this.placeholder());

  protected readonly textClass = computed(() => {
    if (!this.displayValue()) {
      return 'ds-input-basic__text ds-input-basic__text--placeholder';
    }

    if (this.state() === 'disabled') {
      return 'ds-input-basic__text ds-input-basic__text--disabled';
    }

    if (
      this.state() === 'typing' ||
      this.state() === 'filled' ||
      this.state() === 'error-typing' ||
      this.state() === 'error-filled'
    ) {
      return 'ds-input-basic__text ds-input-basic__text--primary';
    }

    return 'ds-input-basic__text';
  });
}
