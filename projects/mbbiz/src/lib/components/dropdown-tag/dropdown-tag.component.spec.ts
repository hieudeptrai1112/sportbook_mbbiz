import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbbizDropdownTagComponent } from './dropdown-tag.component';

describe('MbbizDropdownTagComponent', () => {
  let fixture: ComponentFixture<MbbizDropdownTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizDropdownTagComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MbbizDropdownTagComponent);
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

    const overflow = fixture.nativeElement.querySelector('.mbbiz-dropdown-tag__overflow');
    expect(overflow.textContent.trim()).toBe('+2');
  });
});
