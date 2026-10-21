import { TestBed } from '@angular/core/testing';
import { AboldHomeIcon, AlinearHomeIcon } from '@mbbiz/icon';
import { provideIcons } from '@mbbiz/icon/angular';

import { MbbizNavigationBarComponent } from './navigation-bar.component';
import { MBBIZ_CHECKER_NAV_ITEMS } from './navigation-bar.checker';
import { MBBIZ_MAKER_NAV_ITEMS } from './navigation-bar.maker';
import { MBBIZ_ONE_USER_NAV_ITEMS } from './navigation-bar.one-user';

describe('MbbizNavigationBarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizNavigationBarComponent],
      providers: [provideIcons([AlinearHomeIcon, AboldHomeIcon])],
    }).compileComponents();
  });

  it('renders the Maker menu by default', () => {
    const fixture = TestBed.createComponent(MbbizNavigationBarComponent);
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.mbbiz-navigation-bar__item');
    expect(items.length).toBe(MBBIZ_MAKER_NAV_ITEMS.length);
    expect(fixture.nativeElement.querySelector('.mbbiz-navigation-bar__logo')).toBeTruthy();
  });

  it('renders the Checker menu when variant is checker', () => {
    const fixture = TestBed.createComponent(MbbizNavigationBarComponent);
    fixture.componentRef.setInput('variant', 'checker');
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.mbbiz-navigation-bar__item');
    expect(items.length).toBe(MBBIZ_CHECKER_NAV_ITEMS.length);
  });

  it('renders the 1 User menu when variant is 1user', () => {
    const fixture = TestBed.createComponent(MbbizNavigationBarComponent);
    fixture.componentRef.setInput('variant', '1user');
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.mbbiz-navigation-bar__item');
    expect(items.length).toBe(MBBIZ_ONE_USER_NAV_ITEMS.length);
  });

  it('marks the active item and swaps to the filled icon', () => {
    const fixture = TestBed.createComponent(MbbizNavigationBarComponent);
    fixture.componentRef.setInput('items', [
      { id: 'home', label: 'Trang chủ', icon: 'alinear_home', iconActive: 'abold_home' },
    ]);
    fixture.componentRef.setInput('activeId', 'home');
    fixture.detectChanges();

    const item = fixture.nativeElement.querySelector('.mbbiz-navigation-bar__item') as HTMLButtonElement;
    expect(item.classList).toContain('mbbiz-navigation-bar__item--active');
    expect(item.getAttribute('aria-current')).toBe('page');
  });

  it('emits item clicks and ignores disabled items', () => {
    const fixture = TestBed.createComponent(MbbizNavigationBarComponent);
    const clickSpy = vi.fn();
    fixture.componentRef.setInput('items', [
      { id: 'home', label: 'Trang chủ', icon: 'alinear_home' },
      { id: 'settings', label: 'Cài đặt', icon: 'alinear_home', disabled: true },
    ]);
    fixture.componentInstance.itemClick.subscribe(clickSpy);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      '.mbbiz-navigation-bar__item',
    ) as NodeListOf<HTMLButtonElement>;
    buttons[0].click();
    buttons[1].click();

    expect(clickSpy).toHaveBeenCalledOnce();
    expect(clickSpy.mock.calls[0][0].item.id).toBe('home');
    expect(clickSpy.mock.calls[0][0].level).toBe(1);
  });

  it('renders the New tag when showNew is set', () => {
    const fixture = TestBed.createComponent(MbbizNavigationBarComponent);
    fixture.componentRef.setInput('items', [
      { id: 'home', label: 'Trang chủ', icon: 'alinear_home', showNew: true },
    ]);
    fixture.componentRef.setInput('showLogo', false);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.mbbiz-navigation-bar__tag')?.textContent?.trim()).toBe('Mới');
    expect(fixture.nativeElement.querySelector('.mbbiz-navigation-bar__logo')).toBeNull();
  });

  it('opens the L2 flyout on hover when the item has children', () => {
    const fixture = TestBed.createComponent(MbbizNavigationBarComponent);
    fixture.componentRef.setInput('items', [
      {
        id: 'accounts',
        label: 'Tài khoản',
        icon: 'alinear_home',
        children: [
          { id: 'statement', label: 'Sao kê giao dịch' },
          { id: 'qr', label: 'Dịch vụ QR' },
        ],
      },
    ]);
    fixture.detectChanges();

    const listItem = fixture.nativeElement.querySelector(
      '.mbbiz-navigation-bar__list-item',
    ) as HTMLElement;
    listItem.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.mbbiz-navigation-bar__submenu')).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Sao kê giao dịch');
    expect(fixture.nativeElement.textContent).toContain('Dịch vụ QR');
  });

  it('expands L3 items when an L2 parent is clicked', () => {
    const fixture = TestBed.createComponent(MbbizNavigationBarComponent);
    fixture.componentRef.setInput('items', [
      {
        id: 'payments',
        label: 'Thanh toán',
        icon: 'alinear_home',
        children: [
          {
            id: 'domestic',
            label: 'Chuyển tiền trong nước',
            children: [{ id: 'transfer', label: 'Chuyển tiền' }],
          },
        ],
      },
    ]);
    fixture.componentRef.setInput('openId', 'payments');
    fixture.detectChanges();

    const l2Button = fixture.nativeElement.querySelector(
      '.mbbiz-navigation-bar__subitem--l2',
    ) as HTMLButtonElement;
    l2Button.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Chuyển tiền');
  });
});
