import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MbbizRadioGroupComponent } from './radio-group.component';

@Component({
  imports: [MbbizRadioGroupComponent],
  template: `
    <mbbiz-radio-group
      name="group"
      [options]="options"
      [defaultValue]="'a'"
      (valueChange)="value = $event"
    />
  `,
})
class MbbizRadioGroupTestHostComponent {
  value: string | number | null = null;
  options = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
  ];
}

describe('MbbizRadioGroupComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizRadioGroupTestHostComponent],
    }).compileComponents();
  });

  it('emits selected option value', () => {
    const fixture = TestBed.createComponent(MbbizRadioGroupTestHostComponent);
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    inputs[1].checked = true;
    inputs[1].dispatchEvent(new Event('change'));

    expect(fixture.componentInstance.value).toBe('b');
  });
});
