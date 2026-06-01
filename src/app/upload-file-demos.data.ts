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
  snippetTs: string;
}

export interface UploadFileApiRow {
  property: string;
  description: string;
  type: string;
  defaultValue: string;
}

export interface UploadFileVariableRow {
  token: string;
  value: string;
  appliesTo: string;
  notes: string;
}

export interface UploadFileVariableGroup {
  title: string;
  rows: UploadFileVariableRow[];
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
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnItemUploadComponent } from 'sportbook6vn';

@Component({
  selector: 'app-item-upload-default-demo',
  standalone: true,
  imports: [Sportbook6vnItemUploadComponent],
  template: \`
    <sportbook6vn-item-upload />
  \`,
})
export class ItemUploadDefaultDemoComponent {}`,
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
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnItemUploadComponent } from 'sportbook6vn';

@Component({
  selector: 'app-item-upload-status-demo',
  standalone: true,
  imports: [Sportbook6vnItemUploadComponent],
  template: \`
    <div class="upload-status-demo">
      <sportbook6vn-item-upload state="error" errorMessage="Error Message" />
      <sportbook6vn-item-upload state="disabled" />
    </div>
  \`,
})
export class ItemUploadStatusDemoComponent {}`,
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
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnItemUploadComponent } from 'sportbook6vn';

@Component({
  selector: 'app-item-upload-data-source-demo',
  standalone: true,
  imports: [Sportbook6vnItemUploadComponent],
  template: \`
    <sportbook6vn-item-upload
      [showDataSource]="true"
      (dataSourceClick)="openDataSource()"
    />
  \`,
})
export class ItemUploadDataSourceDemoComponent {
  protected openDataSource(): void {
    // Connect this event to the product data-source picker.
  }
}`,
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
    snippetTs: `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sportbook6vnItemFileComponent, type Sportbook6vnItemFileKind } from 'sportbook6vn';

@Component({
  selector: 'app-item-file-default-demo',
  standalone: true,
  imports: [CommonModule, Sportbook6vnItemFileComponent],
  template: \`
    <sportbook6vn-item-file
      *ngFor="let file of files"
      [name]="file.name"
      [fileKind]="file.kind"
    />
  \`,
})
export class ItemFileDefaultDemoComponent {
  protected readonly files: { kind: Sportbook6vnItemFileKind; name: string }[] = [
    { kind: 'xlsx', name: 'Tên tệp tin.xlsx' },
    { kind: 'docx', name: 'Tên tệp tin.docx' },
    { kind: 'pdf', name: 'Tên tệp tin.pdf' },
    { kind: 'jpg', name: 'Tên tệp tin.jpg' },
    { kind: 'xml', name: 'Tên tệp tin.xml' },
  ];
}`,
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
    snippetTs: `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sportbook6vnItemFileComponent, type Sportbook6vnItemFileKind } from 'sportbook6vn';

@Component({
  selector: 'app-item-file-view-demo',
  standalone: true,
  imports: [CommonModule, Sportbook6vnItemFileComponent],
  template: \`
    <sportbook6vn-item-file
      *ngFor="let file of files"
      [name]="file.name"
      [fileKind]="file.kind"
      [showClose]="false"
      [showDownload]="true"
      (download)="downloadFile(file)"
    />
  \`,
})
export class ItemFileViewDemoComponent {
  protected readonly files: { kind: Sportbook6vnItemFileKind; name: string }[] = [
    { kind: 'xlsx', name: 'Tên tệp tin.xlsx' },
    { kind: 'docx', name: 'Tên tệp tin.docx' },
    { kind: 'pdf', name: 'Tên tệp tin.pdf' },
    { kind: 'jpg', name: 'Tên tệp tin.jpg' },
    { kind: 'xml', name: 'Tên tệp tin.xml' },
  ];

  protected downloadFile(file: { name: string }): void {
    // Connect this event to the product download flow.
  }
}`,
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
    snippetTs: `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sportbook6vnItemFileComponent, type Sportbook6vnItemFileKind } from 'sportbook6vn';

@Component({
  selector: 'app-item-file-loading-demo',
  standalone: true,
  imports: [CommonModule, Sportbook6vnItemFileComponent],
  template: \`
    <sportbook6vn-item-file
      *ngFor="let file of files"
      [name]="file.name"
      [fileKind]="file.kind"
      status="uploading"
      [percent]="file.percent"
    />
  \`,
})
export class ItemFileLoadingDemoComponent {
  protected readonly files: { kind: Sportbook6vnItemFileKind; name: string; percent: number }[] = [
    { kind: 'xlsx', name: 'Tên tệp tin.xlsx', percent: 72 },
    { kind: 'docx', name: 'Tên tệp tin.docx', percent: 54 },
    { kind: 'pdf', name: 'Tên tệp tin.pdf', percent: 38 },
    { kind: 'jpg', name: 'Tên tệp tin.jpg', percent: 80 },
    { kind: 'xml', name: 'Tên tệp tin.xml', percent: 46 },
  ];
}`,
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
    snippetTs: `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Sportbook6vnItemFileComponent,
  type Sportbook6vnItemFileErrorType,
  type Sportbook6vnItemFileKind,
} from 'sportbook6vn';

@Component({
  selector: 'app-item-file-error-demo',
  standalone: true,
  imports: [CommonModule, Sportbook6vnItemFileComponent],
  template: \`
    <sportbook6vn-item-file
      *ngFor="let file of files"
      [name]="file.name"
      [fileKind]="file.kind"
      status="error"
      [errorType]="file.errorType"
    />
  \`,
})
export class ItemFileErrorDemoComponent {
  protected readonly files: {
    kind: Sportbook6vnItemFileKind;
    name: string;
    errorType: Sportbook6vnItemFileErrorType;
  }[] = [
    { kind: 'xlsx', name: 'Tên tệp tin.xlsx', errorType: 'size' },
    { kind: 'pdf', name: 'Tên tệp tin.pdf', errorType: 'upload' },
    { kind: 'error', name: 'Tên tệp tin.xml', errorType: 'format' },
  ];
}`,
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
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnUploadFileComponent } from 'sportbook6vn';

@Component({
  selector: 'app-upload-file-basic-demo',
  standalone: true,
  imports: [Sportbook6vnUploadFileComponent],
  template: \`
    <sportbook6vn-upload-file />
  \`,
})
export class UploadFileBasicDemoComponent {}`,
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
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnUploadFileComponent, type Sportbook6vnUploadFileItem } from 'sportbook6vn';

@Component({
  selector: 'app-upload-file-uploaded-demo',
  standalone: true,
  imports: [Sportbook6vnUploadFileComponent],
  template: \`
    <div class="upload-file-stack">
      <sportbook6vn-upload-file [files]="collapsedFiles" [expanded]="false" />
      <sportbook6vn-upload-file [files]="expandedFiles" [expanded]="true" />
    </div>
  \`,
})
export class UploadFileUploadedDemoComponent {
  protected readonly collapsedFiles: Sportbook6vnUploadFileItem[] = [
    { uid: 'pdf', name: 'Tên tệp tin.pdf', sizeLabel: '2 MB', fileKind: 'pdf' },
    { uid: 'docx', name: 'Tên tệp tin.docx', sizeLabel: '2 MB', fileKind: 'docx' },
    { uid: 'xlsx', name: 'Tên tệp tin.xlsx', sizeLabel: '2 MB', fileKind: 'xlsx' },
  ];

  protected readonly expandedFiles: Sportbook6vnUploadFileItem[] = [
    ...this.collapsedFiles,
    { uid: 'jpg', name: 'Tên tệp tin.jpg', sizeLabel: '2 MB', fileKind: 'jpg' },
  ];
}`,
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
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnUploadFileComponent, type Sportbook6vnUploadFileItem } from 'sportbook6vn';

@Component({
  selector: 'app-upload-file-loading-demo',
  standalone: true,
  imports: [Sportbook6vnUploadFileComponent],
  template: \`
    <sportbook6vn-upload-file [files]="files" [expanded]="true" />
  \`,
})
export class UploadFileLoadingDemoComponent {
  protected readonly files: Sportbook6vnUploadFileItem[] = [
    {
      uid: 'pdf-loading',
      name: 'Tên tệp tin.pdf',
      sizeLabel: '2 MB',
      fileKind: 'pdf',
      status: 'uploading',
      percent: 42,
    },
    {
      uid: 'xlsx-loading',
      name: 'Tên tệp tin.xlsx',
      sizeLabel: '2 MB',
      fileKind: 'xlsx',
      status: 'uploading',
      percent: 86,
    },
  ];
}`,
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
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnUploadFileComponent, type Sportbook6vnUploadFileItem } from 'sportbook6vn';

@Component({
  selector: 'app-upload-file-status-demo',
  standalone: true,
  imports: [Sportbook6vnUploadFileComponent],
  template: \`
    <div class="upload-file-stack">
      <sportbook6vn-upload-file errorMessage="Vui lòng tải lên thông tin" />
      <sportbook6vn-upload-file [files]="files" [expanded]="true" />
    </div>
  \`,
})
export class UploadFileStatusDemoComponent {
  protected readonly files: Sportbook6vnUploadFileItem[] = [
    {
      uid: 'xlsx-error',
      name: 'Tên tệp tin.xlsx',
      sizeLabel: '2 MB',
      fileKind: 'xlsx',
      status: 'error',
      errorType: 'size',
    },
    {
      uid: 'xml-error',
      name: 'Tên tệp tin.xml',
      sizeLabel: '2 MB',
      fileKind: 'xml',
      status: 'error',
      errorType: 'format',
    },
  ];
}`,
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
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnUploadFileComponent, type Sportbook6vnUploadFileItem } from 'sportbook6vn';

@Component({
  selector: 'app-upload-file-disabled-demo',
  standalone: true,
  imports: [Sportbook6vnUploadFileComponent],
  template: \`
    <div class="upload-file-stack">
      <sportbook6vn-upload-file [disabled]="true" />
      <sportbook6vn-upload-file [files]="files" [maxCount]="3" [expanded]="true" />
    </div>
  \`,
})
export class UploadFileDisabledDemoComponent {
  protected readonly files: Sportbook6vnUploadFileItem[] = [
    { uid: 'pdf', name: 'Tên tệp tin.pdf', sizeLabel: '2 MB', fileKind: 'pdf' },
    { uid: 'docx', name: 'Tên tệp tin.docx', sizeLabel: '2 MB', fileKind: 'docx' },
    { uid: 'xlsx', name: 'Tên tệp tin.xlsx', sizeLabel: '2 MB', fileKind: 'xlsx' },
  ];
}`,
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
    snippetTs: `import { Component } from '@angular/core';
import { Sportbook6vnUploadFileComponent, type Sportbook6vnUploadFileItem } from 'sportbook6vn';

@Component({
  selector: 'app-upload-file-types-demo',
  standalone: true,
  imports: [Sportbook6vnUploadFileComponent],
  template: \`
    <sportbook6vn-upload-file
      [files]="files"
      [expanded]="true"
      [showUploadArea]="false"
      [showRemove]="false"
      [showDownload]="true"
      [downloadHandler]="downloadFile"
    />
  \`,
})
export class UploadFileTypesDemoComponent {
  protected readonly files: Sportbook6vnUploadFileItem[] = [
    { uid: 'xlsx', name: 'Tên tệp tin.xlsx', sizeLabel: '2 MB', fileKind: 'xlsx', downloadable: true },
    { uid: 'docx', name: 'Tên tệp tin.docx', sizeLabel: '2 MB', fileKind: 'docx', downloadable: true },
    { uid: 'pdf', name: 'Tên tệp tin.pdf', sizeLabel: '2 MB', fileKind: 'pdf', downloadable: true },
    { uid: 'jpg', name: 'Tên tệp tin.jpg', sizeLabel: '2 MB', fileKind: 'jpg', downloadable: true },
    { uid: 'xml', name: 'Tên tệp tin.xml', sizeLabel: '2 MB', fileKind: 'xml', downloadable: true },
  ];

  protected readonly downloadFile = (file: Sportbook6vnUploadFileItem): void => {
    // Connect this callback to the product download flow.
  };
}`,
  },
];

export const UPLOAD_FILE_ITEM_UPLOAD_API_ROWS: UploadFileApiRow[] = [
  { property: 'state', description: 'Visual state for the upload dropzone.', type: "Sportbook6vnItemUploadState", defaultValue: "'default'" },
  { property: 'uploadText', description: 'Guide text shown above the action links.', type: 'string', defaultValue: "'Kéo và thả để tải lên tệp tin'" },
  { property: 'selectText', description: 'Primary file-selection action label.', type: 'string', defaultValue: "'Chọn từ máy tính'" },
  { property: 'showDataSource', description: 'Shows the secondary data-source action.', type: 'boolean', defaultValue: 'false' },
  { property: 'dataSourceText', description: 'Secondary data-source action label.', type: 'string', defaultValue: "'Chọn từ kho dữ liệu'" },
  { property: 'errorMessage', description: 'Error copy displayed below the dropzone when state is error.', type: 'string | null', defaultValue: 'null' },
  { property: 'illustrationBasePath', description: 'Base public asset path for upload illustrations.', type: 'string', defaultValue: 'SPORTBOOK6VN_ITEM_UPLOAD_ILLUSTRATION_BASE_PATH' },
  { property: 'illustrationFile', description: 'Illustration file name loaded from the base path.', type: 'string', defaultValue: 'upload.png' },
  { property: 'select', description: 'Emits when the computer-selection action is clicked.', type: 'output<void>', defaultValue: '-' },
  { property: 'dataSourceClick', description: 'Emits when the data-source action is clicked.', type: 'output<void>', defaultValue: '-' },
  { property: 'fileDrop', description: 'Emits dropped browser File objects.', type: 'output<File[]>', defaultValue: '-' },
];

export const UPLOAD_FILE_ITEM_FILE_API_ROWS: UploadFileApiRow[] = [
  { property: 'name', description: 'Visible file name. The extension is split for truncation.', type: 'string', defaultValue: "'Tên tệp tin.xlsx'" },
  { property: 'sizeLabel', description: 'Visible file size text.', type: 'string', defaultValue: "'2 MB'" },
  { property: 'fileKind', description: 'Explicit file illustration kind. When null, the kind is resolved from name.', type: 'Sportbook6vnItemFileKind | null', defaultValue: 'null' },
  { property: 'status', description: 'File row state.', type: 'Sportbook6vnItemFileStatus', defaultValue: "'done'" },
  { property: 'percent', description: 'Progress value used when status is uploading.', type: 'number', defaultValue: '60' },
  { property: 'errorMessage', description: 'Custom error message used when status is error.', type: 'string | null', defaultValue: 'null' },
  { property: 'errorType', description: 'Built-in error message and illustration treatment.', type: 'Sportbook6vnItemFileErrorType | null', defaultValue: 'null' },
  { property: 'showClose', description: 'Shows the remove action.', type: 'boolean', defaultValue: 'true' },
  { property: 'showDownload', description: 'Shows the download action.', type: 'boolean', defaultValue: 'false' },
  { property: 'disabled', description: 'Disables row actions and applies disabled opacity.', type: 'boolean', defaultValue: 'false' },
  { property: 'illustrationBasePath', description: 'Base public asset path for file illustrations.', type: 'string', defaultValue: 'SPORTBOOK6VN_ITEM_FILE_ILLUSTRATION_BASE_PATH' },
  { property: 'remove', description: 'Emits when the remove action is clicked.', type: 'output<void>', defaultValue: '-' },
  { property: 'download', description: 'Emits when the download action is clicked.', type: 'output<void>', defaultValue: '-' },
];

export const UPLOAD_FILE_API_ROWS: UploadFileApiRow[] = [
  { property: 'label', description: 'Field label text.', type: 'string', defaultValue: "'Label'" },
  { property: 'required', description: 'Shows the required marker next to the label.', type: 'boolean', defaultValue: 'true' },
  { property: 'showLabel', description: 'Controls whether the label column is rendered.', type: 'boolean', defaultValue: 'true' },
  { property: 'description', description: 'Optional help text below the label.', type: 'string | null', defaultValue: 'null' },
  { property: 'files', description: 'Controlled file rows rendered above the upload entry.', type: 'readonly Sportbook6vnUploadFileItem[]', defaultValue: '[]' },
  { property: 'disabled', description: 'Disables the upload entry and file row actions.', type: 'boolean', defaultValue: 'false' },
  { property: 'maxCount', description: 'Maximum file count. When reached, upload entry becomes disabled.', type: 'number | null', defaultValue: 'null' },
  { property: 'accept', description: 'Native file input accept value.', type: 'string | readonly string[] | null', defaultValue: 'null' },
  { property: 'multiple', description: 'Allows multi-file selection unless maxCount is one.', type: 'boolean', defaultValue: 'true' },
  { property: 'expanded', description: 'Initial expanded state for the file list.', type: 'boolean', defaultValue: 'false' },
  { property: 'visibleCount', description: 'Visible file count before the expand action appears.', type: 'number', defaultValue: '2' },
  { property: 'uploadText', description: 'Guide text forwarded to item upload.', type: 'string', defaultValue: "'Kéo và thả để tải lên tệp tin'" },
  { property: 'selectText', description: 'Primary action label forwarded to item upload.', type: 'string', defaultValue: "'Chọn từ máy tính'" },
  { property: 'showDataSource', description: 'Shows the data-source action in the upload entry.', type: 'boolean', defaultValue: 'false' },
  { property: 'dataSourceText', description: 'Data-source action label forwarded to item upload.', type: 'string', defaultValue: "'Chọn từ kho dữ liệu'" },
  { property: 'errorMessage', description: 'Upload-entry validation message and error state.', type: 'string | null', defaultValue: 'null' },
  { property: 'showUploadArea', description: 'Controls whether the upload entry is rendered.', type: 'boolean', defaultValue: 'true' },
  { property: 'showRemove', description: 'Enables remove actions for removable files.', type: 'boolean', defaultValue: 'true' },
  { property: 'showDownload', description: 'Enables download actions for downloadable files.', type: 'boolean', defaultValue: 'false' },
  { property: 'downloadHandler', description: 'Optional callback used before fileDownload emits.', type: '((file: Sportbook6vnUploadFileItem) => void) | null', defaultValue: 'null' },
  { property: 'fileInputId', description: 'Explicit native input id. Defaults to a label-derived id.', type: 'string | null', defaultValue: 'null' },
  { property: 'filesChange', description: 'Emits the updated file list after select/drop/remove.', type: 'output<Sportbook6vnUploadFileItem[]>', defaultValue: '-' },
  { property: 'change', description: 'Emits file, fileList, and change type after select/drop/remove.', type: 'output<Sportbook6vnUploadFileChange>', defaultValue: '-' },
  { property: 'fileSelect', description: 'Emits newly selected or dropped files after mapping to upload items.', type: 'output<Sportbook6vnUploadFileItem[]>', defaultValue: '-' },
  { property: 'fileRemove', description: 'Emits the removed file item.', type: 'output<Sportbook6vnUploadFileItem>', defaultValue: '-' },
  { property: 'fileDownload', description: 'Emits the downloaded file item.', type: 'output<Sportbook6vnUploadFileItem>', defaultValue: '-' },
  { property: 'expandChange', description: 'Emits the current expanded state after the expand action is clicked.', type: 'output<boolean>', defaultValue: '-' },
  { property: 'dataSourceClick', description: 'Emits when the upload entry data-source action is clicked.', type: 'output<void>', defaultValue: '-' },
];

export const UPLOAD_FILE_TYPE_ROWS: UploadFileApiRow[] = [
  { property: 'Sportbook6vnItemUploadState', description: 'Upload entry state.', type: "'default' | 'error' | 'disabled'", defaultValue: '-' },
  { property: 'Sportbook6vnItemFileKind', description: 'File illustration kind.', type: "'xlsx' | 'docx' | 'pdf' | 'jpg' | 'xml' | 'file' | 'error'", defaultValue: '-' },
  { property: 'Sportbook6vnItemFileStatus', description: 'File row status.', type: "'done' | 'uploading' | 'error'", defaultValue: '-' },
  { property: 'Sportbook6vnItemFileErrorType', description: 'Built-in file error copy.', type: "'size' | 'upload' | 'format'", defaultValue: '-' },
  { property: 'Sportbook6vnUploadFileChangeType', description: 'Upload list change source.', type: "'select' | 'drop' | 'remove'", defaultValue: '-' },
  { property: 'Sportbook6vnUploadFileItem', description: 'File row item model.', type: '{ uid; name; url?; size?; sizeLabel?; fileKind?; status?; percent?; errorMessage?; errorType?; disabled?; removable?; downloadable? }', defaultValue: '-' },
  { property: 'Sportbook6vnUploadFileChange', description: 'Change event payload.', type: '{ file; fileList; type }', defaultValue: '-' },
];

export const UPLOAD_FILE_VARIABLE_GROUPS: UploadFileVariableGroup[] = [
  {
    title: 'Item Upload Variables',
    rows: [
      { token: '--sportbook6vn-item-upload-primary', value: 'var(--sportbook6vn-color-brand-600, #141ed2)', appliesTo: 'Action links and active border', notes: 'Declared in item-upload component scope.' },
      { token: '--sportbook6vn-item-upload-primary-300', value: 'var(--sportbook6vn-color-brand-300, #a3b7fd)', appliesTo: 'Default dashed border', notes: 'Used by dropzone border.' },
      { token: '--sportbook6vn-item-upload-text-guide', value: '#6d83a7', appliesTo: 'Guide copy and separator text', notes: 'Matches upload instruction color.' },
      { token: '--sportbook6vn-item-upload-text-disabled', value: '#9b9b9b', appliesTo: 'Disabled action link', notes: 'Used when state is disabled.' },
      { token: '--sportbook6vn-item-upload-error', value: '#f00000', appliesTo: 'Error border and error icon fill', notes: 'Used when state is error.' },
      { token: '--sportbook6vn-item-upload-error-text', value: '#f34343', appliesTo: 'Error message text', notes: 'Rendered below the dropzone.' },
    ],
  },
  {
    title: 'Item File Variables',
    rows: [
      { token: '--sportbook6vn-item-file-primary', value: 'var(--sportbook6vn-color-brand-600, #141ed2)', appliesTo: 'File name and download icon', notes: 'Primary action color.' },
      { token: '--sportbook6vn-item-file-surface', value: '#ecf5fa', appliesTo: 'File row background', notes: 'Applied to the whole row.' },
      { token: '--sportbook6vn-item-file-text-default', value: '#192d39', appliesTo: 'Base row text color', notes: 'Component text default.' },
      { token: '--sportbook6vn-item-file-text-muted', value: '#6d83a7', appliesTo: 'File size text', notes: 'Secondary file metadata.' },
      { token: '--sportbook6vn-item-file-secondary', value: '#7b5fff', appliesTo: 'Progress bar fill', notes: 'Uploading state.' },
      { token: '--sportbook6vn-item-file-secondary-200', value: '#dbd3ff', appliesTo: 'Progress track', notes: 'Uploading state track.' },
      { token: '--sportbook6vn-item-file-error', value: '#f00000', appliesTo: 'Error message text', notes: 'Used when status is error.' },
    ],
  },
  {
    title: 'Upload File Wrapper Variables',
    rows: [
      { token: '--sportbook6vn-upload-primary', value: 'var(--sportbook6vn-color-brand-600, #141ed2)', appliesTo: 'Expand action', notes: 'Wrapper-level action color.' },
      { token: '--sportbook6vn-upload-text-default', value: '#192d39', appliesTo: 'Label and base text', notes: 'Wrapper text default.' },
      { token: '--sportbook6vn-upload-text-muted', value: '#6d83a7', appliesTo: 'Description text', notes: 'Optional helper copy.' },
      { token: '--sportbook6vn-upload-error-text', value: '#f34343', appliesTo: 'Required marker', notes: 'Displayed next to label when required is true.' },
    ],
  },
];

export const UPLOAD_FILE_VARIABLE_NOTES = [
  'Upload File composes Item Upload and Item File; dropzone and file-row styling stay in the child components.',
  'File illustrations are public assets under /assets/illustrations/a-illustration and are selected by fileKind or file extension.',
  'The wrapper uses native file input behavior for select/drop, then emits mapped Sportbook6vnUploadFileItem values.',
];
