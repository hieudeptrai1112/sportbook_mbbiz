import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbbizSearchInputComponent } from './search-input.component';

describe('MbbizSearchInputComponent', () => {
  let fixture: ComponentFixture<MbbizSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizSearchInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MbbizSearchInputComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit cleared value', () => {
    const spy = vi.fn();
    fixture.componentInstance.valueChange.subscribe(spy);
    fixture.componentRef.setInput('value', 'abc');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      '.mbbiz-search-input__icon--clear',
    ) as HTMLButtonElement;
    button.click();

    expect(spy).toHaveBeenCalledWith('');
  });
});
