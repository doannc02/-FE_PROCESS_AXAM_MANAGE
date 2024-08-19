import { memo } from 'react'

const AvailableIcon = ({
  className,
  onClick,
}: {
  className?: string
  onClick?: any
}) => {
  return (
    <div className={className} onClick={onClick}>
      <svg
        width='10'
        height='10'
        viewBox='0 0 10 10'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M5 9.05C7.23675 9.05 9.05 7.23675 9.05 5C9.05 2.76325 7.23675 0.95 5 0.95C2.76325 0.95 0.95 2.76325 0.95 5C0.95 7.23675 2.76325 9.05 5 9.05Z'
          fill='#00CC6A'
          stroke='white'
          strokeWidth='0.6'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M6.71875 4.0625L4.42707 6.25L3.28125 5.15625'
          stroke='white'
          strokeWidth='0.6'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  )
}

export default memo(AvailableIcon)
