import { TestBed } from '@angular/core/testing';

import { Sportbook6vnTabComponent } from './tab.component';

describe('Sportbook6vnTabComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnTabComponent],
    }).compileComponents();
  });

  it('renders default pill tabs', () => {
    const fixture = TestBed.createComponent(Sportbook6vnTabComponent);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.sportbook6vn-tab') as HTMLElement;
    const items = fixture.nativeElement.querySelectorAll('.sportbook6vn-tab__item') as NodeListOf<HTMLButtonElement>;

    expect(root.classList).toContain('sportbook6vn-tab--variant-pill');
    expect(root.classList).toContain('sportbook6vn-tab--size-large');
    expect(items.length).toBe(3);
    expect(items[0].getAttribute('aria-selected')).toBe('true');
  });

  it('emits index and item when selecting an enabled tab', () => {
    const fixture = TestBed.createComponent(Sportbook6vnTabComponent);
    const indexSpy = vi.fn();
    const itemSpy = vi.fn();
    fixture.componentRef.setInput('items', [
      { label: 'First' },
      { label: 'Second' },
    ]);
    fixture.componentInstance.indexChange.subscribe(indexSpy);
    fixture.componentInstance.tabChange.subscribe(itemSpy);
    fixture.detectChanges();

    const second = fixture.nativeElement.querySelectorAll('.sportbook6vn-tab__item')[1] as HTMLButtonElement;
    second.click();

    expect(indexSpy).toHaveBeenCalledOnce();
    expect(indexSpy).toHaveBeenCalledWith(1);
    expect(itemSpy).toHaveBeenCalledOnce();
    expect(itemSpy).toHaveBeenCalledWith({ index: 1, item: { label: 'Second' } });
  });

  it('does not emit when selecting a disabled tab', () => {
    const fixture = TestBed.createComponent(Sportbook6vnTabComponent);
    const indexSpy = vi.fn();
    fixture.componentRef.setInput('items', [
      { label: 'First' },
      { label: 'Second', disabled: true },
    ]);
    fixture.componentInstance.indexChange.subscribe(indexSpy);
    fixture.detectChanges();

    const second = fixture.nativeElement.querySelectorAll('.sportbook6vn-tab__item')[1] as HTMLButtonElement;
    second.click();

    expect(indexSpy).not.toHaveBeenCalled();
  });

  it('renders underlined count badges', () => {
    const fixture = TestBed.createComponent(Sportbook6vnTabComponent);
    fixture.componentRef.setInput('variant', 'underlined');
    fixture.componentRef.setInput('items', [
      { label: 'First', count: 12 },
      { label: 'Second' },
    ]);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.sportbook6vn-tab') as HTMLElement;
    const count = fixture.nativeElement.querySelector('.sportbook6vn-tab__count') as HTMLElement;

    expect(root.classList).toContain('sportbook6vn-tab--variant-underlined');
    expect(count.textContent?.trim()).toBe('12');
  });
});
