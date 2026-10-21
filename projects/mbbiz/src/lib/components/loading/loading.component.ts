import { Component, computed, input } from '@angular/core';

import type { MbbizLoadingSize } from './loading.types';

@Component({
  selector: 'mbbiz-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class MbbizLoadingComponent {
  readonly size = input<MbbizLoadingSize>('s');
  readonly ariaLabel = input('Loading');

  protected readonly rootClass = computed(() =>
    ['mbbiz-loading', `mbbiz-loading--${this.size()}`].join(' '),
  );
}
