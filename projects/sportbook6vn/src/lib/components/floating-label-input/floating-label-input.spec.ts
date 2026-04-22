import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sportbook6vnFloatingLabelInputComponent } from './floating-label-input.component';

describe('Sportbook6vnFloatingLabelInputComponent', () => {
  let fixture: ComponentFixture<Sportbook6vnFloatingLabelInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnFloatingLabelInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Sportbook6vnFloatingLabelInputComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit value changes', () => {
    const spy = vi.fn();
    fixture.componentInstance.valueChange.subscribe(spy);

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'Input text';
    input.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalledWith('Input text');
  });
});
