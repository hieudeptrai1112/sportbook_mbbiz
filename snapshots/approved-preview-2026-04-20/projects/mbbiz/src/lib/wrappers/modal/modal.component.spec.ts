import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MbbizModalComponent } from './modal.component';

@Component({
  imports: [MbbizModalComponent],
  template: `
    <mbbiz-modal
      type="error"
      [showTextLink]="true"
      [showPagination]="true"
      (primaryAction)="onPrimary()"
      (closeAction)="onClose()"
    />
  `,
})
class MbbizModalTestHostComponent {
  primaryCalls = 0;
  closeCalls = 0;

  onPrimary() {
    this.primaryCalls += 1;
  }

  onClose() {
    this.closeCalls += 1;
  }
}

describe('MbbizModalComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizModalTestHostComponent],
    }).compileComponents();
  });

  it('renders error modal details and emits actions', () => {
    const fixture = TestBed.createComponent(MbbizModalTestHostComponent);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.textContent).toContain('Gửi yêu cầu hỗ trợ');
    expect(host.textContent).toContain('Error code:');

    (host.querySelector('.mbbiz-button') as HTMLButtonElement).click();
    (host.querySelector('.mbbiz-modal__close') as HTMLButtonElement).click();

    expect(fixture.componentInstance.primaryCalls).toBe(1);
    expect(fixture.componentInstance.closeCalls).toBe(1);
  });

  it('renders pagination dots when enabled', () => {
    const fixture = TestBed.createComponent(MbbizModalTestHostComponent);
    fixture.detectChanges();

    const dots = fixture.nativeElement.querySelectorAll('.mbbiz-modal__pagination-dot');
    expect(dots.length).toBe(4);
  });
});
