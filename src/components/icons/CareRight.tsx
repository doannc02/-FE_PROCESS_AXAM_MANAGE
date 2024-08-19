import React from 'react'

const CareRight = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
      >
        <path
          d='M7.5 3.75L13.75 10L7.5 16.25'
          stroke='#747475'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  )
}

export default React.memo(CareRight)
