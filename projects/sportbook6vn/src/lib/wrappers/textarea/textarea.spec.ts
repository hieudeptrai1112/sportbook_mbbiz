import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sportbook6vnTextareaComponent } from './textarea.component';

describe('Sportbook6vnTextareaComponent', () => {
  let fixture: ComponentFixture<Sportbook6vnTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnTextareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Sportbook6vnTextareaComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit textarea value changes', () => {
    const spy = vi.fn();
    fixture.componentInstance.valueChange.subscribe(spy);

    const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
    textarea.value = 'new-text';
    textarea.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalledWith('new-text');
  });
});
