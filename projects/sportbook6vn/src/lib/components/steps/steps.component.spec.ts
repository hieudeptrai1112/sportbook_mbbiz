import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sportbook6vnStepsComponent } from './steps.component';
import { Sportbook6vnStepItem } from './steps.types';

describe('Sportbook6vnStepsComponent', () => {
  it('renders generated steps from amount and marks the current step', () => {
    @Component({
      imports: [Sportbook6vnStepsComponent],
      template: `<sportbook6vn-steps [amount]="4" [current]="0" />`,
    })
    class Sportbook6vnStepsAmountTestHostComponent {}

    const fixture = TestBed.createComponent(Sportbook6vnStepsAmountTestHostComponent);
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.sportbook6vn-steps__item');
    const markers = fixture.nativeElement.querySelectorAll('.sportbook6vn-steps__marker');
    const current = fixture.nativeElement.querySelector('[aria-current="step"]');

    expect(items.length).toBe(4);
    expect(markers[0].textContent.trim()).toBe('1');
    expect(markers[3].textContent.trim()).toBe('4');
    expect(current.classList).toContain('sportbook6vn-steps__item--process');
  });

  it('emits index changes for enabled clickable steps', () => {
    @Component({
      imports: [Sportbook6vnStepsComponent],
      template: `
        <sportbook6vn-steps
          [items]="items"
          [current]="current()"
          [clickable]="true"
          (indexChange)="selectedIndex = $event"
        />
      `,
    })
    class Sportbook6vnStepsClickableTestHostComponent {
      readonly current = signal(0);
      readonly items: readonly Sportbook6vnStepItem[] = [
        { title: 'First' },
        { title: 'Second' },
        { title: 'Third', disabled: true },
      ];
      selectedIndex: number | null = null;
    }

    const fixture: ComponentFixture<Sportbook6vnStepsClickableTestHostComponent> = TestBed.createComponent(
      Sportbook6vnStepsClickableTestHostComponent,
    );
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.sportbook6vn-steps__item') as NodeListOf<HTMLButtonElement>;
    items[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.selectedIndex).toBe(1);

    items[2].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.selectedIndex).toBe(1);
  });

  it('supports the compact badge marker size', () => {
    @Component({
      imports: [Sportbook6vnStepsComponent],
      template: `<sportbook6vn-steps [amount]="3" size="badge" />`,
    })
    class Sportbook6vnStepsBadgeTestHostComponent {}

    const fixture = TestBed.createComponent(Sportbook6vnStepsBadgeTestHostComponent);
    fixture.detectChanges();

    const steps = fixture.nativeElement.querySelector('.sportbook6vn-steps');
    const content = fixture.nativeElement.querySelector('.sportbook6vn-steps__content');

    expect(steps.classList).toContain('sportbook6vn-steps--size-badge');
    expect(content).not.toBeNull();
  });

  it('renders a basic three-step flow with the first step active', () => {
    @Component({
      imports: [Sportbook6vnStepsComponent],
      template: `<sportbook6vn-steps [amount]="3" [current]="0" />`,
    })
    class Sportbook6vnStepsBasicTestHostComponent {}

    const fixture = TestBed.createComponent(Sportbook6vnStepsBasicTestHostComponent);
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.sportbook6vn-steps__item');
    const markers = fixture.nativeElement.querySelectorAll('.sportbook6vn-steps__marker');

    expect(items.length).toBe(3);
    expect(items[0].classList).toContain('sportbook6vn-steps__item--process');
    expect(items[1].classList).toContain('sportbook6vn-steps__item--wait');
    expect(items[2].classList).toContain('sportbook6vn-steps__item--wait');
    expect(markers[0].textContent.trim()).toBe('1');
    expect(markers[1].textContent.trim()).toBe('2');
    expect(markers[2].textContent.trim()).toBe('3');
  });
});
