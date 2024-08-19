import { ExtendButtonBase, IconButton, IconButtonTypeMap } from '@mui/material'
import React from 'react'
// import PropTypes from 'prop-types'

const NewsIcon = (props: ExtendButtonBase<IconButtonTypeMap<{}, 'button'>>) => {
  return (
    <IconButton {...props}>
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='cursor-pointer'
      >
        <path
          d='M2 13.5V3.5C2 3.36739 2.05268 3.24021 2.14645 3.14645C2.24021 3.05268 2.36739 3 2.5 3H13.5C13.6326 3 13.7598 3.05268 13.8536 3.14645C13.9473 3.24021 14 3.36739 14 3.5V13.5L12 12.5L10 13.5L8 12.5L6 13.5L4 12.5L2 13.5Z'
          stroke='#4CAF50'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M9 7H12'
          stroke='#4CAF50'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M9 9H12'
          stroke='#4CAF50'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M7 6H4V10H7V6Z'
          stroke='#4CAF50'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </IconButton>
  )
}

//NewsIcon.defaultProps = {}

//NewsIcon.propTypes = {}

export default React.memo(NewsIcon)
