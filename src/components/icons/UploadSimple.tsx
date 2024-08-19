import { ExtendButtonBase, IconButton, IconButtonTypeMap } from '@mui/material'
import React from 'react'

const UploadSimple = (props: any) => {
  const { className } = props
  return (
    <IconButton {...props}>
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        className={className}
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M6.71875 6.40399L10 3.12274L13.2812 6.40399'
          stroke='#747475'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M10 11.875V3.125'
          stroke='#747475'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M17.5 10.625V16.25C17.5 16.4158 17.4342 16.5747 17.3169 16.6919C17.1997 16.8092 17.0408 16.875 16.875 16.875H3.125C2.95924 16.875 2.80027 16.8092 2.68306 16.6919C2.56585 16.5747 2.5 16.4158 2.5 16.25V10.625'
          stroke='#747475'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </IconButton>
  )
}

//UploadSimple.defaultProps = {}

//UploadSimple.propTypes = {}

export default React.memo(UploadSimple)
