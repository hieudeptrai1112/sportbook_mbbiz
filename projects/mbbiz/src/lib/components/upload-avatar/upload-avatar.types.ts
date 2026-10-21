export type MbbizUploadAvatarStatus = 'uploading' | 'done' | 'error';
export type MbbizUploadAvatarErrorKind = 'format' | 'size';
export type MbbizUploadAvatarChangeType = 'select' | 'replace';

export interface MbbizUploadAvatarItem {
  uid: string;
  name: string;
  url?: string;
  size?: number;
  file?: File;
  status?: MbbizUploadAvatarStatus;
  errorKind?: MbbizUploadAvatarErrorKind | null;
  errorMessage?: string | null;
  disabled?: boolean;
}

export interface MbbizUploadAvatarChange {
  file: MbbizUploadAvatarItem;
  fileList: MbbizUploadAvatarItem[];
  type: MbbizUploadAvatarChangeType;
}
