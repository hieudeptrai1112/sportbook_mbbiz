import { TestBed } from '@angular/core/testing';

import { MbbizStatusComponent } from './status.component';

describe('MbbizStatusComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizStatusComponent],
    }).compileComponents();
  });

  it('renders the default neutral status', () => {
    const fixture = TestBed.createComponent(MbbizStatusComponent);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-status') as HTMLElement;
    const label = fixture.nativeElement.querySelector('.mbbiz-status__label') as HTMLElement;

    expect(root.classList).toContain('mbbiz-status--neutral');
    expect(label.textContent?.trim()).toBe('Text');
  });

  it('uses status preset color and custom label', () => {
    const fixture = TestBed.createComponent(MbbizStatusComponent);
    fixture.componentRef.setInput('status', 'completed');
    fixture.componentRef.setInput('label', 'Completed');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-status') as HTMLElement;
    const label = fixture.nativeElement.querySelector('.mbbiz-status__label') as HTMLElement;

    expect(root.classList).toContain('mbbiz-status--green');
    expect(label.textContent?.trim()).toBe('Completed');
  });

  it('lets explicit color override preset color', () => {
    const fixture = TestBed.createComponent(MbbizStatusComponent);
    fixture.componentRef.setInput('status', 'completed');
    fixture.componentRef.setInput('color', 'red');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-status') as HTMLElement;

    expect(root.classList).toContain('mbbiz-status--red');
  });

  it('renders description only when enabled', () => {
    const fixture = TestBed.createComponent(MbbizStatusComponent);
    fixture.componentRef.setInput('description', 'Description');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.mbbiz-status__description')).toBeNull();

    fixture.componentRef.setInput('showDescription', true);
    fixture.detectChanges();

    const description = fixture.nativeElement.querySelector('.mbbiz-status__description') as HTMLElement;
    expect(description.textContent?.trim()).toBe('Description');
  });
});
