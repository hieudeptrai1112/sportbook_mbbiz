import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sportbook6vnAffixInputComponent } from './affix-input.component';

describe('Sportbook6vnAffixInputComponent', () => {
  let fixture: ComponentFixture<Sportbook6vnAffixInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnAffixInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Sportbook6vnAffixInputComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit input value changes', () => {
    const spy = vi.fn();
    fixture.componentInstance.valueChange.subscribe(spy);

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = '123';
    input.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalledWith('123');
  });

  it('should render both affix icons when mode is both', () => {
    fixture.componentRef.setInput('mode', 'both');
    fixture.detectChanges();

    const icons = fixture.nativeElement.querySelectorAll('.sportbook6vn-affix-input__icon');
    expect(icons.length).toBe(2);
  });
});
