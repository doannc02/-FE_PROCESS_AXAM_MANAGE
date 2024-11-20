import { WHITE } from '@/helper/colors'
import {
  Stack,
  Table,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import styles from './styles.module.css'

const RegisterPanel = () => {
  const matches = useMediaQuery('(max-width:640px)')
  const { t } = useTranslation('login')
  if (matches) return null

  return (
    <div className={`flex flex-1 ${styles.imageBg} bg-lime-600 w-1/2`}>
      <div className={`w-full p-20 h-full flex-1 ${styles.frameBg}`}>
        <Stack width={'100%'} direction={'row'} justifyContent={'space-around'}>
          <div className='w-[100px] h-[100px]'>
            <Image
              style={{ border: '1px solid', borderRadius: '990px', zIndex: 21 }}
              width={100}
              height={100}
              alt='logoVH'
              src={require('@/assets/jpg/logoVH.jpg')}
            />
          </div>
          <div className='w-2/3 pt-7'>
            <Table className=''>
              <TableHead>
                <TableRow>
                  <Typography
                    className='flex justify-center'
                    variant='h5'
                    style={{
                      color: WHITE,
                      lineHeight: '2.4rem',
                    }}
                  >
                    {t('industrial')}
                  </Typography>
                </TableRow>
                <TableRow className='flex justify-center'>
                  <Typography
                    className='flex justify-center'
                    variant='h6'
                    style={{
                      color: WHITE,
                    }}
                  >
                    {t('department')}
                  </Typography>
                </TableRow>
              </TableHead>
            </Table>
          </div>
        </Stack>

        <div className='flex h-full items-center justify-center px-10 pb-35'>
          <Typography
            style={{
              color: WHITE,
              lineHeight: '2.4rem',
            }}
            variant='body1'
          >
            {t('contentPanel')}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default RegisterPanel
