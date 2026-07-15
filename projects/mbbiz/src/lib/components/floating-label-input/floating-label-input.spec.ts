import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbbizFloatingLabelInputComponent } from './floating-label-input.component';

describe('MbbizFloatingLabelInputComponent', () => {
  let fixture: ComponentFixture<MbbizFloatingLabelInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizFloatingLabelInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MbbizFloatingLabelInputComponent);
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
