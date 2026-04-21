import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Sportbook6vnCheckboxComponent } from './checkbox.component';

@Component({
  imports: [Sportbook6vnCheckboxComponent],
  template: `
    <sportbook6vn-checkbox
      label="Checkbox"
      [indeterminate]="indeterminate"
      (checkedChange)="lastChecked = $event"
      (indeterminateChange)="indeterminate = $event"
    />
  `,
})
class Sportbook6vnCheckboxTestHostComponent {
  indeterminate = true;
  lastChecked = false;
}

describe('Sportbook6vnCheckboxComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnCheckboxTestHostComponent],
    }).compileComponents();
  });

  it('clears indeterminate and emits checked on change', () => {
    const fixture = TestBed.createComponent(Sportbook6vnCheckboxTestHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change'));

    expect(fixture.componentInstance.lastChecked).toBe(true);
    expect(fixture.componentInstance.indeterminate).toBe(false);
  });

  it('supports uncontrolled defaultChecked state', () => {
    @Component({
      imports: [Sportbook6vnCheckboxComponent],
      template: `<sportbook6vn-checkbox label="Checkbox" [defaultChecked]="true" />`,
    })
    class Sportbook6vnCheckboxUncontrolledTestHostComponent {}

    const fixture = TestBed.createComponent(Sportbook6vnCheckboxUncontrolledTestHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('supports uncontrolled defaultIndeterminate state', () => {
    @Component({
      imports: [Sportbook6vnCheckboxComponent],
      template: `<sportbook6vn-checkbox label="Checkbox" [defaultIndeterminate]="true" />`,
    })
    class Sportbook6vnCheckboxIndeterminateTestHostComponent {}

    const fixture = TestBed.createComponent(Sportbook6vnCheckboxIndeterminateTestHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
  });
});
