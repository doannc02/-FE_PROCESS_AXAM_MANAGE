import { memo } from 'react'

const ResetStatusIcon = ({
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
          d='M6.88135 3.89526H8.75635V2.02026'
          stroke='#747475'
          strokeWidth='0.8'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M7.43068 7.43068C6.94994 7.91142 6.33743 8.23881 5.67062 8.37145C5.00381 8.50409 4.31265 8.43601 3.68453 8.17584C3.0564 7.91566 2.51954 7.47507 2.14182 6.90977C1.76411 6.34448 1.5625 5.67987 1.5625 5C1.5625 4.32013 1.76411 3.65552 2.14182 3.09023C2.51954 2.52493 3.0564 2.08434 3.68453 1.82417C4.31265 1.56399 5.00381 1.49592 5.67062 1.62855C6.33743 1.76119 6.94994 2.08858 7.43068 2.56932L8.7565 3.89515'
          stroke='#747475'
          strokeWidth='0.8'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  )
}

export default memo(ResetStatusIcon)
