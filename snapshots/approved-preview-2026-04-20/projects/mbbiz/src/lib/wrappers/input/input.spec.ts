import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbbizInputComponent } from './input.component';

describe('MbbizInputComponent', () => {
  let fixture: ComponentFixture<MbbizInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MbbizInputComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit input value changes', () => {
    const spy = vi.fn();
    fixture.componentInstance.valueChange.subscribe(spy);

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'new-value';
    input.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalledWith('new-value');
  });
});
