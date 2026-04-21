import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sportbook6vnSearchInputComponent } from './search-input.component';

describe('Sportbook6vnSearchInputComponent', () => {
  let fixture: ComponentFixture<Sportbook6vnSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnSearchInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Sportbook6vnSearchInputComponent);
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
      '.sportbook6vn-search-input__icon--clear',
    ) as HTMLButtonElement;
    button.click();

    expect(spy).toHaveBeenCalledWith('');
  });
});
