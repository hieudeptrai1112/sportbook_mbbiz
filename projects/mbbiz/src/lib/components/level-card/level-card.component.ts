import { Component, computed, input, output } from '@angular/core';
import { IconComponent } from '@mbbiz/icon/angular';

import { MbbizLoadingComponent } from '../loading/loading.component';
import type { MbbizLevelCardSize, MbbizLevelCardState } from './level-card.types';

@Component({
  selector: 'mbbiz-level-card',
  imports: [IconComponent, MbbizLoadingComponent],
  templateUrl: './level-card.component.html',
  styleUrl: './level-card.component.scss',
})
export class MbbizLevelCardComponent {
  readonly size = input<MbbizLevelCardSize>('lg');
  readonly state = input<MbbizLevelCardState>('default');
  readonly label = input('Text');
  readonly icon = input('alinear_add');
  readonly comingSoonLabel = input('Sắp ra mắt');
  readonly showComingSoon = input<boolean | null>(null);
  readonly disabled = input(false);
  readonly ariaLabel = input<string | null>(null);

  readonly cardClick = output<MouseEvent>();
  readonly actionClick = output<MouseEvent>();

  protected readonly resolvedDisabled = computed(
    () => this.disabled() || this.state() === 'disabled',
  );
  protected readonly isLoading = computed(() => this.state() === 'loading');
  protected readonly isBlank = computed(() => this.state() === 'blank');
  protected readonly showLabel = computed(
    () => !this.isLoading() && !this.isBlank(),
  );
  protected readonly showIcon = computed(() => !this.isLoading());
  protected readonly showAction = computed(
    () => this.state() === 'add' || this.state() === 'delete',
  );
  protected readonly actionIcon = computed(() =>
    this.state() === 'delete' ? 'alinear_cancel' : 'alinear_add',
  );
  protected readonly resolvedShowComingSoon = computed(() => {
    if (this.showComingSoon() !== null) {
      return this.showComingSoon() === true;
    }

    return this.size() === 'lg' && this.resolvedDisabled();
  });
  protected readonly resolvedAriaLabel = computed(
    () => this.ariaLabel() ?? this.label(),
  );
  protected readonly isInteractive = computed(
    () => !this.resolvedDisabled() && !this.isLoading(),
  );

  protected readonly cardClass = computed(() =>
    [
      'mbbiz-level-card',
      `mbbiz-level-card--${this.size()}`,
      `mbbiz-level-card--${this.state()}`,
      this.resolvedDisabled() ? 'mbbiz-level-card--disabled' : '',
      this.isLoading() ? 'mbbiz-level-card--loading' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onCardClick(event: MouseEvent): void {
    if (!this.isInteractive()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.cardClick.emit(event);
  }

  protected onActionClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.isInteractive()) {
      return;
    }

    this.actionClick.emit(event);
  }
}
