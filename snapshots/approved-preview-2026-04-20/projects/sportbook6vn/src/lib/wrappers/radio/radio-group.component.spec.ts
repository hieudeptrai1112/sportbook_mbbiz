import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Sportbook6vnRadioGroupComponent } from './radio-group.component';

@Component({
  imports: [Sportbook6vnRadioGroupComponent],
  template: `
    <sportbook6vn-radio-group
      name="group"
      [options]="options"
      [defaultValue]="'a'"
      (valueChange)="value = $event"
    />
  `,
})
class Sportbook6vnRadioGroupTestHostComponent {
  value: string | number | null = null;
  options = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
  ];
}

describe('Sportbook6vnRadioGroupComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnRadioGroupTestHostComponent],
    }).compileComponents();
  });

  it('emits selected option value', () => {
    const fixture = TestBed.createComponent(Sportbook6vnRadioGroupTestHostComponent);
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    inputs[1].checked = true;
    inputs[1].dispatchEvent(new Event('change'));

    expect(fixture.componentInstance.value).toBe('b');
  });
});
