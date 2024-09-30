import React from 'react'
import Image from 'next/image'
import { useTooltip } from '@/components/hooks/tooltip'
import { Typography, Tooltip as TooltipMUI } from '@mui/material'
import { GREY } from '@/helper/colors'

interface TooltipProps {
  tooltips?: Tooltip[]
  showText: boolean
  isShowIcon?: boolean
}
export type Tooltip = {
  title: string
  description?: string
}

export const Tooltip = ({ tooltips, showText, isShowIcon }: TooltipProps) => {
  const { tooltipVisible, showTooltip, hideTooltip } = useTooltip()

  const styles: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
  }

  const tooltipStyles: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: 'white',
    padding: '5px',
    borderRadius: '4px',
    zIndex: 99,
    top: `${showText ? '20%' : '500%'}`,
    left: `${showText ? 'calc(60%)' : 'auto'}`,
    right: `${showText ? 'auto' : 'calc(100% + 10px)'}`,
    transform: 'translateY(-50%)',
    opacity: tooltipVisible ? 1 : 0,
    transition: 'opacity 0.2s ease-in-out',
    whiteSpace: 'nowrap',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '10px',
    width: `${showText ? '200px' : '600px'}`,
  }
  const arrowStyles: React.CSSProperties = {
    position: 'absolute',
    content: '',
    width: 0,
    height: 0,
    borderRight: `${showText ? '10px solid white' : ''}`,
    borderLeft: `${showText ? '' : '10px solid white'}`,
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    top: `${showText ? '50%' : '34%'}`,
    left: `${showText ? '-8px' : ''}`,
    right: `${showText ? '' : '-8px'}`,
    transform: 'translateY(-50%)',
  }
  return (
    <div
      style={styles}
      onMouseEnter={() => showTooltip()}
      onMouseLeave={() => hideTooltip()}
    >
      {!showText ? (
        <Image
          src={require('@/assets/svg/question.svg')}
          height={12}
          width={12}
          alt='question'
        />
      ) : isShowIcon ? (
        <Image alt='' src={require('@/assets/svg/tooltipIcon.svg')} />
      ) : (
        <p className='text-[#00CC6A] font-normal text-xs italic pl-2 cursor-pointer translate-y-[-13px]'>
          Xem thêm
        </p>
      )}

      {tooltipVisible && (
        <div style={tooltipStyles}>
          {tooltips?.map((tooltip: Tooltip, index) => (
            <div className='flex items-center' key={index}>
              <Typography
                style={{
                  width: '25%',
                  whiteSpace: `${showText ? 'nowrap' : 'normal'}`,
                  padding: '5px 10px',
                }}
                variant='body2'
              >
                {tooltip.title}
              </Typography>
              <Typography
                style={{
                  width: '75%',
                  color: GREY,
                  whiteSpace: `${showText ? 'nowrap' : 'normal'}`,
                }}
                variant='body2'
              >
                {tooltip.description}
              </Typography>
            </div>
          ))}
          <div style={arrowStyles}></div>
        </div>
      )}
    </div>
  )
}
