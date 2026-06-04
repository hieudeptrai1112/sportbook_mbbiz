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

    const input = fixture.nativeElement.querySelector('.sportbook6vn-table-input') as HTMLInputElement;
    input.value = 'New';
    input.dispatchEvent(new Event('input'));

    expect(changes[0].nextValue).toBe('New');
    expect(changes[0].column.key).toBe('note');
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
});
