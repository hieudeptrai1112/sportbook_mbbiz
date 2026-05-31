export type UploadFileDemoGroup = 'Item Upload' | 'Item File' | 'Upload File';

export type UploadFileDemoVariant =
  | 'itemUploadDefault'
  | 'itemUploadStatus'
  | 'itemUploadDataSource'
  | 'itemFileDefault'
  | 'itemFileView'
  | 'itemFileLoading'
  | 'itemFileError'
  | 'uploadBasic'
  | 'uploadUploaded'
  | 'uploadLoading'
  | 'uploadStatus'
  | 'uploadDisabled'
  | 'uploadFileTypes';

export interface UploadFileDemoDescriptionPart {
  text?: string;
  code?: string;
}

export interface UploadFileDemoSection {
  id: string;
  title: string;
  group: UploadFileDemoGroup;
  descriptionParts: UploadFileDemoDescriptionPart[];
  tags: string[];
  variant: UploadFileDemoVariant;
}

export const UPLOAD_FILE_DEMO_SECTIONS: UploadFileDemoSection[] = [
  {
    id: 'item-upload-default',
    title: 'Item Upload / Default',
    group: 'Item Upload',
    descriptionParts: [
      { code: 'sportbook6vn-item-upload' },
      { text: ' renders the default drag-and-drop entry with computer selection.' },
    ],
    tags: ['selector=sportbook6vn-item-upload', 'state=default'],
    variant: 'itemUploadDefault',
  },
  {
    id: 'item-upload-status',
    title: 'Item Upload / Status',
    group: 'Item Upload',
    descriptionParts: [
      { code: 'state' },
      { text: ' covers error and disabled upload entry states.' },
    ],
    tags: ['state=error', 'state=disabled'],
    variant: 'itemUploadStatus',
  },
  {
    id: 'item-upload-data-source',
    title: 'Item Upload / Data Source',
    group: 'Item Upload',
    descriptionParts: [
      { code: 'showDataSource=true' },
      { text: ' adds the secondary data-source action.' },
    ],
    tags: ['selector=sportbook6vn-item-upload', 'showDataSource=true'],
    variant: 'itemUploadDataSource',
  },
  {
    id: 'item-file-default',
    title: 'Item File / Default',
    group: 'Item File',
    descriptionParts: [
      { code: 'sportbook6vn-item-file' },
      { text: ' displays supported xlsx, docx, pdf, jpg, and xml file rows.' },
    ],
    tags: ['selector=sportbook6vn-item-file', 'status=done', 'action=remove'],
    variant: 'itemFileDefault',
  },
  {
    id: 'item-file-view',
    title: 'Item File / View File',
    group: 'Item File',
    descriptionParts: [
      { code: 'showDownload=true' },
      { text: ' switches the row action from remove to download.' },
    ],
    tags: ['selector=sportbook6vn-item-file', 'showClose=false', 'showDownload=true'],
    variant: 'itemFileView',
  },
  {
    id: 'item-file-loading',
    title: 'Item File / Loading',
    group: 'Item File',
    descriptionParts: [
      { code: 'status=uploading' },
      { text: ' keeps the same file row and adds the progress line.' },
    ],
    tags: ['selector=sportbook6vn-item-file', 'status=uploading', 'percent'],
    variant: 'itemFileLoading',
  },
  {
    id: 'item-file-error',
    title: 'Item File / Error',
    group: 'Item File',
    descriptionParts: [
      { code: 'status=error' },
      { text: ' covers size, upload, and format error messages.' },
    ],
    tags: ['selector=sportbook6vn-item-file', 'status=error', 'errorType=size/upload/format'],
    variant: 'itemFileError',
  },
  {
    id: 'upload-basic',
    title: 'Upload File / Basic Upload',
    group: 'Upload File',
    descriptionParts: [
      { code: 'sportbook6vn-upload-file' },
      { text: ' renders the default upload entry with required label.' },
    ],
    tags: ['selector=sportbook6vn-upload-file', 'files=[]'],
    variant: 'uploadBasic',
  },
  {
    id: 'upload-uploaded',
    title: 'Upload File / Uploaded Files',
    group: 'Upload File',
    descriptionParts: [
      { code: 'files' },
      { text: ' shows collapsed and expanded file list states.' },
    ],
    tags: ['selector=sportbook6vn-upload-file', 'expanded=false/true'],
    variant: 'uploadUploaded',
  },
  {
    id: 'upload-loading',
    title: 'Upload File / Loading',
    group: 'Upload File',
    descriptionParts: [
      { code: 'status=uploading' },
      { text: ' forwards item-file progress states inside the upload list.' },
    ],
    tags: ['selector=sportbook6vn-upload-file', 'file.status=uploading'],
    variant: 'uploadLoading',
  },
  {
    id: 'upload-status',
    title: 'Upload File / Status',
    group: 'Upload File',
    descriptionParts: [
      { code: 'errorMessage' },
      { text: ' covers upload-entry validation and file-level failures.' },
    ],
    tags: ['selector=sportbook6vn-upload-file', 'errorMessage', 'file.status=error'],
    variant: 'uploadStatus',
  },
  {
    id: 'upload-disabled',
    title: 'Upload File / Disabled',
    group: 'Upload File',
    descriptionParts: [
      { code: 'disabled' },
      { text: ' and ' },
      { code: 'maxCount' },
      { text: ' make the upload entry non-interactive.' },
    ],
    tags: ['selector=sportbook6vn-upload-file', 'disabled=true', 'maxCount=3'],
    variant: 'uploadDisabled',
  },
  {
    id: 'upload-file-types',
    title: 'Upload File / File Types',
    group: 'Upload File',
    descriptionParts: [
      { code: 'showDownload=true' },
      { text: ' lists xlsx, docx, pdf, jpg, and xml rows with download actions.' },
    ],
    tags: ['selector=sportbook6vn-upload-file', 'showUploadArea=false', 'showDownload=true'],
    variant: 'uploadFileTypes',
  },
];
