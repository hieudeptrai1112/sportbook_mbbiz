import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sportbook6vnButtonLinkComponent } from './button-link.component';

@Component({
  imports: [Sportbook6vnButtonLinkComponent],
  template: `
    <sportbook6vn-button-link [disabled]="disabled" (buttonLinkClick)="onButtonLinkClick($event)">
      Text
    </sportbook6vn-button-link>
  `,
})
class TestButtonLinkGuardHostComponent {
  disabled = false;
  clickCount = 0;

  onButtonLinkClick(_event: MouseEvent): void {
    this.clickCount += 1;
  }
}

describe('Sportbook6vnButtonLinkComponent', () => {
  let fixture: ComponentFixture<Sportbook6vnButtonLinkComponent>;
  let component: Sportbook6vnButtonLinkComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnButtonLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Sportbook6vnButtonLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders an anchor when href is provided', () => {
    fixture.componentRef.setInput('href', '/button-link');
    fixture.componentRef.setInput('target', '_blank');
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;

    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/button-link');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('blocks buttonLinkClick when disabled', () => {
    const guardFixture = TestBed.createComponent(TestButtonLinkGuardHostComponent);
    guardFixture.componentInstance.disabled = true;
    guardFixture.detectChanges();

    const button = guardFixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();

    expect(guardFixture.componentInstance.clickCount).toBe(0);
  });
});
