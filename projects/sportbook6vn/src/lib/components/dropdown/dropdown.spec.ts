import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sportbook6vnDropdownComponent } from './dropdown.component';

describe('Sportbook6vnDropdownComponent', () => {
  let fixture: ComponentFixture<Sportbook6vnDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Sportbook6vnDropdownComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the inside title', () => {
    fixture.componentRef.setInput('title', 'Title');
    fixture.componentRef.setInput('labelMode', 'inside');
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.sportbook6vn-dropdown__inside-title');
    expect(title.textContent.trim()).toBe('Title');
  });

  it('should emit selected value in single mode', () => {
    fixture.componentRef.setInput('items', [
      { id: 'option-1', label: 'Option 1' },
      { id: 'option-2', label: 'Option 2' },
    ]);
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    const option = fixture.nativeElement.querySelector('.sportbook6vn-dropdown__option');
    option.click();
    fixture.detectChanges();

    const value = fixture.nativeElement.querySelector('.sportbook6vn-dropdown__value');
    expect(value.textContent.trim()).toBe('Option 1');
  });
});
