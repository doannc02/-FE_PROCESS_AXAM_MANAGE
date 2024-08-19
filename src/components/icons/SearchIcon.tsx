import { ExtendButtonBase, IconButton, IconButtonTypeMap } from '@mui/material'
import React from 'react'

const SearchIcon = (
  props: ExtendButtonBase<IconButtonTypeMap<{}, 'button'>>
) => {
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
          d='M9.0625 15.625C12.6869 15.625 15.625 12.6869 15.625 9.0625C15.625 5.43813 12.6869 2.5 9.0625 2.5C5.43813 2.5 2.5 5.43813 2.5 9.0625C2.5 12.6869 5.43813 15.625 9.0625 15.625Z'
          stroke='#747475'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M13.7026 13.7031L17.4996 17.5'
          stroke='#747475'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </IconButton>
  )
}

//SearchIcon.defaultProps = {}

//SearchIcon.propTypes = {}

export default React.memo(SearchIcon)
