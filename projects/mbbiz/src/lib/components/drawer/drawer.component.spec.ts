import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AlinearCancelIcon } from '@mbbiz/icon';
import { provideIcons } from '@mbbiz/icon/angular';

import { MbbizDrawerComponent } from './drawer.component';

@Component({
  imports: [MbbizDrawerComponent],
  template: `
    <mbbiz-drawer
      title="Basic Drawer"
      [visible]="open"
      (visibleChange)="onVisible($event)"
      (close)="onClose()"
    >
      <p>Some content....</p>
    </mbbiz-drawer>
  `,
})
class MbbizDrawerHostComponent {
  open = true;
  visibleCalls: boolean[] = [];
  closeCalls = 0;

  onVisible(open: boolean) {
    this.open = open;
    this.visibleCalls.push(open);
  }

  onClose() {
    this.closeCalls += 1;
  }
}

describe('MbbizDrawerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizDrawerHostComponent],
      providers: [provideIcons([AlinearCancelIcon])],
    }).compileComponents();
  });

  afterEach(() => {
    document.querySelectorAll('.ant-drawer, .cdk-overlay-container').forEach((node) => node.remove());
  });

  it('renders the Figma header, projected body, and close control', () => {
    const fixture = TestBed.createComponent(MbbizDrawerHostComponent);
    fixture.detectChanges();

    expect(document.body.textContent).toContain('Basic Drawer');
    expect(document.body.textContent).toContain('Some content....');
    expect(document.querySelector('.mbbiz-drawer__close')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('nz-drawer')).not.toBeNull();
  });

  it('emits close and visibleChange when the close icon is clicked', () => {
    const fixture = TestBed.createComponent(MbbizDrawerHostComponent);
    fixture.detectChanges();

    (document.querySelector('.mbbiz-drawer__close') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(fixture.componentInstance.closeCalls).toBe(1);
    expect(fixture.componentInstance.visibleCalls).toContain(false);
    expect(fixture.componentInstance.open).toBe(false);
  });
});
