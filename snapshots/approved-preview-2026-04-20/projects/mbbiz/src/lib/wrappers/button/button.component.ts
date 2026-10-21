import { Component, computed, input, output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

import {
  MbbizButtonShape,
  MbbizButtonSize,
  MbbizButtonVariant,
} from './button.types';

@Component({
  selector: 'mbbiz-button',
  imports: [NzButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class MbbizButtonComponent {
  readonly variant = input<MbbizButtonVariant>('primary');
  readonly size = input<MbbizButtonSize>('md');
  readonly shape = input<MbbizButtonShape>('rectangle');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly fullWidth = input(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly ariaLabel = input<string | null>(null);

  readonly buttonClick = output<MouseEvent>();

  protected readonly buttonClass = computed(
    () =>
      [
        'mbbiz-button',
        `mbbiz-button--variant-${this.variant()}`,
        `mbbiz-button--size-${this.size()}`,
        `mbbiz-button--shape-${this.shape()}`,
        this.fullWidth() ? 'mbbiz-button--full-width' : '',
        this.loading() ? 'mbbiz-button--loading' : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected readonly isDisabled = computed(() => this.disabled() || this.loading());
  protected readonly zorroType = computed(() => (this.variant() === 'primary' ? 'primary' : 'default'));
  protected readonly zorroSize = computed<'small' | 'default' | 'large'>(() => {
    switch (this.size()) {
      case 'sm':
        return 'small';
      case 'lg':
        return 'large';
      default:
        return 'default';
    }
  });
  protected readonly zorroShape = computed<'round' | null>(() =>
    this.shape() === 'pill' ? 'round' : null,
  );

  protected onClick(event: MouseEvent) {
    if (this.isDisabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.buttonClick.emit(event);
  }
}
