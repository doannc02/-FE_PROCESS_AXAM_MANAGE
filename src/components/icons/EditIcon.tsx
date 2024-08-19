import { ExtendButtonBase, IconButton, IconButtonTypeMap } from '@mui/material'
import React from 'react'

const ViewIcon = (props: any) => {
  const { stroke } = props

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
          d='M8 10H6V8L12 2L14 4L8 10Z'
          stroke={stroke ?? '#3F91FF'}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M10.5 3.5L12.5 5.5'
          stroke={stroke ?? '#3F91FF'}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M13.5 7.5V13C13.5 13.1326 13.4473 13.2598 13.3536 13.3536C13.2598 13.4473 13.1326 13.5 13 13.5H3C2.86739 13.5 2.74021 13.4473 2.64645 13.3536C2.55268 13.2598 2.5 13.1326 2.5 13V3C2.5 2.86739 2.55268 2.74021 2.64645 2.64645C2.74021 2.55268 2.86739 2.5 3 2.5H8.5'
          stroke={stroke ?? '#3F91FF'}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </IconButton>
  )
}

//ViewIcon.defaultProps = {}

//ViewIcon.propTypes = {}

export default React.memo(ViewIcon)
