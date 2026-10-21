import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import type {
  DsButtonShape,
  DsButtonSize,
  DsButtonState,
  DsButtonTone,
} from '../../button-demos.data';
import {
  DS_BUTTON_LOADING_FILL_SVG,
  DS_BUTTON_LOADING_OUTLINE_SVG,
  scopeDsButtonSpinner,
} from './ds-button-spinner';

let nextSpinnerId = 0;

@Component({
  selector: 'app-ds-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ds-button.component.html',
  styleUrl: './ds-button.component.scss',
})
export class DsButtonComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly spinnerPrefix = `ds-button-spinner-${nextSpinnerId++}`;

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

  protected readonly isLoading = computed(() => this.state() === 'loading');

  protected readonly spinnerHtml = computed<SafeHtml | null>(() => {
    if (!this.isLoading()) {
      return null;
    }

    const source =
      this.tone() === 'secondary' ? DS_BUTTON_LOADING_OUTLINE_SVG : DS_BUTTON_LOADING_FILL_SVG;

    return this.sanitizer.bypassSecurityTrustHtml(
      scopeDsButtonSpinner(source, this.spinnerPrefix),
    );
  });
}
