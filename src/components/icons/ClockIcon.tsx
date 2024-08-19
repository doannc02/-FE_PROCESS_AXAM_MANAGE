import { ExtendButtonBase, IconButton, IconButtonTypeMap } from '@mui/material'
import React from 'react'

const ClockIcon = (
  props: ExtendButtonBase<IconButtonTypeMap<{}, 'button'>>
) => {
  return (
    <IconButton {...props}>
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        className='cursor-pointer'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z'
          stroke='#3F91FF'
          strokeMiterlimit='10'
        />
        <path
          d='M8 4.5V8H11.5'
          stroke='#3F91FF'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </IconButton>
  )
}

//ClockIcon.defaultProps = {}

//ClockIcon.propTypes = {}

export default React.memo(ClockIcon)
