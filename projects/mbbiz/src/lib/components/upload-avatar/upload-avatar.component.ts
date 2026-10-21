import {
  Component,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { IconComponent } from '@mbbiz/icon/angular';

import { MbbizLoadingComponent } from '../loading/loading.component';
import type {
  MbbizUploadAvatarChange,
  MbbizUploadAvatarChangeType,
  MbbizUploadAvatarErrorKind,
  MbbizUploadAvatarItem,
} from './upload-avatar.types';

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024;
const DEFAULT_HINT = 'Ảnh đại diện,\ntối đa 5MB';
const DEFAULT_FORMAT_ERROR = 'Ảnh không đúng định dạng';
const DEFAULT_SIZE_ERROR = 'Tối đa 5MB';

export interface MbbizUploadAvatarTile {
  kind: 'empty' | 'file';
  file?: MbbizUploadAvatarItem;
}

@Component({
  selector: 'mbbiz-upload-avatar',
  imports: [IconComponent, MbbizLoadingComponent],
  templateUrl: './upload-avatar.component.html',
  styleUrl: './upload-avatar.component.scss',
})
export class MbbizUploadAvatarComponent {
  readonly files = input<readonly MbbizUploadAvatarItem[]>([]);
  readonly maxCount = input(1);
  readonly accept = input('image/*');
  readonly maxSize = input(DEFAULT_MAX_SIZE);
  readonly hint = input(DEFAULT_HINT);
  readonly formatErrorMessage = input(DEFAULT_FORMAT_ERROR);
  readonly sizeErrorMessage = input(DEFAULT_SIZE_ERROR);
  readonly disabled = input(false);
  readonly fileInputId = input<string | null>(null);
  readonly previewAriaLabel = input('Xem ảnh');
  readonly addAriaLabel = input('Tải ảnh lên');

  readonly filesChange = output<MbbizUploadAvatarItem[]>();
  readonly change = output<MbbizUploadAvatarChange>();
  readonly fileSelect = output<MbbizUploadAvatarItem[]>();
  readonly preview = output<MbbizUploadAvatarItem>();

  private readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');
  private readonly ownedUrls = new Set<string>();
  private pendingReplaceUid: string | null = null;
  private readonly generatedId = `mbbiz-upload-avatar-${Math.random().toString(36).slice(2)}`;

  protected readonly localFiles = signal<MbbizUploadAvatarItem[]>([]);

  constructor() {
    effect(() => {
      this.localFiles.set(this.files().map((file) => this.normalizeFile(file)));
    });

    inject(DestroyRef).onDestroy(() => this.revokeAll());
  }

  protected readonly inputId = computed(
    () => this.fileInputId() ?? this.generatedId,
  );

  protected readonly acceptAttribute = computed(() => this.accept());

  protected readonly computedMultiple = computed(() => this.maxCount() > 1);

  protected readonly tiles = computed<MbbizUploadAvatarTile[]>(() => {
    const files = this.localFiles();
    const maxCount = Math.max(0, this.maxCount());
    const tiles: MbbizUploadAvatarTile[] = files.map((file) => ({
      kind: 'file',
      file,
    }));

    if (files.length < maxCount) {
      tiles.push({ kind: 'empty' });
    }

    return tiles;
  });

  protected readonly rootClass = computed(() =>
    [
      'mbbiz-upload-avatar',
      this.disabled() ? 'mbbiz-upload-avatar--disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected tileClass(tile: MbbizUploadAvatarTile): string {
    const status = this.tileStatus(tile);
    return [
      'mbbiz-upload-avatar__tile',
      `mbbiz-upload-avatar__tile--${status}`,
      tile.file?.disabled || this.disabled() ? 'mbbiz-upload-avatar__tile--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected tileStatus(tile: MbbizUploadAvatarTile): 'empty' | 'uploading' | 'done' | 'error' {
    if (tile.kind === 'empty' || !tile.file) {
      return 'empty';
    }

    return tile.file.status ?? 'done';
  }

  protected errorMessage(file: MbbizUploadAvatarItem): string {
    if (file.errorMessage) {
      return file.errorMessage;
    }

    return file.errorKind === 'size' ? this.sizeErrorMessage() : this.formatErrorMessage();
  }

  protected isPreviewable(tile: MbbizUploadAvatarTile): boolean {
    return !!tile.file?.url;
  }

  protected showHint(tile: MbbizUploadAvatarTile): boolean {
    const status = this.tileStatus(tile);
    return status === 'empty' || status === 'done';
  }

  protected trackTile(index: number, tile: MbbizUploadAvatarTile): string {
    return tile.file?.uid ?? `empty-${index}`;
  }

  protected onTileClick(tile: MbbizUploadAvatarTile, event: Event): void {
    event.preventDefault();

    if (this.isTileLocked(tile) || this.tileStatus(tile) !== 'empty') {
      return;
    }

    this.openFileDialog();
  }

  protected onAddClick(tile: MbbizUploadAvatarTile, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.isTileLocked(tile)) {
      return;
    }

    this.openFileDialog(tile.file?.uid);
  }

  protected onPreviewClick(tile: MbbizUploadAvatarTile, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.disabled() || !tile.file) {
      return;
    }

    this.preview.emit(tile.file);
  }

  protected onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files ? Array.from(inputElement.files) : [];
    this.uploadFiles(files);
    inputElement.value = '';
    this.pendingReplaceUid = null;
  }

  private openFileDialog(replaceUid?: string): void {
    if (this.disabled()) {
      return;
    }

    this.pendingReplaceUid = replaceUid ?? null;
    this.fileInput()?.nativeElement.click();
  }

  private uploadFiles(files: File[]): void {
    if (files.length === 0 || this.disabled()) {
      return;
    }

    const mappedFiles = files.map((file) => this.createUploadFile(file));
    const replaceUid = this.pendingReplaceUid;
    const current = this.localFiles();
    let nextFiles: MbbizUploadAvatarItem[];
    let type: MbbizUploadAvatarChangeType = 'select';

    if (replaceUid) {
      const index = current.findIndex((item) => item.uid === replaceUid);
      if (index >= 0) {
        type = 'replace';
        const replaced = current[index];
        this.revokeOwned(replaced?.url);
        const [first, ...rest] = mappedFiles;
        nextFiles = [...current];
        if (first) {
          nextFiles[index] = first;
        }
        const maxCount = Math.max(0, this.maxCount());
        const remainingSlots = Math.max(0, maxCount - nextFiles.length);
        nextFiles = [...nextFiles, ...rest.slice(0, remainingSlots)];
        this.dropOwned(mappedFiles.slice(1 + remainingSlots));
      } else {
        nextFiles = this.appendFiles(current, mappedFiles);
      }
    } else if (this.maxCount() === 1) {
      current.forEach((item) => this.revokeOwned(item.url));
      nextFiles = mappedFiles.slice(0, 1);
      this.dropOwned(mappedFiles.slice(1));
    } else {
      nextFiles = this.appendFiles(current, mappedFiles);
    }

    this.localFiles.set(nextFiles);
    this.fileSelect.emit(mappedFiles);
    this.filesChange.emit(nextFiles);
    mappedFiles.forEach((file) => {
      this.change.emit({ file, fileList: nextFiles, type });
    });
  }

  private appendFiles(
    current: MbbizUploadAvatarItem[],
    mappedFiles: MbbizUploadAvatarItem[],
  ): MbbizUploadAvatarItem[] {
    const maxCount = Math.max(0, this.maxCount());
    const slots = Math.max(0, maxCount - current.length);
    const accepted = mappedFiles.slice(0, slots);
    this.dropOwned(mappedFiles.slice(slots));
    return [...current, ...accepted];
  }

  private createUploadFile(file: File): MbbizUploadAvatarItem {
    const formatOk = this.matchesAccept(file);
    const sizeOk = file.size <= this.maxSize();
    let status: MbbizUploadAvatarItem['status'] = 'done';
    let errorKind: MbbizUploadAvatarErrorKind | null = null;

    if (!formatOk) {
      status = 'error';
      errorKind = 'format';
    } else if (!sizeOk) {
      status = 'error';
      errorKind = 'size';
    }

    const url = formatOk ? this.ownObjectUrl(file) : undefined;

    return {
      uid: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: file.name,
      size: file.size,
      file,
      url,
      status,
      errorKind,
      errorMessage: errorKind === 'size'
        ? this.sizeErrorMessage()
        : errorKind === 'format'
          ? this.formatErrorMessage()
          : null,
    };
  }

  private normalizeFile(file: MbbizUploadAvatarItem): MbbizUploadAvatarItem {
    return {
      ...file,
      status: file.status ?? 'done',
    };
  }

  private matchesAccept(file: File): boolean {
    const accept = this.accept().trim();
    if (!accept || accept === '*') {
      return true;
    }

    const type = file.type.toLowerCase();
    const name = file.name.toLowerCase();

    return accept
      .split(',')
      .map((token) => token.trim().toLowerCase())
      .filter(Boolean)
      .some((token) => {
        if (token.startsWith('.')) {
          return name.endsWith(token);
        }

        if (token.endsWith('/*')) {
          return type.startsWith(token.slice(0, -1));
        }

        return type === token;
      });
  }

  private isTileLocked(tile: MbbizUploadAvatarTile): boolean {
    return this.disabled() || !!tile.file?.disabled || this.tileStatus(tile) === 'uploading';
  }

  private ownObjectUrl(file: File): string {
    const url = URL.createObjectURL(file);
    this.ownedUrls.add(url);
    return url;
  }

  private revokeOwned(url?: string): void {
    if (!url || !this.ownedUrls.has(url)) {
      return;
    }

    URL.revokeObjectURL(url);
    this.ownedUrls.delete(url);
  }

  private dropOwned(files: MbbizUploadAvatarItem[]): void {
    files.forEach((file) => this.revokeOwned(file.url));
  }

  private revokeAll(): void {
    this.ownedUrls.forEach((url) => URL.revokeObjectURL(url));
    this.ownedUrls.clear();
  }
}
