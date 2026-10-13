import type { MbbizUploadAvatarItem } from 'mbbiz';

export interface UploadAvatarDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  variant: 'states' | 'basic' | 'picturesWall';
}

export interface UploadAvatarApiRow {
  property: string;
  description: string;
  type: string;
  defaultValue: string;
}

export interface UploadAvatarVariableRow {
  token: string;
  value: string;
  appliesTo: string;
  notes: string;
}

export interface UploadAvatarVariableGroup {
  title: string;
  rows: UploadAvatarVariableRow[];
}

export const UPLOAD_AVATAR_PREVIEW_URL = '/assets/upload-avatar/preview.svg';

export const UPLOAD_AVATAR_DEMO_SECTIONS: UploadAvatarDemoSection[] = [
  {
    id: 'states',
    title: 'States',
    description:
      'Figma 4457:199330 Default, Loading, Uploaded, and error tiles. Hover overlay, eye, add, and hint are live CSS on Default, Uploaded, and Error.',
    tags: [
      'selector=mbbiz-upload-avatar',
      'status=empty|uploading|done|error',
      'errorKind=format|size',
    ],
    variant: 'states',
  },
  {
    id: 'basic',
    title: 'Basic',
    description:
      'Single 124px tile. Selecting a file replaces the current image when maxCount is 1. Invalid type or size shows the dashed error tile.',
    tags: ['maxCount=1', 'accept=image/*', 'maxSize=5MB'],
    variant: 'basic',
  },
  {
    id: 'pictures-wall',
    title: 'Pictures Wall',
    description:
      'Same tile in a wrapping wall. Empty add tiles stay until files.length reaches maxCount. Plus on a filled tile replaces that slot.',
    tags: ['maxCount=8', 'files+maxCount'],
    variant: 'picturesWall',
  },
];

export const UPLOAD_AVATAR_STATE_FILES: {
  label: string;
  files: MbbizUploadAvatarItem[];
}[] = [
  { label: 'Default', files: [] },
  {
    label: 'Loading',
    files: [
      {
        uid: 'loading',
        name: 'avatar.jpg',
        url: UPLOAD_AVATAR_PREVIEW_URL,
        status: 'uploading',
      },
    ],
  },
  {
    label: 'Uploaded',
    files: [
      {
        uid: 'uploaded',
        name: 'avatar.jpg',
        url: UPLOAD_AVATAR_PREVIEW_URL,
        status: 'done',
      },
    ],
  },
  {
    label: 'Error format',
    files: [
      {
        uid: 'error-format',
        name: 'notes.pdf',
        status: 'error',
        errorKind: 'format',
      },
    ],
  },
  {
    label: 'Error size',
    files: [
      {
        uid: 'error-size',
        name: 'avatar.jpg',
        status: 'error',
        errorKind: 'size',
      },
    ],
  },
];

export const UPLOAD_AVATAR_WALL_SEED: MbbizUploadAvatarItem[] = [
  {
    uid: 'wall-1',
    name: 'avatar-1.jpg',
    url: UPLOAD_AVATAR_PREVIEW_URL,
    status: 'done',
  },
  {
    uid: 'wall-2',
    name: 'avatar-2.jpg',
    url: UPLOAD_AVATAR_PREVIEW_URL,
    status: 'uploading',
  },
];

export const UPLOAD_AVATAR_API_ROWS: UploadAvatarApiRow[] = [
  {
    property: 'files',
    description: 'Controlled picture-card items. Empty add tiles are derived when length < maxCount.',
    type: 'readonly MbbizUploadAvatarItem[]',
    defaultValue: '[]',
  },
  {
    property: 'maxCount',
    description: 'Maximum tiles. 1 replaces the current file; larger values render a Pictures Wall.',
    type: 'number',
    defaultValue: '1',
  },
  {
    property: 'accept',
    description: 'Native file input accept value used for format validation.',
    type: 'string',
    defaultValue: "'image/*'",
  },
  {
    property: 'maxSize',
    description: 'Maximum file size in bytes. Oversized images use errorKind size.',
    type: 'number',
    defaultValue: '5242880',
  },
  {
    property: 'hint',
    description: 'Hover copy on empty and uploaded tiles. Newlines wrap to two lines.',
    type: 'string',
    defaultValue: "'Ảnh đại diện,\\ntối đa 5MB'",
  },
  {
    property: 'formatErrorMessage',
    description: 'Copy on format error tiles.',
    type: 'string',
    defaultValue: "'Ảnh không đúng định dạng'",
  },
  {
    property: 'sizeErrorMessage',
    description: 'Copy on size error tiles.',
    type: 'string',
    defaultValue: "'Tối đa 5MB'",
  },
  {
    property: 'disabled',
    description: 'Blocks file selection and hides hover actions.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'fileInputId',
    description: 'Optional native input id.',
    type: 'string | null',
    defaultValue: 'null',
  },
  {
    property: 'filesChange',
    description: 'Emits the updated file list after select or replace.',
    type: 'output<MbbizUploadAvatarItem[]>',
    defaultValue: '-',
  },
  {
    property: 'change',
    description: 'Emits file, fileList, and change type after select or replace.',
    type: 'output<MbbizUploadAvatarChange>',
    defaultValue: '-',
  },
  {
    property: 'fileSelect',
    description: 'Emits newly mapped files after the native picker.',
    type: 'output<MbbizUploadAvatarItem[]>',
    defaultValue: '-',
  },
  {
    property: 'preview',
    description: 'Emits the tile item when the eye action is clicked.',
    type: 'output<MbbizUploadAvatarItem>',
    defaultValue: '-',
  },
];

