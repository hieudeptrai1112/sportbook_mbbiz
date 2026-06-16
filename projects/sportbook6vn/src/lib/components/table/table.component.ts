import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';

import { Sportbook6vnButtonComponent } from '../button/button.component';
import type {
  Sportbook6vnButtonShape,
  Sportbook6vnButtonSize,
  Sportbook6vnButtonVariant,
} from '../button/button.types';
import { Sportbook6vnButtonLinkComponent } from '../button-link/button-link.component';
import { Sportbook6vnCheckboxComponent } from '../checkbox/checkbox.component';
import { Sportbook6vnDropdownComponent } from '../dropdown/dropdown.component';
import type { Sportbook6vnDropdownItem } from '../dropdown/dropdown.types';
import { Sportbook6vnInputComponent } from '../input/input.component';
import { Sportbook6vnPaginationComponent } from '../pagination/pagination.component';
import {
  SPORTBOOK6VN_ITEM_FILE_ILLUSTRATION_BASE_PATH,
  SPORTBOOK6VN_ITEM_FILE_ILLUSTRATION_FILES,
} from '../item-file/item-file.assets';
import type { Sportbook6vnItemFileKind } from '../item-file/item-file.types';
import {
  SPORTBOOK6VN_TABLE_CURRENCY_FLAG_FILES,
  SPORTBOOK6VN_TABLE_ILLUSTRATION_BASE_PATH,
  SPORTBOOK6VN_TABLE_REMIND_FILE,
} from './table.assets';
import type {
  Sportbook6vnTableActionCell,
  Sportbook6vnTableAlertCell,
  Sportbook6vnTableAlertTone,
  Sportbook6vnTableCellEvent,
  Sportbook6vnTableCellType,
  Sportbook6vnTableCellValue,
  Sportbook6vnTableCellValueChange,
  Sportbook6vnTableColumn,
  Sportbook6vnTableCurrencyCell,
  Sportbook6vnTableDropdownCell,
  Sportbook6vnTableFileCell,
  Sportbook6vnTableIconAction,
  Sportbook6vnTableIconCell,
  Sportbook6vnTableIconName,
  Sportbook6vnTableInputCell,
  Sportbook6vnTableOption,
  Sportbook6vnTableRemindCell,
  Sportbook6vnTableRow,
  Sportbook6vnTableRowEvent,
  Sportbook6vnTableSize,
  Sportbook6vnTableSortChange,
  Sportbook6vnTableSortOrder,
  Sportbook6vnTableStatusCell,
  Sportbook6vnTableStatusTone,
} from './table.types';

const SORT_ORDER_SEQUENCE: Sportbook6vnTableSortOrder[] = ['ascend', 'descend', null];
const DEFAULT_PAGE_SIZE = 10;

