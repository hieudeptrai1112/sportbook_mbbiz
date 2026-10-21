import type {
  MbbizItemFileErrorType,
  MbbizItemFileKind,
  MbbizItemFileStatus,
} from '../item-file/item-file.types';

export type MbbizUploadFileStatus = MbbizItemFileStatus;
export type MbbizUploadFileKind = MbbizItemFileKind;
export type MbbizUploadFileChangeType = 'select' | 'drop' | 'remove';

export interface MbbizUploadFileItem {
  uid: string;
  name: string;
  url?: string;
  size?: number;
  sizeLabel?: string;
  fileKind?: MbbizUploadFileKind;
  status?: MbbizUploadFileStatus;
  percent?: number;
  errorMessage?: string | null;
  errorType?: MbbizItemFileErrorType | null;
  disabled?: boolean;
  removable?: boolean;
  downloadable?: boolean;
}

export interface MbbizUploadFileChange {
  file: MbbizUploadFileItem;
  fileList: MbbizUploadFileItem[];
  type: MbbizUploadFileChangeType;
}
