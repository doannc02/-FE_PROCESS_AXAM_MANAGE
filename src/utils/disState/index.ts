import { GRAY, GREEN, ORANGE, RED } from '@/helper/colors'

export const getStatusText = (status: string) => {
  switch (status) {
    case 'approved':
      return 'Phê duyệt'
    case 'rejected':
      return 'Từ chối'
    case 'pending_approval':
      return 'Đang chờ phê duyệt'
    default:
      return ''
  }
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved':
      return GREEN
    case 'rejected':
      return RED
    case 'pending_approval':
      return ORANGE
    default:
      return GRAY
  }
}
