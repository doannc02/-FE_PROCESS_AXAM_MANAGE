import { MENU_URL } from '@/routes'

export const actionList = [
  {
    name: 'Bán hàng thông thường Tổng hợp',
    path: MENU_URL.CUSTOMER.INVOICE.NORMAL.EXTERNAL,
  },
  {
    name: 'Bán hàng nội bộ Tổng hợp',
    path: MENU_URL.CUSTOMER.INVOICE.NORMAL.INTERNAL,
  },
  {
    name: 'Mua hàng',
    path: MENU_URL.PROVIDER.INVOICE,
  },
  {
    name: 'Thu tiền ( ngân hàng)',
    path: MENU_URL.BANK_ACCOUNT.INBOUND,
  },
  {
    name: 'Thu tiền ( tiền mặt)',
    path: MENU_URL.CASH_ACCOUNT.INBOUND,
  },
  {
    name: 'Công nợ phải thu',
    path: MENU_URL.DEBT.RECEIVABLE,
  },
  {
    name: 'Công nợ phải trả',
    path: MENU_URL.DEBT.PAYABLE,
  },
  {
    name: 'Cấu hình chung',
    path: MENU_URL.CONFIG.ACCOUNT_CONFIG,
  },
]
