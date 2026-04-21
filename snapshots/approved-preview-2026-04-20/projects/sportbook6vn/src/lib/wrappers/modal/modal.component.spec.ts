import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Sportbook6vnModalComponent } from './modal.component';

@Component({
  imports: [Sportbook6vnModalComponent],
  template: `
    <sportbook6vn-modal
      type="error"
      [showTextLink]="true"
      [showPagination]="true"
      (primaryAction)="onPrimary()"
      (closeAction)="onClose()"
    />
  `,
})
class Sportbook6vnModalTestHostComponent {
  primaryCalls = 0;
  closeCalls = 0;

  onPrimary() {
    this.primaryCalls += 1;
  }

  onClose() {
    this.closeCalls += 1;
  }
}

describe('Sportbook6vnModalComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnModalTestHostComponent],
    }).compileComponents();
  });

  it('renders error modal details and emits actions', () => {
    const fixture = TestBed.createComponent(Sportbook6vnModalTestHostComponent);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.textContent).toContain('Gửi yêu cầu hỗ trợ');
    expect(host.textContent).toContain('Error code:');

    (host.querySelector('.sportbook6vn-button') as HTMLButtonElement).click();
    (host.querySelector('.sportbook6vn-modal__close') as HTMLButtonElement).click();

    expect(fixture.componentInstance.primaryCalls).toBe(1);
    expect(fixture.componentInstance.closeCalls).toBe(1);
  });

  it('renders pagination dots when enabled', () => {
    const fixture = TestBed.createComponent(Sportbook6vnModalTestHostComponent);
    fixture.detectChanges();

    const dots = fixture.nativeElement.querySelectorAll('.sportbook6vn-modal__pagination-dot');
    expect(dots.length).toBe(4);
  });
});
