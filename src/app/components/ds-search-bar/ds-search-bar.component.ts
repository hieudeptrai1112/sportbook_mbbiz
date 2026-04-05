import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

export type DsSearchBarState =
  | 'default'
  | 'hover'
  | 'focus'
  | 'typing'
  | 'filled-default'
  | 'filled-active';

@Component({
  selector: 'app-ds-search-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ds-search-bar.component.html',
  styleUrl: './ds-search-bar.component.scss',
})
export class DsSearchBarComponent {
  readonly text = input('Tìm kiếm');
  readonly state = input<DsSearchBarState>('default');
  readonly showDelete = input(true);
  readonly showSearchIcon = input(true);

  protected readonly classes = computed(() => `ds-search-bar ds-search-bar--state-${this.state()}`);

  protected readonly isTyping = computed(() => this.state() === 'typing');
  protected readonly showsCursor = computed(() => this.state() === 'focus' || this.state() === 'typing');
  protected readonly mainText = computed(() => {
    const currentState = this.state();
    if (currentState === 'focus') {
      return '';
    }
    return this.text();
  });

  protected readonly showDeleteIcon = computed(() => this.isTyping() && this.showDelete());
}
