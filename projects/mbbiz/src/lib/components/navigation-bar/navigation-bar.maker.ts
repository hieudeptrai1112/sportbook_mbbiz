import type { MbbizNavigationBarItem } from './navigation-bar.types';

/** Visible Maker L1 items from Figma node 20122:15095. Payments L2 from 20122:15441. Deposits L2 from 20122:15457. CD L2 from 20122:15474. Credit L2 from 20122:15489. Cards L2 from 20122:15512. Cash-out L2 from 20122:15535. Data L2 from 20122:15552. SCF L2 from 20122:15569. Settings L2 from 20122:15614. */
export const MBBIZ_MAKER_NAV_ITEMS: readonly MbbizNavigationBarItem[] = [
  { id: 'home', label: 'Trang chủ', icon: 'alinear_home', iconActive: 'abold_home' },
  { id: 'enterprise-360', label: '360° Doanh nghiệp', icon: 'alinear_building', iconActive: 'abold_building' },
  {
    id: 'accounts',
    label: 'Tài khoản',
    icon: 'alinear_wallet',
    iconActive: 'abold_wallet',
    children: [
      { id: 'statement', label: 'Sao kê giao dịch' },
      { id: 'qr', label: 'Dịch vụ QR' },
      { id: 'e-statement', label: 'Sổ phụ điện tử' },
      { id: 'statement-manage', label: 'Quản lý sao kê giao dịch' },
    ],
  },
  {
    id: 'payments',
    label: 'Thanh toán và Chuyển tiền',
    icon: 'alinear_payment_transfer',
    iconActive: 'abold_payment_transfer',
    children: [
      {
        id: 'pay',
        label: 'Thanh toán',
        children: [
          { id: 'bill-electric', label: 'Hóa đơn điện' },
          { id: 'bill-water', label: 'Hóa đơn nước' },
          { id: 'bill-landline', label: 'Hóa đơn điện thoại cố định' },
          { id: 'tax-fee', label: 'Thanh toán thuế, phí' },
          { id: 'tax-domestic', label: 'Thanh toán thuế nội địa' },
          { id: 'social-insurance', label: 'Thanh toán bảo hiểm xã hội' },
          { id: 'bill-cab', label: 'Hóa đơn truyền hình CAB' },
          { id: 'bill-internet', label: 'Hóa đơn Internet' },
          { id: 'bill-mobile', label: 'Hoá đơn điện thoại di động trả sau' },
          { id: 'airline-agent', label: 'Nạp tiền đại lý vé máy bay' },
          { id: 'port-service', label: 'Thanh toán dịch vụ cảng' },
          { id: 'auto-bill', label: 'Quản lý hóa đơn tự động' },
        ],
      },
      {
        id: 'domestic',
        label: 'Chuyển tiền trong nước',
        children: [
          { id: 'transfer', label: 'Chuyển tiền' },
          { id: 'payroll', label: 'Chuyển tiền lô/lương' },
          { id: 'fx-domestic', label: 'Chuyển ngoại tệ trong nước' },
          { id: 'citad', label: 'Chuyển tiền theo mã Citad' },
        ],
      },
      {
        id: 'top-up',
        label: 'Nạp tiền',
        children: [{ id: 'phone-top-up', label: 'Nạp điện thoại' }],
      },
      {
        id: 'international',
        label: 'Chuyển tiền quốc tế',
        children: [
          { id: 'intl-create', label: 'Tạo lệnh chuyển tiền quốc tế' },
          { id: 'intl-docs', label: 'Bổ sung chứng từ nợ' },
          { id: 'intl-amend', label: 'Tra soát/ Sửa đổi/ Hủy chuyển tiền quốc tế' },
        ],
      },
      {
        id: 'fx-sell',
        label: 'Bán ngoại tệ',
        children: [{ id: 'fx-sell-create', label: 'Tạo lệnh bán ngoại tệ' }],
      },
    ],
  },
  {
    id: 'deposits',
    label: 'Tiền gửi',
    icon: 'alinear_money_up',
    iconActive: 'abold_money_up',
    children: [
      { id: 'deposit-query', label: 'Truy vấn/ Rút tiền gửi' },
      { id: 'deposit-maturity', label: 'Mở tiền gửi trả lãi cuối kỳ' },
      { id: 'deposit-daily', label: 'Mở tiền gửi kỳ hạn ngày' },
      { id: 'deposit-periodic', label: 'Mở tiền gửi trả lãi định kỳ' },
      { id: 'deposit-upfront', label: 'Mở tiền gửi trả lãi trước' },
      { id: 'deposit-docs', label: 'Tải chứng từ' },
    ],
  },
  {
    id: 'cd',
    label: 'Chứng chỉ tiền gửi',
    icon: 'alinear_cd',
    iconActive: 'abold_cd',
    children: [
      { id: 'cd-buy', label: 'Mua chứng chỉ tiền gửi' },
      { id: 'cd-sell', label: 'Bán/Hủy chứng chỉ tiền gửi' },
      { id: 'cd-docs', label: 'Tải chứng từ' },
    ],
  },
  {
    id: 'credit',
    label: 'Tín dụng & Tài trợ thương mại',
    icon: 'alinear_loans',
    children: [
      {
        id: 'advisor',
        label: 'Tư vấn chuyên gia',
        children: [
          { id: 'advisor-lc-import', label: 'LC nhập khẩu' },
          { id: 'advisor-lc-export', label: 'LC xuất khẩu' },
        ],
      },
      {
        id: 'credit-request',
        label: 'Đề nghị cấp tín dụng',
        children: [{ id: 'working-capital', label: 'Hạn mức vốn lưu động' }],
      },
      { id: 'loan-confirm', label: 'Xác nhận vay vốn' },
      { id: 'post-loan-docs', label: 'Bổ sung hồ sơ sau vay' },
      { id: 'credit-statement', label: 'Sao kê tín dụng' },
      {
        id: 'disburse',
        label: 'Giải ngân',
        children: [
          { id: 'disburse-trade', label: 'Vay thanh toán thương mại thông thường', comingSoon: true },
          { id: 'disburse-payroll', label: 'Vay thanh toán tiền lương, tiền nhân công', comingSoon: true },
          { id: 'disburse-electric', label: 'Vay thanh toán hóa đơn điện', comingSoon: true },
          { id: 'disburse-water', label: 'Vay thanh toán hóa đơn nước', comingSoon: true },
          { id: 'disburse-intl', label: 'Vay chuyển tiền quốc tế', comingSoon: true },
        ],
      },
      {
        id: 'guarantee',
        label: 'Bảo lãnh',
        children: [
          { id: 'guarantee-issue', label: 'Phát hành bảo lãnh', comingSoon: true },
          { id: 'guarantee-amend', label: 'Sửa đổi bảo lãnh', comingSoon: true },
          { id: 'guarantee-settle', label: 'Tất toán bảo lãnh', comingSoon: true },
          { id: 'guarantee-claim', label: 'Truy đòi bảo lãnh', comingSoon: true },
        ],
      },
      {
        id: 'lc-import',
        label: 'LC nhập khẩu',
        children: [
          { id: 'lc-issue', label: 'Phát hành LC' },
          { id: 'lc-pay', label: 'Thanh toán LC' },
        ],
      },
      { id: 'lc-export', label: 'LC xuất khẩu' },
      { id: 'e-docs', label: 'Quản lý hồ sơ điện tử' },
      { id: 'credit-plan-adjust', label: 'Điều chỉnh phương án cấp tín dụng' },
    ],
  },
  {
    id: 'cards',
    label: 'Dịch vụ thẻ',
    icon: 'alinear_cards',
    iconActive: 'abold_cards',
    children: [
      { id: 'card-issue', label: 'Phát hành thẻ mới' },
      { id: 'card-manage', label: 'Quản lý thẻ' },
    ],
  },
  { id: 'status', label: 'Quản lý trạng thái', icon: 'alinear_manage', iconActive: 'abold_manage' },
  {
    id: 'cash-out',
    label: 'Rút tiền mặt',
    icon: 'alinear_money',
    iconActive: 'abold_money',
    children: [
      { id: 'atm-code', label: 'Tạo mã rút tiền tại ATM/CRM' },
      { id: 'cash-out-history', label: 'Truy vấn lịch sử rút tiền' },
    ],
  },
  {
    id: 'data',
    label: 'Quản lý dữ liệu',
    icon: 'alinear_documents',
    iconActive: 'abold_documents',
    children: [
      { id: 'data-einvoice', label: 'Hóa đơn điện tử' },
      { id: 'data-templates', label: 'Quản lý biểu mẫu' },
    ],
  },
  {
    id: 'scf',
    label: 'Tài trợ chuỗi cung ứng',
    icon: 'alinear_scf',
    iconActive: 'abold_scf',
    children: [
      { id: 'scf-query', label: 'Truy vấn giao dịch' },
      { id: 'scf-disburse', label: 'Giải ngân' },
      { id: 'scf-factoring', label: 'Bao thanh toán' },
      {
        id: 'scf-distributor',
        label: 'Nhà phân phối',
        children: [
          { id: 'scf-distributor-lc-import', label: 'LC nhập khẩu' },
          { id: 'scf-distributor-lc-export', label: 'LC xuất khẩu' },
        ],
      },
      {
        id: 'scf-supplier',
        label: 'Nhà cung cấp',
        children: [
          { id: 'scf-supplier-lc-import', label: 'LC nhập khẩu' },
          { id: 'scf-supplier-lc-export', label: 'LC xuất khẩu' },
        ],
      },
      {
        id: 'scf-anchor',
        label: 'Khách hàng trung tâm',
        children: [
          { id: 'scf-anchor-lc-import', label: 'LC nhập khẩu' },
          { id: 'scf-anchor-lc-export', label: 'LC xuất khẩu' },
        ],
      },
    ],
  },
  { id: 'scf-multi', label: 'Tài trợ chuỗi cung ứng đa tầng', icon: 'alinear_chain', iconActive: 'abold_chain' },
  { id: 'beneficiaries', label: 'Quản lý người thụ hưởng', icon: 'alinear_list' },
  {
    id: 'settings',
    label: 'Tiện ích và Cài đặt',
    icon: 'alinear_settings',
    iconActive: 'abold_settings',
    children: [
      { id: 'settings-password', label: 'Đổi mật khẩu' },
      { id: 'settings-notify', label: 'Cài đặt thông báo' },
      { id: 'settings-login', label: 'Quản lý đăng nhập' },
      { id: 'settings-referral', label: 'Mã người giới thiệu' },
      { id: 'settings-dotp', label: 'Đề xuất cấp lại D-OTP' },
      { id: 'settings-limit', label: 'Thay đổi hạn mức' },
      { id: 'settings-service', label: 'Đăng ký dịch vụ' },
      { id: 'settings-bankhub', label: 'Đăng ký sử dụng BankHub' },
      { id: 'settings-trader', label: 'Đăng ký người giao dịch' },
      { id: 'settings-balance-feed', label: 'Nhận biến động số dư trên phần mềm đối tác' },
    ],
  },
];
