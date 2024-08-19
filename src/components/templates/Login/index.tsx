import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import LanguageButton from '@/components/templates/Login/components/LanguageButton'
import { WHITE } from '@/helper/colors'
import RegisterPanel from '@/components/organism/RegisterPanel'
import { useFormCustom } from '@/lib/form'
import { Box, ButtonBase, Link, Typography } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ChangePasswordForm from './components/ChangePasswordForm'
import ForgotPasswordForm from './components/ForgotPasswordForm'
import useChangePassword from './hooks/useChangePassword'
import { useLogin } from './useLogin'

const Login = () => {
  const { t } = useTranslation()

  const [userName, setUserName] = useState<any>()
  const [forgotStep, setForgotStep] = useState(0)
  const { getOtp, otp, handleChangePassword } = useChangePassword()

  const formContext = useFormCustom<any>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const { handleSubmit, control } = formContext
  const { loading, loginAccount } = useLogin()

  return (
    <Box className='flex h-screen w-screen items-center justify-center bg-[#E5E5E5]'>
      <Box className='absolute bottom-5 right-10'>
        <Typography variant='body1'>{t('common:footer.label')}</Typography>
      </Box>
      <Box
        className='flex flex-row items-stretch flex-1 relative'
        style={{ maxWidth: 1000, height: 720 }}
      >
        <RegisterPanel />

        <Box
          className='relative flex flex-col flex-1 bg-[#FFFFFF] w-1/2'
          sx={{
            borderTopRightRadius: '6px',
            borderBottomRightRadius: '6px',
          }}
        >
          <Box className='absolute top-10 right-10'>
            <LanguageButton />
          </Box>

          <Box className='absolute bottom-[-25px] transform translate-x-1/2'>
            <Typography>
              Bạn chưa có tài khoản? <Link href='/register'>Đăng ký</Link>
            </Typography>
          </Box>

          <form
            onSubmit={handleSubmit(loginAccount)}
            className='flex flex-col w-full h-full p-25 justify-between'
          >
            <Box className='flex flex-col'>
              <Typography variant='h5' style={{ marginTop: 40 }}>
                Chào mừng đến với Apodio
              </Typography>

              <CoreInput
                control={control}
                className='mt-20'
                name='username'
                label={t('mail.label')}
                placeholder={t('mail.placeholder')}
                rules={{ required: t('rules.required') }}
              />
              <CoreInput
                control={control}
                className='mt-15'
                name='password'
                label={t('password.label')}
                type='password'
                placeholder={t('password.placeholder')}
                rules={{
                  required: t('common:validation.required'),
                }}
              />

              <Box className='flex justify-end mt-6'>
                <ButtonBase onClick={() => setForgotStep(1)}>
                  {t('forgetPassword')}
                </ButtonBase>
              </Box>

              <Box className='flex justify-center w-full'>
                <CoreButton
                  style={{
                    borderRadius: 6,
                    marginTop: 30,
                    width: '100%',
                  }}
                  theme='submit'
                  type='submit'
                  loading={loading}
                >
                  Đăng nhập
                </CoreButton>
              </Box>
            </Box>

            <Box className='flex flex-col gap-10'>
              <div className='flex items-center'>
                <div className='flex-grow bg bg-gray-300 h-0.5'></div>
                <div className='flex-grow-0 mx-5 text dark:text-white'>
                  <Typography>Hoặc</Typography>
                </div>
                <div className='flex-grow bg bg-gray-300 h-0.5'></div>
              </div>

              <CoreButton
                theme='submit'
               
                style={{
                  borderRadius: 6,
                  width: '100%',
                  color: '#747475',
                  backgroundColor: WHITE,
                  borderColor: '#DFE0EB',
                }}
                startIcon={
                  <Image
                    src={require('@/assets/svg/google.svg')}
                    width={21}
                    height={20}
                    alt=''
                  />
                }
              >
                Đăng nhập bằng tài khoản Google
              </CoreButton>

              <CoreButton
                theme='submit'
               
                //loading={loading}
                style={{
                  borderRadius: 6,
                  width: '100%',
                  color: '#747475',
                  backgroundColor: WHITE,
                  borderColor: '#DFE0EB',
                }}
                startIcon={
                  <Image
                    src={require('@/assets/svg/apple.svg')}
                    width={27}
                    height={26}
                    alt=''
                  />
                }
              >
                Đăng nhập bằng tài khoản Apple
              </CoreButton>
            </Box>
          </form>
        </Box>
      </Box>

      <ForgotPasswordForm
        open={forgotStep === 1}
        handleClose={() => setForgotStep(0)}
        onSubmit={async (val: any) => {
          const res = await getOtp(val.username)
          if (res) {
            setForgotStep(2)
            setUserName(val)
          }
        }}
      />
      <ChangePasswordForm
        open={forgotStep === 2}
        handleClose={() => setForgotStep(0)}
        onSubmit={async (val: any) => {
          const res = await handleChangePassword({
            otp: val.otp,
            newPassword: val.password,
          })
          if (res) {
            setForgotStep(0)
          }
        }}
        handleResent={() => getOtp(userName.username)}
        otp={otp}
      />
    </Box>
  )
}

export default Login
