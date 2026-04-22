import { Component, ElementRef, HostListener, OnDestroy, computed, effect, inject, input, output, signal } from '@angular/core';

import {
  Sportbook6vnDropdownEmptyState,
  Sportbook6vnDropdownItem,
  Sportbook6vnDropdownLabelMode,
  Sportbook6vnDropdownMode,
  Sportbook6vnDropdownSearchBehavior,
  Sportbook6vnDropdownStatus,
} from './dropdown.types';
import { SPORTBOOK6VN_DROPLIST_EMPTY_STATE_ASSETS } from './dropdown-empty-state.assets';

@Component({
  selector: 'sportbook6vn-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class Sportbook6vnDropdownComponent implements OnDestroy {
  protected readonly emptyStateAssets = SPORTBOOK6VN_DROPLIST_EMPTY_STATE_ASSETS;

  readonly title = input('Title');
  readonly placeholder = input('Lựa chọn');
  readonly items = input<readonly Sportbook6vnDropdownItem[]>([]);
  readonly mode = input<Sportbook6vnDropdownMode>('single');
  readonly labelMode = input<Sportbook6vnDropdownLabelMode>('outside');
  readonly status = input<Sportbook6vnDropdownStatus>('default');
  readonly disabled = input(false);
  readonly errorMessage = input<string | null>(null);
  readonly value = input<string | null>(null);
  readonly values = input<readonly string[]>([]);
  readonly open = input(false);
  readonly searchBehavior = input<Sportbook6vnDropdownSearchBehavior>('auto');
  readonly searchThreshold = input(5);
  readonly emptyState = input<Sportbook6vnDropdownEmptyState>('none');
  readonly retryDelayMs = input(3000);

  readonly valueChange = output<string | null>();
  readonly valuesChange = output<string[]>();
  readonly itemSelect = output<Sportbook6vnDropdownItem>();
  readonly openChange = output<boolean>();
  readonly retryRequest = output<void>();

  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly localValue = signal<string | null>(null);
  protected readonly localValues = signal<string[]>([]);
  protected readonly localOpen = signal(false);
  protected readonly searchQuery = signal('');
  protected readonly retryLocked = signal(false);

  private retryTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      this.localValue.set(this.value());
    });

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

  protected readonly selectedIds = computed(() => {
    if (this.mode() === 'multiple') {
      return this.localValues();
    }

    const selectedValue = this.localValue();
    return selectedValue ? [selectedValue] : [];
  });

  protected readonly selectedItems = computed(() => {
    const selected = new Set(this.selectedIds());
    return this.items().filter((item) => selected.has(item.id));
  });

  protected readonly hasSelection = computed(() => this.selectedItems().length > 0);

  protected readonly showSearch = computed(() => {
    switch (this.searchBehavior()) {
      case 'always':
        return true;
      case 'never':
        return false;
      default:
        return this.emptyState() === 'search-no-data' || this.items().length > this.searchThreshold();
    }
  });

  protected readonly filteredItems = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) {
      return this.items();
    }

    return this.items().filter((item) => item.label.toLowerCase().includes(query));
  });

  protected readonly resolvedEmptyState = computed<Sportbook6vnDropdownEmptyState>(() => {
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

  protected readonly displayValue = computed(() => {
    if (!this.hasSelection()) {
      return this.placeholder();
    }

    if (this.mode() === 'multiple') {
      return this.selectedItems()
        .map((item) => item.label)
        .join(', ');
    }

    return this.selectedItems()[0]?.label ?? this.placeholder();
  });

  protected readonly wrapperClass = computed(
    () =>
      [
        'sportbook6vn-dropdown',
        `sportbook6vn-dropdown--label-${this.labelMode()}`,
        `sportbook6vn-dropdown--mode-${this.mode()}`,
        `sportbook6vn-dropdown--status-${this.status()}`,
        this.disabled() ? 'sportbook6vn-dropdown--disabled' : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected readonly fieldClass = computed(
    () =>
      [
        'sportbook6vn-dropdown__field',
        this.localOpen() ? 'sportbook6vn-dropdown__field--open' : '',
        this.hasSelection() ? 'sportbook6vn-dropdown__field--filled' : '',
        this.showSearch() ? 'sportbook6vn-dropdown__field--searchable' : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected readonly panelClass = computed(
    () =>
      [
        'sportbook6vn-dropdown__panel',
        this.filteredItems().length > this.searchThreshold()
          ? 'sportbook6vn-dropdown__panel--scrollable'
          : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected readonly placeholderClass = computed(() =>
    this.hasSelection()
      ? 'sportbook6vn-dropdown__value sportbook6vn-dropdown__value--filled'
      : 'sportbook6vn-dropdown__value sportbook6vn-dropdown__value--placeholder',
  );

  protected toggleOpen() {
    if (this.disabled()) {
      return;
    }

    this.setOpen(!this.localOpen());
  }

  protected closePanel() {
    if (!this.localOpen()) {
      return;
    }

    this.setOpen(false);
  }

  protected onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  protected onRetry() {
    if (this.retryLocked()) {
      return;
    }

    this.retryRequest.emit();
  }

  protected selectItem(item: Sportbook6vnDropdownItem, event?: Event) {
    event?.stopPropagation();

    if (item.disabled) {
      return;
    }

    this.itemSelect.emit(item);

    if (this.mode() === 'single') {
      this.localValue.set(item.id);
      this.valueChange.emit(item.id);
      this.setOpen(false);
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
  }

  protected resetSelection(event?: Event) {
    event?.stopPropagation();

    if (this.mode() === 'single') {
      this.localValue.set(null);
      this.valueChange.emit(null);
      return;
    }

    this.localValues.set([]);
    this.valuesChange.emit([]);
  }

  protected isSelected(item: Sportbook6vnDropdownItem) {
    return this.selectedIds().includes(item.id);
  }

  protected trackById(_index: number, item: Sportbook6vnDropdownItem) {
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
