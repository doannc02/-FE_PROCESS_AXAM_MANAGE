import React from 'react'

const JoinCompanyIcon = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <svg
        width='30'
        height='30'
        viewBox='0 0 30 30'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='15' cy='15' r='15' fill='url(#paint0_linear_9114_219775)' />
        <path
          d='M19.813 11.9375H10.188C9.94636 11.9375 9.75049 12.1334 9.75049 12.375V19.375C9.75049 19.6166 9.94636 19.8125 10.188 19.8125H19.813C20.0546 19.8125 20.2505 19.6166 20.2505 19.375V12.375C20.2505 12.1334 20.0546 11.9375 19.813 11.9375Z'
          stroke='white'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M17.1875 19.8125V11.0625C17.1875 10.8304 17.0953 10.6079 16.9312 10.4438C16.7671 10.2797 16.5446 10.1875 16.3125 10.1875H13.6875C13.4554 10.1875 13.2329 10.2797 13.0688 10.4438C12.9047 10.6079 12.8125 10.8304 12.8125 11.0625V19.8125'
          stroke='white'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <defs>
          <linearGradient
            id='paint0_linear_9114_219775'
            x1='2.54521e-07'
            y1='5.16483'
            x2='31.3228'
            y2='7.87006'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#1D4FA3' />
            <stop offset='1' stopColor='#2B62AE' />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default React.memo(JoinCompanyIcon)
