import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbbizStepsComponent } from './steps.component';
import { MbbizStepItem } from './steps.types';

describe('MbbizStepsComponent', () => {
  it('renders generated steps from amount and marks the current step', () => {
    @Component({
      imports: [MbbizStepsComponent],
      template: `<mbbiz-steps direction="vertical" [amount]="4" [current]="0" />`,
    })
    class MbbizStepsAmountTestHostComponent {}

    const fixture = TestBed.createComponent(MbbizStepsAmountTestHostComponent);
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.mbbiz-steps__item');
    const markers = fixture.nativeElement.querySelectorAll('.mbbiz-steps__marker');
    const current = fixture.nativeElement.querySelector('[aria-current="step"]');

    expect(items.length).toBe(4);
    expect(markers[0].textContent.trim()).toBe('1');
    expect(markers[3].textContent.trim()).toBe('4');
    expect(current.classList).toContain('mbbiz-steps__item--process');
  });

  it('emits index changes for enabled clickable steps', () => {
    @Component({
      imports: [MbbizStepsComponent],
      template: `
        <mbbiz-steps
          [items]="items"
          [current]="current()"
          [clickable]="true"
          (indexChange)="selectedIndex = $event"
        />
      `,
    })
    class MbbizStepsClickableTestHostComponent {
      readonly current = signal(0);
      readonly items: readonly MbbizStepItem[] = [
        { title: 'First' },
        { title: 'Second' },
        { title: 'Third', disabled: true },
      ];
      selectedIndex: number | null = null;
    }

    const fixture: ComponentFixture<MbbizStepsClickableTestHostComponent> = TestBed.createComponent(
      MbbizStepsClickableTestHostComponent,
    );
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.mbbiz-steps__item') as NodeListOf<HTMLButtonElement>;
    items[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.selectedIndex).toBe(1);

    items[2].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.selectedIndex).toBe(1);
  });

  it('supports the compact badge marker size', () => {
    @Component({
      imports: [MbbizStepsComponent],
      template: `<mbbiz-steps direction="vertical" [amount]="3" size="badge" />`,
    })
    class MbbizStepsBadgeTestHostComponent {}

    const fixture = TestBed.createComponent(MbbizStepsBadgeTestHostComponent);
    fixture.detectChanges();

    const steps = fixture.nativeElement.querySelector('.mbbiz-steps');
    const content = fixture.nativeElement.querySelector('.mbbiz-steps__content');

    expect(steps.classList).toContain('mbbiz-steps--size-badge');
    expect(content).not.toBeNull();
  });

  it('renders a basic three-step flow with the first step active', () => {
    @Component({
      imports: [MbbizStepsComponent],
      template: `<mbbiz-steps direction="vertical" [amount]="3" [current]="0" />`,
    })
    class MbbizStepsBasicTestHostComponent {}

    const fixture = TestBed.createComponent(MbbizStepsBasicTestHostComponent);
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.mbbiz-steps__item');
    const markers = fixture.nativeElement.querySelectorAll('.mbbiz-steps__marker');

    expect(items.length).toBe(3);
    expect(items[0].classList).toContain('mbbiz-steps__item--process');
    expect(items[1].classList).toContain('mbbiz-steps__item--wait');
    expect(items[2].classList).toContain('mbbiz-steps__item--wait');
    expect(markers[0].textContent.trim()).toBe('1');
    expect(markers[1].textContent.trim()).toBe('2');
    expect(markers[2].textContent.trim()).toBe('3');
  });

  it('renders horizontal progress-dot complete state when current reaches amount', () => {
    @Component({
      imports: [MbbizStepsComponent],
      template: `<mbbiz-steps direction="horizontal" [amount]="4" [current]="4" />`,
    })
    class MbbizStepsHorizontalCompleteTestHostComponent {}

    const fixture = TestBed.createComponent(MbbizStepsHorizontalCompleteTestHostComponent);
    fixture.detectChanges();

    const steps = fixture.nativeElement.querySelector('.mbbiz-steps');
    const items = fixture.nativeElement.querySelectorAll('.mbbiz-steps__item');
    const current = fixture.nativeElement.querySelector('[aria-current="step"]');

    expect(steps.classList).toContain('mbbiz-steps--horizontal');
    expect(steps.classList).toContain('mbbiz-steps--complete');
    expect(current).toBeNull();
    expect(
      Array.from(items).every((item) => (item as HTMLElement).classList.contains('mbbiz-steps__item--finish')),
    ).toBe(true);
  });

  it('supports explicit horizontal error state items', () => {
    @Component({
      imports: [MbbizStepsComponent],
      template: `
        <mbbiz-steps
          direction="horizontal"
          [items]="[
            { title: 'Next', status: 'wait' },
            { title: 'Current', status: 'process' },
            { title: 'Failure', status: 'error' },
            { title: 'Done', status: 'finish' },
          ]"
        />
      `,
    })
    class MbbizStepsHorizontalErrorTestHostComponent {}

    const fixture = TestBed.createComponent(MbbizStepsHorizontalErrorTestHostComponent);
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.mbbiz-steps__item');
    const current = fixture.nativeElement.querySelector('[aria-current="step"]');

    expect(items[0].classList).toContain('mbbiz-steps__item--wait');
    expect(items[1].classList).toContain('mbbiz-steps__item--process');
    expect(items[2].classList).toContain('mbbiz-steps__item--error');
    expect(items[3].classList).toContain('mbbiz-steps__item--finish');
    expect(current.textContent).toContain('Current');
  });
});
