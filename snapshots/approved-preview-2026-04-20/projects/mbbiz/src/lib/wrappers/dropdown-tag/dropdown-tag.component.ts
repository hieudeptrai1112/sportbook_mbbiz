import { Component, ElementRef, HostListener, OnDestroy, computed, effect, inject, input, output, signal } from '@angular/core';

import {
  MbbizDropdownEmptyState,
  MbbizDropdownItem,
  MbbizDropdownSearchBehavior,
  MbbizDropdownStatus,
} from '../dropdown/dropdown.types';
import { SPORTBOOK6VN_DROPLIST_EMPTY_STATE_ASSETS } from '../dropdown/dropdown-empty-state.assets';

@Component({
  selector: 'mbbiz-dropdown-tag',
  templateUrl: './dropdown-tag.component.html',
  styleUrl: './dropdown-tag.component.scss',
})
export class MbbizDropdownTagComponent implements OnDestroy {
  protected readonly emptyStateAssets = SPORTBOOK6VN_DROPLIST_EMPTY_STATE_ASSETS;

  readonly placeholder = input('Lựa chọn');
  readonly items = input<readonly MbbizDropdownItem[]>([]);
  readonly values = input<readonly string[]>([]);
  readonly status = input<MbbizDropdownStatus>('default');
  readonly disabled = input(false);
  readonly open = input(false);
  readonly emptyState = input<MbbizDropdownEmptyState>('none');
  readonly searchBehavior = input<MbbizDropdownSearchBehavior>('auto');
  readonly searchThreshold = input(5);
  readonly maxVisibleTags = input(2);
  readonly errorMessage = input<string | null>(null);
  readonly retryDelayMs = input(3000);

  readonly valuesChange = output<string[]>();
  readonly itemSelect = output<MbbizDropdownItem>();
  readonly openChange = output<boolean>();
  readonly retryRequest = output<void>();

  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly localValues = signal<string[]>([]);
  protected readonly localOpen = signal(false);
  protected readonly searchQuery = signal('');
  protected readonly retryLocked = signal(false);

  private retryTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      this.localValues.set([...this.values()]);
    });

    effect(() => {
      this.localOpen.set(this.open());
    });

    effect(() => {
      const shouldLockRetry = this.localOpen() && this.emptyState() === 'api-error';
      this.resetRetryTimer(shouldLockRetry ? this.retryDelayMs() : 0);
    });
  }

  protected readonly selectedItems = computed(() => {
    const selected = new Set(this.localValues());
    return this.items().filter((item) => selected.has(item.id));
  });

  protected readonly visibleTags = computed(() => this.selectedItems().slice(0, this.maxVisibleTags()));

  protected readonly overflowCount = computed(() =>
    Math.max(0, this.selectedItems().length - this.visibleTags().length),
  );

  protected readonly hasSelection = computed(() => this.selectedItems().length > 0);

  protected readonly showSearch = computed(() => {
    switch (this.searchBehavior()) {
      case 'always':
        return true;
      case 'never':
        return false;
      default:
        return this.items().length > this.searchThreshold();
    }
  });

  protected readonly filteredItems = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) {
      return this.items();
    }

    return this.items().filter((item) => item.label.toLowerCase().includes(query));
  });

  protected readonly resolvedEmptyState = computed<MbbizDropdownEmptyState>(() => {
    if (!this.localOpen()) {
      return 'none';
    }

    if (this.emptyState() !== 'none') {
      return this.emptyState();
    }

    if (this.filteredItems().length > 0) {
      return 'none';
    }

    if (this.searchQuery().trim().length > 0 || this.showSearch()) {
      return 'search-no-data';
    }

    return 'no-data';
  });

  protected readonly wrapperClass = computed(
    () =>
      [
        'mbbiz-dropdown-tag',
        `mbbiz-dropdown-tag--status-${this.status()}`,
        this.disabled() ? 'mbbiz-dropdown-tag--disabled' : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected readonly fieldClass = computed(
    () =>
      [
        'mbbiz-dropdown-tag__field',
        this.localOpen() ? 'mbbiz-dropdown-tag__field--open' : '',
        this.hasSelection() ? 'mbbiz-dropdown-tag__field--filled' : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected readonly panelClass = computed(
    () =>
      [
        'mbbiz-dropdown-tag__panel',
        this.filteredItems().length > this.searchThreshold()
          ? 'mbbiz-dropdown-tag__panel--scrollable'
          : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected toggleOpen() {
    if (this.disabled()) {
      return;
    }

    this.setOpen(!this.localOpen());
  }

  protected onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  protected selectItem(item: MbbizDropdownItem, event?: Event) {
    event?.stopPropagation();

    if (item.disabled) {
      return;
    }

    const nextValues = new Set(this.localValues());
    if (nextValues.has(item.id)) {
      nextValues.delete(item.id);
    } else {
      nextValues.add(item.id);
    }

    const nextSelection = [...nextValues];
    this.localValues.set(nextSelection);
    this.valuesChange.emit(nextSelection);
    this.itemSelect.emit(item);
  }

  protected removeItem(itemId: string, event: Event) {
    event.stopPropagation();

    const nextSelection = this.localValues().filter((value) => value !== itemId);
    this.localValues.set(nextSelection);
    this.valuesChange.emit(nextSelection);
  }

  protected resetSelection(event?: Event) {
    event?.stopPropagation();

    this.localValues.set([]);
    this.valuesChange.emit([]);
  }

  protected isSelected(item: MbbizDropdownItem) {
    return this.localValues().includes(item.id);
  }

  protected onRetry() {
    if (this.retryLocked()) {
      return;
    }

    this.retryRequest.emit();
  }

  protected trackById(_index: number, item: MbbizDropdownItem) {
    return item.id;
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent) {
    if (!this.localOpen()) {
      return;
    }

    if (this.host.nativeElement.contains(event.target as Node)) {
      return;
    }

    this.setOpen(false);
  }

  private setOpen(nextOpen: boolean) {
    this.localOpen.set(nextOpen);
    this.openChange.emit(nextOpen);

    if (!nextOpen) {
      this.searchQuery.set('');
    }
  }

  private resetRetryTimer(delayMs: number) {
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
      this.retryTimer = null;
    }

    if (delayMs <= 0) {
      this.retryLocked.set(false);
      return;
    }

    this.retryLocked.set(true);
    this.retryTimer = setTimeout(() => {
      this.retryLocked.set(false);
      this.retryTimer = null;
    }, delayMs);
  }

  ngOnDestroy() {
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
      this.retryTimer = null;
    }
  }
}
