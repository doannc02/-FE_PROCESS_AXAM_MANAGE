import PageContainer from '@/components/organism/PageContainer'
import { BLACK, GREEN, ORANGE, RED } from '@/helper/colors'
import { Collapse, Grid, IconButton, Typography } from '@mui/material'
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
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import { getExamList } from '@/service/exam'
import { getExamSetList } from '@/service/examSet'
import { useState } from 'react'
import { getAcademicYears } from '@/service/academicYear'
import { ExamSet } from '@/service/examSet/type'
import DialogCfAddExamSet from '../Dialogs/DialogConfirmAddExamSet'
import { WarningText } from '@/components/atoms/WarningText'

const SaveProposals = () => {
  const [, _] = useSaveProposals()

  const [values, handles] = useSaveProposals()

  const {
    id,
    methodForm,
    isLoading,
    isLoadingSubmit,
    router,
    isUpdate,
    actionType,
    isView,
    isAddNew,
    role,
    columns,
    tableData,
    fields,
  } = values

  const {
    onSubmitDraft,
    onSubmitPendingApprove,
    setValue,
    t,
    onUpdateState,
    append,
    remove,
    onSubmitApprove,
    onSubmitReject,
    showDialog,
  } = handles

  const { watch, control, getValues } = methodForm

  const isDisabledControl = isView
    ? true
    : isAddNew
    ? false
    : role !== 'Admin'
    ? true
    : false
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: 'Danh sách phê duyệt',
              pathname: MENU_URL.PROPOSAL,
            },
            {
              title: (
                <Typography>
                  {isUpdate
                    ? actionType === 'VIEW'
                      ? t('common:detail')
                      : t('common:btn.edit')
                    : role === 'Admin'
                    ? 'Tạo mới Kế hoạch cho giảng viên'
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
          <form onSubmit={onSubmitPendingApprove}>
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
                      {(watch('exam_sets') ?? []).length === 0 && isUpdate ? (
                        <WarningText>
                          Chú ý: Kế hoạch này chưa có bộ đề nào thực hiện!!
                        </WarningText>
                      ) : null}
                      <StateOfAssignment state={watch('status')} />
                      <div className='mt-30'>
                        <Grid
                          container
                          className=''
                          spacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreInput
                              control={control}
                              name='code'
                              label='Mã kế hoạch'
                              isViewProp={isDisabledControl}
                              required
                              rules={{
                                required: t('common:validation.required'),
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreAutoCompleteAPI
                              placeholder='Chọn năm học'
                              fetchDataFn={getAcademicYears}
                              isViewProp={isDisabledControl}
                              params={{
                                page: 1,
                                size: 20,
                              }}
                              control={control}
                              label='Năm học'
                              name='academic_year'
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreAutocomplete
                              control={control}
                              className='w-full'
                              placeholder='Chọn học kỳ'
                              isViewProp={isDisabledControl}
                              label='Học kỳ'
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
                          </Grid>
                          {role === 'Admin' && (
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
                                isViewProp={
                                  isView
                                    ? true
                                    : role !== 'Admin'
                                    ? true
                                    : false
                                }
                                label='Người thực hiện'
                                name='user'
                                fetchDataFn={getListUser}
                                required
                                rules={{
                                  required: t('common:validation.required'),
                                }}
                              />
                            </Grid>
                          )}

                          {/* {role !== 'Admin' && (
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
                          )} */}

                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreDatePicker
                              control={control}
                              title='Ngày bắt đầu'
                              name='start_date'
                              format='YYYY-MM-DD'
                              minDate={new Date()}
                              isViewProp={isDisabledControl}
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
                              minDate={watch('start_date')}
                              isViewProp={isDisabledControl}
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
                              isViewProp={isDisabledControl}
                              multiline
                              required
                              rules={{
                                required: t('common:validation.required'),
                              }}
                            />
                          </Grid>
                        </Grid>
                      </div>
                      {!isView && role !== 'Admin' && (
                        <CoreCheckbox
                          control={control}
                          label='Tạo kế hoạch kèm theo bộ đề có sẵn'
                          name='isCreateExamSet'
                          isViewProp={role === 'Admin'}
                        />
                      )}

                      {!!watch('isCreateExamSet') && (
                        <>
                          <Typography className='py-5' variant='subtitle1'>
                            Danh sách bộ đề
                          </Typography>

                          <FormProvider {...methodForm}>
                            {((watch('exam_sets') as ExamSet[]) ?? []).map(
                              (item, index) => {
                                const exceptValues = watch(`exam_sets`)
                                  .filter(
                                    (i) =>
                                      watch(`exam_sets.${index}.id`) !== i?.id
                                  )
                                  .map((i) => {
                                    return {
                                      id: i?.id,
                                    }
                                  })
                                  .filter((i) => !!i)
                                return (
                                  <AccordionCustom
                                    key={index}
                                    title={
                                      <Grid
                                        container
                                        className='flex items-center'
                                      >
                                        <Grid
                                          item
                                          xs={12}
                                          sm={12}
                                          md={4}
                                          lg={4}
                                        >
                                          {isView ? (
                                            <Typography
                                              fontWeight={'600'}
                                              className='flex justify-start items-center'
                                            >
                                              Tên bộ đề: {item?.name}
                                            </Typography>
                                          ) : (
                                            <CoreAutoCompleteAPI
                                              className='w-2/3'
                                              params={{
                                                isParamAddProposal: true,
                                                page: 1,
                                                size: 20,
                                              }}
                                              fetchDataFn={getExamSetList}
                                              control={control}
                                              label=''
                                              isViewProp={
                                                isView
                                                  ? true
                                                  : isAddNew
                                                  ? role !== 'Admin'
                                                    ? false
                                                    : true
                                                  : isUpdate
                                                  ? role !== 'Admin'
                                                    ? false
                                                    : true
                                                  : true
                                              }
                                              exceptValues={exceptValues}
                                              name={`exam_sets.${index}`}
                                              placeholder='Chọn tên bộ đề'
                                              onChangeValue={(val) => {
                                                console.log(val)
                                                if (val) {
                                                  setValue(
                                                    `exam_sets.${index}`,
                                                    val
                                                  )
                                                }
                                                // } else {
                                                //   setExceptValues((prev) =>
                                                //     prev.filter(
                                                //       (id) => id !== val.id
                                                //     )
                                                //   )
                                                // }
                                              }}
                                            />
                                          )}
                                        </Grid>

                                        <Grid
                                          item
                                          xs={12}
                                          sm={12}
                                          md={4}
                                          lg={4}
                                          className='flex  items-center'
                                        >
                                          {watch(`exam_sets.${index}.name`) && (
                                            <Typography fontWeight={'600'}>
                                              Số đề thực hiện/số đề yêu cầu:
                                              &nbsp; {item?.exams?.length ?? 0}/
                                              {item?.exam_quantity}
                                            </Typography>
                                          )}
                                        </Grid>

                                        <Grid
                                          item
                                          xs={12}
                                          sm={12}
                                          md={4}
                                          lg={4}
                                          className='flex justify-between items-center'
                                        >
                                          <DisplayStatus
                                            text={
                                              item?.status ===
                                              'pending_approval'
                                                ? 'Chờ phê duyệt'
                                                : item?.status === 'in_progress'
                                                ? 'Đang thực hiện'
                                                : item?.status === 'approved'
                                                ? 'Đã phê duyệt'
                                                : 'Bị từ chối'
                                            }
                                            color={
                                              item?.status ===
                                              'pending_approval'
                                                ? ORANGE
                                                : item?.status === 'in_progress'
                                                ? BLACK
                                                : item?.status === 'approved'
                                                ? GREEN
                                                : RED
                                            }
                                          />
                                          {isView
                                            ? null
                                            : role === 'Admin'
                                            ? null
                                            : index > 0 && (
                                                <TopAction
                                                  actionList={['delete']}
                                                  onDeleteAction={() =>
                                                    remove(index)
                                                  }
                                                />
                                              )}
                                          <div>
                                            {/* <CoreButton
                                              sx={{ marginRight: '10px' }}
                                              theme='cancel'
                                              onClick={(e) => {
                                                e.stopPropagation()
                                              }}
                                            >
                                              Từ chối
                                            </CoreButton> */}
                                            <CoreButton
                                              onClick={(e) => {
                                                router.push({
                                                  pathname: `${MENU_URL.EXAM_SET}/[id]`,
                                                  query: {
                                                    id: item?.id,
                                                    actionType: 'VIEW',
                                                  },
                                                })
                                                e.stopPropagation()
                                              }}
                                            >
                                              Xem chi tiết
                                            </CoreButton>
                                          </div>
                                        </Grid>
                                      </Grid>
                                    }
                                  >
                                    <DetailExamSet
                                      indexExamSet={index}
                                      item={item}
                                    />
                                  </AccordionCustom>
                                )
                              }
                            )}
                          </FormProvider>
                          {isView ? null : role === 'Admin' ? null : (
                            <IconButton
                              onClick={() =>
                                append({
                                  status: 'in_progress',
                                  name: '',
                                } as any)
                              }
                            >
                              <Typography className='flex justify-start items-center'>
                                <TopAction actionList={['append']} />
                                Thêm bộ đề
                              </Typography>
                            </IconButton>
                          )}
                        </>
                      )}

                      <div>
                        {!isView ? (
                          <div className='space-x-12 text-center my-10'>
                            <CoreButton
                              theme='cancel'
                              onClick={() => {
                                router.push(MENU_URL.PROPOSAL)
                              }}
                            >
                              {t('common:btn.cancel')}
                            </CoreButton>

                            {role !== 'Admin' &&
                              watch('id') &&
                              watch('status') !== 'approved' && (
                                <CoreButton
                                  theme='add'
                                  onClick={() => {
                                    showDialog(
                                      <DialogCfAddExamSet
                                        codePlan={watch('code')}
                                        id={Number(watch('id'))}
                                      />
                                    )
                                  }}
                                >
                                  Tạo bộ đề cho kế hoạch
                                </CoreButton>
                              )}

                            {watch('status') !== 'approved' && (
                              <CoreButton
                                theme='add'
                                onClick={async () => {
                                  onSubmitDraft()
                                }}
                                loading={isLoadingSubmit}
                              >
                                {role === 'Admin'
                                  ? isUpdate
                                    ? 'Lưu thay đổi'
                                    : 'Thêm mới'
                                  : 'Lưu đang thực hiện'}
                              </CoreButton>
                            )}

                            {watch('status') !== 'approved' &&
                              (fields ?? [])?.length > 0 &&
                              role !== 'Admin' && (
                                <CoreButton
                                  theme='submit'
                                  type='submit'
                                  loading={isLoadingSubmit}
                                >
                                  Lưu và Yêu cầu duyệt
                                </CoreButton>
                              )}

                            {role === 'Admin' &&
                              watch('status') === 'pending_approval' &&
                              watch('exam_sets').length > 0 && (
                                <>
                                  <CoreButton
                                    theme='cancel'
                                    loading={isLoadingSubmit}
                                    onClick={() => {
                                      onSubmitReject()
                                    }}
                                  >
                                    Từ chối
                                  </CoreButton>
                                  <CoreButton
                                    theme='add'
                                    loading={isLoadingSubmit}
                                    onClick={() => {
                                      onSubmitApprove()
                                    }}
                                  >
                                    Phê duyệt
                                  </CoreButton>
                                </>
                              )}
                          </div>
                        ) : null}
                      </div>
                    </>
                  ),
                  rightAction: (
                    <TopAction
                      actionList={
                        role === 'Admin'
                          ? methodForm.watch('status') === 'approved'
                            ? []
                            : ['edit']
                          : ([
                              ...(isView
                                ? methodForm.watch('status') === 'approved'
                                  ? []
                                  : ['delete', 'edit']
                                : []),
                            ] as any)
                      }
                      onDeleteAction={() => {}}
                      onEditAction={() => {
                        router.push({
                          pathname: `${MENU_URL.PROPOSAL}/[id]`,
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

export default SaveProposals
