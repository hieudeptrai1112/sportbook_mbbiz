import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AlinearProfileIcon } from '@mbbiz/icon';
import { provideIcons } from '@mbbiz/icon/angular';

import { MbbizAvatarGroupComponent } from './avatar-group.component';
import { MbbizAvatarComponent } from './avatar.component';

@Component({
  imports: [MbbizAvatarComponent, MbbizAvatarGroupComponent],
  template: `
    <mbbiz-avatar />
    <mbbiz-avatar src="/missing.png" alt="Photo" (error)="errors = errors + 1" />
    <mbbiz-avatar icon="alinear_profile" />
    <mbbiz-avatar text="MB" />
    <mbbiz-avatar shape="square" [size]="40" />
    <mbbiz-avatar-group>
      <mbbiz-avatar text="A" />
      <mbbiz-avatar text="B" />
    </mbbiz-avatar-group>
  `,
})
class MbbizAvatarHostComponent {
  errors = 0;
}

describe('MbbizAvatarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizAvatarHostComponent],
      providers: [provideIcons([AlinearProfileIcon])],
    }).compileComponents();
  });

  it('renders the Figma default mark, image, icon, text, and square size', () => {
    const fixture = TestBed.createComponent(MbbizAvatarHostComponent);
    fixture.detectChanges();

    const avatars = fixture.nativeElement.querySelectorAll('mbbiz-avatar');
    expect(avatars[0].querySelector('.mbbiz-avatar__mark svg')).not.toBeNull();
    expect(avatars[0].style.getPropertyValue('--mbbiz-avatar-size')).toBe('50px');
    expect(avatars[1].querySelector('img')?.getAttribute('alt')).toBe('Photo');
    expect(avatars[2].querySelector('mbiz-icon, mbbiz-icon')).not.toBeNull();
    expect(avatars[3].textContent).toContain('MB');
    expect(avatars[4].classList).toContain('mbbiz-avatar--square');
    expect(avatars[4].style.getPropertyValue('--mbbiz-avatar-size')).toBe('40px');
  });

  it('falls back to the default mark when the image fails', () => {
    const fixture = TestBed.createComponent(MbbizAvatarHostComponent);
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    image.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    const photo = fixture.nativeElement.querySelectorAll('mbbiz-avatar')[1];
    expect(photo.querySelector('img')).toBeNull();
    expect(photo.querySelector('.mbbiz-avatar__mark')).not.toBeNull();
    expect(fixture.componentInstance.errors).toBe(1);
  });

  it('stacks a group with overlap', () => {
    const fixture = TestBed.createComponent(MbbizAvatarHostComponent);
    fixture.detectChanges();

    const group = fixture.nativeElement.querySelector('mbbiz-avatar-group') as HTMLElement;
    expect(group.querySelectorAll('mbbiz-avatar').length).toBe(2);
    expect(group.style.getPropertyValue('--mbbiz-avatar-group-overlap')).toBe('8px');
  });
});
