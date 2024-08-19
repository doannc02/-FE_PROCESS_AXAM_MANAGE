import { GREEN, RED } from '@/helper/colors'
import { Typography } from '@mui/material'
import { memo } from 'react'

const PaymentStatus = ({ value }: { value?: string | null }) => {
  if (value === 'PAID') {
    return (
      <Typography variant='body1' style={{ color: GREEN }}>
        Đã thanh toán
      </Typography>
    )
  }

  if (value === 'PARTIAL_PAYMENT')
    return (
      <Typography variant='body1' style={{ color: GREEN }}>
        Thanh toán 1 phần
      </Typography>
    )

  if (value === 'NOT_PAYMENT')
    return (
      <Typography variant='body1' style={{ color: RED }}>
        Chưa thanh toán
      </Typography>
    )

  if (value === 'REVERSE')
    return (
      <Typography variant='body1' style={{ color: RED }}>
        Đảo ngược
      </Typography>
    )

  return null
}

export default memo(PaymentStatus)
