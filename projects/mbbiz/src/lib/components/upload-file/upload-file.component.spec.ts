import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbbizUploadFileComponent } from './upload-file.component';
import { MbbizUploadFileItem } from './upload-file.types';

describe('MbbizUploadFileComponent', () => {
  let fixture: ComponentFixture<MbbizUploadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbbizUploadFileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MbbizUploadFileComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders label and default upload prompt', () => {
    const label = fixture.nativeElement.querySelector('.mbbiz-upload-file__label');
    const dropText = fixture.nativeElement.querySelector('.mbbiz-item-upload__guide');
    const browse = fixture.nativeElement.querySelector('.mbbiz-item-upload__link');

    expect(label.textContent.trim()).toBe('Label*');
    expect(dropText.textContent.trim()).toBe('Kéo và thả để tải lên tệp tin');
    expect(browse.textContent.trim()).toBe('Chọn từ máy tính');
  });

  it('renders uploaded files and collapses after visible count', () => {
    fixture.componentRef.setInput('files', [
      { uid: '1', name: 'Tên tệp tin.pdf', sizeLabel: '2 MB', fileKind: 'pdf' },
      { uid: '2', name: 'Tên tệp tin.docx', sizeLabel: '2 MB', fileKind: 'docx' },
      { uid: '3', name: 'Tên tệp tin.xlsx', sizeLabel: '2 MB', fileKind: 'xlsx' },
    ] satisfies MbbizUploadFileItem[]);
    fixture.componentRef.setInput('expanded', false);
    fixture.detectChanges();

    const files = fixture.nativeElement.querySelectorAll('mbbiz-item-file');
    const expand = fixture.nativeElement.querySelector('.mbbiz-upload-file__expand');

    expect(files.length).toBe(2);
    expect(expand.textContent.trim()).toContain('Xem thêm');
  });

  it('emits file removal changes', () => {
    @Component({
      imports: [MbbizUploadFileComponent],
      template: `
        <mbbiz-upload-file
          [files]="files"
          (filesChange)="files = $event"
          (fileRemove)="removed = $event"
        />
      `,
    })
    class MbbizUploadFileRemoveTestHostComponent {
      files: MbbizUploadFileItem[] = [{ uid: '1', name: 'Tên tệp tin.pdf', sizeLabel: '2 MB' }];
      removed: MbbizUploadFileItem | null = null;
    }

    const hostFixture = TestBed.createComponent(MbbizUploadFileRemoveTestHostComponent);
    hostFixture.detectChanges();

    const remove = hostFixture.nativeElement.querySelector('.mbbiz-item-file__action--remove') as HTMLButtonElement;
    remove.click();
    hostFixture.detectChanges();

    expect(hostFixture.componentInstance.files.length).toBe(0);
    expect(hostFixture.componentInstance.removed?.uid).toBe('1');
  });

  it('applies the error state', () => {
    fixture.componentRef.setInput('errorMessage', 'Vui lòng tải lên thông tin');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-upload-file');
    const error = fixture.nativeElement.querySelector('.mbbiz-item-upload__error-message');

    expect(root.classList).toContain('mbbiz-upload-file--error');
    expect(error.textContent.trim()).toContain('Vui lòng tải lên thông tin');
  });

  it('applies the disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.mbbiz-upload-file');
    const button = fixture.nativeElement.querySelector('.mbbiz-item-upload__link') as HTMLButtonElement;

    expect(root.classList).toContain('mbbiz-upload-file--disabled');
    expect(button.disabled).toBe(true);
  });

  it('opens the file url when clicking download without a custom handler', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    fixture.componentRef.setInput('files', [
      {
        uid: 'download-1',
        name: 'Tên tệp tin.pdf',
        sizeLabel: '2 MB',
        fileKind: 'pdf',
        downloadable: true,
        url: '/downloads/ten-tep-tin.pdf',
      },
    ] satisfies MbbizUploadFileItem[]);
    fixture.componentRef.setInput('showDownload', true);
    fixture.componentRef.setInput('showRemove', false);
    fixture.detectChanges();

    const download = fixture.nativeElement.querySelector('.mbbiz-item-file__action--download') as HTMLButtonElement;
    download.click();

    expect(openSpy).toHaveBeenCalledWith('/downloads/ten-tep-tin.pdf');
    openSpy.mockRestore();
  });

  it('calls the custom download handler before using the file url fallback', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    const downloadHandler = vi.fn();
    fixture.componentRef.setInput('files', [
      {
        uid: 'download-handler-1',
        name: 'Tên tệp tin.docx',
        sizeLabel: '2 MB',
        fileKind: 'docx',
        downloadable: true,
        url: '/downloads/ten-tep-tin.docx',
      },
    ] satisfies MbbizUploadFileItem[]);
    fixture.componentRef.setInput('showDownload', true);
    fixture.componentRef.setInput('showRemove', false);
    fixture.componentRef.setInput('downloadHandler', downloadHandler);
    fixture.detectChanges();

    const download = fixture.nativeElement.querySelector('.mbbiz-item-file__action--download') as HTMLButtonElement;
    download.click();

    expect(downloadHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        uid: 'download-handler-1',
        name: 'Tên tệp tin.docx',
      }),
    );
    expect(openSpy).not.toHaveBeenCalled();
    openSpy.mockRestore();
  });
});
