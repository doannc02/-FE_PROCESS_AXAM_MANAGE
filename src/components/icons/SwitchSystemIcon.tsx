import { BLACK } from '@/helper/colors'
import { IconButton } from '@mui/material'
import { memo } from 'react'

const SwitchSystemIcon = ({
  onClick,
  className,
}: {
  onClick: () => void
  className?: string
}) => {
  return (
    <IconButton onClick={onClick} className={className}>
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect
          x='0.4'
          y='1.4'
          width='15.2'
          height='13.2'
          rx='0.6'
          stroke={BLACK}
          strokeWidth='0.8'
        />
        <line
          x1='4.4'
          y1='1'
          x2='4.4'
          y2='15'
          stroke={BLACK}
          strokeWidth='0.8'
        />
        <path
          d='M12.75 8H7.25'
          stroke={BLACK}
          strokeWidth='0.8'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M9.5 5.75L7.25 8L9.5 10.25'
          stroke={BLACK}
          strokeWidth='0.8'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </IconButton>
  )
}

export default memo(SwitchSystemIcon)
