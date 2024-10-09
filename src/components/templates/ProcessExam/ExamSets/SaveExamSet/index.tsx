import PageContainer from '@/components/organism/PageContainer'
import { BLACK } from '@/helper/colors'
import { Collapse, Grid, Typography } from '@mui/material'
import LoadingPage from '@/components/atoms/LoadingPage'
import { Form, FormProvider } from 'react-hook-form'
import CoreNavbar from '@/components/organism/CoreNavbar'
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
import { useSaveExamSet } from './useSaveExamSet'
import CollapseExams from './Components/CollapseExams'
import { getMajorList } from '@/service/major'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'

const steps = ['Phân công thực hiện đề cương', 'Đề xuất phê duyệt']

const SaveExamSet = () => {
  const [values, handles] = useSaveExamSet()

  const {
    id,
    nameExamSet,
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
              title: 'Danh sách bộ đề',
              pathname: MENU_URL.EXAM_SET,
            },
            {
              title: (
                <Typography>
                  {isUpdate
                    ? actionType === 'VIEW'
                      ? nameExamSet
                      : nameExamSet
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
                      <div className='mt-20'>
                        <Grid
                          container
                          className=''
                          spacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreInput
                              isViewProp={isUpdate}
                              control={control}
                              label='Tên bộ đề'
                              name='name'
                            />
                          </Grid>

                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreInput
                              control={control}
                              label='Khoa'
                              name='department'
                            />
                          </Grid>

                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreAutoCompleteAPI
                              params={{
                                page: 1,
                                size: 20,
                              }}
                              fetchDataFn={getMajorList}
                              control={control}
                              label='Chuyên ngành'
                              placeholder='Chọn chuyên ngành'
                              name='major'
                            />
                          </Grid>

                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreInput
                              control={control}
                              type='number'
                              required
                              rules={{
                                required: t('common:validation.required'),
                              }}
                              label='Số lượng đề phải hoàn thành'
                              name='exam_quantity'
                            />
                          </Grid>

                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreAutoCompleteAPI
                              placeholder='Chọn người thực hiện'
                              labelPath2='fullname'
                              labelPath='name'
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

                          {/* <Grid item xs={12} sm={12} md={4} lg={4}>
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
                          </Grid> */}

                          {watch('user')?.id && (
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                              <CoreAutoCompleteAPI
                                placeholder='Chọn học phần'
                                control={control}
                                labelPath2='code'
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
                        </Grid>
                      </div>
                      <CoreCheckbox
                        control={control}
                        label='Tạo bộ đề kèm theo đề chi tiết'
                        name='isCreateExam'
                      />
                      {watch('isCreateExam') && (
                        <>
                          <Typography className='py-5' variant='subtitle1'>
                            Danh sách bộ đề
                          </Typography>
                          <CollapseExams />
                        </>
                      )}
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
                              Lưu đang thực hiện
                            </CoreButton>

                            <CoreButton
                              theme='submit'
                              type='submit'
                              loading={isLoadingSubmit}
                            >
                              Lưu và yêu cầu duyệt
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
                          ...(methodForm.watch('status') === 'approved'
                            ? []
                            : []),
                        ] as any
                      }
                      onDeleteAction={() => {}}
                      onEditAction={() => {
                        router.push({
                          pathname: `${MENU_URL.EXAM_SET}/[id]`,
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
        </FormProvider>
      )}
    </PageContainer>
  )
}

export default SaveExamSet
