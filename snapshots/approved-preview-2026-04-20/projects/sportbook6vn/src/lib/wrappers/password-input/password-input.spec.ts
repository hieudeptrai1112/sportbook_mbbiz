import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sportbook6vnPasswordInputComponent } from './password-input.component';

describe('Sportbook6vnPasswordInputComponent', () => {
  let fixture: ComponentFixture<Sportbook6vnPasswordInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnPasswordInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Sportbook6vnPasswordInputComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit visibility toggles', () => {
    const spy = vi.fn();
    fixture.componentInstance.visibleChange.subscribe(spy);

    const button = fixture.nativeElement.querySelector(
      '.sportbook6vn-password-input__toggle',
    ) as HTMLButtonElement;
    button.click();

    expect(spy).toHaveBeenCalledWith(true);
  });
});
