import {
  Component,
  ElementRef,
  HostListener,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import { IconComponent } from '@mbbiz/icon/angular';

import { MbbizInputComponent } from '../input/input.component';
import { MbbizInputSize, MbbizInputStatus } from '../input/input.types';
import { SPORTBOOK6VN_DROPLIST_EMPTY_STATE_ASSETS } from '../dropdown/dropdown-empty-state.assets';
import { MbbizDropdownItem } from '../dropdown/dropdown.types';

@Component({
  selector: 'mbbiz-auto-complete',
  imports: [IconComponent, MbbizInputComponent],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.scss',
})
export class MbbizAutoCompleteComponent {
  protected readonly emptyStateAssets = SPORTBOOK6VN_DROPLIST_EMPTY_STATE_ASSETS;

  readonly value = input('');
  readonly placeholder = input('Input text');
  readonly disabled = input(false);
  readonly size = input<MbbizInputSize>('md');
  readonly status = input<MbbizInputStatus>('default');
  readonly inputId = input<string | null>(null);
  readonly label = input<string | null>(null);
  readonly hint = input<string | null>(null);
  readonly errorMessage = input<string | null>(null);
  readonly items = input<readonly MbbizDropdownItem[]>([]);
  readonly open = input(false);

  readonly valueChange = output<string>();
  readonly itemSelect = output<MbbizDropdownItem>();
  readonly openChange = output<boolean>();

  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly localValue = signal('');
  protected readonly localOpen = signal(false);
  protected readonly activeIndex = signal(0);

  constructor() {
    effect(() => {
      this.localValue.set(this.value());
    });

    effect(() => {
      this.localOpen.set(this.open());
    });
  }

  protected readonly filteredItems = computed(() => {
    const query = this.localValue().trim().toLowerCase();
    if (!query) {
      return this.items();
    }

    return this.items().filter((item) => item.label.toLowerCase().includes(query));
  });

  protected readonly enabledFilteredItems = computed(() =>
    this.filteredItems().filter((item) => !item.disabled),
  );

  protected readonly showError = computed(
    () => this.status() === 'error' && !!this.errorMessage(),
  );

  protected readonly emptyKind = computed<'none' | 'no-data'>(() => {
    if (!this.localOpen() || this.filteredItems().length > 0) {
      return 'none';
    }

    return 'no-data';
  });

  protected readonly wrapperClass = computed(
    () =>
      [
        'mbbiz-auto-complete',
        `mbbiz-auto-complete--size-${this.size()}`,
        this.label() ? 'mbbiz-auto-complete--has-label' : '',
        this.localOpen() ? 'mbbiz-auto-complete--open' : '',
        this.disabled() ? 'mbbiz-auto-complete--disabled' : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected readonly panelClass = computed(
    () =>
      [
        'mbbiz-auto-complete__panel',
        this.filteredItems().length > 5 ? 'mbbiz-auto-complete__panel--scrollable' : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected onValueChange(next: string) {
    this.localValue.set(next);
    this.valueChange.emit(next);
    this.activeIndex.set(0);
    this.setOpen(next.trim().length > 0 && this.filteredItems().length > 0);
  }

  protected onKeydown(event: KeyboardEvent) {
    if (this.disabled()) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.localOpen()) {
          this.openFromKeyboard();
          return;
        }
        this.moveActive(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.localOpen()) {
          this.openFromKeyboard();
          return;
        }
        this.moveActive(-1);
        break;
      case 'Enter':
        if (!this.localOpen()) {
          return;
        }
        event.preventDefault();
        this.selectActive();
        break;
      case 'Escape':
        if (!this.localOpen()) {
          return;
        }
        event.preventDefault();
        this.setOpen(false);
        break;
      default:
        break;
    }
  }

  protected selectItem(item: MbbizDropdownItem, event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();

    if (item.disabled) {
      return;
    }

    this.localValue.set(item.label);
    this.valueChange.emit(item.label);
    this.itemSelect.emit(item);
    this.setOpen(false);
  }

  protected isActive(item: MbbizDropdownItem) {
    const enabled = this.enabledFilteredItems();
    const active = enabled[this.activeIndex()];
    return active?.id === item.id;
  }

  protected isSelected(item: MbbizDropdownItem) {
    return item.label === this.localValue();
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

  private openFromKeyboard() {
    if (this.filteredItems().length === 0) {
      return;
    }

    this.setOpen(true);
  }

  private moveActive(delta: number) {
    const enabled = this.enabledFilteredItems();
    if (enabled.length === 0) {
      this.activeIndex.set(0);
      return;
    }

    const next = (this.activeIndex() + delta + enabled.length) % enabled.length;
    this.activeIndex.set(next);
  }

  private selectActive() {
    const enabled = this.enabledFilteredItems();
    const item = enabled[this.activeIndex()];
    if (!item) {
      this.setOpen(false);
      return;
    }

    this.selectItem(item);
  }

  private setOpen(nextOpen: boolean) {
    if (this.localOpen() === nextOpen) {
      return;
    }

    this.localOpen.set(nextOpen);
    this.openChange.emit(nextOpen);

    if (nextOpen) {
      this.activeIndex.set(0);
    }
  }
}
