import React from 'react'

const Line = ({
  className,
  color = '#1D4FA3',
}: {
  className?: string
  color?: string
}) => {
  return (
    <div className={className}>
      <svg
        width='20'
        height='2'
        viewBox='0 0 20 2'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect width='20' height='2' fill={color} />
      </svg>
    </div>
  )
}

export default React.memo(Line)
