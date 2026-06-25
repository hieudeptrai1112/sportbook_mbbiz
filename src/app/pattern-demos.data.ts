import type {
  Sportbook6vnBreadcrumbItem,
  Sportbook6vnButtonVariant,
  Sportbook6vnStepItem,
} from 'sportbook6vn';

export interface FooterPatternAction {
  label: string;
  variant: Sportbook6vnButtonVariant;
  width: 'compact' | 'wide';
}

export interface FooterPatternVariant {
  id: 'type1' | 'type2' | 'type3' | 'type4' | 'typeMore';
  title: string;
  figmaType: '1' | '2' | '3' | '4' | '>4';
  countLabel: '1 button' | '2 button' | '3 button' | '4 button' | '>4 button';
  description: string;
  usage: string;
  actions: FooterPatternAction[];
  approvedPairs?: readonly string[];
  overflowMenuItems?: readonly string[];
  placeholderNote?: string;
}

export interface StepProcessPatternCase {
  id: 'default';
  title: string;
  description: string;
  usage: string;
  saveCtaLabel?: string;
  saveTimestamp?: string;
  steps: readonly Sportbook6vnStepItem[];
}

export interface PageHeaderPatternCase {
  id: 'default';
  title: string;
  description: string;
  usage: string;
  titleText: string;
  breadcrumbItems: readonly Sportbook6vnBreadcrumbItem[];
}

export const FOOTER_PATTERN_VARIANTS: readonly FooterPatternVariant[] = [
  {
    id: 'type1',
    title: 'Footer / Type 1',
    figmaType: '1',
    countLabel: '1 button',
    description: 'Một hành động phụ duy nhất cho màn xem chi tiết giao dịch.',
    usage: 'Figma mô tả rõ action là Quay lại.',
    actions: [{ label: 'Text', variant: 'secondary', width: 'compact' }],
  },
  {
    id: 'type2',
    title: 'Footer / Type 2',
    figmaType: '2',
    countLabel: '2 button',
    description: 'Hai hành động cho luồng khởi tạo hoặc xác nhận bước giữa tiến trình.',
    usage: 'Preview dùng cặp Quay lại / Tiếp tục để đại diện cho biến thể hai nút.',
    approvedPairs: ['Hủy / Tiếp tục', 'Quay lại / Tiếp tục', 'Quay lại / Xác nhận'],
    actions: [
      { label: 'Text', variant: 'secondary', width: 'compact' },
      { label: 'Text', variant: 'primary', width: 'wide' },
    ],
  },
  {
    id: 'type3',
    title: 'Footer / Type 3',
    figmaType: '3',
    countLabel: '3 button',
    description: 'Ba hành động cho các bước phê duyệt giao dịch daily.',
    usage: 'Figma mô tả đầy đủ bộ nhãn Quay lại / Từ chối / Phê duyệt.',
    actions: [
      { label: 'Text', variant: 'secondary', width: 'compact' },
      { label: 'Text', variant: 'secondary', width: 'compact' },
      { label: 'Text', variant: 'primary', width: 'wide' },
    ],
  },
  {
    id: 'type4',
    title: 'Footer / Type 4',
    figmaType: '4',
    countLabel: '4 button',
    description: 'Bốn hành động theo layout 3 secondary + 1 primary của Figma.',
    usage: 'Biến thể này đã có bố cục trong Figma nhưng chưa có mapping nhãn hành động đủ rõ.',
    placeholderNote:
      'Giữ nguyên nhãn placeholder Text cho đến khi nghiệp vụ chốt đầy đủ bốn action.',
    actions: [
      { label: 'Text', variant: 'secondary', width: 'compact' },
      { label: 'Text', variant: 'secondary', width: 'compact' },
      { label: 'Text', variant: 'secondary', width: 'compact' },
      { label: 'Text', variant: 'primary', width: 'wide' },
    ],
  },
  {
    id: 'typeMore',
    title: 'Footer / Type >4',
    figmaType: '>4',
    countLabel: '>4 button',
    description: 'Khi số action vượt quá bốn, footer chuyển phần dư vào overflow action.',
    usage: 'Figma chỉ định trigger Thao tác khác và menu tĩnh 3 item Option.',
    overflowMenuItems: ['Option', 'Option', 'Option'],
    placeholderNote:
      'Primary action trong Figma vẫn để label Text, nên preview giữ nguyên placeholder này.',
    actions: [
      { label: 'Text', variant: 'secondary', width: 'compact' },
      { label: 'Text', variant: 'secondary', width: 'compact' },
      { label: 'Thao tác khác', variant: 'secondary', width: 'compact' },
      { label: 'Text', variant: 'primary', width: 'wide' },
    ],
  },
];

export const STEP_PROCESS_PATTERN_CASES: readonly StepProcessPatternCase[] = [
  {
    id: 'default',
    title: 'Default',
    description:
      'Card tiến trình xử lý gồm 3 bước dọc, bước đầu tiên đang active, phía dưới có CTA lưu phương án.',
    usage:
      'Node Figma hiện chỉ thể hiện đúng cấu hình có nút Lưu phương án và dòng thời gian lưu lần cuối.',
    saveCtaLabel: 'Lưu phương án',
    saveTimestamp: 'Lưu lần cuối 16:23 hôm nay',
    steps: [
      { title: 'Text', status: 'process' },
      { title: 'Text', status: 'wait' },
      { title: 'Text', status: 'wait' },
    ],
  },
] as const;

export const PAGE_HEADER_PATTERN_CASES: readonly PageHeaderPatternCase[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'Page header gồm breadcrumb 3 cấp và tiêu đề chính của trang theo đúng node Figma.',
    usage:
      'Node 24228:7920 hiện chỉ bật breadcrumb + title. Không tự thêm description, info icon hoặc required mark.',
    titleText: 'Title',
    breadcrumbItems: [
      { label: 'Page', href: '#' },
      { label: 'Page', href: '#' },
      { label: 'Page', href: null },
    ],
  },
] as const;

export const FOOTER_PATTERN_DEPENDENCIES = [
  'Sportbook6vnButtonComponent',
  'sportbook6vn-button',
] as const;

export const FOOTER_PATTERN_IMPLEMENTATION_SNIPPET = `<footer class="page-footer-pattern">
  <div class="page-footer-pattern__actions">
    <div class="page-footer-pattern__action page-footer-pattern__action--compact">
      <sportbook6vn-button variant="secondary" size="lg" [fullWidth]="true">
        Quay lại
      </sportbook6vn-button>
    </div>

    <div class="page-footer-pattern__action page-footer-pattern__action--compact">
      <sportbook6vn-button variant="secondary" size="lg" [fullWidth]="true">
        Từ chối
      </sportbook6vn-button>
    </div>

    <div class="page-footer-pattern__action page-footer-pattern__action--wide">
      <sportbook6vn-button variant="primary" size="lg" [fullWidth]="true">
        Phê duyệt
      </sportbook6vn-button>
    </div>
  </div>
</footer>`;
