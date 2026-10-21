import { Component, ElementRef, HostListener, computed, effect, inject, input, output, signal } from '@angular/core';

import type {
  MbbizPaginationMode,
  MbbizPaginationPageItem,
  MbbizPaginationRange,
  MbbizPaginationRangeFormatter,
  MbbizPaginationSummaryFormatter,
} from './pagination.types';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_WINDOW = 5;
const DEFAULT_QUICK_JUMPER_THRESHOLD = 100;

@Component({
  selector: 'mbbiz-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class MbbizPaginationComponent {
  readonly total = input(0);
  readonly pageIndex = input(1);
  readonly pageCount = input<number | null>(null);
  readonly pageSize = input(DEFAULT_PAGE_SIZE);
  readonly disabled = input(false);
  readonly mode = input<MbbizPaginationMode>('auto');
  readonly pageWindow = input(DEFAULT_PAGE_WINDOW);
  readonly quickJumperThreshold = input(DEFAULT_QUICK_JUMPER_THRESHOLD);
  readonly showTotal = input(true);
  readonly openJump = input(false);
  readonly jumpActive = input(false);
  readonly quickInputActive = input(false);
  readonly quickJumpValue = input<string | number | null>(null);
  readonly rangeFormatter = input<MbbizPaginationRangeFormatter | null>(null);
  readonly summaryFormatter = input<MbbizPaginationSummaryFormatter | null>(null);
  readonly ariaLabel = input('Pagination');

  readonly pageIndexChange = output<number>();
  readonly openJumpChange = output<boolean>();

  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly localPageIndex = signal(1);
  protected readonly localOpenJump = signal(false);
  protected readonly localQuickJumpValue = signal('');

  constructor() {
    effect(() => {
      this.localPageIndex.set(this.clampPage(this.pageIndex(), this.calculateTotalPages()));
    });

    effect(() => {
      this.localOpenJump.set(this.openJump());
    });

    effect(() => {
      const quickJumpValue = this.quickJumpValue();
      if (quickJumpValue !== null) {
        this.localQuickJumpValue.set(String(quickJumpValue));
      }
    });
  }

  protected readonly totalPages = computed(() => this.calculateTotalPages());

  protected readonly currentPage = computed(() => this.clampPage(this.localPageIndex(), this.totalPages()));

  protected readonly range = computed<MbbizPaginationRange>(() => {
    const total = this.normalizedTotal();
    if (total <= 0) {
      return { start: 0, end: 0, total };
    }

    const start = (this.currentPage() - 1) * this.normalizedPageSize() + 1;
    const end = Math.min(this.currentPage() * this.normalizedPageSize(), total);
    return { start, end, total };
  });

  protected readonly rangeLabel = computed(() => {
    const formatter = this.rangeFormatter();
    if (formatter) {
      return formatter(this.range());
    }

    const range = this.range();
    return `Đã hiển thị ${range.start} - ${range.end} trên ${range.total} kết quả`;
  });

  protected readonly useQuickJumper = computed(() => {
    if (this.mode() === 'quick-jumper') {
      return true;
    }

    if (this.mode() === 'page-list') {
      return false;
    }

    return this.totalPages() > this.quickJumperThreshold();
  });

  protected readonly pageItems = computed<MbbizPaginationPageItem[]>(() => {
    const totalPages = this.totalPages();
    const windowSize = Math.max(1, Math.round(this.pageWindow()));
    const current = this.currentPage();
    let start = Math.max(1, current - Math.floor(windowSize / 2));
    let end = Math.min(totalPages, start + windowSize - 1);

    start = Math.max(1, end - windowSize + 1);

    return Array.from({ length: end - start + 1 }, (_, index) => {
      const page = start + index;
      return { page, active: page === current };
    });
  });

  protected readonly jumpOptions = computed(() =>
    Array.from({ length: this.totalPages() }, (_, index) => index + 1),
  );

  protected readonly canGoPrevious = computed(() => !this.disabled() && this.currentPage() > 1);
  protected readonly canGoNext = computed(() => !this.disabled() && this.currentPage() < this.totalPages());

  protected readonly wrapperClass = computed(() =>
    [
      'mbbiz-pagination',
      this.useQuickJumper() ? 'mbbiz-pagination--quick' : 'mbbiz-pagination--list',
      this.disabled() ? 'mbbiz-pagination--disabled' : '',
      this.jumpActive() ? 'mbbiz-pagination--jump-active' : '',
      this.quickInputActive() ? 'mbbiz-pagination--quick-input-active' : '',
      this.localOpenJump() ? 'mbbiz-pagination--jump-open' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected readonly pageSummary = computed(() => {
    const formatter = this.summaryFormatter();
    const summary = { pageIndex: this.currentPage(), pageCount: this.totalPages() };
    if (formatter) {
      return formatter(summary);
    }

    return `Trang ${this.formatPageNumber(summary.pageIndex)} / ${this.formatPageNumber(summary.pageCount)}`;
  });

  protected setPage(page: number): void {
    if (this.disabled()) {
      return;
    }

    const nextPage = this.clampPage(page, this.totalPages());
    if (nextPage === this.currentPage()) {
      this.setOpenJump(false);
      return;
    }

    this.localPageIndex.set(nextPage);
    this.pageIndexChange.emit(nextPage);
    this.setOpenJump(false);
  }

  protected goPrevious(): void {
    if (this.canGoPrevious()) {
      this.setPage(this.currentPage() - 1);
    }
  }

  protected goNext(): void {
    if (this.canGoNext()) {
      this.setPage(this.currentPage() + 1);
    }
  }

  protected jumpPreviousFive(): void {
    if (this.canGoPrevious()) {
      this.setPage(this.currentPage() - 5);
    }
  }

  protected jumpNextFive(): void {
    if (this.canGoNext()) {
      this.setPage(this.currentPage() + 5);
    }
  }

  protected toggleJump(): void {
    if (this.disabled()) {
      return;
    }

    this.setOpenJump(!this.localOpenJump());
  }

  protected updateQuickJumpValue(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.localQuickJumpValue.set(target.value);
  }

  protected submitQuickJump(): void {
    const value = Number(this.localQuickJumpValue().replace(/\./g, '').trim());
    if (!Number.isFinite(value) || value <= 0) {
      return;
    }

    this.setPage(value);
    if (this.quickJumpValue() === null) {
      this.localQuickJumpValue.set('');
    }
  }

  protected onQuickJumpKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    this.submitQuickJump();
  }

  protected formatPageNumber(value: number): string {
    return new Intl.NumberFormat('vi-VN').format(value);
  }

  protected trackPage(_index: number, item: MbbizPaginationPageItem): number {
    return item.page;
  }

  protected trackOption(_index: number, page: number): number {
    return page;
  }

  @HostListener('document:click', ['$event'])
  protected closeOnOutsideClick(event: Event): void {
    if (!this.localOpenJump()) {
      return;
    }

    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.setOpenJump(false);
    }
  }

  private setOpenJump(open: boolean): void {
    this.localOpenJump.set(open);
    this.openJumpChange.emit(open);
  }

  private normalizedTotal(): number {
    return Math.max(0, Math.round(this.total()));
  }

  private normalizedPageSize(): number {
    return Math.max(1, Math.round(this.pageSize()));
  }

  private calculateTotalPages(): number {
    const pageCount = this.pageCount();
    if (pageCount !== null && Number.isFinite(pageCount)) {
      return Math.max(1, Math.round(pageCount));
    }

    return Math.max(1, Math.ceil(this.normalizedTotal() / this.normalizedPageSize()));
  }

  private clampPage(page: number, totalPages: number): number {
    const numericPage = Number.isFinite(page) ? Math.round(page) : 1;
    return Math.min(totalPages, Math.max(1, numericPage));
  }
}
