import { AccordionCustom } from '@/components/atoms/AccordionCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import LoadingPage from '@/components/atoms/LoadingPage'
import { WarningText } from '@/components/atoms/WarningText'
import DisplayStatus from '@/components/molecules/DisplayStatus'
import StateOfAssignment from '@/components/molecules/StateOfAssignment'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { BLACK, BLUE, GREEN, ORANGE, RED } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import { getAcademicYears } from '@/service/academicYear'
import { getListUser } from '@/service/auth/getUser'
import { getExamSetList } from '@/service/examSet'
import { ExamSet } from '@/service/examSet/type'
import { Grid, IconButton, Typography } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import DialogCfAddExamSet from '../Dialogs/DialogConfirmAddExamSet'
import DialogConfirmAssign from '../Dialogs/DialogConfirmAssign'
import DialogDeleteProposal from '../Dialogs/DialogDeleteProposal'
import DetailExamSet from './Components/DetailExamSet'
import { useSaveProposals } from './useSaveProposals'

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
    isTracking,
    fields,
  } = values

  const {
    onSubmitDraft,
    onSubmitPendingApprove,
    setValue,
    t,
    onChangeStateExam,
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
              title: isTracking ? 'Theo dõi phê duyệt' : 'Danh sách phê duyệt',
              pathname: isTracking ? MENU_URL.TRACKING : MENU_URL.PROPOSAL,
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
                              params={{}}
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
                                labelPath2={isAddNew ? 'fullname' : undefined}
                                labelPath='name'
                                valuePath='id'
                                control={control}
                                params={{
                                  exceptId: 1,
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
                          onRateChange={() => {
                            if (!watch('isCreateExamSet')) {
                              setValue('exam_sets', [] as any)
                            }
                          }}
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
                                          className='flex justify-start items-center'
                                        >
                                          <Typography
                                            fontWeight={600}
                                            className='mt-10'
                                          >
                                            Tên Bộ đề: &nbsp;
                                          </Typography>
                                          {isView ? (
                                            <Typography
                                              color={BLUE}
                                              fontWeight={'600'}
                                              className='flex justify-start items-center'
                                            >
                                              {item?.name}
                                            </Typography>
                                          ) : watch(
                                              `exam_sets.${index}.name`
                                            ) ? (
                                            <Typography
                                              color={BLUE}
                                              fontWeight={600}
                                            >
                                              {watch(`exam_sets.${index}.name`)}
                                            </Typography>
                                          ) : (
                                            <div className='flex-1'>
                                              <CoreAutoCompleteAPI
                                                color={BLUE}
                                                params={{
                                                  isParamAddProposal: true,
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
                                            </div>
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
                                          {item?.status ? (
                                            <DisplayStatus
                                              text={
                                                item?.status ===
                                                'pending_approval'
                                                  ? 'Chờ phê duyệt'
                                                  : item?.status ===
                                                    'in_progress'
                                                  ? 'Đang thực hiện'
                                                  : item?.status === 'approved'
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
                                                  : item?.status === 'approved'
                                                  ? GREEN
                                                  : RED
                                              }
                                            />
                                          ) : (
                                            <Typography></Typography>
                                          )}
                                          <div>
                                            {role === 'Admin' &&
                                              item?.status ===
                                                'pending_approval' && (
                                                <>
                                                  <CoreButton
                                                    sx={{ marginRight: '10px' }}
                                                    theme='cancel'
                                                    onClick={(e) => {
                                                      e.stopPropagation()
                                                      onChangeStateExam(
                                                        'rejected',
                                                        index
                                                      )
                                                    }}
                                                  >
                                                    Từ chối
                                                  </CoreButton>
                                                  <CoreButton
                                                    sx={{ marginRight: '10px' }}
                                                    theme='submit'
                                                    onClick={(e) => {
                                                      e.stopPropagation()
                                                      onChangeStateExam(
                                                        'approved',
                                                        index
                                                      )
                                                    }}
                                                  >
                                                    Phê duyệt
                                                  </CoreButton>
                                                </>
                                              )}
                                            {item?.id && (
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
                                            )}

                                            {!isView && role !== 'Admin' && (
                                              <CoreButton
                                                theme='cancel'
                                                sx={{ marginLeft: '10px' }}
                                                width={10}
                                                onClick={(e) => {
                                                  e.stopPropagation()
                                                  remove(index)
                                                }}
                                              >
                                                {role !== 'Admin' &&
                                                  item?.status !==
                                                    'approved' && (
                                                    <TopAction
                                                      actionList={['remove']}
                                                    />
                                                  )}
                                              </CoreButton>
                                            )}
                                          </div>
                                        </Grid>
                                      </Grid>
                                    }
                                  >
                                    <DetailExamSet
                                      isViewProp={isView}
                                      indexExamSet={index}
                                      item={item}
                                    />
                                  </AccordionCustom>
                                )
                              }
                            )}
                          </FormProvider>
                          {isView ||
                          watch('status') === 'approved' ? null : role ===
                            'Admin' ? null : (
                            <IconButton
                              onClick={() =>
                                append({
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
                              theme='draft'
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
                              watch('status') !== 'pending_approval' &&
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
                                      showDialog(
                                        <DialogConfirmAssign
                                          codePlan={watch('code')}
                                          nameAction='từ chối '
                                          refetch={() => onSubmitReject()}
                                        />
                                      )
                                    }}
                                  >
                                    Từ chối
                                  </CoreButton>
                                  <CoreButton
                                    theme='add'
                                    loading={isLoadingSubmit}
                                    onClick={() => {
                                      showDialog(
                                        <DialogConfirmAssign
                                          codePlan={watch('code')}
                                          nameAction='phê duyệt '
                                          refetch={() => onSubmitApprove()}
                                        />
                                      )
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
                        [
                          ...(isUpdate
                            ? role === 'Admin' &&
                              methodForm.watch('status') !== 'approved'
                              ? (watch('exam_sets') ?? []).length === 0
                                ? ['delete']
                                : []
                              : []
                            : []),
                          ...(isView
                            ? role === 'Admin'
                              ? methodForm.watch('status') !== 'approved'
                                ? (watch('exam_sets') ?? []).length === 0
                                  ? ['edit', 'delete']
                                  : ['edit']
                                : []
                              : ['edit']
                            : []),
                        ] as any
                      }
                      onDeleteAction={() => {
                        showDialog(
                          <DialogDeleteProposal
                            id={Number(id)}
                            nameCourse={watch('code')}
                          />
                        )
                      }}
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
            />
          </form>
        </FormProvider>
      )}
    </PageContainer>
  )
}

export default SaveProposals
