import React from 'react'
import Image from 'next/image'
import { useTooltip } from '@/components/hooks/tooltip'
import { Typography } from '@mui/material'
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
    position: 'absolute', // Sử dụng absolute để hiển thị cạnh icon
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '4px',
    zIndex: 99,
    top: '50%',
    left: '100%',
    transform: 'translateY(-50%) translateX(10px)', // Điều chỉnh vị trí của tooltip
    opacity: tooltipVisible ? 1 : 0,
    transition: 'opacity 0.2s ease-in-out',
    whiteSpace: 'normal',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '10px',
    minWidth: '350px', // Đảm bảo chiều rộng tối đa là 300px
    wordWrap: 'break-word', // Đảm bảo nội dung xuống dòng nếu vượt quá chiều rộng
  }

  const arrowStyles: React.CSSProperties = {
    position: 'absolute',
    content: '',
    width: 0,
    height: 0,
    borderRight: '10px solid white',
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    left: '-10px',
    top: '50%',
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
            <div className='flex items-center w-full' key={index}>
              <Typography
                style={{
                  // Đảm bảo độ dài của dòng chữ bằng với chiều rộng của thẻ background trắng
                  whiteSpace: 'normal',
                  padding: '5px 10px',
                }}
                variant='body2'
              >
                {tooltip.title}
              </Typography>
              <Typography
                style={{
                  width: '100%', // Đảm bảo độ dài của dòng chữ bằng với chiều rộng của thẻ background trắng
                  color: GREY,
                  whiteSpace: 'normal',
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
