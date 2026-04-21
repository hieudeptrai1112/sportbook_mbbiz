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

  it('should hide title when label is empty', () => {
    fixture.componentRef.setInput('value', '');
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.sportbook6vn-password-input__title');
    expect(title).toBeNull();
  });

  it('should keep title visible after typing and blur in uncontrolled mode', () => {
    fixture.componentRef.setInput('label', 'Title');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      '.sportbook6vn-password-input__native',
    ) as HTMLInputElement;

    input.focus();
    input.value = 'secret-123';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    input.blur();
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.sportbook6vn-password-input__title');
    expect(title).toBeTruthy();
    expect((title as HTMLElement).textContent?.trim()).toBe('Title');
  });

  it('should show title when controlled value is provided from parent', () => {
    fixture.componentRef.setInput('label', 'Title');
    fixture.componentRef.setInput('value', 'parent-value');
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.sportbook6vn-password-input__title');
    const input = fixture.nativeElement.querySelector(
      '.sportbook6vn-password-input__native',
    ) as HTMLInputElement;

    expect(title).toBeTruthy();
    expect(input.value).toBe('parent-value');
  });
});
