import Moving from '@/assets/svg/Moving.svg'
import Bank from '@/assets/svg/bank.svg'
import Cash from '@/assets/svg/cash.svg'
import Debt from '@/assets/svg/debt.svg'
import Pen from '@/assets/svg/pen.svg'
import Setting from '@/assets/svg/setting.svg'
import Surplus from '@/assets/svg/surplus.svg'
import Warehouse from '@/assets/svg/warehouse.svg'

import {
  Dashboard,
  ImportContacts,
  PriceChangeSharp,
  TaxiAlertTwoTone,
} from '@mui/icons-material'
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { IconButton } from '@mui/material'
import Image from 'next/image'
import { ReactNode } from 'react'

export interface MenuPathProps {
  name: string
  path: string
  icon?: ReactNode
  isChecked?: boolean
  children?: MenuPathProps[]
  subMenu?: MenuPathProps[]
}

export const ACCOUNTING = 'accounting'

export const TRANSLATE = {
  COMMON: 'common',
}

export const MENU_URL = {
  COURSE: '/course',
  PROPOSALS_ASSIGNMENT: '/proposalsAsignment',
}

export const listMenuRoutes: MenuPathProps[] = [
  {
    name: 'Trang chủ',
    path: '/dashboard',
    icon: <Dashboard />,
  },
  // {
  //   name: 'Kế toán bán hàng',
  //   path: '/customer/',
  //   icon: (
  //     <IconButton>
  //       <Image alt='' width={20} height={20} src={Moving} />
  //     </IconButton>
  //   ),
  //   subMenu: [
  //     {
  //       name: 'Bán hàng',
  //       path: `${MENU_URL.CUSTOMER.INVOICE.NORMAL.ALL}`,
  //       isChecked: true,
  //       children: [
  //         {
  //           name: 'Merchant',
  //           path: MENU_URL.CUSTOMER.INVOICE.NORMAL.MERCHANT,
  //         },
  //         {
  //           name: 'B2C',
  //           path: MENU_URL.CUSTOMER.INVOICE.NORMAL.B2C,
  //         },
  //         {
  //           name: 'B2B',
  //           path: MENU_URL.CUSTOMER.INVOICE.NORMAL.B2B,
  //         },
  //         {
  //           name: 'OEM',
  //           path: MENU_URL.CUSTOMER.INVOICE.NORMAL.OEM,
  //         },
  //         {
  //           name: 'Thanh lý',
  //           path: MENU_URL.CUSTOMER.INVOICE.NORMAL.LIQUIDATION,
  //         },
  //         {
  //           name: 'Nội bộ',
  //           path: MENU_URL.CUSTOMER.INVOICE.NORMAL.INTERNAL,
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Trả hàng',
  //       path: `${MENU_URL.CUSTOMER.REFUND.NORMAL.EXTERNAL}`,
  //       isChecked: true,
  //       children: [
  //         {
  //           name: 'Merchant',
  //           path: MENU_URL.CUSTOMER.REFUND.NORMAL.MERCHANT,
  //         },
  //         {
  //           name: 'B2C',
  //           path: MENU_URL.CUSTOMER.REFUND.NORMAL.B2C,
  //         },
  //         {
  //           name: 'B2B',
  //           path: MENU_URL.CUSTOMER.REFUND.NORMAL.B2B,
  //         },
  //         {
  //           name: 'OEM',
  //           path: MENU_URL.CUSTOMER.REFUND.NORMAL.OEM,
  //         },
  //         {
  //           name: 'Thanh lý',
  //           path: MENU_URL.CUSTOMER.REFUND.NORMAL.LIQUIDATION,
  //         },
  //         {
  //           name: 'Nội bộ',
  //           path: MENU_URL.CUSTOMER.REFUND.NORMAL.INTERNAL,
  //         },
  //         {
  //           name: 'Đơn hàng',
  //           path: '/saleOrder',
  //           children: [
  //             {
  //               name: 'Đơn bán hàng Merchant',
  //               path: `${MERCHANT_URL}`,
  //               children: [
  //                 {
  //                   name: 'Quản lý đơn bán',
  //                   path: MENU_URL.BILLS.MERCHANT.SALE_ORDER,
  //                 },
  //               ],
  //             },
  //             {
  //               name: 'Đơn bán hàng (B2B)',
  //               path: `${B2B_URL}`,
  //               children: [
  //                 {
  //                   name: 'Quản lý đơn bán',
  //                   path: MENU_URL.BILLS.B2B.SALE_ORDER,
  //                 },
  //               ],
  //             },
  //             {
  //               name: 'Đơn bán hàng (B2C)',
  //               path: `${B2C_URL}`,
  //               children: [
  //                 {
  //                   name: 'Quản lý đơn bán',
  //                   path: MENU_URL.BILLS.B2C.SALE_ORDER,
  //                 },
  //               ],
  //             },

  //             {
  //               name: 'Đơn bán hàng đặt (OEM)',
  //               path: `${OEM_URL}`,
  //               children: [
  //                 {
  //                   name: 'Quản lý đơn bán',
  //                   path: MENU_URL.BILLS.OEM.SALE_ORDER,
  //                 },
  //                 {
  //                   name: 'Quản lý đơn bán',
  //                   path: MENU_URL.BILLS.OEM.SALE_ORDER,
  //                 },
  //               ],
  //             },
  //             {
  //               name: 'Đơn thanh lý',
  //               path: `${LIQUIDATION_URL}`,
  //               children: [
  //                 {
  //                   name: 'Quản lý đơn bán',
  //                   path: MENU_URL.BILLS.CLEARANCE.SALE_ORDER,
  //                 },
  //                 {
  //                   name: 'Quản lý đơn bán',
  //                   path: MENU_URL.BILLS.CLEARANCE.SALE_ORDER,
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //         {
  //           name: 'Điều khoản thanh toán',
  //           path: MENU_URL.CUSTOMER.PAYMENT_TERM,
  //         },
  //       ],
  //     },
  //   ],
  // },

  {
    name: 'Học phần',
    path: MENU_URL.COURSE,
    icon: (
      <IconButton>
        <Image alt='' width={23} height={23} src={Debt} />
      </IconButton>
    ),
  },
  {
    name: 'Đề xuất phê duyệt',
    path: '/proposalsAsignment',
    icon: (
      <IconButton>
        <Image alt='' width={20} height={20} src={Pen} />
      </IconButton>
    ),
  },
  {
    name: 'Tạo bộ đề',
    path: '/examSet',
    icon: (
      <IconButton>
        <Image alt='' width={20} height={20} src={Pen} />
      </IconButton>
    ),
  },
]
