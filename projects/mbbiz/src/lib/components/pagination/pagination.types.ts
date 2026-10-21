export type MbbizPaginationMode = 'auto' | 'page-list' | 'quick-jumper';

export interface MbbizPaginationRange {
  start: number;
  end: number;
  total: number;
}

export type MbbizPaginationRangeFormatter = (range: MbbizPaginationRange) => string;

export interface MbbizPaginationSummary {
  pageIndex: number;
  pageCount: number;
}

export type MbbizPaginationSummaryFormatter = (summary: MbbizPaginationSummary) => string;

export interface MbbizPaginationPageItem {
  page: number;
  active: boolean;
}
