import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MbbizSwitchComponent } from './switch.component';

@Component({
  imports: [MbbizSwitchComponent],
  template: `<mbbiz-switch (checkedChange)="checked = $event" />`,
})
class MbbizSwitchTestHostComponent {
  checked = false;
}

describe('MbbizSwitchComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizSwitchTestHostComponent],
    }).compileComponents();
  });

  it('emits checked state on toggle', () => {
    const fixture = TestBed.createComponent(MbbizSwitchTestHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change'));

    expect(fixture.componentInstance.checked).toBe(true);
  });

  it('supports uncontrolled defaultChecked', () => {
    @Component({
      imports: [MbbizSwitchComponent],
      template: `<mbbiz-switch [defaultChecked]="true" />`,
    })
    class MbbizSwitchUncontrolledTestHostComponent {}

    const fixture = TestBed.createComponent(MbbizSwitchUncontrolledTestHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });
});
