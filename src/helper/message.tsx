import Cancel from '@/components/icons/Cancel'
import { GRAY_SCALE, GREEN_VIU } from '@/helper/colors'
import { ErrorCodes } from '@/service/type'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Divider, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { toast } from 'react-toastify'

interface MessageProps {
  title?: string
  message: string
}

export const successMsg = (msg: string) => {
  if (msg)
    toast(<SuccessMessage message={msg} />, {
      closeButton: () => (
        <div className='px-12 my-auto border-l'>
          <CloseOutlinedIcon fontSize='small' />
        </div>
      ),
      className: 'vds-toast__success',
    })
}

export const errorMsg = (error: any, setError?: any) => {

  if (Array.isArray(error) && error.length > 0) {
    errorMsg(error[0].message)
    error.map((item) => {
      if (item && setError) {
        console.log(item.field)
        setError(item.field, {
          type: 'be',
          message: item.message,
        })
      }
    })
  } else if (typeof error === 'string') {
    toast(<ErrorMessage message={error} />, {
      closeButton: () => (
        <div className='px-12 my-auto border-l'>
          <CloseOutlinedIcon fontSize='small' />
        </div>
      ),
      className: 'vds-toast__error',
    })
  } else
    toast(<ErrorMessage message='Có lỗi xảy ra' />, {
      className: 'vds-toast__error',
    })
}

const ErrorMessage = (props: MessageProps) => {
  const { message, title } = props
  const { t } = useTranslation('common')
  return (
    <div className='flex items-center'>
      <Cancel />
      <div className='px-6 vds-toast__msg' style={{ color: '#242424' }}>
        <Typography variant='subtitle2' className='mb-3'>
          {title ?? t('message.fail')}
        </Typography>
        <Typography variant='body2' style={{ color: '#747475' }}>
          {message}
        </Typography>
      </div>
      <Divider
        orientation='horizontal'
        color={GRAY_SCALE}
        style={{ width: 1 }}
      />
    </div>
  )
}

export const SuccessMessage = (props: MessageProps) => {
  const { message, title } = props
  const { t } = useTranslation('common')
  return (
    <div className='flex items-center'>
      <CheckCircleOutlinedIcon
        style={{ height: 30, width: 30 }}
        color='primary'
      />
      <div className='px-12 vds-toast__msg' style={{ color: '#242424' }}>
        {/* <Typography variant='subtitle2' className='mb-3'>
          {title ?? t('message.success')}
        </Typography> */}
        <Typography variant='subtitle2' className='mb-3'>
          {message}
        </Typography>
      </div>
    </div>
  )
}
