import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbbizPasswordInputComponent } from './password-input.component';

describe('MbbizPasswordInputComponent', () => {
  let fixture: ComponentFixture<MbbizPasswordInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizPasswordInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MbbizPasswordInputComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit visibility toggles', () => {
    const spy = vi.fn();
    fixture.componentInstance.visibleChange.subscribe(spy);

    const button = fixture.nativeElement.querySelector(
      '.mbbiz-password-input__toggle',
    ) as HTMLButtonElement;
    button.click();

    expect(spy).toHaveBeenCalledWith(true);
  });
});
