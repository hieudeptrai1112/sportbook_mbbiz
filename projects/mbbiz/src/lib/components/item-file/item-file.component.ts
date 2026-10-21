import { Component, computed, input, output } from '@angular/core';

import {
  SPORTBOOK6VN_ITEM_FILE_ILLUSTRATION_BASE_PATH,
  SPORTBOOK6VN_ITEM_FILE_ILLUSTRATION_FILES,
} from './item-file.assets';
import {
  MbbizItemFileErrorType,
  MbbizItemFileKind,
  MbbizItemFileStatus,
} from './item-file.types';

const DEFAULT_PERCENT = 60;

@Component({
  selector: 'mbbiz-item-file',
  templateUrl: './item-file.component.html',
  styleUrl: './item-file.component.scss',
})
export class MbbizItemFileComponent {
  readonly name = input('Tên tệp tin.xlsx');
  readonly sizeLabel = input('2 MB');
  readonly fileKind = input<MbbizItemFileKind | null>(null);
  readonly status = input<MbbizItemFileStatus>('done');
  readonly percent = input(DEFAULT_PERCENT);
  readonly errorMessage = input<string | null>(null);
  readonly errorType = input<MbbizItemFileErrorType | null>(null);
  readonly showClose = input(true);
  readonly showDownload = input(false);
  readonly disabled = input(false);
  readonly illustrationBasePath = input(SPORTBOOK6VN_ITEM_FILE_ILLUSTRATION_BASE_PATH);

  readonly remove = output<void>();
  readonly download = output<void>();

  protected readonly resolvedKind = computed<MbbizItemFileKind>(() => {
    const explicitKind = this.fileKind();
    if (explicitKind) {
      return explicitKind;
    }

    return this.resolveFileKind(this.name());
  });

  protected readonly iconKind = computed<MbbizItemFileKind>(() => {
    if (this.errorType() === 'format') {
      return 'error';
    }

    return this.resolvedKind();
  });

  protected readonly iconSrc = computed(() => {
    const basePath = this.illustrationBasePath().replace(/\/$/, '');
    const fileName = SPORTBOOK6VN_ITEM_FILE_ILLUSTRATION_FILES[this.iconKind()];
    return `${basePath}/${fileName}`;
  });

  protected readonly iconAlt = computed(() => `${this.displayExtension().replace('.', '').toUpperCase() || 'File'} file`);

  protected readonly itemClass = computed(() =>
    [
      'mbbiz-item-file',
      `mbbiz-item-file--${this.status()}`,
      `mbbiz-item-file--${this.iconKind()}`,
      this.disabled() ? 'mbbiz-item-file--disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected readonly displayNameBase = computed(() => {
    const fileName = this.name();
    const dotIndex = fileName.lastIndexOf('.');
    return dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName;
  });

  protected readonly displayExtension = computed(() => {
    const fileName = this.name();
    const dotIndex = fileName.lastIndexOf('.');
    if (dotIndex > 0 && dotIndex < fileName.length - 1) {
      return fileName.slice(dotIndex);
    }

    const kind = this.resolvedKind();
    return kind === 'file' || kind === 'error' ? '' : `.${kind}`;
  });

  protected readonly progressWidth = computed(() => {
    const percent = Math.round(this.percent());
    return Math.min(100, Math.max(0, percent));
  });

  protected readonly resolvedErrorMessage = computed(() => {
    if (this.status() !== 'error') {
      return null;
    }

    const message = this.errorMessage();
    if (message) {
      return message;
    }

    switch (this.errorType()) {
      case 'size':
        return 'File tải lên vượt quá dung lượng cho phép';
      case 'format':
        return 'File tải lên không đúng định dạng. Vui lòng kiểm tra và tải lại';
      case 'upload':
      default:
        return 'File tải lên bị lỗi. Vui lòng kiểm tra và tải lại';
    }
  });

  protected emitRemove(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.disabled()) {
      return;
    }

    this.remove.emit();
  }

  protected emitDownload(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.disabled()) {
      return;
    }

    this.download.emit();
  }

  private resolveFileKind(name: string): MbbizItemFileKind {
    const extension = name.split('.').pop()?.toLowerCase();

    if (
      extension === 'xlsx' ||
      extension === 'docx' ||
      extension === 'pdf' ||
      extension === 'jpg' ||
      extension === 'xml'
    ) {
      return extension;
    }

    return 'file';
  }
}
