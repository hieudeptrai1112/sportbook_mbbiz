import { Component, ElementRef, HostListener, computed, effect, inject, input, output, signal } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';

import { Sportbook6vnAffixFlagCode, Sportbook6vnAffixFlagIconComponent } from './affix-flag-icon.component';
import { Sportbook6vnInputStatus } from '../input/input.types';

export type Sportbook6vnAffixDropdownSide = 'prefix' | 'suffix';

export interface Sportbook6vnAffixDropdownItem {
  id: string;
  label: string;
  flagCode?: Sportbook6vnAffixFlagCode;
  imageUrl?: string;
  disabled?: boolean;
}

@Component({
  selector: 'sportbook6vn-affix-label-input',
  imports: [NzInputModule, Sportbook6vnAffixFlagIconComponent],
  templateUrl: './affix-label-input.component.html',
  styleUrl: './affix-label-input.component.scss',
})
export class Sportbook6vnAffixLabelInputComponent {
  readonly value = input('');
  readonly placeholder = input('Input text');
  readonly disabled = input(false);
  readonly status = input<Sportbook6vnInputStatus>('default');
  readonly inputId = input<string | null>(null);
  readonly prefixLabel = input<string | null>(null);
  readonly suffixLabel = input<string | null>(null);
  readonly prefixDropdownItems = input<readonly Sportbook6vnAffixDropdownItem[]>([]);
  readonly suffixDropdownItems = input<readonly Sportbook6vnAffixDropdownItem[]>([]);
  readonly prefixDropdownValue = input<string | null>(null);
  readonly suffixDropdownValue = input<string | null>(null);
  readonly openAffix = input<Sportbook6vnAffixDropdownSide | null>(null);

  readonly valueChange = output<string>();
  readonly prefixDropdownValueChange = output<string | null>();
  readonly suffixDropdownValueChange = output<string | null>();
  readonly openAffixChange = output<Sportbook6vnAffixDropdownSide | null>();

  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly localOpenAffix = signal<Sportbook6vnAffixDropdownSide | null>(null);
  protected readonly searchQuery = signal('');

  constructor() {
    effect(() => {
      this.localOpenAffix.set(this.openAffix());
    });
  }

  protected readonly wrapperClass = computed(
    () =>
      [
        'sportbook6vn-affix-label-input',
        `sportbook6vn-affix-label-input--status-${this.status()}`,
        this.disabled() ? 'sportbook6vn-affix-label-input--disabled' : '',
        this.activeAffix() ? 'sportbook6vn-affix-label-input--open' : '',
      ]
        .filter(Boolean)
        .join(' '),
  );

  protected readonly activeAffix = computed(() => this.localOpenAffix());

  protected readonly activeDropdownItems = computed(() => {
    if (this.activeAffix() === 'prefix') {
      return this.prefixDropdownItems();
    }

    if (this.activeAffix() === 'suffix') {
      return this.suffixDropdownItems();
    }

    return [];
  });

  protected readonly filteredDropdownItems = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) {
      return this.activeDropdownItems();
    }

    return this.activeDropdownItems().filter((item) => item.label.toLowerCase().includes(query));
  });

  protected readonly showDropdownPanel = computed(() => !!this.activeAffix() && this.activeDropdownItems().length > 0);

  protected readonly showDropdownScroll = computed(() => this.filteredDropdownItems().length > 4);

  protected readonly prefixSelectedItem = computed(() =>
    this.prefixDropdownItems().find((item) => item.id === this.prefixDropdownValue()) ?? null,
  );

  protected readonly suffixSelectedItem = computed(() =>
    this.suffixDropdownItems().find((item) => item.id === this.suffixDropdownValue()) ?? null,
  );

  protected readonly hasPrefixAffix = computed(() => !!this.prefixLabel() || this.prefixDropdownItems().length > 0);
  protected readonly hasSuffixAffix = computed(() => !!this.suffixLabel() || this.suffixDropdownItems().length > 0);

  protected readonly prefixIsDropdown = computed(() => this.prefixDropdownItems().length > 0);
  protected readonly suffixIsDropdown = computed(() => this.suffixDropdownItems().length > 0);

  protected readonly prefixAffixLabel = computed(
    () => this.prefixSelectedItem()?.label ?? this.prefixLabel() ?? this.placeholderAffixLabel(),
  );

  protected readonly suffixAffixLabel = computed(
    () => this.suffixSelectedItem()?.label ?? this.suffixLabel() ?? this.placeholderAffixLabel(),
  );

  protected readonly prefixAffixImageUrl = computed(() => this.prefixSelectedItem()?.imageUrl ?? null);
  protected readonly suffixAffixImageUrl = computed(() => this.suffixSelectedItem()?.imageUrl ?? null);
  protected readonly prefixAffixFlagCode = computed(() => this.prefixSelectedItem()?.flagCode ?? null);
  protected readonly suffixAffixFlagCode = computed(() => this.suffixSelectedItem()?.flagCode ?? null);

  protected readonly prefixAffixClass = computed(() => this.getAffixClass('prefix'));
  protected readonly suffixAffixClass = computed(() => this.getAffixClass('suffix'));

  protected onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }

  protected toggleDropdown(side: Sportbook6vnAffixDropdownSide, event: Event) {
    event.stopPropagation();

    if (this.disabled() || !this.getDropdownItems(side).length) {
      return;
    }

    const nextSide = this.localOpenAffix() === side ? null : side;
    this.setOpenAffix(nextSide);
  }

  protected selectDropdownItem(side: Sportbook6vnAffixDropdownSide, item: Sportbook6vnAffixDropdownItem, event: Event) {
    event.stopPropagation();

    if (item.disabled || this.disabled()) {
      return;
    }

    if (side === 'prefix') {
      this.prefixDropdownValueChange.emit(item.id);
    } else {
      this.suffixDropdownValueChange.emit(item.id);
    }

    this.setOpenAffix(null);
  }

  protected onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  protected trackById(_index: number, item: Sportbook6vnAffixDropdownItem) {
    return item.id;
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent) {
    if (!this.localOpenAffix()) {
      return;
    }

    if (this.host.nativeElement.contains(event.target as Node)) {
      return;
    }

    this.setOpenAffix(null);
  }

  private setOpenAffix(nextSide: Sportbook6vnAffixDropdownSide | null) {
    this.localOpenAffix.set(nextSide);
    this.openAffixChange.emit(nextSide);

    if (!nextSide) {
      this.searchQuery.set('');
    }
  }

  private getAffixClass(side: Sportbook6vnAffixDropdownSide) {
    const isDropdown = this.getDropdownItems(side).length > 0;
    const isSelected = !!this.getSelectedItem(side);
    const isOpen = this.localOpenAffix() === side;

    return [
      'sportbook6vn-affix-label-input__affix',
      isDropdown ? 'sportbook6vn-affix-label-input__affix--dropdown' : '',
      isSelected ? 'sportbook6vn-affix-label-input__affix--selected' : '',
      isOpen ? 'sportbook6vn-affix-label-input__affix--open' : '',
      this.disabled() ? 'sportbook6vn-affix-label-input__affix--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private getDropdownItems(side: Sportbook6vnAffixDropdownSide) {
    return side === 'prefix' ? this.prefixDropdownItems() : this.suffixDropdownItems();
  }

  private getSelectedItem(side: Sportbook6vnAffixDropdownSide) {
    return side === 'prefix' ? this.prefixSelectedItem() : this.suffixSelectedItem();
  }

  private placeholderAffixLabel() {
    return 'Loại tiền';
  }
}
