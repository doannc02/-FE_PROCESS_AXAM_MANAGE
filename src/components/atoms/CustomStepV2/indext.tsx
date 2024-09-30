import { Typography } from '@mui/material'

type Props = {
  steps?: Array<string>
  currentStep?: number
  handleStepClick?: Function
}

const CustomStepV2 = ({ steps, currentStep, handleStepClick }: Props) => {
  const handleCheckStep = (index: number) => {
    if (handleStepClick) {
      handleStepClick(index)
    }
  }
  return (
    <div className='flex items-center justify-center'>
      {steps &&
        steps.map((label, index) => {
          return (
            <div key={index} className='flex'>
              <div className='flex items-center space-x-4'>
                <div
                  className={`${
                    index === 0 || (currentStep && currentStep >= index)
                      ? 'bg-[#0078D4] text-white'
                      : 'bg-[#747475] text-white'
                  }`}
                  onClick={() => handleCheckStep(index)}
                  style={{
                    fontFamily: 'Roboto',
                    borderRadius: '50%',
                    width: 30,
                    height: 30,
                    padding: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {index + 1}
                </div>
                <Typography
                  variant='body1'
                  className={`${
                    index === 0 || (currentStep && currentStep >= index)
                      ? 'text-[#0078D4]'
                      : 'text-[#747475]'
                  }`}
                >
                  {label}
                </Typography>
              </div>

              <div className='mt-7 mx-4'>
                {index !== steps.length - 1 && (
                  <div className='w-27 border border-gray-300 h-px bg-slate-300 transform translate-y-1/2' />
                )}
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default CustomStepV2
