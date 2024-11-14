import VectorIcon from '@/assets/svg/vectorArrow.svg'
import {
  BLACK,
  GREEN_VIU,
  WHITE,
} from '@/helper/colors'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = {
  listStep?: Array<string>
  index?: number
  enableNextStep?: boolean
  color?: string
  height?: number
}

const CustomStep = ({
  listStep = ['NHÁP', 'ĐANG THỰC HIỆN', 'SẮP HOÀN THÀNH', 'HOÀN THÀNH'],
  index,
  enableNextStep = true,
  color = GREEN_VIU,
  height = 30,
}: Props) => {
  const [step, setStep] = useState(index ?? 0)

  useEffect(() => {
    if (index !== undefined) setStep(index)
  }, [index])

  return (
    <Box
      className='flex'
      sx={{
        opacity: enableNextStep ? 1 : 0.8,
        cursor: enableNextStep ? 'pointer' : 'not-allowed',
      }}
    >
      {listStep.map((v, index) => {
        return (
          <div className='flex relative' style={{ height }} key={index}>
            <div
              className='flex -space-x-0.5'
              style={{
                width: '100%',
              }}
              onClick={() => {
                if (enableNextStep) setStep(index)
              }}
            >
              {step === index && index > 0 && (
                <div
                  style={{
                    height,
                    width: 20,
                    backgroundColor: color,
                    color: 'red',
                    clipPath:
                      'polygon(100% 0, 0 0, 95% 50%, 0 100%, 100% 100%)',
                    // transform: 'translateZ(0)',
                  }}
                />
              )}
              <div
                style={{
                  height,
                  paddingTop: 7,
                  paddingBottom: 5,
                  paddingLeft: 20,
                  paddingRight: 16,
                  width: '100%',
                  backgroundColor: step === index ? color : undefined,
                }}
              >
                <Typography
                  variant='body1'
                  style={{
                    color: step === index ? WHITE : BLACK,
                  }}
                >
                  {v}
                </Typography>
              </div>
              {index + 1 < listStep.length ? (
                step === index ? (
                  <div
                    style={{
                      height,
                      width: 20,
                      backgroundColor: step === index ? color : WHITE,
                      color: 'red',
                      clipPath: 'polygon(100% 50%, 0 0, 0 100%)',
                      // transform: 'skewY(0.001deg)',
                    }}
                  />
                ) : (
                  <Image
                    alt=''
                    src={VectorIcon}
                    height={height}
                    width={20}
                    style={{ position: 'absolute', right: '-17px' }}
                  />
                )
              ) : null}
            </div>
          </div>
        )
      })}
    </Box>
  )
}

export default CustomStep
