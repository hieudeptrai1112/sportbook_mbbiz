import { TestBed } from '@angular/core/testing';

import { MbbizBadgeComponent } from './badge.component';

describe('MbbizBadgeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizBadgeComponent],
    }).compileComponents();
  });

  it('renders the default neutral badge', () => {
    const fixture = TestBed.createComponent(MbbizBadgeComponent);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-badge') as HTMLElement;
    const label = fixture.nativeElement.querySelector('.mbbiz-badge__label') as HTMLElement;

    expect(root.classList).toContain('mbbiz-badge--invalid');
    expect(root.classList).toContain('mbbiz-badge--neutral');
    expect(label.textContent?.trim()).toBe('Text');
  });

  it('uses the status preset color', () => {
    const fixture = TestBed.createComponent(MbbizBadgeComponent);
    fixture.componentRef.setInput('status', 'completed');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-badge') as HTMLElement;

    expect(root.classList).toContain('mbbiz-badge--completed');
    expect(root.classList).toContain('mbbiz-badge--green');
  });

  it('allows custom label and aria label', () => {
    const fixture = TestBed.createComponent(MbbizBadgeComponent);
    fixture.componentRef.setInput('label', 'Approve ASAP');
    fixture.componentRef.setInput('ariaLabel', 'Overdue approval');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-badge') as HTMLElement;
    const label = fixture.nativeElement.querySelector('.mbbiz-badge__label') as HTMLElement;

    expect(root.getAttribute('aria-label')).toBe('Overdue approval');
    expect(label.textContent?.trim()).toBe('Approve ASAP');
  });

  it('supports color override and description', () => {
    const fixture = TestBed.createComponent(MbbizBadgeComponent);
    fixture.componentRef.setInput('status', 'completed');
    fixture.componentRef.setInput('color', 'red');
    fixture.componentRef.setInput('description', 'Description');
    fixture.componentRef.setInput('showDescription', true);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-badge') as HTMLElement;
    const description = fixture.nativeElement.querySelector('.mbbiz-badge__description') as HTMLElement;

    expect(root.classList).toContain('mbbiz-badge--red');
    expect(description.textContent?.trim()).toBe('Description');
  });
});
