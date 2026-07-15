import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbbizAffixInputComponent } from './affix-input.component';

describe('MbbizAffixInputComponent', () => {
  let fixture: ComponentFixture<MbbizAffixInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizAffixInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MbbizAffixInputComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit value changes', () => {
    const spy = vi.fn();
    fixture.componentInstance.valueChange.subscribe(spy);

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'updated';
    input.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalledWith('updated');
  });

  it('should render prefix and suffix icons in both mode', () => {
    fixture.componentRef.setInput('mode', 'both');
    fixture.detectChanges();

    const icons = fixture.nativeElement.querySelectorAll('.mbbiz-affix-input__icon');
    expect(icons.length).toBe(2);
  });
});
