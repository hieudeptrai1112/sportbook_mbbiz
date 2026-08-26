import type { MbbizNavigationBarItem } from './navigation-bar.types';

/** Visible Checker L1 items from Figma node 20122:18345. Accounts L2 from 20122:18420. */
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
  { id: 'deposits', label: 'Tiền gửi', icon: 'alinear_money_up', iconActive: 'abold_money_up' },
  { id: 'cd', label: 'Chứng chỉ tiền gửi', icon: 'alinear_cd', iconActive: 'abold_cd' },
  {
    id: 'credit',
    label: 'Tín dụng & Tài trợ thương mại',
    icon: 'alinear_loans',
  },
  { id: 'cards', label: 'Dịch vụ thẻ', icon: 'alinear_cards', iconActive: 'abold_cards' },
  { id: 'cash-out', label: 'Rút tiền mặt', icon: 'alinear_money', iconActive: 'abold_money' },
  { id: 'data', label: 'Quản lý dữ liệu', icon: 'alinear_documents', iconActive: 'abold_documents' },
  { id: 'scf-multi', label: 'Tài trợ chuỗi cung ứng đa tầng', icon: 'alinear_chain', iconActive: 'abold_chain' },
  { id: 'settings', label: 'Tiện ích và Cài đặt', icon: 'alinear_settings', iconActive: 'abold_settings' },
];
