import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Sportbook6vnTableComponent } from './table.component';
import type { Sportbook6vnTableCellValueChange, Sportbook6vnTableColumn, Sportbook6vnTableRow } from './table.types';

describe('Sportbook6vnTableComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnTableComponent],
    }).compileComponents();
  });

  it('renders headers and rows', () => {
    const fixture = TestBed.createComponent(Sportbook6vnTableComponent);
    fixture.componentRef.setInput('columns', [
      { key: 'name', title: 'Tên' },
      { key: 'amount', title: 'Số tiền', type: 'money' },
    ] satisfies Sportbook6vnTableColumn[]);
    fixture.componentRef.setInput('data', [
      { id: '1', name: 'Tài khoản thanh toán', amount: 1000000 },
    ] satisfies Sportbook6vnTableRow[]);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const headers = Array.from(element.querySelectorAll('th')).map((item) => item.textContent?.trim());
    const cells = Array.from(element.querySelectorAll('td')).map((item) => item.textContent?.trim());

    expect(headers).toEqual(['Tên', 'Số tiền']);
    expect(cells).toContain('Tài khoản thanh toán');
    expect(cells).toContain('1,000,000');
  });

  it('renders signed money in and money out values', () => {
    const fixture = TestBed.createComponent(Sportbook6vnTableComponent);
    fixture.componentRef.setInput('columns', [
      { key: 'moneyOut', title: 'Số tiền', type: 'money-out' },
      { key: 'moneyIn', title: 'Số tiền', type: 'money-in' },
    ] satisfies Sportbook6vnTableColumn[]);
    fixture.componentRef.setInput('data', [
      { id: '1', moneyOut: 1000000, moneyIn: 1000000 },
    ] satisfies Sportbook6vnTableRow[]);
    fixture.detectChanges();

    const cells = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('td')).map((item) => item.textContent?.trim());

    expect(cells).toContain('-1,000,000');
    expect(cells).toContain('+1,000,000');
  });

  it('renders checkbox column header and emits page-scoped toggle changes', () => {
    const fixture = TestBed.createComponent(Sportbook6vnTableComponent);
    const changes: Sportbook6vnTableCellValueChange[] = [];
    fixture.componentRef.setInput('columns', [{ key: 'selected', title: 'Title', type: 'checkbox' }] satisfies Sportbook6vnTableColumn[]);
    fixture.componentRef.setInput('data', [
      { id: '1', selected: { label: 'Text', value: true } },
      { id: '2', selected: { label: 'Text', value: false } },
      { id: '3', selected: { label: 'Text', value: false } },
    ] satisfies Sportbook6vnTableRow[]);
    fixture.componentRef.setInput('showPagination', true);
    fixture.componentRef.setInput('pageSize', 2);
    fixture.componentInstance.cellValueChange.subscribe((event) => changes.push(event));
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const headerCheckbox = element.querySelector('thead input') as HTMLInputElement;
    const bodyLabels = Array.from(element.querySelectorAll('tbody .sportbook6vn-checkbox__label')).map((item) =>
      item.textContent?.trim(),
    );

    expect(element.querySelector('thead .sportbook6vn-checkbox__label')?.textContent?.trim()).toBe('Title');
    expect(headerCheckbox.indeterminate).toBe(true);
    expect(bodyLabels).toEqual(['Text', 'Text']);

    headerCheckbox.checked = true;
    headerCheckbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(changes.map((event) => ({ rowKey: event.rowKey, nextValue: event.nextValue }))).toEqual([
      { rowKey: '1', nextValue: true },
      { rowKey: '2', nextValue: true },
    ]);
  });

  it('emits selected row keys', () => {
    @Component({
      imports: [Sportbook6vnTableComponent],
      template: `
        <sportbook6vn-table
          [columns]="columns"
          [data]="rows"
          [selectable]="true"
          (selectedRowKeysChange)="selected = $event"
        />
      `,
    })
    class Sportbook6vnTableSelectionTestHostComponent {
      columns: Sportbook6vnTableColumn[] = [{ key: 'name', title: 'Tên' }];
      rows: Sportbook6vnTableRow[] = [{ id: 'a', name: 'A' }];
      selected: string[] = [];
    }

    const fixture = TestBed.createComponent(Sportbook6vnTableSelectionTestHostComponent);
    fixture.detectChanges();

    const rowCheckbox = fixture.nativeElement.querySelector('tbody input') as HTMLInputElement;
    rowCheckbox.checked = true;
    rowCheckbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(fixture.componentInstance.selected).toEqual(['a']);
  });

  it('cycles sort order when a sortable header is clicked', () => {
    const fixture = TestBed.createComponent(Sportbook6vnTableComponent);
    const sortSpy = vi.fn();
    fixture.componentRef.setInput('columns', [{ key: 'name', title: 'Tên', sortable: true }] satisfies Sportbook6vnTableColumn[]);
    fixture.componentRef.setInput('data', [{ id: '1', name: 'B' }, { id: '2', name: 'A' }] satisfies Sportbook6vnTableRow[]);
    fixture.componentInstance.sortChange.subscribe(sortSpy);
    fixture.detectChanges();

    const sortButton = fixture.nativeElement.querySelector('.sportbook6vn-table__sort-button') as HTMLButtonElement;
    sortButton.click();
    fixture.detectChanges();

    expect(sortSpy).toHaveBeenCalledWith(expect.objectContaining({ order: 'ascend' }));
    const firstCell = fixture.nativeElement.querySelector('tbody td') as HTMLElement;
    expect(firstCell.textContent?.trim()).toBe('A');
  });

  it('emits cell value changes for input cells', () => {
    const fixture = TestBed.createComponent(Sportbook6vnTableComponent);
    const changes: Sportbook6vnTableCellValueChange[] = [];
    fixture.componentRef.setInput('columns', [{ key: 'note', title: 'Ghi chú', type: 'input' }] satisfies Sportbook6vnTableColumn[]);
    fixture.componentRef.setInput('data', [{ id: '1', note: { value: 'Old' } }] satisfies Sportbook6vnTableRow[]);
    fixture.componentInstance.cellValueChange.subscribe((event) => changes.push(event));
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.sportbook6vn-input__native') as HTMLInputElement;
    input.value = 'New';
    input.dispatchEvent(new Event('input'));

    expect(changes[0].nextValue).toBe('New');
    expect(changes[0].column.key).toBe('note');
  });

  it('renders Figma table content variants for reference numbers and icon actions', () => {
    const fixture = TestBed.createComponent(Sportbook6vnTableComponent);
    fixture.componentRef.setInput('columns', [
      { key: 'referenceNumber', title: 'Reference', type: 'reference-number' },
      { key: 'actions', title: 'Actions', type: 'icon' },
    ] satisfies Sportbook6vnTableColumn[]);
    fixture.componentRef.setInput('data', [
      {
        id: '1',
        referenceNumber: 'FT890123456789',
        actions: {
          icons: [
            { icon: 'trash', label: 'Xóa dòng 1' },
            { icon: 'trash', label: 'Xóa dòng 2' },
            { icon: 'trash', label: 'Xóa dòng 3' },
          ],
        },
      },
    ] satisfies Sportbook6vnTableRow[]);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const referenceCell = element.querySelector('.sportbook6vn-table__cell--reference-number') as HTMLElement;
    const referenceLink = referenceCell.querySelector('sportbook6vn-button-link') as HTMLElement;
    const iconButtons = element.querySelectorAll('.sportbook6vn-table-icon-action');

    expect(referenceCell.textContent?.trim()).toBe('FT890123456789');
    expect(referenceLink).toBeTruthy();
    expect(referenceLink.querySelector('.sportbook6vn-button-link--md')).toBeTruthy();
    expect(iconButtons.length).toBe(3);
    expect(iconButtons[0].getAttribute('aria-label')).toBe('Xóa dòng 1');
  });

  it('marks fixed right icon columns on header and body cells', () => {
    const fixture = TestBed.createComponent(Sportbook6vnTableComponent);
    fixture.componentRef.setInput('columns', [
      { key: 'name', title: 'Name' },
      { key: 'actions', title: 'Action', type: 'icon', fixed: 'right' },
    ] satisfies Sportbook6vnTableColumn[]);
    fixture.componentRef.setInput('data', [
      {
        id: '1',
        name: 'A',
        actions: { icons: [{ icon: 'trash', label: 'Xóa dòng 1' }] },
      },
    ] satisfies Sportbook6vnTableRow[]);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const fixedHeader = element.querySelector('thead .sportbook6vn-table__header-cell--fixed-right');
    const fixedCell = element.querySelector('tbody .sportbook6vn-table__cell--fixed-right');

    expect(fixedHeader?.textContent?.trim()).toBe('Action');
    expect(fixedCell?.querySelector('.sportbook6vn-table-icon-action')).toBeTruthy();
  });

  it('shows the fixed right shadow while horizontal content is still hidden on the right', () => {
    const fixture = TestBed.createComponent(Sportbook6vnTableComponent);
    fixture.componentRef.setInput('columns', [
      { key: 'name', title: 'Name', width: 400 },
      { key: 'amount', title: 'Amount', width: 400 },
      { key: 'actions', title: 'Action', type: 'icon', fixed: 'right', width: 80 },
    ] satisfies Sportbook6vnTableColumn[]);
    fixture.componentRef.setInput('data', [
      {
        id: '1',
        name: 'A',
        amount: '1,000,000',
        actions: { icons: [{ icon: 'trash', label: 'Xóa dòng 1' }] },
      },
    ] satisfies Sportbook6vnTableRow[]);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const viewport = element.querySelector('.sportbook6vn-table__viewport') as HTMLElement;
    Object.defineProperty(viewport, 'scrollWidth', { configurable: true, value: 1000 });
    Object.defineProperty(viewport, 'clientWidth', { configurable: true, value: 400 });
    Object.defineProperty(viewport, 'scrollLeft', { configurable: true, writable: true, value: 240 });

    viewport.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();

    expect(viewport.classList.contains('sportbook6vn-table__viewport--ping-right')).toBe(true);

    viewport.scrollLeft = 600;
    viewport.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();

    expect(viewport.classList.contains('sportbook6vn-table__viewport--ping-right')).toBe(false);
  });

  it('renders configured action cells with the shared button component', () => {
    const fixture = TestBed.createComponent(Sportbook6vnTableComponent);
    const cellClickSpy = vi.fn();
    fixture.componentRef.setInput('columns', [
      {
        key: 'action',
        title: 'Hành động',
        type: 'button',
        buttonVariant: 'secondary',
        buttonShape: 'pill',
        buttonSize: 'md',
      },
    ] satisfies Sportbook6vnTableColumn[]);
    fixture.componentRef.setInput('data', [{ id: '1', action: { label: 'Text' } }] satisfies Sportbook6vnTableRow[]);
    fixture.componentInstance.cellClick.subscribe(cellClickSpy);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const actionComponent = element.querySelector('sportbook6vn-button') as HTMLElement;
    const actionButton = actionComponent.querySelector('button') as HTMLButtonElement;

    expect(actionComponent).toBeTruthy();
    expect(actionButton.classList.contains('sportbook6vn-button--variant-secondary')).toBe(true);
    expect(actionButton.classList.contains('sportbook6vn-button--shape-pill')).toBe(true);

    actionButton.click();
    fixture.detectChanges();

    expect(cellClickSpy).toHaveBeenCalledWith(expect.objectContaining({ column: expect.objectContaining({ key: 'action' }) }));
  });

  it('renders loading and empty states', () => {
    const fixture = TestBed.createComponent(Sportbook6vnTableComponent);
    fixture.componentRef.setInput('columns', [{ key: 'name', title: 'Tên' }] satisfies Sportbook6vnTableColumn[]);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.sportbook6vn-table__state').textContent.trim()).toContain('Đang tải');

    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('emptyText', 'Không có bản ghi');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.sportbook6vn-table__state').textContent.trim()).toBe('Không có bản ghi');
  });

  it('renders the shared pagination component and emits page changes', () => {
    const fixture = TestBed.createComponent(Sportbook6vnTableComponent);
    const pageChanges: number[] = [];
    fixture.componentRef.setInput('columns', [{ key: 'name', title: 'Tên' }] satisfies Sportbook6vnTableColumn[]);
    fixture.componentRef.setInput('data', [
      { id: '1', name: 'A' },
      { id: '2', name: 'B' },
      { id: '3', name: 'C' },
    ] satisfies Sportbook6vnTableRow[]);
    fixture.componentRef.setInput('showPagination', true);
    fixture.componentRef.setInput('pageSize', 2);
    fixture.componentInstance.pageIndexChange.subscribe((page) => pageChanges.push(page));
    fixture.detectChanges();

    const pagination = fixture.nativeElement.querySelector('sportbook6vn-pagination') as HTMLElement;
    expect(pagination).toBeTruthy();

    const nextButton = pagination.querySelector('button[aria-label="Trang sau"]') as HTMLButtonElement;
    nextButton.click();
    fixture.detectChanges();

    expect(pageChanges).toEqual([2]);
  });
});
