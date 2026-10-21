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

import { MbbizButtonComponent } from '../button/button.component';
import type {
  MbbizButtonShape,
  MbbizButtonSize,
  MbbizButtonVariant,
} from '../button/button.types';
import { MbbizButtonLinkComponent } from '../button-link/button-link.component';
import { MbbizCheckboxComponent } from '../checkbox/checkbox.component';
import { MbbizDropdownComponent } from '../dropdown/dropdown.component';
import type { MbbizDropdownItem } from '../dropdown/dropdown.types';
import { MbbizInputComponent } from '../input/input.component';
import { MbbizPaginationComponent } from '../pagination/pagination.component';
import {
  SPORTBOOK6VN_ITEM_FILE_ILLUSTRATION_BASE_PATH,
  SPORTBOOK6VN_ITEM_FILE_ILLUSTRATION_FILES,
} from '../item-file/item-file.assets';
import type { MbbizItemFileKind } from '../item-file/item-file.types';
import {
  SPORTBOOK6VN_TABLE_CURRENCY_FLAG_FILES,
  SPORTBOOK6VN_TABLE_ILLUSTRATION_BASE_PATH,
  SPORTBOOK6VN_TABLE_REMIND_FILE,
} from './table.assets';
import type {
  MbbizTableActionCell,
  MbbizTableAlertCell,
  MbbizTableAlertTone,
  MbbizTableCellEvent,
  MbbizTableCellType,
  MbbizTableCellValue,
  MbbizTableCellValueChange,
  MbbizTableColumn,
  MbbizTableCurrencyCell,
  MbbizTableDropdownCell,
  MbbizTableFileCell,
  MbbizTableIconAction,
  MbbizTableIconCell,
  MbbizTableIconName,
  MbbizTableInputCell,
  MbbizTableOption,
  MbbizTableRemindCell,
  MbbizTableRow,
  MbbizTableRowEvent,
  MbbizTableSize,
  MbbizTableSortChange,
  MbbizTableSortOrder,
  MbbizTableStatusCell,
  MbbizTableStatusTone,
} from './table.types';

const SORT_ORDER_SEQUENCE: MbbizTableSortOrder[] = ['ascend', 'descend', null];
const DEFAULT_PAGE_SIZE = 10;

