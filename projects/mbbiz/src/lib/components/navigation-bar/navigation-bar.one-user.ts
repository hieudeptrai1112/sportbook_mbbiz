import type { MbbizNavigationBarItem } from './navigation-bar.types';

/** Visible 1 User L1 items from Figma node 25285:221085. TK Siêu lãi ngày uses abold_sack / alinear_sack. Accounts L2 from 20122:16424 (panel 20122:16429). Payments L2 from 20122:16439 (panel 20122:16444). Deposits L2 from 20122:16454 (panel 20122:16459). Credit L2 from 20122:16471 (panel 20122:16476). Cards L2 from 20122:16494 (panel 20122:16499). Data L2 from 20122:16522 (panel 20122:16527). Settings L2 from 20122:16550 (panel 20122:16555). Credit L3 reuses Maker accordion copy from the same Lv2 item instances. */
export const MBBIZ_ONE_USER_NAV_ITEMS: readonly MbbizNavigationBarItem[] = [
  { id: 'home', label: 'Trang chủ', icon: 'alinear_home', iconActive: 'abold_home' },
  { id: 'enterprise-360', label: '360° Doanh nghiệp', icon: 'alinear_building', iconActive: 'abold_building' },
  { id: 'approvals', label: 'Quản lý phê duyệt', icon: 'alinear_mission' },
  {
    id: 'accounts',
    label: 'Tài khoản',
    icon: 'alinear_wallet',
    iconActive: 'abold_wallet',
    children: [
      { id: 'statement', label: 'Sao kê giao dịch' },
      { id: 'e-statement', label: 'Sổ phụ điện tử' },
      { id: 'qr', label: 'Dịch vụ QR' },
    ],
  },
  { id: 'daily-interest', label: 'TK Siêu lãi ngày', icon: 'alinear_sack', iconActive: 'abold_sack' },
  {
    id: 'payments',
    label: 'Thanh toán và Chuyển tiền',
    icon: 'alinear_payment_transfer',
    iconActive: 'abold_payment_transfer',
    children: [
      { id: 'payroll', label: 'Chuyển tiền lô/lương' },
      { id: 'payments-beneficiaries', label: 'Quản lý người thụ hưởng' },
      { id: 'payments-templates', label: 'Quản lý biểu mẫu' },
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
    id: 'data',
    label: 'Quản lý dữ liệu',
    icon: 'alinear_documents',
    iconActive: 'abold_documents',
    children: [
      { id: 'data-einvoice', label: 'Hóa đơn điện tử' },
      { id: 'data-templates', label: 'Quản lý biểu mẫu', comingSoon: true },
    ],
  },
  { id: 'beneficiaries', label: 'Quản lý người thụ hưởng', icon: 'alinear_list' },
  {
    id: 'settings',
    label: 'Tiện ích và Cài đặt',
    icon: 'alinear_settings',
    iconActive: 'abold_settings',
    children: [
      { id: 'settings-password', label: 'Đổi mật khẩu' },
      { id: 'settings-notify', label: 'Cài đặt thông báo' },
      { id: 'settings-referral', label: 'Mã người giới thiệu' },
      { id: 'settings-limit', label: 'Thay đổi hạn mức' },
      { id: 'settings-bankhub', label: 'Đăng ký sử dụng Bankhub' },
      { id: 'settings-trader', label: 'Đăng ký người giao dịch' },
      { id: 'settings-balance-feed', label: 'Nhận biến động số dư trên phần mềm đối tác' },
    ],
  },
];
