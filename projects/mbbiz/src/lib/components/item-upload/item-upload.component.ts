import { Component, computed, input, output, signal } from '@angular/core';

import {
  SPORTBOOK6VN_ITEM_UPLOAD_ILLUSTRATION_BASE_PATH,
  SPORTBOOK6VN_ITEM_UPLOAD_ILLUSTRATION_FILE,
} from './item-upload.assets';
import type { MbbizItemUploadState } from './item-upload.types';

@Component({
  selector: 'mbbiz-item-upload',
  templateUrl: './item-upload.component.html',
  styleUrl: './item-upload.component.scss',
})
export class MbbizItemUploadComponent {
  readonly state = input<MbbizItemUploadState>('default');
  readonly uploadText = input('Kéo và thả để tải lên tệp tin');
  readonly selectText = input('Chọn từ máy tính');
  readonly showDataSource = input(false);
  readonly dataSourceText = input('Chọn từ kho dữ liệu');
  readonly errorMessage = input<string | null>(null);
  readonly illustrationBasePath = input(SPORTBOOK6VN_ITEM_UPLOAD_ILLUSTRATION_BASE_PATH);
  readonly illustrationFile = input(SPORTBOOK6VN_ITEM_UPLOAD_ILLUSTRATION_FILE);

  readonly select = output<void>();
  readonly dataSourceClick = output<void>();
  readonly fileDrop = output<File[]>();

  protected readonly dragActive = signal(false);

  protected readonly disabled = computed(() => this.state() === 'disabled');

  protected readonly itemClass = computed(() =>
    [
      'mbbiz-item-upload',
      `mbbiz-item-upload--${this.state()}`,
      this.dragActive() ? 'mbbiz-item-upload--drag-active' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected readonly illustrationSrc = computed(() => {
    const basePath = this.illustrationBasePath().replace(/\/$/, '');
    return `${basePath}/${this.illustrationFile()}`;
  });

  protected selectFile(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.disabled()) {
      return;
    }

    this.select.emit();
  }

  protected emitDataSourceClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.disabled()) {
      return;
    }

    this.dataSourceClick.emit();
  }

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();

    if (this.disabled()) {
      return;
    }

    this.dragActive.set(true);
  }

  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragActive.set(false);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragActive.set(false);

    if (this.disabled()) {
      return;
    }

    const files = event.dataTransfer?.files ? Array.from(event.dataTransfer.files) : [];
    this.fileDrop.emit(files);
  }
}
