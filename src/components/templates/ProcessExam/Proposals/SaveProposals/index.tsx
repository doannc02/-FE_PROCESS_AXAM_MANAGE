import PageContainer from '@/components/organism/PageContainer'
import { BLACK, GREEN, ORANGE, RED } from '@/helper/colors'
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
import DisplayStatus from '@/components/molecules/DisplayStatus'
import { TableExams } from '@/components/organism/TableExams'
import DetailExamSet from './Components/DetailExamSet'

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
    isAddNew,
    role,
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
                      <div>
                        <Grid
                          container
                          className=''
                          spacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreInput
                              control={control}
                              name='plan_code'
                              label='Mã kế hoạch'
                              isViewProp={isUpdate}
                              required
                              rules={{
                                required: t('common:validation.required'),
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreInput
                              isViewProp={true}
                              control={control}
                              label='Năm học'
                              name='academic_year.name'
                              InputProps={{
                                endAdornment: (
                                  <CoreAutocomplete
                                    control={control}
                                    className='w-full'
                                    placeholder='Chọn học kỳ'
                                    // label='Học kỳ'
                                    name='semester'
                                    options={[
                                      { value: '1', label: 'Học kỳ 1' },
                                      { value: '2', label: 'Học kỳ 2' },
                                      { value: '3', label: 'Học kỳ 3' },
                                      { value: '4', label: 'Học kỳ 4' },
                                    ]}
                                    required
                                    rules={{
                                      required: t('common:validation.required'),
                                    }}
                                  />
                                ),
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreAutoCompleteAPI
                              placeholder='Chọn người thực hiện'
                              // labelPath2='fullname'
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

                          {role !== 'Admin' && (
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
                          )}

                          {watch('user') && watch('instructor') && (
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                              <CoreAutoCompleteAPI
                                placeholder='Chọn học phần'
                                control={control}
                                labelPath2='code'
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

                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreDatePicker
                              control={control}
                              title='Ngày bắt đầu'
                              name='start_date'
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
                              name='end_date'
                              format='YYYY-MM-DD'
                              required
                              rules={{
                                required: t('common:validation.required'),
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={12} md={12}>
                            <CoreInput
                              className='mt-5'
                              control={control}
                              name='content'
                              label='Nội dung kế hoạch'
                              multiline
                              required
                              rules={{
                                required: t('common:validation.required'),
                              }}
                            />
                          </Grid>
                        </Grid>
                      </div>

                      {!isAddNew
                        ? (watch('exam_sets') ?? []).length > 0 && (
                            <>
                              <Typography className='py-5' variant='subtitle1'>
                                Danh sách bộ đề
                              </Typography>

                              <FormProvider {...methodForm}>
                                {watch('exam_sets').map((item, index) => {
                                  return (
                                    <>
                                      <AccordionCustom
                                        title={
                                          <Grid container>
                                            <Grid
                                              item
                                              xs={12}
                                              sm={12}
                                              md={4}
                                              lg={4}
                                            >
                                              <Typography fontWeight={'600'}>
                                                Tên bộ đề: {item?.exam_set_name}
                                              </Typography>
                                            </Grid>

                                            <Grid
                                              item
                                              xs={12}
                                              sm={12}
                                              md={4}
                                              lg={4}
                                            >
                                              <Typography fontWeight={'600'}>
                                                Số đề thực hiện/số đề yêu cầu:
                                                &nbsp;{' '}
                                                {item?.exams?.length ?? 0}/
                                                {item?.exam_quantity}
                                              </Typography>
                                            </Grid>

                                            <Grid
                                              item
                                              xs={12}
                                              sm={12}
                                              md={4}
                                              lg={4}
                                            >
                                              <DisplayStatus
                                                text={
                                                  item?.status ===
                                                  'pending_approval'
                                                    ? 'Chờ phê duyệt'
                                                    : item?.status ===
                                                      'in_progress'
                                                    ? 'Đang thực hiện'
                                                    : item?.status ===
                                                      'approved'
                                                    ? 'Đã phê duyệt'
                                                    : 'Bị từ chối'
                                                }
                                                color={
                                                  item?.status ===
                                                  'pending_approval'
                                                    ? ORANGE
                                                    : item?.status ===
                                                      'in_progress'
                                                    ? BLACK
                                                    : item?.status ===
                                                      'approved'
                                                    ? GREEN
                                                    : RED
                                                }
                                              />
                                            </Grid>
                                          </Grid>
                                        }
                                      >
                                        <DetailExamSet
                                          indexExamSet={index}
                                          item={item}
                                        />
                                      </AccordionCustom>
                                    </>
                                  )
                                })}
                              </FormProvider>
                            </>
                          )
                        : null}

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
                          ...(methodForm.watch('status') === 'approved'
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
