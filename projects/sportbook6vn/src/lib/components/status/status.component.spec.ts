import { TestBed } from '@angular/core/testing';

import { Sportbook6vnStatusComponent } from './status.component';

describe('Sportbook6vnStatusComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnStatusComponent],
    }).compileComponents();
  });

  it('renders the default neutral status', () => {
    const fixture = TestBed.createComponent(Sportbook6vnStatusComponent);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.sportbook6vn-status') as HTMLElement;
    const label = fixture.nativeElement.querySelector('.sportbook6vn-status__label') as HTMLElement;

    expect(root.classList).toContain('sportbook6vn-status--neutral');
    expect(label.textContent?.trim()).toBe('Text');
  });

  it('uses status preset color and custom label', () => {
    const fixture = TestBed.createComponent(Sportbook6vnStatusComponent);
    fixture.componentRef.setInput('status', 'completed');
    fixture.componentRef.setInput('label', 'Completed');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.sportbook6vn-status') as HTMLElement;
    const label = fixture.nativeElement.querySelector('.sportbook6vn-status__label') as HTMLElement;

    expect(root.classList).toContain('sportbook6vn-status--green');
    expect(label.textContent?.trim()).toBe('Completed');
  });

  it('lets explicit color override preset color', () => {
    const fixture = TestBed.createComponent(Sportbook6vnStatusComponent);
    fixture.componentRef.setInput('status', 'completed');
    fixture.componentRef.setInput('color', 'red');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.sportbook6vn-status') as HTMLElement;

    expect(root.classList).toContain('sportbook6vn-status--red');
  });

  it('renders description only when enabled', () => {
    const fixture = TestBed.createComponent(Sportbook6vnStatusComponent);
    fixture.componentRef.setInput('description', 'Description');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.sportbook6vn-status__description')).toBeNull();

    fixture.componentRef.setInput('showDescription', true);
    fixture.detectChanges();

    const description = fixture.nativeElement.querySelector('.sportbook6vn-status__description') as HTMLElement;
    expect(description.textContent?.trim()).toBe('Description');
  });
});
