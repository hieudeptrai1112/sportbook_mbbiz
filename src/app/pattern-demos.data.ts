import type {
  MbbizBreadcrumbItem,
  MbbizButtonVariant,
  MbbizStepItem,
} from 'mbbiz';

export interface FooterPatternAction {
  label: string;
  variant: MbbizButtonVariant;
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
  steps: readonly MbbizStepItem[];
}

export interface PageHeaderPatternCase {
  id: 'default';
  title: string;
  description: string;
  usage: string;
  titleText: string;
  breadcrumbItems: readonly MbbizBreadcrumbItem[];
}

export interface FormPatternField {
  title: string;
  placeholder: string;
  kind: 'input' | 'dropdown' | 'datepicker' | 'textarea';
  width: 'full' | 'half';
  required?: boolean;
  showInfo?: boolean;
  showChevron?: boolean;
  maxLength?: number;
}

export interface FormPatternCheckboxOption {
  label: string;
  checked?: boolean;
  disabled?: boolean;
}

export interface FormPatternRadioOption {
  id: 'option-1' | 'option-2';
  title: string;
  description: string;
}

export interface FormPatternCase {
  id: 'basic' | 'long' | 'checkboxRadio' | 'upload';
  title: string;
  description: string;
  usage: string;
  heading?: string;
  topActionLabel?: string;
  fields?: readonly FormPatternField[];
  checkboxes?: readonly FormPatternCheckboxOption[];
  radios?: readonly FormPatternRadioOption[];
}

export type SourceAccountPatternCaseId = 'default' | 'error' | 'disabled';
export type SourceAccountPatternKind = 'account' | 'card';

export interface SourceAccountListItem {
  id: string;
  title: string;
  amount?: string;
  currency?: string;
  thumb?: 'black' | 'white';
  disabled?: boolean;
}

export interface SourceAccountPatternPreview {
  kind: SourceAccountPatternKind;
  fieldState: 'default' | 'error' | 'disabled';
  switchChecked: boolean;
  titleLine?: string;
  amount?: string;
  currency?: string;
  thumb?: 'black' | 'white';
  showErrorMessage?: boolean;
}