@Component({
  selector: 'sportbook6vn-table',
  imports: [
    CommonModule,
    Sportbook6vnButtonComponent,
    Sportbook6vnButtonLinkComponent,
    Sportbook6vnCheckboxComponent,
    Sportbook6vnDropdownComponent,
    Sportbook6vnInputComponent,
    Sportbook6vnPaginationComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class Sportbook6vnTableComponent implements AfterViewInit {
  readonly columns = input<readonly Sportbook6vnTableColumn[]>([]);
  readonly data = input<readonly Sportbook6vnTableRow[]>([]);
  readonly rowKey = input('id');
  readonly ariaLabel = input('Data table');
  readonly size = input<Sportbook6vnTableSize>('default');
  readonly loading = input(false);
  readonly showHeader = input(true);
  readonly selectable = input(false);
  readonly selectedRowKeys = input<readonly string[]>([]);
  readonly showPagination = input(false);
  readonly pageIndex = input(1);
  readonly pageSize = input(DEFAULT_PAGE_SIZE);
  readonly emptyText = input('Không có dữ liệu');
  readonly tableLayout = input<'auto' | 'fixed'>('auto');
  readonly maxHeight = input<string | null>(null);
  readonly illustrationBasePath = input(SPORTBOOK6VN_ITEM_FILE_ILLUSTRATION_BASE_PATH);
  readonly tableIllustrationBasePath = input(SPORTBOOK6VN_TABLE_ILLUSTRATION_BASE_PATH);

  readonly selectedRowKeysChange = output<string[]>();
  readonly rowClick = output<Sportbook6vnTableRowEvent>();
  readonly cellClick = output<Sportbook6vnTableCellEvent>();
  readonly cellValueChange = output<Sportbook6vnTableCellValueChange>();
  readonly sortChange = output<Sportbook6vnTableSortChange>();
  readonly pageIndexChange = output<number>();

  protected readonly localSelectedKeys = signal<Set<string>>(new Set());
  protected readonly localPageIndex = signal(1);
  protected readonly activeSort = signal<{ key: string; order: Sportbook6vnTableSortOrder } | null>(null);
  protected readonly showFixedRightShadow = signal(false);

  @ViewChild('viewport') private readonly viewport?: ElementRef<HTMLElement>;

  constructor() {
    effect(() => {
      this.localSelectedKeys.set(new Set(this.selectedRowKeys().map(String)));
    });

    effect(() => {
      const pageIndex = Math.max(1, Math.round(this.pageIndex()));
      this.localPageIndex.set(pageIndex);
    });

    effect(() => {
      this.columns();
      this.pagedData();
      this.scheduleFixedRightShadowUpdate();
    });
  }

  ngAfterViewInit(): void {
    this.scheduleFixedRightShadowUpdate();
  }

  @HostListener('window:resize')
  protected onWindowResize(): void {
    this.scheduleFixedRightShadowUpdate();
  }

  protected readonly tableClass = computed(() =>
    [
      'sportbook6vn-table',
      `sportbook6vn-table--${this.size()}`,
      this.selectable() ? 'sportbook6vn-table--selectable' : '',
      this.loading() ? 'sportbook6vn-table--loading' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected readonly sortedData = computed(() => {
    const data = [...this.data()];
    const sort = this.activeSort();
    if (!sort?.order) {
      return data;
    }

    const column = this.columns().find((item) => item.key === sort.key);
    if (!column) {
      return data;
    }

    return data.sort((leftRow, rightRow) => {
      const left = this.sortValue(this.cellValue(leftRow, column));
      const right = this.sortValue(this.cellValue(rightRow, column));
      const compare = left.localeCompare(right, 'vi', { numeric: true, sensitivity: 'base' });
      return sort.order === 'ascend' ? compare : -compare;
    });
  });

  protected readonly totalPages = computed(() => {
    if (!this.showPagination()) {
      return 1;
    }

    return Math.max(1, Math.ceil(this.sortedData().length / this.resolvedPageSize()));
  });

  protected readonly pagedData = computed(() => {
    const data = this.sortedData();
    if (!this.showPagination()) {
      return data;
    }

    const pageSize = this.resolvedPageSize();
    const pageIndex = Math.min(this.localPageIndex(), this.totalPages());
    const start = (pageIndex - 1) * pageSize;
    return data.slice(start, start + pageSize);
  });

  protected readonly isAllSelected = computed(() => {
    const rows = this.pagedData();
    return rows.length > 0 && rows.every((row, index) => this.localSelectedKeys().has(this.resolvedRowKey(row, index)));
  });

  protected readonly isIndeterminate = computed(() => {
    const rows = this.pagedData();
    const selectedCount = rows.filter((row, index) => this.localSelectedKeys().has(this.resolvedRowKey(row, index))).length;
    return selectedCount > 0 && selectedCount < rows.length;
  });

  protected readonly resolvedPageIndex = computed(() => Math.min(this.localPageIndex(), this.totalPages()));

  protected readonly canPreviousPage = computed(() => this.resolvedPageIndex() > 1);
  protected readonly canNextPage = computed(() => this.resolvedPageIndex() < this.totalPages());

  protected trackColumn(_index: number, column: Sportbook6vnTableColumn): string {
    return column.key;
  }

  protected trackRow(index: number, row: Sportbook6vnTableRow): string {
    return this.resolvedRowKey(row, index);
  }

  protected cellValue(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): Sportbook6vnTableCellValue {
    return row[column.key];
  }

  protected resolvedCellType(column: Sportbook6vnTableColumn): Sportbook6vnTableCellType {
    return column.type ?? 'text';
  }

  protected columnWidth(column: Sportbook6vnTableColumn): string | null {
    if (column.width === undefined || column.width === null) {
      return null;
    }

    return typeof column.width === 'number' ? `${column.width}px` : column.width;
  }

  protected headerCellClass(column: Sportbook6vnTableColumn): string {
    const align = this.resolvedAlign(column, 'header');
    return [
      'sportbook6vn-table__header-cell',
      `sportbook6vn-table__header-cell--${align}`,
      `sportbook6vn-table__header-cell--${this.resolvedCellType(column)}`,
      column.fixed ? `sportbook6vn-table__header-cell--fixed-${column.fixed}` : '',
      column.sortable ? 'sportbook6vn-table__header-cell--sortable' : '',
      this.activeSort()?.key === column.key && this.activeSort()?.order
        ? 'sportbook6vn-table__header-cell--sorted'
        : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected bodyCellClass(column: Sportbook6vnTableColumn): string {
    const type = this.resolvedCellType(column);
    const align = this.resolvedAlign(column, 'body');
    return [
      'sportbook6vn-table__cell',
      `sportbook6vn-table__cell--${align}`,
      `sportbook6vn-table__cell--${type}`,
      column.fixed ? `sportbook6vn-table__cell--fixed-${column.fixed}` : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected onViewportScroll(event: Event): void {
    this.updateFixedRightShadow(event.currentTarget as HTMLElement);
  }

  protected rowClass(row: Sportbook6vnTableRow, index: number): string {
    return [
      'sportbook6vn-table__row',
      this.localSelectedKeys().has(this.resolvedRowKey(row, index)) ? 'sportbook6vn-table__row--selected' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private scheduleFixedRightShadowUpdate(): void {
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => this.updateFixedRightShadow());
      return;
    }

    queueMicrotask(() => this.updateFixedRightShadow());
  }

  private updateFixedRightShadow(viewport = this.viewport?.nativeElement): void {
    if (!viewport) {
      this.showFixedRightShadow.set(false);
      return;
    }

    const hasFixedRightColumn = this.columns().some((column) => column.fixed === 'right');
    const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;
    const isScrollable = maxScrollLeft > 1;
    const isAwayFromRightEdge = viewport.scrollLeft < maxScrollLeft - 1;
    this.showFixedRightShadow.set(hasFixedRightColumn && isScrollable && isAwayFromRightEdge);
  }

  protected displayText(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): string {
    const value = this.cellValue(row, column);
    const type = this.resolvedCellType(column);

    if (value === null || value === undefined || value === '') {
      return column.placeholder ?? '';
    }

    if (type === 'money-in') {
      return this.formatSignedMoney(value, '+');
    }

    if (type === 'money-out') {
      return this.formatSignedMoney(value, '-');
    }

    if (type === 'money' || type === 'currency') {
      return this.formatMoney(value);
    }

    if (typeof value === 'object') {
      if ('label' in value && value.label !== undefined) {
        return String(value.label);
      }

      if ('value' in value && value.value !== undefined && value.value !== null) {
        return String(value.value);
      }

      if ('name' in value && value.name) {
        return String(value.name);
      }
    }

    return String(value);
  }

  protected statusCell(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): Sportbook6vnTableStatusCell {
    const value = this.cellValue(row, column);
    if (this.isObject(value) && 'label' in value) {
      return {
        label: String(value.label ?? ''),
        tone: this.resolveStatusTone((value as Sportbook6vnTableStatusCell).tone),
      };
    }

    return {
      label: this.displayText(row, column) || 'Hoạt động',
      tone: 'success',
    };
  }

  protected statusClass(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): string {
    return `sportbook6vn-table-status sportbook6vn-table-status--${this.statusCell(row, column).tone}`;
  }

  protected fileIconSrc(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): string {
    const value = this.cellValue(row, column);
    const kind = this.fileKind(value);
    const basePath = this.illustrationBasePath().replace(/\/$/, '');
    return `${basePath}/${SPORTBOOK6VN_ITEM_FILE_ILLUSTRATION_FILES[kind]}`;
  }

  protected fileAlt(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): string {
    const value = this.cellValue(row, column);
    if (this.isObject(value) && 'alt' in value && value.alt) {
      return String(value.alt);
    }

    const kind = this.fileKind(value);
    return `${kind.toUpperCase()} file`;
  }

  protected currencyLabel(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): string {
    const value = this.cellValue(row, column);
    if (this.isObject(value)) {
      const currency = value as Sportbook6vnTableCurrencyCell;
      return String(currency.label ?? currency.code ?? 'VND');
    }

    if (value === null || value === undefined || value === '') {
      return 'VND';
    }

    return String(value);
  }

  protected currencyFlagSrc(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): string {
    const value = this.cellValue(row, column);
    if (this.isObject(value)) {
      const currency = value as Sportbook6vnTableCurrencyCell;
      if (currency.flagSrc) {
        return currency.flagSrc;
      }
    }

    const code = this.currencyLabel(row, column).trim().toUpperCase();
    const fileName = SPORTBOOK6VN_TABLE_CURRENCY_FLAG_FILES[code] ?? SPORTBOOK6VN_TABLE_CURRENCY_FLAG_FILES['VND'];
    return `${this.tableAssetBasePath()}/${fileName}`;
  }

  protected currencyFlagAlt(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): string {
    const value = this.cellValue(row, column);
    if (this.isObject(value)) {
      const currency = value as Sportbook6vnTableCurrencyCell;
      if (currency.flagAlt) {
        return currency.flagAlt;
      }
    }

    return `${this.currencyLabel(row, column)} flag`;
  }

  protected remindIconSrc(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): string {
    const value = this.cellValue(row, column);
    if (this.isObject(value)) {
      const remind = value as Sportbook6vnTableRemindCell;
      if (remind.iconSrc) {
        return remind.iconSrc;
      }
    }

    return `${this.tableAssetBasePath()}/${SPORTBOOK6VN_TABLE_REMIND_FILE}`;
  }

  protected remindAlt(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): string {
    const value = this.cellValue(row, column);
    if (this.isObject(value)) {
      const remind = value as Sportbook6vnTableRemindCell;
      return String(remind.alt ?? remind.label ?? 'Remind');
    }

    return 'Remind';
  }

  protected checkboxLabel(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): string | null {
    const value = this.cellValue(row, column);
    if (this.isObject(value) && 'label' in value && value.label !== undefined) {
      return String(value.label);
    }

    return null;
  }

  protected checkboxChecked(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): boolean {
    const value = this.cellValue(row, column);
    if (typeof value === 'boolean') {
      return value;
    }

    if (this.isObject(value) && 'value' in value) {
      return !!value.value;
    }

    return false;
  }

  protected isCheckboxColumnAllSelected(column: Sportbook6vnTableColumn): boolean {
    const rows = this.pagedData();
    return rows.length > 0 && rows.every((row) => this.checkboxChecked(row, column));
  }

  protected isCheckboxColumnIndeterminate(column: Sportbook6vnTableColumn): boolean {
    const rows = this.pagedData();
    const selectedCount = rows.filter((row) => this.checkboxChecked(row, column)).length;
    return selectedCount > 0 && selectedCount < rows.length;
  }

  protected inputCell(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): Sportbook6vnTableInputCell {
    const value = this.cellValue(row, column);
    if (this.isObject(value)) {
      return value as Sportbook6vnTableInputCell;
    }

    return {
      value: value === null || value === undefined ? '' : String(value),
      placeholder: column.placeholder ?? 'Input text',
    };
  }

  protected inputValue(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): string {
    const value = this.inputCell(row, column).value;
    return value === null || value === undefined ? '' : String(value);
  }

  protected dropdownCell(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): Sportbook6vnTableDropdownCell {
    const value = this.cellValue(row, column);
    if (this.isObject(value)) {
      return value as Sportbook6vnTableDropdownCell;
    }

    return {
      value: value === null || value === undefined ? null : String(value),
      placeholder: column.placeholder ?? 'Lựa chọn',
      options: column.options,
    };
  }

  protected dropdownOptions(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): readonly Sportbook6vnTableOption[] {
    return this.dropdownCell(row, column).options ?? column.options ?? [];
  }

  protected dropdownItems(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): Sportbook6vnDropdownItem[] {
    return this.dropdownOptions(row, column).map((option) => ({
      id: String(option.value),
      label: option.label,
      disabled: option.disabled,
    }));
  }

  protected dropdownValue(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): string | null {
    const value = this.dropdownCell(row, column).value;
    return value === null || value === undefined || value === '' ? null : String(value);
  }

  protected actionCell(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): Sportbook6vnTableActionCell {
    const value = this.cellValue(row, column);
    if (this.isObject(value)) {
      return value as Sportbook6vnTableActionCell;
    }

    return { label: this.displayText(row, column) || 'Thao tác' };
  }

  protected shouldRenderButtonComponent(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): boolean {
    const cell = this.actionCell(row, column);
    return !!cell.variant || !!cell.size || !!cell.shape || !!column.buttonVariant || !!column.buttonSize || !!column.buttonShape;
  }

  protected actionButtonVariant(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): Sportbook6vnButtonVariant {
    return this.actionCell(row, column).variant ?? column.buttonVariant ?? 'secondary';
  }

  protected actionButtonSize(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): Sportbook6vnButtonSize {
    return this.actionCell(row, column).size ?? column.buttonSize ?? 'md';
  }

  protected actionButtonShape(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): Sportbook6vnButtonShape {
    return this.actionCell(row, column).shape ?? column.buttonShape ?? 'rectangle';
  }

  protected alertTone(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): Sportbook6vnTableAlertTone {
    const value = this.cellValue(row, column);
    if (this.isObject(value) && 'tone' in value) {
      const tone = (value as Sportbook6vnTableAlertCell).tone;
      return tone === 'warning' || tone === 'info' ? tone : 'error';
    }

    return 'error';
  }

  protected alertLabel(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): string {
    const value = this.cellValue(row, column);
    if (this.isObject(value) && 'label' in value && value.label) {
      return String(value.label);
    }

    return 'Cảnh báo';
  }

  protected iconActions(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn): readonly Sportbook6vnTableIconAction[] {
    const value = this.cellValue(row, column);
    if (this.isObject(value)) {
      const iconCell = value as Sportbook6vnTableIconCell;
      if (Array.isArray(iconCell.icons) && iconCell.icons.length > 0) {
        return iconCell.icons;
      }

      return [
        {
          icon: iconCell.icon ?? 'trash',
          label: iconCell.label ?? 'Hành động',
          value: iconCell.value,
          disabled: iconCell.disabled,
        },
      ];
    }

    return [
      {
        icon: 'trash',
        label: this.displayText(row, column) || 'Hành động',
      },
    ];
  }

  protected iconActionName(action: Sportbook6vnTableIconAction): Sportbook6vnTableIconName {
    return action.icon ?? 'trash';
  }

  protected iconActionLabel(action: Sportbook6vnTableIconAction): string {
    return action.label ?? 'Hành động';
  }

  protected iconActionDisabled(action: Sportbook6vnTableIconAction, column: Sportbook6vnTableColumn): boolean {
    return !!action.disabled || !!column.disabled;
  }

  protected trackIconAction(index: number, action: Sportbook6vnTableIconAction): string {
    return `${action.value ?? action.label ?? action.icon ?? 'icon'}-${index}`;
  }

  protected sortOrder(column: Sportbook6vnTableColumn): Sportbook6vnTableSortOrder {
    const activeSort = this.activeSort();
    if (activeSort?.key === column.key) {
      return activeSort.order;
    }

    return column.sortOrder ?? null;
  }

  protected toggleSort(column: Sportbook6vnTableColumn): void {
    if (!column.sortable) {
      return;
    }

    const current = this.sortOrder(column);
    const currentIndex = SORT_ORDER_SEQUENCE.indexOf(current);
    const nextOrder = SORT_ORDER_SEQUENCE[(currentIndex + 1) % SORT_ORDER_SEQUENCE.length];
    this.activeSort.set(nextOrder ? { key: column.key, order: nextOrder } : null);
    this.sortChange.emit({ column, order: nextOrder });
  }

  protected toggleAll(checked: boolean): void {
    const next = new Set(this.localSelectedKeys());
    this.pagedData().forEach((row, index) => {
      const key = this.resolvedRowKey(row, index);
      if (checked) {
        next.add(key);
      } else {
        next.delete(key);
      }
    });
    this.emitSelectedKeys(next);
  }

  protected toggleRow(row: Sportbook6vnTableRow, rowIndex: number, checked: boolean): void {
    const next = new Set(this.localSelectedKeys());
    const key = this.resolvedRowKey(row, rowIndex);
    if (checked) {
      next.add(key);
    } else {
      next.delete(key);
    }
    this.emitSelectedKeys(next);
  }

  protected toggleCheckboxColumn(column: Sportbook6vnTableColumn, checked: boolean): void {
    this.pagedData().forEach((row, rowIndex) => {
      this.emitCellValueChange(row, column, rowIndex, checked);
    });
  }

  protected emitRowClick(row: Sportbook6vnTableRow, rowIndex: number): void {
    this.rowClick.emit({
      row,
      rowKey: this.resolvedRowKey(row, rowIndex),
      rowIndex,
    });
  }

  protected emitCellClick(row: Sportbook6vnTableRow, column: Sportbook6vnTableColumn, rowIndex: number): void {
    this.cellClick.emit({
      row,
      rowKey: this.resolvedRowKey(row, rowIndex),
      rowIndex,
      column,
      value: this.cellValue(row, column),
    });
  }

  protected onCheckboxCellChange(
    row: Sportbook6vnTableRow,
    column: Sportbook6vnTableColumn,
    rowIndex: number,
    checked: boolean,
  ): void {
    this.emitCellValueChange(row, column, rowIndex, checked);
  }

  protected onInputCellValueChange(
    row: Sportbook6vnTableRow,
    column: Sportbook6vnTableColumn,
    rowIndex: number,
    nextValue: string,
  ): void {
    this.emitCellValueChange(row, column, rowIndex, nextValue);
  }

  protected onDropdownCellValueChange(
    row: Sportbook6vnTableRow,
    column: Sportbook6vnTableColumn,
    rowIndex: number,
    nextValue: string | null,
  ): void {
    this.emitCellValueChange(row, column, rowIndex, nextValue);
  }

  protected onActionCellClick(
    row: Sportbook6vnTableRow,
    column: Sportbook6vnTableColumn,
    rowIndex: number,
    event: Event,
  ): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.actionCell(row, column).disabled || column.disabled) {
      return;
    }

    this.emitCellClick(row, column, rowIndex);
  }

  protected previousPage(): void {
    if (!this.canPreviousPage()) {
      return;
    }

    this.setPage(this.resolvedPageIndex() - 1);
  }

  protected nextPage(): void {
    if (!this.canNextPage()) {
      return;
    }

    this.setPage(this.resolvedPageIndex() + 1);
  }

  private emitSelectedKeys(next: Set<string>): void {
    this.localSelectedKeys.set(next);
    this.selectedRowKeysChange.emit([...next]);
  }

  private emitCellValueChange(
    row: Sportbook6vnTableRow,
    column: Sportbook6vnTableColumn,
    rowIndex: number,
    nextValue: string | number | boolean | null,
  ): void {
    this.cellValueChange.emit({
      row,
      rowKey: this.resolvedRowKey(row, rowIndex),
      rowIndex,
      column,
      value: this.cellValue(row, column),
      nextValue,
    });
  }

  protected setPage(pageIndex: number): void {
    const next = Math.min(this.totalPages(), Math.max(1, pageIndex));
    this.localPageIndex.set(next);
    this.pageIndexChange.emit(next);
  }

  protected resolvedPageSize(): number {
    return Math.max(1, Math.round(this.pageSize()));
  }

  private resolvedRowKey(row: Sportbook6vnTableRow, index: number): string {
    const candidate = row[this.rowKey()] ?? row['key'] ?? row['id'] ?? index;
    return String(candidate);
  }

  private sortValue(value: Sportbook6vnTableCellValue): string {
    if (value === null || value === undefined) {
      return '';
    }

    if (typeof value === 'object') {
      if ('label' in value && value.label !== undefined) {
        return String(value.label);
      }

      if ('value' in value && value.value !== undefined && value.value !== null) {
        return String(value.value);
      }

      if ('name' in value && value.name !== undefined) {
        return String(value.name);
      }
    }

    return String(value);
  }

  private defaultAlign(column: Sportbook6vnTableColumn): 'left' | 'center' | 'right' {
    const type = this.resolvedCellType(column);
    if (type === 'money' || type === 'money-in' || type === 'money-out') {
      return 'right';
    }

    if (type === 'icon' || type === 'remind') {
      return 'right';
    }

    return 'left';
  }

  private resolvedAlign(column: Sportbook6vnTableColumn, target: 'header' | 'body'): 'left' | 'center' | 'right' {
    const forcedAlign = this.forcedTypeAlign(this.resolvedCellType(column));
    if (forcedAlign) {
      return forcedAlign;
    }

    return target === 'header'
      ? column.headerAlign ?? column.align ?? this.defaultAlign(column)
      : column.align ?? this.defaultAlign(column);
  }

  private forcedTypeAlign(type: Sportbook6vnTableCellType): 'left' | 'right' | null {
    if (type === 'money' || type === 'money-in' || type === 'money-out' || type === 'remind') {
      return 'right';
    }

    if (type === 'number' || type === 'currency' || type === 'file' || type === 'text') {
      return 'left';
    }

    return null;
  }

  private tableAssetBasePath(): string {
    return this.tableIllustrationBasePath().replace(/\/$/, '');
  }

  private formatMoney(value: Sportbook6vnTableCellValue): string {
    const rawValue = this.isObject(value) && 'value' in value ? value.value : value;
    const numeric = typeof rawValue === 'number' ? rawValue : Number(String(rawValue).replace(/,/g, ''));
    if (Number.isFinite(numeric)) {
      return new Intl.NumberFormat('en-US').format(numeric);
    }

    return String(rawValue ?? '');
  }

  private formatSignedMoney(value: Sportbook6vnTableCellValue, sign: '+' | '-'): string {
    const rawValue = this.isObject(value) && 'value' in value ? value.value : value;
    const numeric = typeof rawValue === 'number' ? rawValue : Number(String(rawValue).replace(/,/g, ''));
    if (Number.isFinite(numeric)) {
      return `${sign}${new Intl.NumberFormat('en-US').format(Math.abs(numeric))}`;
    }

    const text = String(rawValue ?? '').replace(/^[+-]/, '');
    return text ? `${sign}${text}` : '';
  }

  private fileKind(value: Sportbook6vnTableCellValue): Sportbook6vnItemFileKind {
    if (this.isObject(value) && 'kind' in value && value.kind) {
      return value.kind as Sportbook6vnItemFileKind;
    }

    if (typeof value === 'string') {
      const extension = value.split('.').pop()?.toLowerCase();
      if (extension === 'xlsx' || extension === 'docx' || extension === 'pdf' || extension === 'jpg' || extension === 'xml') {
        return extension;
      }
    }

    return 'xlsx';
  }

  private resolveStatusTone(tone: Sportbook6vnTableStatusTone | undefined): Sportbook6vnTableStatusTone {
    return tone ?? 'success';
  }

  private isObject(value: Sportbook6vnTableCellValue): value is Exclude<Sportbook6vnTableCellValue, string | number | boolean | null | undefined> {
    return typeof value === 'object' && value !== null;
  }
}
