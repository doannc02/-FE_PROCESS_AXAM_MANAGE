import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import LoadingPage from '@/components/atoms/LoadingPage'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import useSaveMajor from './useSaveMajor'
import DialogDeleteMajor from '../DialogDeletemMajor'
import CoreInput from '@/components/atoms/CoreInput'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getDepartment } from '@/service/department'

const SaveMajor = () => {
  const [values, handles] = useSaveMajor()
  const {
    isLoading,
    isLoadingSubmit,
    methodForm,
    isUpdate,
    isView,
    id,
    router,
  } = values
  const { onSubmit, t, showDialog } = handles

  const { control } = methodForm
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: 'Danh sách học phần',
              pathname: MENU_URL.MAJOR,
            },
            {
              title: (
                <Typography>
                  {isUpdate
                    ? isView
                      ? 'Chi tiết chuyên ngành'
                      : 'Chỉnh sửa chuyên ngành'
                    : t('common:btn.add')}
                </Typography>
              ),
            },
          ]}
        />
      }
    >
      {isLoading ? (
        <LoadingPage />
      ) : (
        <form onSubmit={onSubmit}>
          <CoreNavbar
            breadcrumbs={[
              {
                title: `${
                  isUpdate
                    ? isView
                      ? t('common:detail')
                      : t('common:btn.edit')
                    : t('common:btn.add')
                } `,
                content: (
                  <>
                    <div className='mt-30'>
                      <Grid
                        container
                        className=''
                        spacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <CoreInput
                            control={control}
                            label='Tên chuyên ngành'
                            name='name'
                            required
                            rules={{
                              required: t('common:validation.required'),
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <CoreAutoCompleteAPI
                            params={{
                              page: 1,
                              size: 20,
                            }}
                            control={control}
                            label='Trực thuộc khoa'
                            placeholder='Chọn khoa'
                            name='department'
                            fetchDataFn={getDepartment}
                            required
                            rules={{
                              required: t('common:validation.required'),
                            }}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <div>
                      {!isView ? (
                        <div className='space-x-12 text-center my-10'>
                          <CoreButton
                            theme='cancel'
                            onClick={() => {
                              router.push(MENU_URL.MAJOR)
                            }}
                          >
                            {t('common:btn.cancel')}
                          </CoreButton>
                          <CoreButton
                            theme='submit'
                            type='submit'
                            loading={isLoadingSubmit}
                          >
                            {isUpdate
                              ? t('common:btn.edit')
                              : t('common:btn.add')}
                          </CoreButton>
                        </div>
                      ) : null}
                    </div>
                  </>
                ),
                rightAction: (
                  <TopAction
                    actionList={
                      [
                        ...(isUpdate ? ['delete'] : []),
                        ...(isView ? ['delete', 'edit'] : []),
                      ] as any
                    }
                    onDeleteAction={() => {
                      showDialog(
                        <DialogDeleteMajor
                          nameMajor={methodForm.watch('name')}
                          id={Number(id)}
                        />
                      )
                    }}
                    onEditAction={() => {
                      router.push({
                        pathname: `${MENU_URL.MAJOR}/[id]`,
                        query: {
                          id: Number(id),
                        },
                      })
                    }}
                  />
                ),
              },
            ]}
            //  tabNumber={tabNumber}
          />
        </form>
      )}
    </PageContainer>
  )
}

export default SaveMajor
