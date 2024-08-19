import { Typography } from '@mui/material'
import Image from 'next/image'
import { ReactNode } from 'react'

export const WarningText = ({
  children,
  bgColor = '#FFEEBB',
}: {
  children: ReactNode
  bgColor?: string
}) => {
  return (
    <div
      className='flex items-center rounded-[4px] gap-4 p-4 my-4 min-h-[40px]'
      style={{
        backgroundColor: bgColor,
      }}
    >
      <Image
        alt='info'
        width={16}
        height={16}
        src={require('@/assets/svg/info.svg')}
      />
      <Typography variant='body1'>{children}</Typography>
    </div>
  )
}
