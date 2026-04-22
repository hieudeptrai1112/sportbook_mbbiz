import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sportbook6vnDropdownTagComponent } from './dropdown-tag.component';

describe('Sportbook6vnDropdownTagComponent', () => {
  let fixture: ComponentFixture<Sportbook6vnDropdownTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnDropdownTagComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Sportbook6vnDropdownTagComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render overflow summary when selections exceed the visible limit', () => {
    fixture.componentRef.setInput('items', [
      { id: 'option-1', label: 'Option 1' },
      { id: 'option-2', label: 'Option 2' },
      { id: 'option-3', label: 'Option 3' },
      { id: 'option-4', label: 'Option 4' },
    ]);
    fixture.componentRef.setInput('values', ['option-1', 'option-2', 'option-3', 'option-4']);
    fixture.detectChanges();

    const overflow = fixture.nativeElement.querySelector('.sportbook6vn-dropdown-tag__overflow');
    expect(overflow.textContent.trim()).toBe('+2');
  });
});
