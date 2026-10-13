import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AlinearAddIcon, AlinearVisibleIcon } from '@mbbiz/icon';
import { provideIcons } from '@mbbiz/icon/angular';

import { MbbizUploadAvatarComponent } from './upload-avatar.component';
import type { MbbizUploadAvatarItem } from './upload-avatar.types';

function makeFile(name: string, type: string, size = 12): File {
  const blob = new Blob([new Uint8Array(size)], { type });
  return new File([blob], name, { type });
}

function setInputFiles(input: HTMLInputElement, files: File[]): void {
  Object.defineProperty(input, 'files', {
    configurable: true,
    value: files,
  });
  input.dispatchEvent(new Event('change'));
}

@Component({
  imports: [MbbizUploadAvatarComponent],
  template: `
    <mbbiz-upload-avatar
      [files]="files"
      [maxCount]="maxCount"
      [accept]="accept"
      [maxSize]="maxSize"
      (filesChange)="files = $event"
      (fileSelect)="selected = $event"
      (preview)="previewed = $event"
    />
  `,
})
class MbbizUploadAvatarHostComponent {
  files: MbbizUploadAvatarItem[] = [];
  selected: MbbizUploadAvatarItem[] = [];
  previewed: MbbizUploadAvatarItem | null = null;
  maxCount = 1;
  accept = 'image/*';
  maxSize = 5 * 1024 * 1024;
}

describe('MbbizUploadAvatarComponent', () => {
  beforeAll(() => {
    if (typeof URL.createObjectURL !== 'function') {
      URL.createObjectURL = () => 'blob:mock-avatar';
    }
    if (typeof URL.revokeObjectURL !== 'function') {
      URL.revokeObjectURL = () => undefined;
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizUploadAvatarHostComponent, MbbizUploadAvatarComponent],
      providers: [provideIcons([AlinearVisibleIcon, AlinearAddIcon])],
    }).compileComponents();
  });

  it('renders the empty default tile', () => {
    const fixture = TestBed.createComponent(MbbizUploadAvatarComponent);
    fixture.detectChanges();

    const tile = fixture.nativeElement.querySelector('.mbbiz-upload-avatar__tile--empty');
    expect(tile).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.mbbiz-upload-avatar__tile').length).toBe(1);
  });

  it('maps a valid image to done and emits filesChange', () => {
    const fixture = TestBed.createComponent(MbbizUploadAvatarHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      '.mbbiz-upload-avatar__input',
    ) as HTMLInputElement;
    setInputFiles(input, [makeFile('avatar.png', 'image/png')]);
    fixture.detectChanges();

    expect(fixture.componentInstance.files).toHaveLength(1);
    expect(fixture.componentInstance.files[0]?.status).toBe('done');
    expect(fixture.componentInstance.selected).toHaveLength(1);
    expect(fixture.nativeElement.querySelector('.mbbiz-upload-avatar__tile--done')).not.toBeNull();
  });

  it('marks oversize images as size errors', () => {
    const fixture = TestBed.createComponent(MbbizUploadAvatarHostComponent);
    fixture.componentInstance.maxSize = 8;
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      '.mbbiz-upload-avatar__input',
    ) as HTMLInputElement;
    setInputFiles(input, [makeFile('big.png', 'image/png', 32)]);
    fixture.detectChanges();

    expect(fixture.componentInstance.files[0]?.status).toBe('error');
    expect(fixture.componentInstance.files[0]?.errorKind).toBe('size');
    expect(fixture.nativeElement.textContent).toContain('Tối đa 5MB');
  });

  it('marks non-image files as format errors', () => {
    const fixture = TestBed.createComponent(MbbizUploadAvatarHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      '.mbbiz-upload-avatar__input',
    ) as HTMLInputElement;
    setInputFiles(input, [makeFile('notes.pdf', 'application/pdf')]);
    fixture.detectChanges();

    expect(fixture.componentInstance.files[0]?.errorKind).toBe('format');
    expect(fixture.nativeElement.textContent).toContain('Ảnh không đúng định dạng');
  });

  it('replaces the current file when maxCount is 1', () => {
    const fixture = TestBed.createComponent(MbbizUploadAvatarHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      '.mbbiz-upload-avatar__input',
    ) as HTMLInputElement;
    setInputFiles(input, [makeFile('one.png', 'image/png')]);
    fixture.detectChanges();
    const firstUid = fixture.componentInstance.files[0]?.uid;

    setInputFiles(input, [makeFile('two.png', 'image/png')]);
    fixture.detectChanges();

    expect(fixture.componentInstance.files).toHaveLength(1);
    expect(fixture.componentInstance.files[0]?.name).toBe('two.png');
    expect(fixture.componentInstance.files[0]?.uid).not.toBe(firstUid);
  });

  it('keeps an add tile until maxCount is reached', () => {
    const fixture = TestBed.createComponent(MbbizUploadAvatarHostComponent);
    fixture.componentInstance.maxCount = 2;
    fixture.componentInstance.files = [
      { uid: '1', name: 'one.png', url: '/one.png', status: 'done' },
    ];
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.mbbiz-upload-avatar__tile').length).toBe(2);
    expect(fixture.nativeElement.querySelector('.mbbiz-upload-avatar__tile--empty')).not.toBeNull();
  });

  it('emits preview from the eye action', () => {
    const fixture = TestBed.createComponent(MbbizUploadAvatarHostComponent);
    fixture.componentInstance.files = [
      { uid: 'preview-1', name: 'avatar.png', url: '/avatar.png', status: 'done' },
    ];
    fixture.detectChanges();

    const eye = fixture.nativeElement.querySelector(
      '.mbbiz-upload-avatar__action',
    ) as HTMLButtonElement;
    eye.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.previewed?.uid).toBe('preview-1');
  });

  it('renders a loading spinner and hides hover actions', () => {
    const fixture = TestBed.createComponent(MbbizUploadAvatarComponent);
    fixture.componentRef.setInput('files', [
      { uid: 'loading', name: 'avatar.png', url: '/avatar.png', status: 'uploading' },
    ] satisfies MbbizUploadAvatarItem[]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('mbbiz-loading')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.mbbiz-upload-avatar__hover')).toBeNull();
  });
});
