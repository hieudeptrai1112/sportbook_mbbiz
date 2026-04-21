import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Sportbook6vnModalComponent } from './modal.component';

@Component({
  imports: [Sportbook6vnModalComponent],
  template: `
    <sportbook6vn-modal
      title="Custom modal title"
      primaryLabel="Confirm"
      secondaryLabel="Cancel"
      [firstFieldValue]="firstValue"
      [secondFieldValue]="secondValue"
      (primaryAction)="onPrimary()"
      (secondaryAction)="onSecondary()"
      (closeAction)="onClose()"
      (firstFieldValueChange)="onFirstFieldChange($event)"
      (secondFieldValueChange)="onSecondFieldChange($event)"
    />
  `,
})
class Sportbook6vnModalTestHostComponent {
  firstValue = '';
  secondValue = '';
  primaryCalls = 0;
  secondaryCalls = 0;
  closeCalls = 0;
  firstFieldChanges: string[] = [];
  secondFieldChanges: string[] = [];

  onPrimary() {
    this.primaryCalls += 1;
  }

  onSecondary() {
    this.secondaryCalls += 1;
  }

  onClose() {
    this.closeCalls += 1;
  }

  onFirstFieldChange(value: string) {
    this.firstFieldChanges.push(value);
  }

  onSecondFieldChange(value: string) {
    this.secondFieldChanges.push(value);
  }
}

@Component({
  imports: [Sportbook6vnModalComponent],
  template: `
    <sportbook6vn-modal
      actionLayout="single"
      [showSecondary]="false"
      [showSecondField]="false"
      [showClose]="false"
    />
  `,
})
class Sportbook6vnModalSingleActionHostComponent {}

describe('Sportbook6vnModalComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnModalTestHostComponent, Sportbook6vnModalSingleActionHostComponent],
    }).compileComponents();
  });

  it('renders title, both action buttons, and emits action events', () => {
    const fixture = TestBed.createComponent(Sportbook6vnModalTestHostComponent);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.textContent).toContain('Custom modal title');
    expect(host.textContent).toContain('Confirm');
    expect(host.textContent).toContain('Cancel');

    const actionButtons = host.querySelectorAll('.sportbook6vn-button');
    (actionButtons[0] as HTMLButtonElement).click();
    (actionButtons[1] as HTMLButtonElement).click();
    (host.querySelector('.sportbook6vn-modal__close') as HTMLButtonElement).click();

    expect(fixture.componentInstance.secondaryCalls).toBe(1);
    expect(fixture.componentInstance.primaryCalls).toBe(1);
    expect(fixture.componentInstance.closeCalls).toBe(1);
  });

  it('emits input value changes from both default modal fields', () => {
    const fixture = TestBed.createComponent(Sportbook6vnModalTestHostComponent);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const inputEls = host.querySelectorAll('.sportbook6vn-input__native');
    const firstInput = inputEls[0] as HTMLInputElement;
    const secondInput = inputEls[1] as HTMLInputElement;

    firstInput.value = 'alpha';
    firstInput.dispatchEvent(new Event('input'));
    secondInput.value = 'beta';
    secondInput.dispatchEvent(new Event('input'));

    expect(fixture.componentInstance.firstFieldChanges).toEqual(['alpha']);
    expect(fixture.componentInstance.secondFieldChanges).toEqual(['beta']);
  });

  it('supports single action layout', () => {
    const fixture = TestBed.createComponent(Sportbook6vnModalSingleActionHostComponent);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.sportbook6vn-modal__actions-single')).not.toBeNull();
    expect(host.querySelector('.sportbook6vn-modal__actions--double')).toBeNull();
    expect(host.querySelectorAll('.sportbook6vn-button').length).toBe(1);
    expect(host.querySelector('.sportbook6vn-modal__close')).toBeNull();
  });
});
