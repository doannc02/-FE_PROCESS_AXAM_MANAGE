import { ExtendButtonBase, IconButton, IconButtonTypeMap } from '@mui/material'
import React from 'react'

const CopyIcon = (props: ExtendButtonBase<IconButtonTypeMap<{}, 'button'>>) => {
  return (
    <IconButton {...props}>
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M13.125 13.1245H16.875V3.12451H6.875V6.87451'
          stroke='#F89E19'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M13.1249 6.87451H3.12488V16.8745H13.1249V6.87451Z'
          stroke='#F89E19'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </IconButton>
  )
}

//CopyIcon.defaultProps = {}

//CopyIcon.propTypes = {}

export default React.memo(CopyIcon)
