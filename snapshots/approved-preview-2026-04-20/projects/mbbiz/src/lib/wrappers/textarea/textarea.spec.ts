import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbbizTextareaComponent } from './textarea.component';

describe('MbbizTextareaComponent', () => {
  let fixture: ComponentFixture<MbbizTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizTextareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MbbizTextareaComponent);
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
