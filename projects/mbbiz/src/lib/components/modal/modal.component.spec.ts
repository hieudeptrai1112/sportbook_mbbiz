import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MbbizModalComponent } from './modal.component';

@Component({
  imports: [MbbizModalComponent],
  template: `
    <mbbiz-modal
      type="error"
      (primaryAction)="onPrimary()"
      (secondaryAction)="onSecondary()"
      (tertiaryAction)="onTertiary()"
      (closeAction)="onClose()"
      (textLinkAction)="onTextLink()"
    />
  `,
})
class MbbizModalErrorHostComponent {
  primaryCalls = 0;
  secondaryCalls = 0;
  tertiaryCalls = 0;
  closeCalls = 0;
  textLinkCalls = 0;

  onPrimary() {
    this.primaryCalls += 1;
  }

  onSecondary() {
    this.secondaryCalls += 1;
  }

  onTertiary() {
    this.tertiaryCalls += 1;
  }

  onClose() {
    this.closeCalls += 1;
  }

  onTextLink() {
    this.textLinkCalls += 1;
  }
}

@Component({
  imports: [MbbizModalComponent],
  template: `
    <mbbiz-modal type="success" [showClose]="false" [showPagination]="true" />
  `,
})
class MbbizModalSuccessHostComponent {}

describe('MbbizModalComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizModalErrorHostComponent, MbbizModalSuccessHostComponent],
    }).compileComponents();
  });

  it('renders error modal content and emits actions', () => {
    const fixture = TestBed.createComponent(MbbizModalErrorHostComponent);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.textContent).toContain('Thông báo lỗi');
    expect(host.textContent).toContain('Gửi yêu cầu hỗ trợ');
    expect(host.textContent).toContain('Secondary button');
    expect(host.textContent).toContain('Đóng');
    expect(host.textContent).toContain('Mã lỗi:');
    expect(host.textContent).toContain('GW1234');
    expect(host.textContent).toContain('Text Link');
    expect(host.querySelector('.mbbiz-modal--error')).not.toBeNull();
    expect(host.querySelector('.mbbiz-modal__art')).not.toBeNull();

    const actionButtons = host.querySelectorAll('.mbbiz-button');
    expect(actionButtons.length).toBe(3);
    (actionButtons[0] as HTMLButtonElement).click();
    (actionButtons[1] as HTMLButtonElement).click();
    (actionButtons[2] as HTMLButtonElement).click();
    (host.querySelector('.mbbiz-modal__close') as HTMLButtonElement).click();
    (host.querySelector('.mbbiz-button-link') as HTMLButtonElement).click();

    expect(fixture.componentInstance.primaryCalls).toBe(1);
    expect(fixture.componentInstance.secondaryCalls).toBe(1);
    expect(fixture.componentInstance.tertiaryCalls).toBe(1);
    expect(fixture.componentInstance.closeCalls).toBe(1);
    expect(fixture.componentInstance.textLinkCalls).toBe(1);
  });

  it('renders three actions for success and optional pagination', () => {
    const fixture = TestBed.createComponent(MbbizModalSuccessHostComponent);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.mbbiz-modal--success')).not.toBeNull();
    expect(host.querySelectorAll('.mbbiz-button').length).toBe(3);
    expect(host.querySelector('.mbbiz-modal__close')).toBeNull();
    expect(host.querySelectorAll('.mbbiz-modal__pagination-dot').length).toBe(4);
  });
});
