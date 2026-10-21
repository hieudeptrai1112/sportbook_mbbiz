import { TestBed } from '@angular/core/testing';
import { AboldInfoIcon } from '@mbbiz/icon';
import { provideIcons } from '@mbbiz/icon/angular';

import { MbbizBadgeComponent } from './badge.component';

describe('MbbizBadgeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizBadgeComponent],
      providers: [provideIcons([AboldInfoIcon])],
    }).compileComponents();
  });

  it('renders the default notification reminder badge', () => {
    const fixture = TestBed.createComponent(MbbizBadgeComponent);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-badge') as HTMLElement;

    expect(root.classList).toContain('mbbiz-badge--notification');
    expect(root.classList).toContain('mbbiz-badge--reminder');
  });

  it('renders Role maker and checker labels from Figma', () => {
    const fixture = TestBed.createComponent(MbbizBadgeComponent);
    fixture.componentRef.setInput('type', 'role');
    fixture.componentRef.setInput('status', 'maker');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-badge') as HTMLElement;
    const label = fixture.nativeElement.querySelector('.mbbiz-badge__label') as HTMLElement;

    expect(root.classList).toContain('mbbiz-badge--role');
    expect(root.classList).toContain('mbbiz-badge--maker');
    expect(label.textContent?.trim()).toBe('Người tạo');

    fixture.componentRef.setInput('status', 'checker');
    fixture.detectChanges();

    expect(root.classList).toContain('mbbiz-badge--checker');
    expect(label.textContent?.trim()).toBe('Người duyệt');
  });

  it('uses Figma assets for Error, Warning, Remind, and Bee', () => {
    const fixture = TestBed.createComponent(MbbizBadgeComponent);
    fixture.componentRef.setInput('type', 'notification');

    fixture.componentRef.setInput('status', 'error');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mbiz-icon, mbbiz-icon')).toBeNull();
    expect(fixture.nativeElement.querySelector('.mbbiz-badge__art')).not.toBeNull();

    fixture.componentRef.setInput('status', 'remind');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mbiz-icon, mbbiz-icon')).toBeNull();
    expect(fixture.nativeElement.querySelector('.mbbiz-badge__art')).not.toBeNull();

    fixture.componentRef.setInput('status', 'warning');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mbiz-icon, mbbiz-icon')).toBeNull();
    expect(fixture.nativeElement.querySelector('.mbbiz-badge__art')).not.toBeNull();

    fixture.componentRef.setInput('status', 'bee');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mbiz-icon, mbbiz-icon')).toBeNull();
    expect(fixture.nativeElement.querySelector('.mbbiz-badge__art')).not.toBeNull();
  });

  it('uses the library icon for Information', () => {
    const fixture = TestBed.createComponent(MbbizBadgeComponent);
    fixture.componentRef.setInput('type', 'notification');
    fixture.componentRef.setInput('status', 'information');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('mbiz-icon, mbbiz-icon')).not.toBeNull();
  });

  it('allows Role label override', () => {
    const fixture = TestBed.createComponent(MbbizBadgeComponent);
    fixture.componentRef.setInput('type', 'role');
    fixture.componentRef.setInput('status', 'maker');
    fixture.componentRef.setInput('label', 'Maker');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.mbbiz-badge__label') as HTMLElement;
    expect(label.textContent?.trim()).toBe('Maker');
  });
});
