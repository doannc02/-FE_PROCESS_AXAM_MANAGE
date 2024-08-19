/* eslint-disable no-unused-vars */

import CoreInput from '@/components/atoms/CoreInput'
import LockKey from '@/components/icons/LockKey'
import { WHITE } from '@/helper/colors'
import { REGEX } from '@/helper/regex'
import CloseIcon from '@mui/icons-material/Close'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Dialog,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const ForgotPasswordForm = (props: any) => {
  const { open, handleClose, onSubmit } = props
  const { t } = useTranslation('common')

  const methodForm = useForm({
    defaultValues: {
      username: '',
    },
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methodForm

  const onSubmitForm = handleSubmit((val, e: any) => {
    e.preventDefault()
    e.stopPropagation()
    onSubmit(val)
  })

  useEffect(() => {
    reset()
  }, [reset, open])

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {handleClose ? (
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <form onSubmit={onSubmitForm}>
        <Box className='w-225 h-275 flex-col flex justify-center items-center'>
          <LockKey />
          <DialogTitle>{t('forgotpassword.label')}</DialogTitle>
          <DialogContentText className='w-181 h-40 left-23 top-139 text-base text-center '>
            {t('forgotpassword.text')}
          </DialogContentText>
          <CoreInput
            control={control}
            className='w-150'
            name='username'
            placeholder=''
            rules={{
              required: t('common:validation.required'),
              validate: {
                isEmailorPhone: (v: any) =>
                  REGEX.EMAIL.test(v) ||
                  REGEX.NUMBER.test(v) ||
                  t('validation.emailPhoneInvalid'),
              },
            }}
          />
          <Box>
            <LoadingButton
                 type='submit'
              loading={isSubmitting}
              className='w-150 h-30 mt-20'
              style={{ borderRadius: 80, marginTop: 40 }}
              disableElevation
            >
              <Typography
                variant='subtitle1'
                style={{
                  color: WHITE,
                }}
              >
                {t('forgotpassword.recovery').toUpperCase()}
              </Typography>
            </LoadingButton>
          </Box>
        </Box>
      </form>
    </Dialog>
  )
}

export default ForgotPasswordForm
