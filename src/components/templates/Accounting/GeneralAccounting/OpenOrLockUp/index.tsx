import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { MENU_URL } from '@/routes'
import { Grid, IconButton, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import useOpenOrLockUp from './useOpenOrLockUp'
import Image from 'next/image'

const OpenOrLockUpBook = () => {
  const { t } = useTranslation('accounting/decrease-tools')

  const [values, handles] = useOpenOrLockUp()

  const {
    id,
    isView,
    actionType,
    methodForm,
    checkStatusType,
    isLoadingSubmit,
  } = values

  const { onSubmit } = handles
  const { control, watch } = methodForm

  const { showDialog } = useDialog()

  const router = useRouter()

  return (
    <PageWithDetail
      title={
        <div className='flex justify-between items-center'>
          <div className='flex'>
            <CoreBreadcrumbs
              isShowDashboard
              breadcrumbs={[
                {
                  title: (
                    <Typography>
                      {checkStatusType === 'BLOCK'
                        ? 'Khóa sổ kế toán'
                        : 'Mở sổ kế toán'}
                    </Typography>
                  ),
                },
              ]}
            />
          </div>
        </div>
      }
      topAction={
        <div className='bg-white flex justify-end w-full items-center'>
          {!!id && actionType === 'VIEW' ? (
            <div
              className='flex items-center cursor-pointer'
              onClick={() => {
                const pathname =
                  checkStatusType !== 'OPEN'
                    ? `${MENU_URL.GENERAL_ACC.OPEN_BOOK}`
                    : MENU_URL.GENERAL_ACC.LOCKUP_BOOK
                router.replace({
                  pathname: pathname,
                  query: {
                    id: watch('body.id'),
                  },
                })
              }}
            >
              <IconButton>
                <Image
                  src={require('@/assets/svg/action/edit.svg')}
                  alt='lockUp'
                  width={16}
                  height={16}
                />
              </IconButton>
              <Typography variant='body2'>
                {checkStatusType === 'BLOCK'
                  ? 'Mở sổ kế toán'
                  : 'Khóa Sổ kế toán'}
              </Typography>
            </div>
          ) : (
            <div
              className='flex items-center cursor-pointer'
              onClick={() => {
                const pathname =
                  checkStatusType !== 'OPEN'
                    ? `${MENU_URL.GENERAL_ACC.OPEN_BOOK}`
                    : MENU_URL.GENERAL_ACC.LOCKUP_BOOK
                router.replace({
                  pathname: pathname,
                  query: {
                    id: watch('body.id'),
                  },
                })
              }}
            >
              <IconButton>
                <Image
                  src={require('@/assets/svg/action/edit.svg')}
                  alt='lockUp'
                  width={16}
                  height={16}
                />
              </IconButton>
              <Typography variant='body2'>
                {checkStatusType === 'BLOCK'
                  ? 'Mở sổ kế toán'
                  : 'Khóa Sổ kế toán'}
              </Typography>
            </div>
          )}
        </div>
      }
    >
      <div className='w-full flex flex-col'>
        <form className='bg-[#ffffff] ' onSubmit={onSubmit}>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginBottom: '15px',
              }}
            >
              <CoreDatePicker
                control={control}
                name='body.actualClosingDate'
                title='Ngày khóa sổ thực tế'
                placeholder='Chọn ngày khóa sổ thực tế'
                format='YYYY-MM-DD'
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginBottom: '15px',
              }}
            >
              <CoreDatePicker
                control={control}
                name='body.newClosingDate'
                title='Ngày khóa sổ mới'
                placeholder='Chọn ngày khóa sổ mới'
                format='YYYY-MM-DD'
                // required
                // rules={{
                //   required: t('common:validation.required'),
                // }}
              />
            </Grid>
          </Grid>

          {isView && (
            <div className='space-x-12 text-center my-10'>
              <CoreButton
                theme='submit'
                type='submit'
                loading={isLoadingSubmit}
              >
                {checkStatusType !== 'BLOCK'
                  ? 'Mở sổ kế toán'
                  : 'Khóa Sổ kế toán'}
              </CoreButton>
            </div>
          )}
        </form>
      </div>
    </PageWithDetail>
  )
}

export default OpenOrLockUpBook
