import PageContainer from '@/components/organism/PageContainer'
import { BLACK } from '@/helper/colors'
import { Collapse, Grid, Typography } from '@mui/material'
import LoadingPage from '@/components/atoms/LoadingPage'
import { Form, FormProvider } from 'react-hook-form'
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
import CustomStep from '@/components/atoms/CustomSteps'
import CustomStepV2 from '@/components/atoms/CustomStepV2/indext'
import { AccordionCustom } from '@/components/atoms/AccordionCustom'

const steps = ['Phân công thực hiện đề cương', 'Đề xuất phê duyệt']

const SaveProposals = () => {
  const [, _] = useSaveProposals()

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
                      {/* <StateOfAssignment state={watch('status')} /> */}
                      <div>
                        <Grid
                          container
                          className=''
                          spacing={{ xs: 1, sm: 2, md: 3 }}
                        >
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
                                { value: 'I', label: 'Học kỳ 1' },
                                { value: 'II', label: 'Học kỳ 2' },
                                { value: 'III', label: 'Học kỳ 3' },
                                { value: 'IV', label: 'Học kỳ 4' },
                              ]}
                              required
                              rules={{
                                required: t('common:validation.required'),
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreAutoCompleteAPI
                              placeholder='Chọn người thực hiện'
                              labelPath2='name'
                              labelPath='fullname'
                              valuePath='id'
                              control={control}
                              params={{
                                exceptId: 1,
                                page: 1,
                                size: 20,
                              }}
                              label='Người thực hiện'
                              name='user'
                              fetchDataFn={getListUser}
                              required
                              rules={{
                                required: t('common:validation.required'),
                              }}
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
                                roleId: 1,
                                page: 1,
                                size: 20,
                              }}
                              fetchDataFn={getListUser}
                              required
                              rules={{
                                required: t('common:validation.required'),
                              }}
                            />
                          </Grid>

                          {watch('user') && watch('instructor') && (
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                              <CoreAutoCompleteAPI
                                placeholder='Chọn học phần'
                                control={control}
                                labelPath='name'
                                valuePath='id'
                                label='Học phần cần phê duyệt'
                                name='course'
                                params={{
                                  userId: watch('user')?.id,
                                  page: 1,
                                  size: 20,
                                }}
                                fetchDataFn={getListCourse}
                                required
                                rules={{
                                  required: t('common:validation.required'),
                                }}
                              />
                            </Grid>
                          )}
                          {watch('course') && (
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                              <CoreInput
                                // InputProps={{
                                //   startAdornment: (
                                //     <div className='w-full'>

                                //     </div>
                                //   ),
                                // }}
                                control={control}
                                type='number'
                                name='number_of_assignment'
                                label='Số lượng đề thực hiện'
                                placeholder='Chọn số lượng đề'
                                required
                                rules={{
                                  required: t('common:validation.required'),
                                  validate: (val: number) => {
                                    if (val > 50) {
                                      return 'Số lượng không hợp lệ'
                                    }
                                  },
                                }}
                              />
                            </Grid>
                          )}

                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreDatePicker
                              control={control}
                              title='Ngày bắt đầu'
                              name='start'
                              format='YYYY-MM-DD'
                              required
                              rules={{
                                required: t('common:validation.required'),
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreDatePicker
                              control={control}
                              title='Ngày đề xuất hoàn thành'
                              name='deadline'
                              format='YYYY-MM-DD'
                              required
                              rules={{
                                required: t('common:validation.required'),
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={12} md={12}></Grid>
                        </Grid>
                      </div>

                      <Typography className='py-5' variant='subtitle1'>
                        Danh sách bộ đề
                      </Typography>

                      <AccordionCustom
                        title={
                          <Typography variant='subtitle2'>Test</Typography>
                        }
                      >
                        Tesst
                      </AccordionCustom>

                      <div>
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
                              onClick={async () => {}}
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
                      </div>
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
