import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import type {
  DsButtonShape,
  DsButtonSize,
  DsButtonState,
  DsButtonTone,
} from '../../button-demos.data';

@Component({
  selector: 'app-ds-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ds-button.component.html',
  styleUrl: './ds-button.component.scss',
})
export class DsButtonComponent {
  readonly label = input('Text');
  readonly shape = input<DsButtonShape>('rectangle');
  readonly tone = input<DsButtonTone>('primary');
  readonly state = input<DsButtonState>('default');
  readonly size = input<DsButtonSize>('large');
  readonly showLeftIcon = input(false);
  readonly showRightIcon = input(false);
  readonly buttonType = input<'button' | 'submit' | 'reset'>('button');

  protected readonly classes = computed(
    () =>
      `ds-button ds-button--shape-${this.shape()} ds-button--tone-${this.tone()} ds-button--state-${this.state()} ds-button--size-${this.size()}`,
  );

  protected readonly isDisabled = computed(() => this.state() === 'disabled');
}
