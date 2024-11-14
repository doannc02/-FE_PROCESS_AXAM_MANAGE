import VectorIcon from '@/assets/svg/vectorArrow.svg'
import { BLACK, GREEN_VIU, WHITE } from '@/helper/colors'
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

const CustomState = ({
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
      style={{
        display: 'block',
        position: 'absolute',
        width: '120px',
        top: '55%',
        left: '60%',
        transform: 'translate(-50%, -50%) rotate(40deg)',
      }}
    >
      {listStep.map((v, index) => {
        return (
          <div className='flex relative' style={{ height }} key={index}>
            <div
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
                    backgroundColor: 'green',
                    position: 'relative',
                    color: 'blue',
                    padding: '10px',
                    transform: 'rotate(-45deg)' /* Rotates the div */,
                    width: '200px' /* Adjust width as needed */,
                    height: '50px' /* Adjust height as needed */,
                    textAlign: 'center',
                    //color: step === index ? WHITE : BLACK,
                    clipPath: 'polygon(0 0, 33% 0, 100% 66%, 100% 100%)',
                  }}
                />
              )}

              <Typography
                variant='body1'
                style={{
                  color: color,
                }}
              >
                {v}
              </Typography>

              {index + 1 < listStep.length ? (
                step === index ? (
                  <div />
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

export default CustomState
