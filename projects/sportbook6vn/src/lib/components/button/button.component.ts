import { Component, computed, input, output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

import {
  Sportbook6vnButtonShape,
  Sportbook6vnButtonSize,
  Sportbook6vnButtonVariant,
} from './button.types';

@Component({
  selector: 'sportbook6vn-button',
  imports: [NzButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class Sportbook6vnButtonComponent {
  readonly variant = input<Sportbook6vnButtonVariant>('primary');
  readonly size = input<Sportbook6vnButtonSize>('md');
  readonly shape = input<Sportbook6vnButtonShape>('rectangle');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly fullWidth = input(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly ariaLabel = input<string | null>(null);

  readonly buttonClick = output<MouseEvent>();

  protected readonly buttonClass = computed(
    () =>
      [
        'sportbook6vn-button',
        `sportbook6vn-button--variant-${this.variant()}`,
        `sportbook6vn-button--size-${this.size()}`,
        `sportbook6vn-button--shape-${this.shape()}`,
        this.fullWidth() ? 'sportbook6vn-button--full-width' : '',
        this.loading() ? 'sportbook6vn-button--loading' : '',
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
