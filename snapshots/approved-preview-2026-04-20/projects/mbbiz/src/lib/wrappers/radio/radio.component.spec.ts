import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MbbizRadioComponent } from './radio.component';

@Component({
  imports: [MbbizRadioComponent],
  template: `<mbbiz-radio label="Radio" (checkedChange)="checked = $event" />`,
})
class MbbizRadioTestHostComponent {
  checked = false;
}

describe('MbbizRadioComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizRadioTestHostComponent],
    }).compileComponents();
  });

  it('emits checked state when selected', () => {
    const fixture = TestBed.createComponent(MbbizRadioTestHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change'));

    expect(fixture.componentInstance.checked).toBe(true);
  });

  it('supports uncontrolled defaultChecked', () => {
    @Component({
      imports: [MbbizRadioComponent],
      template: `<mbbiz-radio label="Radio" [defaultChecked]="true" />`,
    })
    class MbbizRadioUncontrolledTestHostComponent {}

    const fixture = TestBed.createComponent(MbbizRadioUncontrolledTestHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });
});
