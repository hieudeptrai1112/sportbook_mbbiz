import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sportbook6vnUploadFileComponent } from './upload-file.component';
import { Sportbook6vnUploadFileItem } from './upload-file.types';

describe('Sportbook6vnUploadFileComponent', () => {
  let fixture: ComponentFixture<Sportbook6vnUploadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sportbook6vnUploadFileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Sportbook6vnUploadFileComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders label and default upload prompt', () => {
    const label = fixture.nativeElement.querySelector('.sportbook6vn-upload-file__label');
    const dropText = fixture.nativeElement.querySelector('.sportbook6vn-upload-file__drop-text');
    const browse = fixture.nativeElement.querySelector('.sportbook6vn-upload-file__link');

    expect(label.textContent.trim()).toBe('Label*');
    expect(dropText.textContent.trim()).toBe('Kéo và thả để tải lên tệp tin');
    expect(browse.textContent.trim()).toBe('Chọn từ máy tính');
  });

  it('renders uploaded files and collapses after visible count', () => {
    fixture.componentRef.setInput('files', [
      { uid: '1', name: 'Tên tệp tin.pdf', sizeLabel: '2 MB', fileKind: 'pdf' },
      { uid: '2', name: 'Tên tệp tin.docx', sizeLabel: '2 MB', fileKind: 'docx' },
      { uid: '3', name: 'Tên tệp tin.xlsx', sizeLabel: '2 MB', fileKind: 'xlsx' },
    ] satisfies Sportbook6vnUploadFileItem[]);
    fixture.componentRef.setInput('expanded', false);
    fixture.detectChanges();

    const files = fixture.nativeElement.querySelectorAll('.sportbook6vn-upload-file__file');
    const expand = fixture.nativeElement.querySelector('.sportbook6vn-upload-file__expand');

    expect(files.length).toBe(2);
    expect(expand.textContent.trim()).toContain('Xem thêm');
  });

  it('emits file removal changes', () => {
    @Component({
      imports: [Sportbook6vnUploadFileComponent],
      template: `
        <sportbook6vn-upload-file
          [files]="files"
          (filesChange)="files = $event"
          (fileRemove)="removed = $event"
        />
      `,
    })
    class Sportbook6vnUploadFileRemoveTestHostComponent {
      files: Sportbook6vnUploadFileItem[] = [{ uid: '1', name: 'Tên tệp tin.pdf', sizeLabel: '2 MB' }];
      removed: Sportbook6vnUploadFileItem | null = null;
    }

    const hostFixture = TestBed.createComponent(Sportbook6vnUploadFileRemoveTestHostComponent);
    hostFixture.detectChanges();

    const remove = hostFixture.nativeElement.querySelector('.sportbook6vn-upload-file__remove') as HTMLButtonElement;
    remove.click();
    hostFixture.detectChanges();

    expect(hostFixture.componentInstance.files.length).toBe(0);
    expect(hostFixture.componentInstance.removed?.uid).toBe('1');
  });

  it('applies error and disabled states', () => {
    fixture.componentRef.setInput('errorMessage', 'Vui lòng tải lên thông tin');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.sportbook6vn-upload-file');
    const error = fixture.nativeElement.querySelector('.sportbook6vn-upload-file__error-message');
    const button = fixture.nativeElement.querySelector('.sportbook6vn-upload-file__link') as HTMLButtonElement;

    expect(root.classList).toContain('sportbook6vn-upload-file--error');
    expect(root.classList).toContain('sportbook6vn-upload-file--disabled');
    expect(error.textContent.trim()).toContain('Vui lòng tải lên thông tin');
    expect(button.disabled).toBe(true);
  });
});
