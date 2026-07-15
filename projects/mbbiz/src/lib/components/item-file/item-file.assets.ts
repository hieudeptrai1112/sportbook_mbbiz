import type { MbbizItemFileKind } from './item-file.types';

export const SPORTBOOK6VN_ITEM_FILE_ILLUSTRATION_BASE_PATH = '/assets/illustrations/a-illustration';

export const SPORTBOOK6VN_ITEM_FILE_ILLUSTRATION_FILES: Record<MbbizItemFileKind, string> = {
  xlsx: 'file-excel.png',
  docx: 'file-word.png',
  pdf: 'file-pdf.png',
  jpg: 'file-image.png',
  xml: 'file-xml.png',
  file: 'file-error.png',
  error: 'file-error.png',
};
