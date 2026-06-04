import { TestBed } from '@angular/core/testing';

import { Sportbook6vnBadgeComponent } from './badge.component';

describe('Sportbook6vnBadgeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnBadgeComponent],
    }).compileComponents();
  });

  it('renders the default neutral badge', () => {
    const fixture = TestBed.createComponent(Sportbook6vnBadgeComponent);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.sportbook6vn-badge') as HTMLElement;
    const label = fixture.nativeElement.querySelector('.sportbook6vn-badge__label') as HTMLElement;

    expect(root.classList).toContain('sportbook6vn-badge--invalid');
    expect(root.classList).toContain('sportbook6vn-badge--neutral');
    expect(label.textContent?.trim()).toBe('Text');
  });

  it('uses the status preset color', () => {
    const fixture = TestBed.createComponent(Sportbook6vnBadgeComponent);
    fixture.componentRef.setInput('status', 'completed');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.sportbook6vn-badge') as HTMLElement;

    expect(root.classList).toContain('sportbook6vn-badge--completed');
    expect(root.classList).toContain('sportbook6vn-badge--green');
  });

  it('allows custom label and aria label', () => {
    const fixture = TestBed.createComponent(Sportbook6vnBadgeComponent);
    fixture.componentRef.setInput('label', 'Approve ASAP');
    fixture.componentRef.setInput('ariaLabel', 'Overdue approval');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.sportbook6vn-badge') as HTMLElement;
    const label = fixture.nativeElement.querySelector('.sportbook6vn-badge__label') as HTMLElement;

    expect(root.getAttribute('aria-label')).toBe('Overdue approval');
    expect(label.textContent?.trim()).toBe('Approve ASAP');
  });

  it('supports color override and description', () => {
    const fixture = TestBed.createComponent(Sportbook6vnBadgeComponent);
    fixture.componentRef.setInput('status', 'completed');
    fixture.componentRef.setInput('color', 'red');
    fixture.componentRef.setInput('description', 'Description');
    fixture.componentRef.setInput('showDescription', true);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.sportbook6vn-badge') as HTMLElement;
    const description = fixture.nativeElement.querySelector('.sportbook6vn-badge__description') as HTMLElement;

    expect(root.classList).toContain('sportbook6vn-badge--red');
    expect(description.textContent?.trim()).toBe('Description');
  });
});
