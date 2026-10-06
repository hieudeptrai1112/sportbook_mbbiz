import { Component, computed, input, output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

import {
  MbbizButtonAppearance,
  MbbizButtonShape,
  MbbizButtonSize,
  MbbizButtonTone,
  MbbizButtonVariant,
} from './button.types';

@Component({
  selector: 'mbbiz-button',
  imports: [NzButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class MbbizButtonComponent {
  /** Legacy tone. Rectangle primary stays the gradient action; rectangle secondary stays the outline. */
  readonly variant = input<MbbizButtonVariant>('primary');
  /** Figma Type. When set, it replaces the legacy variant mapping. */
  readonly tone = input<MbbizButtonTone | null>(null);
  /** Figma Style. When set, it replaces the legacy solid/outline mapping. */
  readonly appearance = input<MbbizButtonAppearance | null>(null);
  readonly size = input<MbbizButtonSize>('md');
  readonly shape = input<MbbizButtonShape>('rectangle');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly fullWidth = input(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly ariaLabel = input<string | null>(null);

  readonly buttonClick = output<MouseEvent>();

  protected readonly resolvedTone = computed<MbbizButtonTone>(() => {
    const tone = this.tone();
    if (tone) {
      return tone;
    }

    if (this.appearance()) {
      return this.variant();
    }

    if (this.shape() === 'rectangle' && this.variant() === 'primary') {
      return 'secondary';
    }

    if (this.shape() === 'rectangle' && this.variant() === 'secondary') {
      return 'primary';
    }

    return this.variant();
  });

  protected readonly resolvedAppearance = computed<MbbizButtonAppearance>(() => {
    const appearance = this.appearance();
    if (appearance) {
      return appearance;
    }

    return this.variant() === 'secondary' ? 'outline' : 'solid';
  });

  protected readonly buttonClass = computed(
    () =>
      [
        'mbbiz-button',
        `mbbiz-button--variant-${this.variant()}`,
        `mbbiz-button--tone-${this.resolvedTone()}`,
        `mbbiz-button--appearance-${this.resolvedAppearance()}`,
        `mbbiz-button--size-${this.size()}`,
        `mbbiz-button--shape-${this.shape()}`,
        this.fullWidth() ? 'mbbiz-button--full-width' : '',
        this.loading() ? 'mbbiz-button--loading' : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected readonly isDisabled = computed(() => this.disabled() || this.loading());
  protected readonly zorroType = computed(() =>
    this.resolvedAppearance() === 'solid' ? 'primary' : 'default',
  );
  protected readonly zorroSize = computed<'small' | 'default' | 'large'>(() => {
    switch (this.size()) {
      case 'sm':
        return 'small';
      case 'md':
        return 'default';
      default:
        return 'large';
    }
  });
  protected readonly zorroShape = computed<'round' | null>(() =>
    this.shape() === 'pill' && this.resolvedAppearance() !== 'text-link' ? 'round' : null,
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
