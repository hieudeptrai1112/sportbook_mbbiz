import { TestBed } from '@angular/core/testing';

import { MbbizTagComponent } from './tag.component';

describe('MbbizTagComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizTagComponent],
    }).compileComponents();
  });

  it('renders the default neutral tag', () => {
    const fixture = TestBed.createComponent(MbbizTagComponent);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-tag') as HTMLElement;
    const label = fixture.nativeElement.querySelector('.mbbiz-tag__label') as HTMLElement;

    expect(root.classList).toContain('mbbiz-tag--invalid');
    expect(root.classList).toContain('mbbiz-tag--neutral');
    expect(label.textContent?.trim()).toBe('Text');
  });

  it('uses the status preset color', () => {
    const fixture = TestBed.createComponent(MbbizTagComponent);
    fixture.componentRef.setInput('status', 'completed');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-tag') as HTMLElement;

    expect(root.classList).toContain('mbbiz-tag--completed');
    expect(root.classList).toContain('mbbiz-tag--green');
  });

  it('allows custom label and aria label', () => {
    const fixture = TestBed.createComponent(MbbizTagComponent);
    fixture.componentRef.setInput('label', 'Approve ASAP');
    fixture.componentRef.setInput('ariaLabel', 'Overdue approval');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-tag') as HTMLElement;
    const label = fixture.nativeElement.querySelector('.mbbiz-tag__label') as HTMLElement;

    expect(root.getAttribute('aria-label')).toBe('Overdue approval');
    expect(label.textContent?.trim()).toBe('Approve ASAP');
  });

  it('supports color override and description', () => {
    const fixture = TestBed.createComponent(MbbizTagComponent);
    fixture.componentRef.setInput('status', 'completed');
    fixture.componentRef.setInput('color', 'red');
    fixture.componentRef.setInput('description', 'Description');
    fixture.componentRef.setInput('showDescription', true);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-tag') as HTMLElement;
    const description = fixture.nativeElement.querySelector('.mbbiz-tag__description') as HTMLElement;

    expect(root.classList).toContain('mbbiz-tag--red');
    expect(description.textContent?.trim()).toBe('Description');
  });
});