@Component({
  selector: 'mbbiz-table',
  imports: [
    CommonModule,
    MbbizButtonComponent,
    MbbizButtonLinkComponent,
    MbbizCheckboxComponent,
    MbbizDropdownComponent,
    MbbizInputComponent,
    MbbizPaginationComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class MbbizTableComponent implements AfterViewInit {
  readonly columns = input<readonly MbbizTableColumn[]>([]);
  readonly data = input<readonly MbbizTableRow[]>([]);
  readonly rowKey = input('id');
  readonly ariaLabel = input('Data table');
  readonly size = input<MbbizTableSize>('default');
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
  readonly rowClick = output<MbbizTableRowEvent>();
  readonly cellClick = output<MbbizTableCellEvent>();
  readonly cellValueChange = output<MbbizTableCellValueChange>();
  readonly sortChange = output<MbbizTableSortChange>();
  readonly pageIndexChange = output<number>();

  protected readonly localSelectedKeys = signal<Set<string>>(new Set());
  protected readonly localPageIndex = signal(1);
  protected readonly activeSort = signal<{ key: string; order: MbbizTableSortOrder } | null>(null);
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
      'mbbiz-table',
      `mbbiz-table--${this.size()}`,
      this.selectable() ? 'mbbiz-table--selectable' : '',
      this.loading() ? 'mbbiz-table--loading' : '',
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

  protected trackColumn(_index: number, column: MbbizTableColumn): string {
    return column.key;
  }

  protected trackRow(index: number, row: MbbizTableRow): string {
    return this.resolvedRowKey(row, index);
  }

  protected cellValue(row: MbbizTableRow, column: MbbizTableColumn): MbbizTableCellValue {
    return row[column.key];
  }

  protected resolvedCellType(column: MbbizTableColumn): MbbizTableCellType {
    return column.type ?? 'text';
  }

  protected columnWidth(column: MbbizTableColumn): string | null {
    if (column.width === undefined || column.width === null) {
      return null;
    }

    return typeof column.width === 'number' ? `${column.width}px` : column.width;
  }

  protected headerCellClass(column: MbbizTableColumn): string {
    const align = this.resolvedAlign(column, 'header');
    return [
      'mbbiz-table__header-cell',
      `mbbiz-table__header-cell--${align}`,
      `mbbiz-table__header-cell--${this.resolvedCellType(column)}`,
      column.fixed ? `mbbiz-table__header-cell--fixed-${column.fixed}` : '',
      column.sortable ? 'mbbiz-table__header-cell--sortable' : '',
      this.activeSort()?.key === column.key && this.activeSort()?.order
        ? 'mbbiz-table__header-cell--sorted'
        : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected bodyCellClass(column: MbbizTableColumn): string {
    const type = this.resolvedCellType(column);
    const align = this.resolvedAlign(column, 'body');
    return [
      'mbbiz-table__cell',
      `mbbiz-table__cell--${align}`,
      `mbbiz-table__cell--${type}`,
      column.fixed ? `mbbiz-table__cell--fixed-${column.fixed}` : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected onViewportScroll(event: Event): void {
    this.updateFixedRightShadow(event.currentTarget as HTMLElement);
  }

  protected rowClass(row: MbbizTableRow, index: number): string {
    return [
      'mbbiz-table__row',
      this.localSelectedKeys().has(this.resolvedRowKey(row, index)) ? 'mbbiz-table__row--selected' : '',
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

  protected displayText(row: MbbizTableRow, column: MbbizTableColumn): string {
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

  protected statusCell(row: MbbizTableRow, column: MbbizTableColumn): MbbizTableStatusCell {
    const value = this.cellValue(row, column);
    if (this.isObject(value) && 'label' in value) {
      return {
        label: String(value.label ?? ''),
        tone: this.resolveStatusTone((value as MbbizTableStatusCell).tone),
      };
    }

    return {
      label: this.displayText(row, column) || 'Hoạt động',
      tone: 'success',
    };
  }

  protected statusClass(row: MbbizTableRow, column: MbbizTableColumn): string {
    return `mbbiz-table-status mbbiz-table-status--${this.statusCell(row, column).tone}`;
  }

  protected fileIconSrc(row: MbbizTableRow, column: MbbizTableColumn): string {
    const value = this.cellValue(row, column);
    const kind = this.fileKind(value);
    const basePath = this.illustrationBasePath().replace(/\/$/, '');
    return `${basePath}/${SPORTBOOK6VN_ITEM_FILE_ILLUSTRATION_FILES[kind]}`;
  }

  protected fileAlt(row: MbbizTableRow, column: MbbizTableColumn): string {
    const value = this.cellValue(row, column);
    if (this.isObject(value) && 'alt' in value && value.alt) {
      return String(value.alt);
    }

    const kind = this.fileKind(value);
    return `${kind.toUpperCase()} file`;
  }

  protected currencyLabel(row: MbbizTableRow, column: MbbizTableColumn): string {
    const value = this.cellValue(row, column);
    if (this.isObject(value)) {
      const currency = value as MbbizTableCurrencyCell;
      return String(currency.label ?? currency.code ?? 'VND');
    }

    if (value === null || value === undefined || value === '') {
      return 'VND';
    }

    return String(value);
  }

  protected currencyFlagSrc(row: MbbizTableRow, column: MbbizTableColumn): string {
    const value = this.cellValue(row, column);
    if (this.isObject(value)) {
      const currency = value as MbbizTableCurrencyCell;
      if (currency.flagSrc) {
        return currency.flagSrc;
      }
    }

    const code = this.currencyLabel(row, column).trim().toUpperCase();
    const fileName = SPORTBOOK6VN_TABLE_CURRENCY_FLAG_FILES[code] ?? SPORTBOOK6VN_TABLE_CURRENCY_FLAG_FILES['VND'];
    return `${this.tableAssetBasePath()}/${fileName}`;
  }

  protected currencyFlagAlt(row: MbbizTableRow, column: MbbizTableColumn): string {
    const value = this.cellValue(row, column);
    if (this.isObject(value)) {
      const currency = value as MbbizTableCurrencyCell;
      if (currency.flagAlt) {
        return currency.flagAlt;
      }
    }

    return `${this.currencyLabel(row, column)} flag`;
  }

  protected remindIconSrc(row: MbbizTableRow, column: MbbizTableColumn): string {
    const value = this.cellValue(row, column);
    if (this.isObject(value)) {
      const remind = value as MbbizTableRemindCell;
      if (remind.iconSrc) {
        return remind.iconSrc;
      }
    }

    return `${this.tableAssetBasePath()}/${SPORTBOOK6VN_TABLE_REMIND_FILE}`;
  }

  protected remindAlt(row: MbbizTableRow, column: MbbizTableColumn): string {
    const value = this.cellValue(row, column);
    if (this.isObject(value)) {
      const remind = value as MbbizTableRemindCell;
      return String(remind.alt ?? remind.label ?? 'Remind');
    }

    return 'Remind';
  }

  protected checkboxLabel(row: MbbizTableRow, column: MbbizTableColumn): string | null {
    const value = this.cellValue(row, column);
    if (this.isObject(value) && 'label' in value && value.label !== undefined) {
      return String(value.label);
    }

    return null;
  }

  protected checkboxChecked(row: MbbizTableRow, column: MbbizTableColumn): boolean {
    const value = this.cellValue(row, column);
    if (typeof value === 'boolean') {
      return value;
    }

    if (this.isObject(value) && 'value' in value) {
      return !!value.value;
    }

    return false;
  }

  protected isCheckboxColumnAllSelected(column: MbbizTableColumn): boolean {
    const rows = this.pagedData();
    return rows.length > 0 && rows.every((row) => this.checkboxChecked(row, column));
  }

  protected isCheckboxColumnIndeterminate(column: MbbizTableColumn): boolean {
    const rows = this.pagedData();
    const selectedCount = rows.filter((row) => this.checkboxChecked(row, column)).length;
    return selectedCount > 0 && selectedCount < rows.length;
  }

  protected inputCell(row: MbbizTableRow, column: MbbizTableColumn): MbbizTableInputCell {
    const value = this.cellValue(row, column);
    if (this.isObject(value)) {
      return value as MbbizTableInputCell;
    }

    return {
      value: value === null || value === undefined ? '' : String(value),
      placeholder: column.placeholder ?? 'Input text',
    };
  }

  protected inputValue(row: MbbizTableRow, column: MbbizTableColumn): string {
    const value = this.inputCell(row, column).value;
    return value === null || value === undefined ? '' : String(value);
  }

  protected dropdownCell(row: MbbizTableRow, column: MbbizTableColumn): MbbizTableDropdownCell {
    const value = this.cellValue(row, column);
    if (this.isObject(value)) {
      return value as MbbizTableDropdownCell;
    }

    return {
      value: value === null || value === undefined ? null : String(value),
      placeholder: column.placeholder ?? 'Lựa chọn',
      options: column.options,
    };
  }

  protected dropdownOptions(row: MbbizTableRow, column: MbbizTableColumn): readonly MbbizTableOption[] {
    return this.dropdownCell(row, column).options ?? column.options ?? [];
  }

  protected dropdownItems(row: MbbizTableRow, column: MbbizTableColumn): MbbizDropdownItem[] {
    return this.dropdownOptions(row, column).map((option) => ({
      id: String(option.value),
      label: option.label,
      disabled: option.disabled,
    }));
  }

  protected dropdownValue(row: MbbizTableRow, column: MbbizTableColumn): string | null {
    const value = this.dropdownCell(row, column).value;
    return value === null || value === undefined || value === '' ? null : String(value);
  }

  protected actionCell(row: MbbizTableRow, column: MbbizTableColumn): MbbizTableActionCell {
    const value = this.cellValue(row, column);
    if (this.isObject(value)) {
      return value as MbbizTableActionCell;
    }

    return { label: this.displayText(row, column) || 'Thao tác' };
  }

  protected shouldRenderButtonComponent(row: MbbizTableRow, column: MbbizTableColumn): boolean {
    const cell = this.actionCell(row, column);
    return !!cell.variant || !!cell.size || !!cell.shape || !!column.buttonVariant || !!column.buttonSize || !!column.buttonShape;
  }

  protected actionButtonVariant(row: MbbizTableRow, column: MbbizTableColumn): MbbizButtonVariant {
    return this.actionCell(row, column).variant ?? column.buttonVariant ?? 'secondary';
  }

  protected actionButtonSize(row: MbbizTableRow, column: MbbizTableColumn): MbbizButtonSize {
    return this.actionCell(row, column).size ?? column.buttonSize ?? 'md';
  }

  protected actionButtonShape(row: MbbizTableRow, column: MbbizTableColumn): MbbizButtonShape {
    return this.actionCell(row, column).shape ?? column.buttonShape ?? 'rectangle';
  }

  protected alertTone(row: MbbizTableRow, column: MbbizTableColumn): MbbizTableAlertTone {
    const value = this.cellValue(row, column);
    if (this.isObject(value) && 'tone' in value) {
      const tone = (value as MbbizTableAlertCell).tone;
      return tone === 'warning' || tone === 'info' ? tone : 'error';
    }

    return 'error';
  }

  protected alertLabel(row: MbbizTableRow, column: MbbizTableColumn): string {
    const value = this.cellValue(row, column);
    if (this.isObject(value) && 'label' in value && value.label) {
      return String(value.label);
    }

    return 'Cảnh báo';
  }

  protected iconActions(row: MbbizTableRow, column: MbbizTableColumn): readonly MbbizTableIconAction[] {
    const value = this.cellValue(row, column);
    if (this.isObject(value)) {
      const iconCell = value as MbbizTableIconCell;
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

  protected iconActionName(action: MbbizTableIconAction): MbbizTableIconName {
    return action.icon ?? 'trash';
  }

  protected iconActionLabel(action: MbbizTableIconAction): string {
    return action.label ?? 'Hành động';
  }

  protected iconActionDisabled(action: MbbizTableIconAction, column: MbbizTableColumn): boolean {
    return !!action.disabled || !!column.disabled;
  }

  protected trackIconAction(index: number, action: MbbizTableIconAction): string {
    return `${action.value ?? action.label ?? action.icon ?? 'icon'}-${index}`;
  }

  protected sortOrder(column: MbbizTableColumn): MbbizTableSortOrder {
    const activeSort = this.activeSort();
    if (activeSort?.key === column.key) {
      return activeSort.order;
    }

    return column.sortOrder ?? null;
  }

  protected toggleSort(column: MbbizTableColumn): void {
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

  protected toggleRow(row: MbbizTableRow, rowIndex: number, checked: boolean): void {
    const next = new Set(this.localSelectedKeys());
    const key = this.resolvedRowKey(row, rowIndex);
    if (checked) {
      next.add(key);
    } else {
      next.delete(key);
    }
    this.emitSelectedKeys(next);
  }

  protected toggleCheckboxColumn(column: MbbizTableColumn, checked: boolean): void {
    this.pagedData().forEach((row, rowIndex) => {
      this.emitCellValueChange(row, column, rowIndex, checked);
    });
  }

  protected emitRowClick(row: MbbizTableRow, rowIndex: number): void {
    this.rowClick.emit({
      row,
      rowKey: this.resolvedRowKey(row, rowIndex),
      rowIndex,
    });
  }

  protected emitCellClick(row: MbbizTableRow, column: MbbizTableColumn, rowIndex: number): void {
    this.cellClick.emit({
      row,
      rowKey: this.resolvedRowKey(row, rowIndex),
      rowIndex,
      column,
      value: this.cellValue(row, column),
    });
  }

  protected onCheckboxCellChange(
    row: MbbizTableRow,
    column: MbbizTableColumn,
    rowIndex: number,
    checked: boolean,
  ): void {
    this.emitCellValueChange(row, column, rowIndex, checked);
  }

  protected onInputCellValueChange(
    row: MbbizTableRow,
    column: MbbizTableColumn,
    rowIndex: number,
    nextValue: string,
  ): void {
    this.emitCellValueChange(row, column, rowIndex, nextValue);
  }

  protected onDropdownCellValueChange(
    row: MbbizTableRow,
    column: MbbizTableColumn,
    rowIndex: number,
    nextValue: string | null,
  ): void {
    this.emitCellValueChange(row, column, rowIndex, nextValue);
  }

  protected onActionCellClick(
    row: MbbizTableRow,
    column: MbbizTableColumn,
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
    row: MbbizTableRow,
    column: MbbizTableColumn,
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

  private resolvedRowKey(row: MbbizTableRow, index: number): string {
    const candidate = row[this.rowKey()] ?? row['key'] ?? row['id'] ?? index;
    return String(candidate);
  }

  private sortValue(value: MbbizTableCellValue): string {
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

  private defaultAlign(column: MbbizTableColumn): 'left' | 'center' | 'right' {
    const type = this.resolvedCellType(column);
    if (type === 'money' || type === 'money-in' || type === 'money-out') {
      return 'right';
    }

    if (type === 'icon' || type === 'remind') {
      return 'right';
    }

    return 'left';
  }

  private resolvedAlign(column: MbbizTableColumn, target: 'header' | 'body'): 'left' | 'center' | 'right' {
    const forcedAlign = this.forcedTypeAlign(this.resolvedCellType(column));
    if (forcedAlign) {
      return forcedAlign;
    }

    return target === 'header'
      ? column.headerAlign ?? column.align ?? this.defaultAlign(column)
      : column.align ?? this.defaultAlign(column);
  }

  private forcedTypeAlign(type: MbbizTableCellType): 'left' | 'right' | null {
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

  private formatMoney(value: MbbizTableCellValue): string {
    const rawValue = this.isObject(value) && 'value' in value ? value.value : value;
    const numeric = typeof rawValue === 'number' ? rawValue : Number(String(rawValue).replace(/,/g, ''));
    if (Number.isFinite(numeric)) {
      return new Intl.NumberFormat('en-US').format(numeric);
    }

    return String(rawValue ?? '');
  }

  private formatSignedMoney(value: MbbizTableCellValue, sign: '+' | '-'): string {
    const rawValue = this.isObject(value) && 'value' in value ? value.value : value;
    const numeric = typeof rawValue === 'number' ? rawValue : Number(String(rawValue).replace(/,/g, ''));
    if (Number.isFinite(numeric)) {
      return `${sign}${new Intl.NumberFormat('en-US').format(Math.abs(numeric))}`;
    }

    const text = String(rawValue ?? '').replace(/^[+-]/, '');
    return text ? `${sign}${text}` : '';
  }

  private fileKind(value: MbbizTableCellValue): MbbizItemFileKind {
    if (this.isObject(value) && 'kind' in value && value.kind) {
      return value.kind as MbbizItemFileKind;
    }

    if (typeof value === 'string') {
      const extension = value.split('.').pop()?.toLowerCase();
      if (extension === 'xlsx' || extension === 'docx' || extension === 'pdf' || extension === 'jpg' || extension === 'xml') {
        return extension;
      }
    }

    return 'xlsx';
  }

  private resolveStatusTone(tone: MbbizTableStatusTone | undefined): MbbizTableStatusTone {
    return tone ?? 'success';
  }

  private isObject(value: MbbizTableCellValue): value is Exclude<MbbizTableCellValue, string | number | boolean | null | undefined> {
    return typeof value === 'object' && value !== null;
  }
}
