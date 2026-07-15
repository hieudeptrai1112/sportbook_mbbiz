import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbbizButtonLinkComponent } from './button-link.component';

@Component({
  imports: [MbbizButtonLinkComponent],
  template: `
    <mbbiz-button-link [disabled]="disabled" (buttonLinkClick)="onButtonLinkClick($event)">
      Text
    </mbbiz-button-link>
  `,
})
class TestButtonLinkGuardHostComponent {
  disabled = false;
  clickCount = 0;

  onButtonLinkClick(_event: MouseEvent): void {
    this.clickCount += 1;
  }
}

describe('MbbizButtonLinkComponent', () => {
  let fixture: ComponentFixture<MbbizButtonLinkComponent>;
  let component: MbbizButtonLinkComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizButtonLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MbbizButtonLinkComponent);
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
