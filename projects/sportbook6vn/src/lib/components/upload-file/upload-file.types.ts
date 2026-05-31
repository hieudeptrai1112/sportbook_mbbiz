import type {
  Sportbook6vnItemFileErrorType,
  Sportbook6vnItemFileKind,
  Sportbook6vnItemFileStatus,
} from '../item-file/item-file.types';

export type Sportbook6vnUploadFileStatus = Sportbook6vnItemFileStatus;
export type Sportbook6vnUploadFileKind = Sportbook6vnItemFileKind;
export type Sportbook6vnUploadFileChangeType = 'select' | 'drop' | 'remove';

export interface Sportbook6vnUploadFileItem {
  uid: string;
  name: string;
  url?: string;
  size?: number;
  sizeLabel?: string;
  fileKind?: Sportbook6vnUploadFileKind;
  status?: Sportbook6vnUploadFileStatus;
  percent?: number;
  errorMessage?: string | null;
  errorType?: Sportbook6vnItemFileErrorType | null;
  disabled?: boolean;
  removable?: boolean;
  downloadable?: boolean;
}

export interface Sportbook6vnUploadFileChange {
  file: Sportbook6vnUploadFileItem;
  fileList: Sportbook6vnUploadFileItem[];
  type: Sportbook6vnUploadFileChangeType;
}
