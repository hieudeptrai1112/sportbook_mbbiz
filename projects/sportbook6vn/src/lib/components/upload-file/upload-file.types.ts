export type Sportbook6vnUploadFileStatus = 'done' | 'uploading' | 'error';
export type Sportbook6vnUploadFileKind = 'xlsx' | 'docx' | 'pdf' | 'jpg' | 'xml' | 'file';
export type Sportbook6vnUploadFileChangeType = 'select' | 'drop' | 'remove';

export interface Sportbook6vnUploadFileItem {
  uid: string;
  name: string;
  size?: number;
  sizeLabel?: string;
  fileKind?: Sportbook6vnUploadFileKind;
  status?: Sportbook6vnUploadFileStatus;
  percent?: number;
  errorMessage?: string | null;
  disabled?: boolean;
  removable?: boolean;
  downloadable?: boolean;
}

export interface Sportbook6vnUploadFileChange {
  file: Sportbook6vnUploadFileItem;
  fileList: Sportbook6vnUploadFileItem[];
  type: Sportbook6vnUploadFileChangeType;
}
