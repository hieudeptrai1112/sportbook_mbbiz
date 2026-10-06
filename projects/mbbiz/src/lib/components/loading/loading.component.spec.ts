import { TestBed } from '@angular/core/testing';

import { MbbizLoadingComponent } from './loading.component';

describe('MbbizLoadingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizLoadingComponent],
    }).compileComponents();
  });

  it('renders the default size=s spinner', () => {
    const fixture = TestBed.createComponent(MbbizLoadingComponent);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-loading') as HTMLElement;

    expect(root.classList).toContain('mbbiz-loading--s');
    expect(root.getAttribute('role')).toBe('status');
    expect(root.getAttribute('aria-label')).toBe('Loading');
    expect(getComputedStyle(root).getPropertyValue('--mbbiz-loading-size').trim()).toBe('20px');
    expect(getComputedStyle(root).getPropertyValue('--mbbiz-loading-stroke').trim()).toBe('2px');
  });

  it('maps the Figma size=m and size=l variants', () => {
    const fixture = TestBed.createComponent(MbbizLoadingComponent);

    fixture.componentRef.setInput('size', 'm');
    fixture.detectChanges();

    let root = fixture.nativeElement.querySelector('.mbbiz-loading') as HTMLElement;
    expect(root.classList).toContain('mbbiz-loading--m');
    expect(getComputedStyle(root).getPropertyValue('--mbbiz-loading-size').trim()).toBe('32px');

    fixture.componentRef.setInput('size', 'l');
    fixture.detectChanges();

    root = fixture.nativeElement.querySelector('.mbbiz-loading') as HTMLElement;
    expect(root.classList).toContain('mbbiz-loading--l');
    expect(getComputedStyle(root).getPropertyValue('--mbbiz-loading-size').trim()).toBe('40px');
    expect(getComputedStyle(root).getPropertyValue('--mbbiz-loading-stroke').trim()).toBe('4px');
  });

  it('allows a custom aria label', () => {
    const fixture = TestBed.createComponent(MbbizLoadingComponent);
    fixture.componentRef.setInput('ariaLabel', 'Đang tải');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-loading') as HTMLElement;
    expect(root.getAttribute('aria-label')).toBe('Đang tải');
  });
});
