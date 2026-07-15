import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MbbizCheckboxComponent } from './checkbox.component';

@Component({
  imports: [MbbizCheckboxComponent],
  template: `
    <mbbiz-checkbox
      label="Checkbox"
      [indeterminate]="indeterminate"
      (checkedChange)="lastChecked = $event"
      (indeterminateChange)="indeterminate = $event"
    />
  `,
})
class MbbizCheckboxTestHostComponent {
  indeterminate = true;
  lastChecked = false;
}

describe('MbbizCheckboxComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizCheckboxTestHostComponent],
    }).compileComponents();
  });

  it('clears indeterminate and emits checked on change', () => {
    const fixture = TestBed.createComponent(MbbizCheckboxTestHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change'));

    expect(fixture.componentInstance.lastChecked).toBe(true);
    expect(fixture.componentInstance.indeterminate).toBe(false);
  });

  it('supports uncontrolled defaultChecked state', () => {
    @Component({
      imports: [MbbizCheckboxComponent],
      template: `<mbbiz-checkbox label="Checkbox" [defaultChecked]="true" />`,
    })
    class MbbizCheckboxUncontrolledTestHostComponent {}

    const fixture = TestBed.createComponent(MbbizCheckboxUncontrolledTestHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('supports uncontrolled defaultIndeterminate state', () => {
    @Component({
      imports: [MbbizCheckboxComponent],
      template: `<mbbiz-checkbox label="Checkbox" [defaultIndeterminate]="true" />`,
    })
    class MbbizCheckboxIndeterminateTestHostComponent {}

    const fixture = TestBed.createComponent(MbbizCheckboxIndeterminateTestHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
  });
});
