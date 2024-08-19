import { IconButton } from '@mui/material'
import { memo } from 'react'

const DotThree = ({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) => {
  return (
    <IconButton className={className} onClick={onClick}>
      <svg
        width='22'
        height='22'
        viewBox='0 0 22 22'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M11 12.0312C11.5695 12.0312 12.0312 11.5695 12.0312 11C12.0312 10.4305 11.5695 9.96875 11 9.96875C10.4305 9.96875 9.96875 10.4305 9.96875 11C9.96875 11.5695 10.4305 12.0312 11 12.0312Z'
          fill='#747475'
        />
        <path
          d='M5.5 12.0312C6.06954 12.0312 6.53125 11.5695 6.53125 11C6.53125 10.4305 6.06954 9.96875 5.5 9.96875C4.93046 9.96875 4.46875 10.4305 4.46875 11C4.46875 11.5695 4.93046 12.0312 5.5 12.0312Z'
          fill='#747475'
        />
        <path
          d='M16.5 12.0312C17.0695 12.0312 17.5312 11.5695 17.5312 11C17.5312 10.4305 17.0695 9.96875 16.5 9.96875C15.9305 9.96875 15.4688 10.4305 15.4688 11C15.4688 11.5695 15.9305 12.0312 16.5 12.0312Z'
          fill='#747475'
        />
      </svg>
    </IconButton>
  )
}

export default memo(DotThree)
