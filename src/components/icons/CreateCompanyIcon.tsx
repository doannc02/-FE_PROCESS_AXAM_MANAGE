import React from 'react'

const CreateCompanyIcon = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <svg
        width='30'
        height='30'
        viewBox='0 0 30 30'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='15' cy='15' r='15' fill='url(#paint0_linear_9114_219766)' />
        <path
          d='M15.8748 20.25V10.1875C15.8748 10.0715 15.8287 9.96019 15.7466 9.87814C15.6646 9.79609 15.5533 9.75 15.4373 9.75H10.1873C10.0712 9.75 9.95994 9.79609 9.8779 9.87814C9.79585 9.96019 9.74976 10.0715 9.74976 10.1875V20.25'
          stroke='white'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M20.2498 20.25V13.6875C20.2498 13.5715 20.2037 13.4602 20.1216 13.3781C20.0396 13.2961 19.9283 13.25 19.8123 13.25H15.8748'
          stroke='white'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M11.4998 11.9375H13.2498'
          stroke='white'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12.3748 16.3125H14.1248'
          stroke='white'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M11.4998 18.5H13.2498'
          stroke='white'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M17.6248 17.625H18.4998'
          stroke='white'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M17.6248 15.4375H18.4998'
          stroke='white'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <defs>
          <linearGradient
            id='paint0_linear_9114_219766'
            x1='1.67486e-07'
            y1='14.6666'
            x2='30'
            y2='14.6666'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#EC6823' />
            <stop offset='1' stopColor='#F58020' />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default React.memo(CreateCompanyIcon)
