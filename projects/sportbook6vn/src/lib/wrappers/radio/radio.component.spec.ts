import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Sportbook6vnRadioComponent } from './radio.component';

@Component({
  imports: [Sportbook6vnRadioComponent],
  template: `<sportbook6vn-radio label="Radio" (checkedChange)="checked = $event" />`,
})
class Sportbook6vnRadioTestHostComponent {
  checked = false;
}

describe('Sportbook6vnRadioComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnRadioTestHostComponent],
    }).compileComponents();
  });

  it('emits checked state when selected', () => {
    const fixture = TestBed.createComponent(Sportbook6vnRadioTestHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change'));

    expect(fixture.componentInstance.checked).toBe(true);
  });

  it('supports uncontrolled defaultChecked', () => {
    @Component({
      imports: [Sportbook6vnRadioComponent],
      template: `<sportbook6vn-radio label="Radio" [defaultChecked]="true" />`,
    })
    class Sportbook6vnRadioUncontrolledTestHostComponent {}

    const fixture = TestBed.createComponent(Sportbook6vnRadioUncontrolledTestHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });
});
