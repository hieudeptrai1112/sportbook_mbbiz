import type { MbbizNavigationBarItem } from './navigation-bar.types';

/** Visible Checker L1 items from Figma node 20122:18345. Accounts L2 from 20122:18420. Deposits L2 from 20122:18435 (panel 20122:18440). CD L2 from 20122:18455 (panel 20122:18460). Credit L2 from 20122:18475 (panel 20122:18480). Cards L2 from 20122:18500 (panel 20122:18505). Data L2 from 20122:18526 (panel 20122:18531). Settings L2 from 20122:18558 (panel 20122:18563). */
export const MBBIZ_CHECKER_NAV_ITEMS: readonly MbbizNavigationBarItem[] = [
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
      { id: 'qr', label: 'Dịch vụ QR' },
      { id: 'e-statement', label: 'Sổ phụ điện tử' },
      { id: 'statement-manage', label: 'Quản lý sao kê giao dịch' },
    ],
  },
  {
    id: 'deposits',
    label: 'Tiền gửi',
    icon: 'alinear_money_up',
    iconActive: 'abold_money_up',
    children: [{ id: 'deposit-query', label: 'Truy vấn/ Rút tiền gửi' }],
  },
  {
    id: 'cd',
    label: 'Chứng chỉ tiền gửi',
    icon: 'alinear_cd',
    iconActive: 'abold_cd',
    children: [
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
      { id: 'credit-statement', label: 'Sao kê tín dụng' },
      { id: 'lc-import', label: 'LC nhập khẩu' },
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
  { id: 'cash-out', label: 'Rút tiền mặt', icon: 'alinear_money', iconActive: 'abold_money' },
  { id: 'data', label: 'Quản lý dữ liệu', icon: 'alinear_documents', iconActive: 'abold_documents', children: [{ id: 'data-einvoice', label: 'Hóa đơn điện tử' }] },
  { id: 'scf-multi', label: 'Tài trợ chuỗi cung ứng đa tầng', icon: 'alinear_chain', iconActive: 'abold_chain' },
  {
    id: 'settings',
    label: 'Tiện ích và Cài đặt',
    icon: 'alinear_settings',
    iconActive: 'abold_settings',
    children: [
      { id: 'settings-password', label: 'Đổi mật khẩu' },
      { id: 'settings-login', label: 'Quản lý đăng nhập' },
      { id: 'settings-notify', label: 'Cài đặt thông báo' },
      { id: 'settings-referral', label: 'Mã người giới thiệu' },
      { id: 'settings-limit', label: 'Thay đổi hạn mức' },
      { id: 'settings-bankhub', label: 'Đăng ký sử dụng BankHub' },
      { id: 'settings-trader', label: 'Đăng ký người giao dịch' },
      { id: 'settings-balance-feed', label: 'Nhận biến động số dư trên phần mềm đối tác' },
    ],
  },
];
