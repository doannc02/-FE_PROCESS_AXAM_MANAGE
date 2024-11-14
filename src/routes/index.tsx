import { Dashboard } from '@mui/icons-material'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import FilePresentIcon from '@mui/icons-material/FilePresent'
import HandymanIcon from '@mui/icons-material/Handyman'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import SchoolIcon from '@mui/icons-material/School'
import SubjectIcon from '@mui/icons-material/Subject'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import { ReactNode } from 'react'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
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
  DEPARTMENT: '/department',
  DETAIL_EXAM: '/detailExam',
  PROPOSAL: '/proposal',
  APPROVE: '/approve',
  EXAM_SET: '/examSet',
  MAJOR: '/major',
  ACADEMIC: '/academicYear',
  TRACKING: '/trackingApprove',
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
        name: 'QL Khoa',
        path: MENU_URL.DEPARTMENT,
        icon: <SupervisedUserCircleIcon />,
      },
      {
        name: 'QL Chuyên Ngành',
        path: MENU_URL.MAJOR,
        icon: <SchoolIcon />,
      },
      {
        name: 'QL Học Phần',
        path: MENU_URL.COURSE,
        icon: <BorderColorIcon />,
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
  {
    name: 'Yêu cầu phê duyệt',
    path: MENU_URL.TRACKING,
    icon: <AnalyticsIcon />,
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
    icon: <SubjectIcon />,
    children: [
      {
        name: 'QL Đề Chi Tiết',
        path: MENU_URL.DETAIL_EXAM,
        icon: <TextSnippetIcon />,
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
  {
    name: 'Theo dõi phê duyệt',
    path: MENU_URL.TRACKING,
    icon: <AnalyticsIcon />,
  },
]
