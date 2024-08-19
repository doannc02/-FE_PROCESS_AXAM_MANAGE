import { useAppSelector } from '@/redux/hook'
import React from 'react'
import { RED } from '@/helper/colors'

const Cancel = ({ className }: { className?: string }) => {
  const themeColor = useAppSelector((state) => state.themeColorData)

  const color = themeColor.errorColor ?? RED
  return (
    <div className={className}>
      <svg
        width='30'
        height='30'
        viewBox='0 0 45 45'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M22.5 39.375C31.8198 39.375 39.375 31.8198 39.375 22.5C39.375 13.1802 31.8198 5.625 22.5 5.625C13.1802 5.625 5.625 13.1802 5.625 22.5C5.625 31.8198 13.1802 39.375 22.5 39.375Z'
          stroke={color}
          strokeWidth='2'
          strokeMiterlimit='10'
        />
        <path
          d='M28.125 16.875L16.875 28.125'
          stroke={color}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M28.125 28.125L16.875 16.875'
          stroke={color}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  )
}

export default React.memo(Cancel)
