import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbbizButtonComponent } from './button.component';

@Component({
  imports: [MbbizButtonComponent],
  template: `
    <mbbiz-button>
      <span mbbizButtonStartIcon>+</span>
      Text
      <span mbbizButtonEndIcon>+</span>
    </mbbiz-button>
  `,
})
class TestButtonHostComponent {
}

@Component({
  imports: [MbbizButtonComponent],
  template: `
    <mbbiz-button [disabled]="disabled" (buttonClick)="onButtonClick($event)">
      Text
    </mbbiz-button>
  `,
})
class TestButtonGuardHostComponent {
  disabled = false;
  clickCount = 0;

  onButtonClick(_event: MouseEvent) {
    this.clickCount += 1;
  }
}

describe('MbbizButtonComponent', () => {
  let fixture: ComponentFixture<MbbizButtonComponent>;
  let component: MbbizButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MbbizButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable native button while loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
  });

  it('should render projected start and end icons', async () => {
    const hostFixture = TestBed.createComponent(TestButtonHostComponent);
    hostFixture.detectChanges();

    const icons = hostFixture.nativeElement.querySelectorAll('.mbbiz-button__icon');
    expect(icons.length).toBe(2);
    expect(icons[0].textContent).toContain('+');
    expect(icons[1].textContent).toContain('+');
  });

  it('should block buttonClick when disabled', () => {
    const guardFixture = TestBed.createComponent(TestButtonGuardHostComponent);
    guardFixture.componentInstance.disabled = true;
    guardFixture.detectChanges();

    const button = guardFixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();

    expect(guardFixture.componentInstance.clickCount).toBe(0);
  });
});
