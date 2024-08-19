import React from 'react'

const Attentive = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='22'
        height='22'
        viewBox='0 0 22 22'
        fill='none'
      >
        <path
          d='M11 19.25C15.5563 19.25 19.25 15.5563 19.25 11C19.25 6.44365 15.5563 2.75 11 2.75C6.44365 2.75 2.75 6.44365 2.75 11C2.75 15.5563 6.44365 19.25 11 19.25Z'
          fill='#1D4FA3'
          stroke='#1D4FA3'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path d='M10.3125 10.3125H11V15.125H11.6875' fill='white' />
        <path
          d='M10.3125 10.3125H11V15.125H11.6875'
          stroke='white'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M11 8.25C11.5695 8.25 12.0312 7.78829 12.0312 7.21875C12.0312 6.64921 11.5695 6.1875 11 6.1875C10.4305 6.1875 9.96875 6.64921 9.96875 7.21875C9.96875 7.78829 10.4305 8.25 11 8.25Z'
          fill='white'
        />
      </svg>
    </div>
  )
}

export default React.memo(Attentive)
