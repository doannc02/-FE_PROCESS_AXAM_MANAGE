import { RED } from '@/helper/colors'
import { Typography } from '@mui/material'
import React from 'react'

const CustomDisplayStateInv = ({ state }: { state: string }) => {
    console.log(state, 'lgo')
  if (state === 'PROCESSING') {
    return (
      <Typography className='text-[#F89E19] font-normal text-sm'>
        Đang xử lý
      </Typography>
    )
  } else if (state === 'DONE') {
    return (
      <Typography className='text-[#00CC6A] font-normal text-sm whitespace-nowrap'>
        Hoàn thành
      </Typography>
    )
  } else if (state === 'WAITING') {
    return (
      <Typography className='text-[#F89E19] font-normal text-sm'>
        Chờ xử lý
      </Typography>
    )
  } else if (state === 'REJECTED' || state === 'CANCELED') {
    return (
      <Typography className={`font-normal text-sm`} style={{ color: RED }}>
        {state === 'CANCELED' ? 'Huỷ' : 'Bị Huỷ'}
      </Typography>
    )
  } else if (state === 'CANCELED') {
    return (
      <Typography className={`font-normal text-sm`} style={{ color: RED }}>
        Bị hủy
      </Typography>
    )
  } else if (state === 'WAITING_SIGNATURE') {
    return (
      <Typography
        className={`font-normal text-sm`}
        style={{ color: '#A584FF' }}
      >
        Chờ ký
      </Typography>
    )
  } else return <></>
}

export default React.memo(CustomDisplayStateInv)
