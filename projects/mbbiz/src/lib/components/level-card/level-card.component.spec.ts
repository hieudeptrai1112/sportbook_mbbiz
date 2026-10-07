import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MbbizLevelCardComponent } from './level-card.component';

@Component({
  imports: [MbbizLevelCardComponent],
  template: `
    <mbbiz-level-card
      label="Open account"
      (cardClick)="onCard()"
      (actionClick)="onAction()"
    />
  `,
})
class MbbizLevelCardHostComponent {
  cardCalls = 0;
  actionCalls = 0;

  onCard() {
    this.cardCalls += 1;
  }

  onAction() {
    this.actionCalls += 1;
  }
}

@Component({
  imports: [MbbizLevelCardComponent],
  template: ` <mbbiz-level-card size="lg" state="disabled" /> `,
})
class MbbizLevelCardDisabledHostComponent {}

@Component({
  imports: [MbbizLevelCardComponent],
  template: ` <mbbiz-level-card size="md" state="add" (actionClick)="onAction()" /> `,
})
class MbbizLevelCardAddHostComponent {
  actionCalls = 0;

  onAction() {
    this.actionCalls += 1;
  }
}

describe('MbbizLevelCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MbbizLevelCardHostComponent,
        MbbizLevelCardDisabledHostComponent,
        MbbizLevelCardAddHostComponent,
      ],
    }).compileComponents();
  });

  it('renders the default large card and emits card clicks', () => {
    const fixture = TestBed.createComponent(MbbizLevelCardHostComponent);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.textContent).toContain('Open account');
    expect(host.querySelector('.mbbiz-level-card--lg')).not.toBeNull();
    expect(host.querySelector('.mbbiz-level-card--default')).not.toBeNull();

    (host.querySelector('.mbbiz-level-card') as HTMLButtonElement).click();
    expect(fixture.componentInstance.cardCalls).toBe(1);
    expect(fixture.componentInstance.actionCalls).toBe(0);
  });

  it('shows the coming soon tag on large disabled', () => {
    const fixture = TestBed.createComponent(MbbizLevelCardDisabledHostComponent);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.textContent).toContain('Sắp ra mắt');
    expect((host.querySelector('.mbbiz-level-card') as HTMLButtonElement).disabled).toBe(true);
  });

  it('renders the add chip and emits action clicks without the card event', () => {
    const fixture = TestBed.createComponent(MbbizLevelCardAddHostComponent);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.mbbiz-level-card--md')).not.toBeNull();
    expect(host.querySelector('.mbbiz-level-card__action')).not.toBeNull();

    (host.querySelector('.mbbiz-level-card__action') as HTMLElement).click();
    expect(fixture.componentInstance.actionCalls).toBe(1);
  });
});
