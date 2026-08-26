import type { MbbizNavigationBarItem } from './navigation-bar.types';

/** Visible 1 User L1 items from Figma node 20122:16326. */
export const MBBIZ_ONE_USER_NAV_ITEMS: readonly MbbizNavigationBarItem[] = [
  { id: 'home', label: 'Trang chủ', icon: 'alinear_home', iconActive: 'abold_home' },
  { id: 'enterprise-360', label: '360° Doanh nghiệp', icon: 'alinear_building', iconActive: 'abold_building' },
  { id: 'approvals', label: 'Quản lý phê duyệt', icon: 'alinear_mission' },
  { id: 'accounts', label: 'Tài khoản', icon: 'alinear_wallet', iconActive: 'abold_wallet' },
  {
    id: 'payments',
    label: 'Thanh toán và Chuyển tiền',
    icon: 'alinear_payment_transfer',
    iconActive: 'abold_payment_transfer',
  },
  { id: 'deposits', label: 'Tiền gửi', icon: 'alinear_money_up', iconActive: 'abold_money_up' },
  {
    id: 'credit',
    label: 'Tín dụng & Tài trợ thương mại',
    icon: 'alinear_loans',
  },
  { id: 'cards', label: 'Dịch vụ thẻ', icon: 'alinear_cards', iconActive: 'abold_cards' },
  { id: 'status', label: 'Quản lý trạng thái', icon: 'alinear_manage', iconActive: 'abold_manage' },
  { id: 'data', label: 'Quản lý dữ liệu', icon: 'alinear_documents', iconActive: 'abold_documents' },
  { id: 'beneficiaries', label: 'Quản lý người thụ hưởng', icon: 'alinear_list' },
  { id: 'settings', label: 'Tiện ích và Cài đặt', icon: 'alinear_settings', iconActive: 'abold_settings' },
];