export const UPLOAD_AVATAR_TYPE_ROWS: UploadAvatarApiRow[] = [
  {
    property: 'MbbizUploadAvatarStatus',
    description: 'Derived tile status.',
    type: "'uploading' | 'done' | 'error'",
    defaultValue: '-',
  },
  {
    property: 'MbbizUploadAvatarErrorKind',
    description: 'Error tile kind from accept or maxSize.',
    type: "'format' | 'size'",
    defaultValue: '-',
  },
  {
    property: 'MbbizUploadAvatarItem',
    description: 'Picture-card item model.',
    type: '{ uid; name; url?; size?; file?; status?; errorKind?; errorMessage?; disabled? }',
    defaultValue: '-',
  },
  {
    property: 'MbbizUploadAvatarChange',
    description: 'Change event payload.',
    type: '{ file; fileList; type }',
    defaultValue: '-',
  },
];

export const UPLOAD_AVATAR_VARIABLE_GROUPS: UploadAvatarVariableGroup[] = [
  {
    title: 'Upload Avatar Color Tokens',
    rows: [
      {
        token: 'background/brand-primary1',
        value: 'blue/500',
        appliesTo: 'Empty Default fill',
        notes: 'Maps to --color-semantic-background-brand-primary1 / #141ED2.',
      },
      {
        token: 'icon/brand-on-primary',
        value: 'white/100%',
        appliesTo: 'Empty silhouette',
        notes: 'Maps to --color-semantic-icon-brand-on-primary / #FFFFFF.',
      },
      {
        token: 'overlay/primary',
        value: 'black/50%',
        appliesTo: 'Hover and loading overlay',
        notes: 'Maps to --color-semantic-overlay-primary / #00000080.',
      },
      {
        token: 'background/brand-quaternary4',
        value: 'white/100%',
        appliesTo: 'Hover hint and action icons',
        notes: 'Maps to --color-semantic-background-brand-quaternary4 / #FAFDFF.',
      },
      {
        token: 'background/brand-quaternary3',
        value: 'darkblue/200',
        appliesTo: 'Error tile fill',
        notes: 'Maps to --color-semantic-background-brand-quaternary3 / #ECF5FA.',
      },
      {
        token: 'border/error1',
        value: 'red/500',
        appliesTo: 'Error dashed border, icon, and copy',
        notes: 'Maps to --color-semantic-border-error1 / #F00000.',
      },
    ],
  },
  {
    title: 'Upload Avatar Layout Specs',
    rows: [
      { token: 'upload-avatar/size', value: '124px', appliesTo: 'Tile width and height', notes: 'Figma Upload Avatar 124×124.' },
      { token: 'upload-avatar/radius', value: '4px', appliesTo: 'Tile corner', notes: '--mbbiz-radius-md.' },
      { token: 'upload-avatar/gap', value: '8px', appliesTo: 'Pictures Wall gap', notes: 'Zorro picture-card spacing.' },
      { token: 'upload-avatar/error-padding', value: '10px', appliesTo: 'Error content inset', notes: 'Figma p-10.' },
      { token: 'upload-avatar/error-gap', value: '4px', appliesTo: 'Error icon-to-copy', notes: 'Figma gap-4.' },
      { token: 'upload-avatar/error-icon', value: '36px', appliesTo: 'A Linear/Image', notes: 'Not in @mbbiz/icon; inlined SVG.' },
      { token: 'iconsize/m', value: '24px', appliesTo: 'Hover A Linear/Visible', notes: 'alinear_visible.' },
      { token: 'iconsize/xl', value: '32px', appliesTo: 'Hover A Linear/Add', notes: 'alinear_add.' },
      { token: 'loading/m', value: '32px', appliesTo: 'Loading spinner', notes: 'mbbiz-loading size m, white on overlay.' },
    ],
  },
];

export const UPLOAD_AVATAR_VARIABLE_NOTES = [
  'Upload Avatar maps Figma node 4457:199330. Hover overlay is CSS, not a JS state. Loading keeps the spinner and does not show eye/add.',
  'v1 validates locally (accept + maxSize) and previews with object URLs. There is no XHR upload; parents can pass status=uploading.',
  'A Linear/Image is not in @mbbiz/icon 0.1.19, so the error glyph is an inline SVG at 36px.',
];
