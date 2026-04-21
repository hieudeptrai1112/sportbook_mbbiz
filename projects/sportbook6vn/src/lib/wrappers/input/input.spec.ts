import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sportbook6vnInputComponent } from './input.component';

describe('Sportbook6vnInputComponent', () => {
  let fixture: ComponentFixture<Sportbook6vnInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Sportbook6vnInputComponent);
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
