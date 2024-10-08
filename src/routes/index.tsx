import Debt from '@/assets/svg/debt.svg'
import Pen from '@/assets/svg/pen.svg'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import AssignmentIcon from '@mui/icons-material/Assignment'
import SubjectIcon from '@mui/icons-material/Subject'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import EditNoteIcon from '@mui/icons-material/EditNote'
import HandymanIcon from '@mui/icons-material/Handyman'
import { Dashboard } from '@mui/icons-material'
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
  CONFIG: '/config',
  MANAGER: '/manager',
  COURSE: '/course',
  EXAM: '/exam',
  PROPOSAL: '/proposal',
  APPROVE: '/approve',
  EXAM_SET: '/examSet',
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
    name: 'Quản lý chung',
    path: MENU_URL.COURSE,
    icon: (
      <IconButton>
        <Image alt='' width={23} height={23} src={Debt} />
      </IconButton>
    ),
  },
  {
    name: 'Cấu hình',
    path: MENU_URL.CONFIG,
    icon: (
      <IconButton>
        <HandymanIcon />
      </IconButton>
    ),
  },
  {
    name: 'QL Học phần',
    path: MENU_URL.COURSE,
    icon: (
      <IconButton>
        <BorderColorIcon />
      </IconButton>
    ),
  },

  {
    name: 'QL Đề chi tiết',
    path: MENU_URL.EXAM,
    icon: (
      <IconButton>
        <SubjectIcon />
      </IconButton>
    ),
  },
  {
    name: 'QL Bộ đề',
    path: '/examSet',
    icon: (
      <IconButton>
        <AutoStoriesIcon />
      </IconButton>
    ),
  },
  {
    name: 'QL Kế hoạch',
    path: MENU_URL.PROPOSAL,
    icon: (
      <IconButton>
        <EditNoteIcon />
      </IconButton>
    ),
  },
  {
    name: 'Đề xuất phê duyệt',
    path: MENU_URL.APPROVE,
    icon: (
      <IconButton>
        <AssignmentIcon />
      </IconButton>
    ),
  },
]
