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
  DETAIL_EXAM: '/detailExam',
  PROPOSAL: '/proposal',
  APPROVE: '/approve',
  EXAM_SET: '/examSet',
}

export const listMenuForAdminRoutes: MenuPathProps[] = [
  {
    name: 'Trang Chủ',
    path: '/dashboard',
    icon: <Dashboard />,
  },
  {
    name: 'Cấu Hình Chung',
    path: MENU_URL.COURSE,
    icon: (
      <IconButton>
        <Image alt='' width={23} height={23} src={Debt} />
      </IconButton>
    ),
    children: [
      {
        name: 'Cấu hình năm học',
        path: MENU_URL.CONFIG,
        icon: (
          <IconButton>
            <HandymanIcon />
          </IconButton>
        ),
      },
      {
        name: 'QL Học Phần',
        path: MENU_URL.COURSE,
        icon: (
          <IconButton>
            <BorderColorIcon />
          </IconButton>
        ),
      },
      {
        name: 'QL Chuyên Ngành',
        path: MENU_URL.COURSE,
        icon: (
          <IconButton>
            <BorderColorIcon />
          </IconButton>
        ),
      },
    ],
  },

  {
    name: 'Quản lý Tài Liệu',
    path: 'M',
    icon: (
      <IconButton>
        <SubjectIcon />
      </IconButton>
    ),
    children: [
      {
        name: 'QL Đề Chi Tiết',
        path: MENU_URL.DETAIL_EXAM,
        icon: (
          <IconButton>
            <SubjectIcon />
          </IconButton>
        ),
      },
      {
        name: 'QL Bộ Đề',
        path: '/examSet',
        icon: (
          <IconButton>
            <AutoStoriesIcon />
          </IconButton>
        ),
      },
      {
        name: 'QL Kế Hoạch',
        path: MENU_URL.PROPOSAL,
        icon: (
          <IconButton>
            <EditNoteIcon />
          </IconButton>
        ),
      },
    ],
  },

  {
    name: 'Đề Xuất',
    path: 'P',
    icon: (
      <IconButton>
        <AssignmentIcon />
      </IconButton>
    ),
    children: [
      {
        name: 'Phê Duyệt Kế Hoạch',
        path: MENU_URL.APPROVE,
        icon: (
          <IconButton>
            <AssignmentIcon />
          </IconButton>
        ),
      },
    ],
  },
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
    icon: (
      <IconButton>
        <SubjectIcon />
      </IconButton>
    ),
    children: [
      {
        name: 'QL Đề Chi Tiết',
        path: MENU_URL.DETAIL_EXAM,
        icon: (
          <IconButton>
            <SubjectIcon />
          </IconButton>
        ),
      },
      {
        name: 'QL Bộ Đề',
        path: '/examSet',
        icon: (
          <IconButton>
            <AutoStoriesIcon />
          </IconButton>
        ),
      },
      {
        name: 'QL Kế Hoạch',
        path: MENU_URL.PROPOSAL,
        icon: (
          <IconButton>
            <EditNoteIcon />
          </IconButton>
        ),
      },
    ],
  },

  {
    name: 'Đề Xuất',
    path: 'P',
    icon: (
      <IconButton>
        <AssignmentIcon />
      </IconButton>
    ),
    children: [
      {
        name: 'Phê Duyệt Kế Hoạch',
        path: MENU_URL.APPROVE,
        icon: (
          <IconButton>
            <AssignmentIcon />
          </IconButton>
        ),
      },
    ],
  },
]
