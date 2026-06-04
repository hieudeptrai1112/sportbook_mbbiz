export type Sportbook6vnPaginationMode = 'auto' | 'page-list' | 'quick-jumper';

export interface Sportbook6vnPaginationRange {
  start: number;
  end: number;
  total: number;
}

export type Sportbook6vnPaginationRangeFormatter = (range: Sportbook6vnPaginationRange) => string;

export interface Sportbook6vnPaginationSummary {
  pageIndex: number;
  pageCount: number;
}

export type Sportbook6vnPaginationSummaryFormatter = (summary: Sportbook6vnPaginationSummary) => string;

export interface Sportbook6vnPaginationPageItem {
  page: number;
  active: boolean;
}
