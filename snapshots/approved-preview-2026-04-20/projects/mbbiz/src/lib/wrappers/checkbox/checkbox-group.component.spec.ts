import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MbbizCheckboxGroupComponent } from './checkbox-group.component';

@Component({
  imports: [MbbizCheckboxGroupComponent],
  template: `
    <mbbiz-checkbox-group
      [options]="options"
      [defaultValue]="['a']"
      (valueChange)="value = $event"
    />
  `,
})
class MbbizCheckboxGroupTestHostComponent {
  value: (string | number)[] = [];
  options = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
  ];
}

describe('MbbizCheckboxGroupComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizCheckboxGroupTestHostComponent],
    }).compileComponents();
  });

  it('emits updated selected values', () => {
    const fixture = TestBed.createComponent(MbbizCheckboxGroupTestHostComponent);
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    inputs[1].checked = true;
    inputs[1].dispatchEvent(new Event('change'));

    expect(fixture.componentInstance.value).toEqual(['a', 'b']);
  });
});
