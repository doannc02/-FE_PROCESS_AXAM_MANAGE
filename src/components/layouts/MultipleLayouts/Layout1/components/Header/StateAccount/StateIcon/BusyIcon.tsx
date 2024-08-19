import { memo } from 'react'

const BusyIcon = ({
  className,
  onClick,
}: {
  className?: string
  onClick?: any
}) => {
  return (
    <div className={className}>
      <svg
        width='10'
        height='10'
        viewBox='0 0 10 10'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M5 9.05C7.23675 9.05 9.05 7.23675 9.05 5C9.05 2.76325 7.23675 0.95 5 0.95C2.76325 0.95 0.95 2.76325 0.95 5C0.95 7.23675 2.76325 9.05 5 9.05Z'
          fill='#FF4956'
          stroke='#FF4956'
          strokeWidth='0.6'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  )
}

export default memo(BusyIcon)
