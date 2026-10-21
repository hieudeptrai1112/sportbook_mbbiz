import { TestBed } from '@angular/core/testing';

import { MbbizPaginationComponent } from './pagination.component';

describe('MbbizPaginationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizPaginationComponent],
    }).compileComponents();
  });

  it('renders the total range and page list', () => {
    const fixture = TestBed.createComponent(MbbizPaginationComponent);
    fixture.componentRef.setInput('total', 100);
    fixture.componentRef.setInput('pageIndex', 1);
    fixture.detectChanges();

    const total = fixture.nativeElement.querySelector('.mbbiz-pagination__total') as HTMLElement;
    const pages = Array.from(fixture.nativeElement.querySelectorAll('.mbbiz-pagination__page')).map((item) =>
      (item as HTMLElement).textContent?.trim(),
    );

    expect(total.textContent?.trim()).toBe('Đã hiển thị 1 - 10 trên 100 kết quả');
    expect(pages).toEqual(['1', '2', '3', '4', '5']);
  });

  it('emits page index changes from page buttons and jump controls', () => {
    const fixture = TestBed.createComponent(MbbizPaginationComponent);
    const pageIndexSpy = vi.fn();
    fixture.componentRef.setInput('total', 100);
    fixture.componentRef.setInput('pageIndex', 1);
    fixture.componentInstance.pageIndexChange.subscribe(pageIndexSpy);
    fixture.detectChanges();

    const secondPage = fixture.nativeElement.querySelectorAll('.mbbiz-pagination__page')[1] as HTMLButtonElement;
    secondPage.click();
    fixture.detectChanges();

    expect(pageIndexSpy).toHaveBeenCalledWith(2);

    const nextFive = fixture.nativeElement.querySelectorAll('.mbbiz-pagination__nav--double')[1] as HTMLButtonElement;
    nextFive.click();

    expect(pageIndexSpy).toHaveBeenCalledWith(7);
  });

  it('renders the dropdown jump panel and selects a page', () => {
    const fixture = TestBed.createComponent(MbbizPaginationComponent);
    const pageIndexSpy = vi.fn();
    fixture.componentRef.setInput('total', 50);
    fixture.componentRef.setInput('openJump', true);
    fixture.componentInstance.pageIndexChange.subscribe(pageIndexSpy);
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('.mbbiz-pagination__jump-panel') as HTMLElement;
    expect(panel).toBeTruthy();

    const pageThree = fixture.nativeElement.querySelectorAll('.mbbiz-pagination__jump-option')[2] as HTMLButtonElement;
    pageThree.click();

    expect(pageIndexSpy).toHaveBeenCalledWith(3);
  });

  it('switches to quick jumper mode for large page counts', () => {
    const fixture = TestBed.createComponent(MbbizPaginationComponent);
    fixture.componentRef.setInput('total', 180000);
    fixture.componentRef.setInput('pageIndex', 23);
    fixture.detectChanges();

    const summary = fixture.nativeElement.querySelector('.mbbiz-pagination__page-summary') as HTMLElement;
    const quickInput = fixture.nativeElement.querySelector('.mbbiz-pagination__quick-input') as HTMLInputElement;

    expect(summary.textContent?.trim()).toBe('Trang 23 / 18.000');
    expect(quickInput).toBeTruthy();
  });

  it('accepts explicit page count and quick input value for Figma quick states', () => {
    const fixture = TestBed.createComponent(MbbizPaginationComponent);
    fixture.componentRef.setInput('mode', 'quick-jumper');
    fixture.componentRef.setInput('total', 18000);
    fixture.componentRef.setInput('pageCount', 18000);
    fixture.componentRef.setInput('pageIndex', 23);
    fixture.componentRef.setInput('quickJumpValue', 23);
    fixture.componentRef.setInput('rangeFormatter', () => 'Đã hiển thị 91 - 100 trên 18000 kết quả');
    fixture.detectChanges();

    const total = fixture.nativeElement.querySelector('.mbbiz-pagination__total') as HTMLElement;
    const summary = fixture.nativeElement.querySelector('.mbbiz-pagination__page-summary') as HTMLElement;
    const quickInput = fixture.nativeElement.querySelector('.mbbiz-pagination__quick-input') as HTMLInputElement;

    expect(total.textContent?.trim()).toBe('Đã hiển thị 91 - 100 trên 18000 kết quả');
    expect(summary.textContent?.trim()).toBe('Trang 23 / 18.000');
    expect(quickInput.value).toBe('23');
  });

  it('submits quick jumper values on enter', () => {
    const fixture = TestBed.createComponent(MbbizPaginationComponent);
    const pageIndexSpy = vi.fn();
    fixture.componentRef.setInput('total', 180000);
    fixture.componentInstance.pageIndexChange.subscribe(pageIndexSpy);
    fixture.detectChanges();

    const quickInput = fixture.nativeElement.querySelector('.mbbiz-pagination__quick-input') as HTMLInputElement;
    quickInput.value = '23';
    quickInput.dispatchEvent(new Event('input'));
    quickInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(pageIndexSpy).toHaveBeenCalledWith(23);
  });

  it('disables navigation on the minimum state', () => {
    const fixture = TestBed.createComponent(MbbizPaginationComponent);
    fixture.componentRef.setInput('total', 10);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const buttons = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLButtonElement[];
    expect(buttons.every((button) => button.disabled)).toBe(true);
  });
});
