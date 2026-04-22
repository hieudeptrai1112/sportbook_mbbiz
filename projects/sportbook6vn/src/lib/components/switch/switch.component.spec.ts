import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Sportbook6vnSwitchComponent } from './switch.component';

@Component({
  imports: [Sportbook6vnSwitchComponent],
  template: `<sportbook6vn-switch (checkedChange)="checked = $event" />`,
})
class Sportbook6vnSwitchTestHostComponent {
  checked = false;
}

describe('Sportbook6vnSwitchComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnSwitchTestHostComponent],
    }).compileComponents();
  });

  it('emits checked state on toggle', () => {
    const fixture = TestBed.createComponent(Sportbook6vnSwitchTestHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change'));

    expect(fixture.componentInstance.checked).toBe(true);
  });

  it('supports uncontrolled defaultChecked', () => {
    @Component({
      imports: [Sportbook6vnSwitchComponent],
      template: `<sportbook6vn-switch [defaultChecked]="true" />`,
    })
    class Sportbook6vnSwitchUncontrolledTestHostComponent {}

    const fixture = TestBed.createComponent(Sportbook6vnSwitchUncontrolledTestHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });
});
