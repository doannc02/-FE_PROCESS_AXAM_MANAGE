import { IconButton } from '@mui/material'
import { memo } from 'react'

const SquaresFour = ({ onClick }: { onClick: () => void }) => {
  return (
    <IconButton onClick={onClick}>
      <svg
        width='20'
        height='20'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M7 3H3V7H7V3Z'
          stroke='#242424'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M13 3H9V7H13V3Z'
          stroke='#242424'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M7 9H3V13H7V9Z'
          stroke='#242424'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M13 9H9V13H13V9Z'
          stroke='#242424'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </IconButton>
  )
}

export default memo(SquaresFour)
