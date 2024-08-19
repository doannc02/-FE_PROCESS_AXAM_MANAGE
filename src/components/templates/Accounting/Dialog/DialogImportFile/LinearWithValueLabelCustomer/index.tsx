import Box from '@mui/material/Box'
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import * as React from 'react'

const LinearProgressWithLabel = (
  props: LinearProgressProps & {
    value: number
    onClose: () => void
    fileName: string
  }
) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box>
        <Image src={require('@/assets/svg/xlscIcon.svg')} alt='xlsx' />
      </Box>
      <Box sx={{ width: '100%', mr: 1 }} className='mx-6'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography className='pb-3'>{props.fileName}</Typography>
          <Typography variant='body2' color='text.secondary'>{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress
            sx={{ width: '100%' }}
            variant='determinate'
            {...props}
          />
        </Box>
      </Box>
      <Box onClick={props.onClose}>
        <Image src={require('@/assets/svg/close.svg')} alt='xlsx' />
      </Box>
    </Box>
  )
}

type Props = {
  onClose: () => void
  fileName: string
}

export const LinearWithValueLabel = (props: Props) => {
  const { onClose, fileName } = props
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    if (progress <= 100) {
      let tick = 0
      const timer = setInterval(() => {
        tick = tick + 20
        setProgress((prevProgress) => prevProgress + 20)
        if (tick > 80) {
          clearInterval(timer)
        }
      }, 200)
      return () => {
        clearInterval(timer)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ width: '100%', marginTop: 2, marginBottom: 4 }}>
      <LinearProgressWithLabel
        value={progress}
        onClose={onClose}
        fileName={fileName}
      />
    </Box>
  )
}
