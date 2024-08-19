import { Link, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const TimeCounter = ({ onGetOTP }: { onGetOTP: any }) => {
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(30)

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval)
        } else {
          setSeconds(59)
          setMinutes(minutes - 1)
        }
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds])

  return (
    <div className='flex flex-col gap-3 mt-10'>
      <div className='flex justify-center'>
        <Typography variant='body1'>
          Bạn chưa nhận được mã?&nbsp;
          <Link
            style={{
              textDecoration: 'none',
              fontWeight: 450,
              cursor:
                minutes === 0 && seconds === 0 ? 'pointer' : 'not-allowed',
            }}
            color='primary'
            onClick={() => {
              if (minutes === 0 && seconds === 0) {
                onGetOTP()
                setMinutes(1)
                setSeconds(30)
              }
            }}
          >
            Gửi lại mã.
          </Link>
        </Typography>
      </div>
      <div className='flex justify-center'>
        <Typography variant='body1'>
          Vui lòng chờ {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}s để gửi lại.
        </Typography>
      </div>
    </div>
  )
}

export default TimeCounter
