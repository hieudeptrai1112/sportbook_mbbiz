import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Sportbook6vnCheckboxGroupComponent } from './checkbox-group.component';

@Component({
  imports: [Sportbook6vnCheckboxGroupComponent],
  template: `
    <sportbook6vn-checkbox-group
      [options]="options"
      [defaultValue]="['a']"
      (valueChange)="value = $event"
    />
  `,
})
class Sportbook6vnCheckboxGroupTestHostComponent {
  value: (string | number)[] = [];
  options = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
  ];
}

describe('Sportbook6vnCheckboxGroupComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnCheckboxGroupTestHostComponent],
    }).compileComponents();
  });

  it('emits updated selected values', () => {
    const fixture = TestBed.createComponent(Sportbook6vnCheckboxGroupTestHostComponent);
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    inputs[1].checked = true;
    inputs[1].dispatchEvent(new Event('change'));

    expect(fixture.componentInstance.value).toEqual(['a', 'b']);
  });
});
