import { DOCUMENT } from '@angular/common';
import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MbbizMessageComponent } from './message.component';
import { MbbizMessageService } from './message.service';

describe('MbbizMessageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizMessageComponent],
    }).compileComponents();
  });

  it('renders the default inform message', () => {
    const fixture = TestBed.createComponent(MbbizMessageComponent);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-message') as HTMLElement;

    expect(root.classList).toContain('mbbiz-message--inform');
    expect(root.textContent).toContain('Informative inform.');
  });

  it('renders warning content and close button', () => {
    const fixture = TestBed.createComponent(MbbizMessageComponent);
    fixture.componentRef.setInput('type', 'warning');
    fixture.componentRef.setInput('content', 'Warning inform with dismiss button.');
    fixture.componentRef.setInput('closable', true);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-message') as HTMLElement;
    const close = fixture.nativeElement.querySelector('.mbbiz-message__close') as HTMLButtonElement;

    expect(root.classList).toContain('mbbiz-message--warning');
    expect(root.textContent).toContain('Warning inform with dismiss button.');
    expect(close).toBeTruthy();
  });

  it('emits close when the close button is clicked', () => {
    vi.useFakeTimers();
    const fixture = TestBed.createComponent(MbbizMessageComponent);
    const closeSpy = vi.fn();
    fixture.componentRef.setInput('closable', true);
    fixture.componentInstance.closed.subscribe(closeSpy);
    fixture.detectChanges();

    const close = fixture.nativeElement.querySelector('.mbbiz-message__close') as HTMLButtonElement;
    close.click();
    vi.advanceTimersByTime(180);

    expect(closeSpy).toHaveBeenCalledWith({ id: null, userAction: true });
    vi.useRealTimers();
  });
});

describe('MbbizMessageService', () => {
  afterEach(() => {
    TestBed.inject(MbbizMessageService).remove();
  });

  it('creates and removes a dynamic message', () => {
    const service = TestBed.inject(MbbizMessageService);
    const document = TestBed.inject(DOCUMENT);
    const appRef = TestBed.inject(ApplicationRef);

    const ref = service.success('Success inform with dismiss button.', { duration: 0 });
    appRef.tick();

    const message = document.body.querySelector('.mbbiz-message') as HTMLElement;
    expect(ref.messageId).toContain('mbbiz-message-');
    expect(message.classList).toContain('mbbiz-message--success');
    expect(message.textContent).toContain('Success inform with dismiss button.');

    service.remove(ref.messageId);
    appRef.tick();

    expect(document.body.querySelector('.mbbiz-message')).toBeNull();
  });
});
