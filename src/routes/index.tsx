import Debt from '@/assets/svg/debt.svg'
import Pen from '@/assets/svg/pen.svg'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import SchoolIcon from '@mui/icons-material/School'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import AssignmentIcon from '@mui/icons-material/Assignment'
import SubjectIcon from '@mui/icons-material/Subject'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import EditNoteIcon from '@mui/icons-material/EditNote'
import HandymanIcon from '@mui/icons-material/Handyman'
import { Dashboard } from '@mui/icons-material'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import { IconButton } from '@mui/material'
import Image from 'next/image'
import { ReactNode } from 'react'
import FilePresentIcon from '@mui/icons-material/FilePresent'
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
  DETAIL_EXAM: '/detailExam',
  PROPOSAL: '/proposal',
  APPROVE: '/approve',
  EXAM_SET: '/examSet',
  MAJOR: '/major',
  ACADEMIC: '/academicYear',
}

export const listMenuForAdminRoutes: MenuPathProps[] = [
  {
    name: 'Trang Chủ',
    path: '/dashboard',
    icon: <Dashboard />,
  },
  {
    name: 'Quản Lý Chung',
    path: MENU_URL.COURSE,
    icon: <ManageAccountsIcon />,
    children: [
      {
        name: 'QL Học Phần',
        path: MENU_URL.COURSE,
        icon: <BorderColorIcon />,
      },
      {
        name: 'QL Chuyên Ngành',
        path: MENU_URL.MAJOR,
        icon: <SchoolIcon />,
      },
      {
        name: 'QL Năm Học',
        path: MENU_URL.ACADEMIC,
        icon: <HandymanIcon />,
      },
    ],
  },

  {
    name: 'Quản lý Tài Liệu',
    path: 'M',
    icon: <ReceiptLongIcon />,
    children: [
      {
        name: 'QL Đề Chi Tiết',
        path: MENU_URL.DETAIL_EXAM,
        icon: <FilePresentIcon />,
      },
      {
        name: 'QL Bộ Đề',
        path: '/examSet',
        icon: <AutoStoriesIcon />,
      },
      {
        name: 'QL Kế Hoạch',
        path: MENU_URL.PROPOSAL,
        icon: <NoteAltIcon />,
      },
    ],
  },

  // {
  //   name: 'Đề Xuất',
  //   path: 'P',
  //   icon: <AssignmentIcon />,
  //   children: [
  //     {
  //       name: 'Phê Duyệt Kế Hoạch',
  //       path: MENU_URL.APPROVE,
  //       icon: <AssignmentIcon />,
  //     },
  //   ],
  // },
]

export const listMenuForUserRoutes: MenuPathProps[] = [
  {
    name: 'Trang Chủ',
    path: '/dashboard',
    icon: <Dashboard />,
  },

  {
    name: 'Quản lý Tài Liệu',
    path: 'M',
    icon: <SubjectIcon />,
    children: [
      {
        name: 'QL Đề Chi Tiết',
        path: MENU_URL.DETAIL_EXAM,
        icon: <SubjectIcon />,
      },
      {
        name: 'QL Bộ Đề',
        path: '/examSet',
        icon: <AutoStoriesIcon />,
      },
      {
        name: 'QL Kế Hoạch',
        path: MENU_URL.PROPOSAL,
        icon: <NoteAltIcon />,
      },
    ],
  },
]
