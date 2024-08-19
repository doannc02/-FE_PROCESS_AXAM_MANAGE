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
      >
        <path
          d='M8 6V9'
          stroke='#FF3B30'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M7.13451 2.49904L1.63599 11.9986C1.54801 12.1506 1.50161 12.3231 1.50147 12.4987C1.50132 12.6743 1.54743 12.8469 1.63516 12.999C1.7229 13.1512 1.84915 13.2776 2.00123 13.3654C2.1533 13.4533 2.32584 13.4995 2.50147 13.4995H13.4985C13.6741 13.4995 13.8467 13.4533 13.9987 13.3654C14.1508 13.2776 14.2771 13.1512 14.3648 12.999C14.4525 12.8469 14.4986 12.6743 14.4985 12.4987C14.4984 12.3231 14.452 12.1506 14.364 11.9986L8.86545 2.49904C8.77761 2.34728 8.65141 2.22129 8.4995 2.1337C8.3476 2.04611 8.17533 2 7.99998 2C7.82463 2 7.65237 2.04611 7.50046 2.1337C7.34855 2.22129 7.22235 2.34728 7.13451 2.49904V2.49904Z'
          stroke='#FF3B30'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M8 12C8.41421 12 8.75 11.6642 8.75 11.25C8.75 10.8358 8.41421 10.5 8 10.5C7.58579 10.5 7.25 10.8358 7.25 11.25C7.25 11.6642 7.58579 12 8 12Z'
          fill='#FF3B30'
        />
      </svg>
    </IconButton>
  )
}

//NewsIcon.defaultProps = {}

//NewsIcon.propTypes = {}

export default React.memo(NewsIcon)
