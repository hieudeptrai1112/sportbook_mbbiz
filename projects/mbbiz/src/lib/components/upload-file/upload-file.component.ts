import { Component, ElementRef, computed, effect, input, output, signal, viewChild } from '@angular/core';

import { MbbizItemFileComponent } from '../item-file/item-file.component';
import { MbbizItemUploadComponent } from '../item-upload/item-upload.component';
import type { MbbizItemUploadState } from '../item-upload/item-upload.types';
import {
  MbbizUploadFileChange,
  MbbizUploadFileChangeType,
  MbbizUploadFileItem,
  MbbizUploadFileKind,
  MbbizUploadFileStatus,
} from './upload-file.types';

const DEFAULT_PROGRESS = 60;
const DEFAULT_VISIBLE_COUNT = 2;
const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB'] as const;

@Component({
  selector: 'mbbiz-upload-file',
  imports: [MbbizItemFileComponent, MbbizItemUploadComponent],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss',
})
export class MbbizUploadFileComponent {
  readonly label = input('Label');
  readonly required = input(true);
  readonly showLabel = input(true);
  readonly description = input<string | null>(null);
  readonly files = input<readonly MbbizUploadFileItem[]>([]);
  readonly disabled = input(false);
  readonly maxCount = input<number | null>(null);
  readonly accept = input<string | readonly string[] | null>(null);
  readonly multiple = input(true);
  readonly expanded = input(false);
  readonly visibleCount = input(DEFAULT_VISIBLE_COUNT);
  readonly uploadText = input('Kéo và thả để tải lên tệp tin');
  readonly selectText = input('Chọn từ máy tính');
  readonly showDataSource = input(false);
  readonly dataSourceText = input('Chọn từ kho dữ liệu');
  readonly errorMessage = input<string | null>(null);
  readonly showUploadArea = input(true);
  readonly showRemove = input(true);
  readonly showDownload = input(false);
  readonly downloadHandler = input<((file: MbbizUploadFileItem) => void) | null>(null);
  readonly fileInputId = input<string | null>(null);

  readonly filesChange = output<MbbizUploadFileItem[]>();
  readonly change = output<MbbizUploadFileChange>();
  readonly fileSelect = output<MbbizUploadFileItem[]>();
  readonly fileRemove = output<MbbizUploadFileItem>();
  readonly fileDownload = output<MbbizUploadFileItem>();
  readonly expandChange = output<boolean>();
  readonly dataSourceClick = output<void>();

  private readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  protected readonly localFiles = signal<MbbizUploadFileItem[]>([]);
  protected readonly localExpanded = signal(false);

  constructor() {
    effect(() => {
      this.localFiles.set(this.files().map((file) => this.normalizeFile(file)));
    });

    effect(() => {
      this.localExpanded.set(this.expanded());
    });
  }