export interface SourceAccountPatternCase {
  id: SourceAccountPatternCaseId;
  title: string;
  description: string;
  usage: string;
  interactive?: boolean;
  preview: SourceAccountPatternPreview;
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

export const FORM_PATTERN_CASES: readonly FormPatternCase[] = [
  {
    id: 'basic',
    title: 'Basic form',
    description:
      'Biến thể cơ bản gồm 2 dropdown, 1 datepicker và 1 textarea xếp dọc trong shell 944×440.',
    usage:
      'Dùng để mô tả form nhập liệu đơn giản với label ngoài field, required mark và placeholder của Figma.',
    fields: [
      {
        title: 'Title',
        placeholder: 'Lựa chọn',
        kind: 'dropdown',
        width: 'full',
        required: true,
        showChevron: false,
      },
      {
        title: 'Title',
        placeholder: 'Lựa chọn',
        kind: 'dropdown',
        width: 'full',
        required: true,
        showChevron: true,
      },
      {
        title: 'Title',
        placeholder: 'Chọn ngày',
        kind: 'datepicker',
        width: 'full',
      },
      {
        title: 'Title',
        placeholder: 'Nhập nội dung',
        kind: 'textarea',
        width: 'full',
        required: true,
        maxLength: 200,
      },
    ],
  },
  {
    id: 'long',
    title: 'Long form',
    description:
      'Form dài với header heading + button và các field text chia theo bố cục 2 cột xen kẽ 1 cột.',
    usage:
      'Node này dùng text field post-login với các label dài, một số label có info icon bên phải.',
    heading: 'Heading',
    topActionLabel: 'Button',
    fields: [
      {
        title: 'Số tài khoản/Iban',
        placeholder: 'Nhập số tài khoản/Iban',
        kind: 'input',
        width: 'half',
        required: true,
      },
      {
        title: 'Tên người thụ hưởng',
        placeholder: 'Nhập tên người thụ hưởng',
        kind: 'input',
        width: 'half',
        required: true,
        showInfo: true,
      },
      {
        title: 'Địa chỉ người thụ hưởng',
        placeholder: 'Nhập địa chỉ người thụ hưởng',
        kind: 'input',
        width: 'full',
        required: true,
      },
      {
        title: 'Mã ngân hàng (SWIFT code...)',
        placeholder: 'Nhập mã ngân hàng',
        kind: 'input',
        width: 'half',
        required: true,
        showInfo: true,
      },
      {
        title: 'Tên ngân hàng',
        placeholder: 'Nhập tên ngân hàng',
        kind: 'input',
        width: 'half',
        required: true,
        showInfo: true,
      },
      {
        title: 'Địa chỉ ngân hàng',
        placeholder: 'Nhập địa chỉ ngân hàng',
        kind: 'input',
        width: 'full',
        required: true,
        showInfo: true,
      },
    ],
  },
  {
    id: 'checkboxRadio',
    title: 'Checkbox and radio form',
    description:
      'Case kết hợp heading, nhóm checkbox, 2 radio option có description và một single date phía dưới.',
    usage:
      'Radio description được compose local trong pattern để bám Figma, còn control vẫn dùng component radio của thư viện.',
    heading: 'Heading',
    fields: [
      {
        title: 'Title',
        placeholder: 'Chọn ngày',
        kind: 'datepicker',
        width: 'half',
        required: true,
      },
    ],
    checkboxes: [
      { label: 'Option', checked: true, disabled: true },
      { label: 'Option', checked: true },
      { label: 'Option' },
    ],
    radios: [
      { id: 'option-1', title: 'Title', description: 'Description' },
      { id: 'option-2', title: 'Title', description: 'Description' },
    ],
  },
  {
    id: 'upload',
    title: 'Upload form',
    description:
      'Biến thể upload với heading + button ở trên, bên dưới là 2 block upload file lặp lại theo đúng node.',
    usage:
      'Mỗi block giữ nguyên cấu trúc file list bên trái và upload area bên phải từ component upload-file hiện có.',
    heading: 'Heading',
    topActionLabel: 'Button',
  },
] as const;

export const SOURCE_ACCOUNT_LABEL = 'Nguồn thanh toán';
export const SOURCE_ACCOUNT_PLACEHOLDER = 'Lựa chọn';
export const SOURCE_ACCOUNT_SWITCH_LABEL = 'Thanh toán bằng thẻ tín dụng';
export const SOURCE_ACCOUNT_ERROR_MESSAGE = 'Error Message';
export const SOURCE_ACCOUNT_SEARCH_PLACEHOLDER = 'Tìm kiếm';
export const SOURCE_ACCOUNT_ACCOUNT_TITLE = '0201100335005 - CTY CPDV MAI LINH';
export const SOURCE_ACCOUNT_CARD_TITLE = '**** 4343 -  HOANG PHU NGOC TUONG';
export const SOURCE_ACCOUNT_AMOUNT = '1,000,000,000';
export const SOURCE_ACCOUNT_CURRENCY = 'VND';
export const SOURCE_ACCOUNT_CARD_BLACK_SRC = '/assets/illustrations/a-illustration/card-black.png';
export const SOURCE_ACCOUNT_CARD_WHITE_SRC = '/assets/illustrations/a-illustration/card-white.png';

export const SOURCE_ACCOUNT_EMPTY_SRC = '/assets/illustrations/a-illustration/empty.png';
export const SOURCE_ACCOUNT_EMPTY_LABEL = 'Bạn chưa có thẻ tín dụng';

export const SOURCE_ACCOUNT_ACCOUNT_OPTIONS: readonly SourceAccountListItem[] = [
  {
    id: 'acc-1',
    title: SOURCE_ACCOUNT_ACCOUNT_TITLE,
    amount: SOURCE_ACCOUNT_AMOUNT,
    currency: SOURCE_ACCOUNT_CURRENCY,
  },
  {
    id: 'acc-2',
    title: SOURCE_ACCOUNT_ACCOUNT_TITLE,
    amount: SOURCE_ACCOUNT_AMOUNT,
    currency: SOURCE_ACCOUNT_CURRENCY,
  },
  {
    id: 'acc-3',
    title: SOURCE_ACCOUNT_ACCOUNT_TITLE,
    amount: SOURCE_ACCOUNT_AMOUNT,
    currency: SOURCE_ACCOUNT_CURRENCY,
  },
  {
    id: 'acc-4',
    title: SOURCE_ACCOUNT_ACCOUNT_TITLE,
    amount: SOURCE_ACCOUNT_AMOUNT,
    currency: SOURCE_ACCOUNT_CURRENCY,
  },
];

export const SOURCE_ACCOUNT_CARD_OPTIONS: readonly SourceAccountListItem[] = [
  {
    id: 'card-1',
    title: '**** 2345 -  HOANG PHU NGOC TUONG',
    amount: '300,000,000',
    currency: SOURCE_ACCOUNT_CURRENCY,
    thumb: 'black',
  },
  {
    id: 'card-2',
    title: '**** 2345 -  HOANG PHU NGOC TUONG',
    amount: '300,000,000',
    currency: SOURCE_ACCOUNT_CURRENCY,
    thumb: 'white',
  },
];

export const SOURCE_ACCOUNT_PATTERN_CASES: readonly SourceAccountPatternCase[] = [
  {
    id: 'default',
    title: 'Default',
    description:
      'Demo tương tác: hover, mở droplist, search, xổ nhóm Tài khoản / Thẻ, chọn nguồn và bật thanh toán thẻ.',
    usage:
      'Các state hover, filled, open, blank list nằm trong Default. Click field để mở list, gõ search để lọc, switch để đổi sang thẻ.',
    interactive: true,
    preview: {
      kind: 'account',
      fieldState: 'default',
      switchChecked: false,
    },
  },
  {
    id: 'error',
    title: 'Error',
    description: 'Viền error kèm icon A Bold/Error và dòng Error Message dưới field.',
    usage: 'Nội dung filled vẫn hiển thị. Message dùng text/error, icon dùng icon/error.',
    preview: {
      kind: 'account',
      fieldState: 'error',
      switchChecked: false,
      titleLine: SOURCE_ACCOUNT_ACCOUNT_TITLE,
      amount: SOURCE_ACCOUNT_AMOUNT,
      currency: SOURCE_ACCOUNT_CURRENCY,
      showErrorMessage: true,
    },
  },
  {
    id: 'disabled',
    title: 'Disabled',
    description: 'Toàn bộ field, icon chevron và switch bị disable trên nền invalid.',
    usage: 'Dòng số tài khoản dùng text/disable1, số dư vẫn text/primary. Footer chuyển sang border/invalid.',
    preview: {
      kind: 'account',
      fieldState: 'disabled',
      switchChecked: false,
      titleLine: SOURCE_ACCOUNT_ACCOUNT_TITLE,
      amount: SOURCE_ACCOUNT_AMOUNT,
      currency: SOURCE_ACCOUNT_CURRENCY,
    },
  },
];

export const FOOTER_PATTERN_DEPENDENCIES = [
  'MbbizButtonComponent',
  'mbbiz-button',
] as const;

export const FOOTER_PATTERN_IMPLEMENTATION_SNIPPET = `<footer class="page-footer-pattern">
  <div class="page-footer-pattern__actions">
    <div class="page-footer-pattern__action page-footer-pattern__action--compact">
      <mbbiz-button variant="secondary" size="lg" [fullWidth]="true">
        Quay lại
      </mbbiz-button>
    </div>

    <div class="page-footer-pattern__action page-footer-pattern__action--compact">
      <mbbiz-button variant="secondary" size="lg" [fullWidth]="true">
        Từ chối
      </mbbiz-button>
    </div>

    <div class="page-footer-pattern__action page-footer-pattern__action--wide">
      <mbbiz-button variant="primary" size="lg" [fullWidth]="true">
        Phê duyệt
      </mbbiz-button>
    </div>
  </div>
</footer>`;
