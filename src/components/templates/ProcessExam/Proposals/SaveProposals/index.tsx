import PageContainer from '@/components/organism/PageContainer'
import { BLACK } from '@/helper/colors'
import { Grid, Typography } from '@mui/material'
import LoadingPage from '@/components/atoms/LoadingPage'
import { FormProvider } from 'react-hook-form'
import CoreNavbar from '@/components/organism/CoreNavbar'
import { useSaveProposals } from './useSaveProposals'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { MENU_URL } from '@/routes'
import { TopAction } from '@/components/molecules/TopAction'
import CoreInput from '@/components/atoms/CoreInput'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getListUser } from '@/service/auth/getUser'
import { getListCourse } from '@/service/course'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import StateOfAssignment from '@/components/molecules/StateOfAssignment'
import { CoreButton } from '@/components/atoms/CoreButton'

const SaveProposals = () => {
  const [, _] = useSaveProposals()
  async function getData() {
    const url = '/api/hello'
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      const json = await response.json()
      console.log(json)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  const [values, handles] = useSaveProposals()

  const {
    methodForm,
    isLoading,
    isLoadingSubmit,
    router,
    isUpdate,
    actionType,
    isView,
  } = values

  const { onSubmit, t } = handles

  const { watch, control, getValues } = methodForm
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: 'Danh sách phê duyệt',
              pathname: MENU_URL.PROPOSALS_ASSIGNMENT,
            },
            {
              title: (
                <Typography>
                  {isUpdate
                    ? actionType === 'VIEW'
                      ? t('common:detail')
                      : t('common:btn.edit')
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
        <FormProvider {...methodForm}>
          <form onSubmit={onSubmit}>
            <CoreNavbar
              breadcrumbs={[
                {
                  title: `${
                    isUpdate
                      ? actionType === 'VIEW'
                        ? t('common:detail')
                        : t('common:btn.edit')
                      : t('common:btn.add')
                  }`,
                  content: (
                    <>
                      <StateOfAssignment state={watch('status')} />
                      <Grid container className='pt-35' spacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <CoreInput
                            isViewProp={true}
                            control={control}
                            label='Năm học'
                            name='academic_year'
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <CoreAutocomplete
                            control={control}
                            label='Học kỳ'
                            name='semester'
                            options={[
                              { value: 1, label: 'Học kỳ 1' },
                              { value: 2, label: 'Học kỳ 2' },
                              { value: 3, label: 'Học kỳ 3' },
                              { value: 4, label: 'Học kỳ 4' },
                            ]}
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <CoreAutoCompleteAPI
                            placeholder='Chọn người thực hiện'
                            control={control}
                            params={{
                              page: 1,
                              size: 20,
                            }}
                            label='Người thực hiện'
                            name='user'
                            fetchDataFn={getListUser}
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <CoreAutoCompleteAPI
                            placeholder='Chọn người phê duyệt'
                            control={control}
                            labelPath='name'
                            valuePath='id'
                            label='Người phê duyệt'
                            name='instructor'
                            params={{
                              page: 1,
                              size: 20,
                            }}
                            fetchDataFn={getListUser}
                          />
                        </Grid>

                        {watch('user.id') && (
                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreAutoCompleteAPI
                              placeholder='Chọn học phần'
                              control={control}
                              labelPath='name'
                              valuePath='id'
                              label='Học phần cần phê duyệt'
                              name='course'
                              params={{
                                userId: watch('user.id'),
                                page: 1,
                                size: 20,
                              }}
                              fetchDataFn={getListCourse}
                            />
                          </Grid>
                        )}

                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <CoreDatePicker
                            control={control}
                            title='Ngày đề xuất hoàn thành'
                            name='deadline'
                            format='MM-DD-YYYY'
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                        {!isView ? (
                          <div className='space-x-12 text-center my-10'>
                            <CoreButton
                              theme='cancel'
                              onClick={() => {
                                router.back()
                              }}
                            >
                              {t('common:btn.cancel')}
                            </CoreButton>

                            <CoreButton
                              theme='draft'
                              onClick={async () => {
                                
                              }}
                              loading={isLoadingSubmit}
                            >
                              {t('common:btn.draft')}
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
                      </Grid>
                      </Grid>
                    </>
                  ),
                  rightAction: (
                    <TopAction
                      actionList={
                        [
                          ...(isUpdate ? ['delete'] : []),
                          ...(isView ? ['delete', 'edit'] : []),
                          ...(methodForm.watch('status') === 'POSTED'
                            ? []
                            : []),
                        ] as any
                      }
                      onDeleteAction={() => {}}
                      onEditAction={() => {}}
                    />
                  ),
                },
              ]}
              //  tabNumber={tabNumber}
            />
          </form>
        </FormProvider>
      )}
    </PageContainer>
  )
}

export default SaveProposals