  protected readonly uploadClass = computed(() =>
    [
      'mbbiz-upload-file',
      this.disabled() ? 'mbbiz-upload-file--disabled' : '',
      this.uploadAreaError() ? 'mbbiz-upload-file--error' : '',
      this.isUploadDisabled() ? 'mbbiz-upload-file--upload-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected readonly uploadAreaError = computed(() => !!this.errorMessage());

  protected readonly isMaxCountReached = computed(() => {
    const maxCount = this.maxCount();
    return typeof maxCount === 'number' && maxCount >= 0 && this.localFiles().length >= maxCount;
  });

  protected readonly isUploadDisabled = computed(() => this.disabled() || this.isMaxCountReached());

  protected readonly visibleFiles = computed(() => {
    const files = this.localFiles();
    const count = Math.max(1, Math.round(this.visibleCount()));

    if (this.localExpanded() || files.length <= count) {
      return files;
    }

    return files.slice(0, count);
  });

  protected readonly hasHiddenFiles = computed(() => this.localFiles().length > this.visibleFiles().length);

  protected readonly shouldShowExpandAction = computed(() => this.localFiles().length > Math.max(1, this.visibleCount()));

  protected readonly acceptAttribute = computed(() => {
    const accept = this.accept();
    return Array.isArray(accept) ? accept.join(',') : accept;
  });

  protected readonly inputId = computed(() => this.fileInputId() ?? `mbbiz-upload-file-${this.label().replace(/\s+/g, '-').toLowerCase()}`);

  protected readonly computedMultiple = computed(() => {
    const maxCount = this.maxCount();
    return this.multiple() && maxCount !== 1;
  });

  protected readonly itemUploadState = computed<MbbizItemUploadState>(() => {
    if (this.isUploadDisabled()) {
      return 'disabled';
    }

    if (this.uploadAreaError()) {
      return 'error';
    }

    return 'default';
  });

  protected openFileDialog(event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();

    if (this.isUploadDisabled()) {
      return;
    }

    this.fileInput()?.nativeElement.click();
  }

  protected onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files ? Array.from(inputElement.files) : [];
    this.uploadFiles(files, 'select');
    inputElement.value = '';
  }

  protected onFileDrop(files: File[]): void {
    this.uploadFiles(files, 'drop');
  }

  protected removeFile(file: MbbizUploadFileItem, event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();

    if (this.disabled() || file.disabled || file.removable === false || !this.showRemove()) {
      return;
    }

    const nextFiles = this.localFiles().filter((item) => item.uid !== file.uid);
    this.localFiles.set(nextFiles);
    this.filesChange.emit(nextFiles);
    this.fileRemove.emit(file);
    this.change.emit({ file, fileList: nextFiles, type: 'remove' });
  }

  protected downloadFile(file: MbbizUploadFileItem): void {
    if (this.disabled() || file.disabled || !this.showDownload() || !file.downloadable) {
      return;
    }

    const downloadHandler = this.downloadHandler();
    if (typeof downloadHandler === 'function') {
      downloadHandler(file);
    } else if (file.url) {
      window.open(file.url);
    }

    this.fileDownload.emit(file);
  }

  protected toggleExpanded(event?: Event): void {
    event?.preventDefault();
    const nextExpanded = !this.localExpanded();
    this.localExpanded.set(nextExpanded);
    this.expandChange.emit(nextExpanded);
  }

  protected emitDataSourceClick(event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();

    if (this.isUploadDisabled()) {
      return;
    }

    this.dataSourceClick.emit();
  }

  protected trackFile(_index: number, file: MbbizUploadFileItem): string {
    return file.uid;
  }

  protected fileStatus(file: MbbizUploadFileItem): MbbizUploadFileStatus {
    return file.status ?? 'done';
  }

  protected fileKind(file: MbbizUploadFileItem): MbbizUploadFileKind {
    return file.fileKind ?? this.resolveFileKind(file.name);
  }

  protected fileSizeLabel(file: MbbizUploadFileItem): string {
    if (file.sizeLabel) {
      return file.sizeLabel;
    }

    if (typeof file.size !== 'number') {
      return '2 MB';
    }

    return this.formatSize(file.size);
  }

  protected progressValue(file: MbbizUploadFileItem): number {
    const value = file.percent ?? DEFAULT_PROGRESS;
    return Math.min(100, Math.max(0, Math.round(value)));
  }

  private uploadFiles(files: File[], type: MbbizUploadFileChangeType): void {
    if (files.length === 0) {
      return;
    }

    const availableSlots = this.getAvailableSlots();
    const acceptedFiles = availableSlots === null ? files : files.slice(0, availableSlots);

    if (acceptedFiles.length === 0) {
      return;
    }

    const mappedFiles = acceptedFiles.map((file) => this.createUploadFile(file));
    const nextFiles = this.maxFiles([...this.localFiles(), ...mappedFiles]);
    this.localFiles.set(nextFiles);
    this.fileSelect.emit(mappedFiles);
    this.filesChange.emit(nextFiles);
    this.localExpanded.set(nextFiles.length > this.visibleCount());

    mappedFiles.forEach((file) => {
      this.change.emit({ file, fileList: nextFiles, type });
    });
  }

  private normalizeFile(file: MbbizUploadFileItem): MbbizUploadFileItem {
    return {
      ...file,
      status: file.status ?? 'done',
      fileKind: file.fileKind ?? this.resolveFileKind(file.name),
      percent: typeof file.percent === 'number' ? Math.min(100, Math.max(0, file.percent)) : file.percent,
    };
  }

  private createUploadFile(file: File): MbbizUploadFileItem {
    return {
      uid: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: file.name,
      size: file.size,
      status: 'done',
      fileKind: this.resolveFileKind(file.name),
    };
  }

  private getAvailableSlots(): number | null {
    const maxCount = this.maxCount();
    if (typeof maxCount !== 'number' || maxCount < 0) {
      return null;
    }

    return Math.max(0, maxCount - this.localFiles().length);
  }

  private maxFiles(files: MbbizUploadFileItem[]): MbbizUploadFileItem[] {
    const maxCount = this.maxCount();
    if (typeof maxCount !== 'number' || maxCount < 0) {
      return files;
    }

    return files.slice(0, maxCount);
  }

  private resolveFileKind(name: string): MbbizUploadFileKind {
    const extension = name.split('.').pop()?.toLowerCase();

    if (extension === 'xlsx' || extension === 'docx' || extension === 'pdf' || extension === 'jpg' || extension === 'xml') {
      return extension;
    }

    return 'file';
  }

  private formatSize(size: number): string {
    let value = size;
    let unitIndex = 0;

    while (value >= 1024 && unitIndex < FILE_SIZE_UNITS.length - 1) {
      value /= 1024;
      unitIndex += 1;
    }

    const rounded = value >= 10 || unitIndex === 0 ? Math.round(value) : Math.round(value * 10) / 10;
    return `${rounded} ${FILE_SIZE_UNITS[unitIndex]}`;
  }
}
