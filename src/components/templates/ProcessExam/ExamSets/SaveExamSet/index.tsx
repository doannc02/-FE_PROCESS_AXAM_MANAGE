import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import CoreInput from '@/components/atoms/CoreInput'
import LoadingPage from '@/components/atoms/LoadingPage'
import { WarningText } from '@/components/atoms/WarningText'
import StateOfAssignment from '@/components/molecules/StateOfAssignment'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import { TableExams } from '@/components/organism/TableExams'
import { MENU_URL } from '@/routes'
import { getListUser } from '@/service/auth/getUser'
import { getListCourse } from '@/service/course'
import { getDepartment } from '@/service/department'
import { getMajorList } from '@/service/major'
import { Grid, Typography } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import DialogCfAddExams from '../Dialogs/DialogConfirmAddExams'
import DialogDeleteExamSet from '../Dialogs/DialogDeleteExamSet'
import { useSaveExamSet } from './useSaveExamSet'

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
    tableData,
    columns,
    role,
    fields,
    codePlan,
  } = values

  const { onUpdateState } = handles
  const {
    onSubmit,
    t,
    append,
    onSubmitInProgress,
    onSubmitApprove,
    onSubmitReject,
    showDialog,
  } = handles

  const { control, watch, getValues, setValue } = methodForm
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
                      ? 'Chi tiết bộ đề ' + nameExamSet
                      : 'Chỉnh sửa bộ đề ' + nameExamSet
                    : t('common:btn.add') + ' bộ đề'}
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
                      <WarningText bgColor='#abdbe3'>
                        {codePlan
                          ? `Bạn đang tạo bộ đề cho kế hoạch "${codePlan}"`
                          : watch('proposal')?.code || watch('proposal')?.id
                          ? `Bộ đề này đã được gán với Mã kế hoạch "${
                              watch('proposal')?.name ?? ''
                            }"`
                          : 'Bộ đề chưa được gán với kế hoạch nào!!'}
                      </WarningText>
                      <StateOfAssignment state={getValues('status')} />
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
                              required
                              rules={{
                                required: t('common:validation.required'),
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreAutoCompleteAPI
                              control={control}
                              label='Khoa'
                              name='department'
                              placeholder='Chọn khoa'
                              fetchDataFn={getDepartment}
                            />
                          </Grid>

                          {watch('department')?.id && (
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                              <CoreAutoCompleteAPI
                                params={{
                                  page: 1,
                                  size: 20,
                                  departmentId: watch('department')?.id,
                                }}
                                fetchDataFn={getMajorList}
                                control={control}
                                label='Chuyên ngành'
                                placeholder='Chọn chuyên ngành'
                                name='major'
                                onChangeValue={() => {
                                  setValue('course', null as unknown as any)
                                }}
                              />
                            </Grid>
                          )}

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

                          {role === 'Admin' && (
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                              <CoreAutoCompleteAPI
                                placeholder='Chọn người thực hiện'
                                labelPath2='fullname'
                                labelPath='name'
                                valuePath='id'
                                isViewProp={true}
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
                          )}

                          {
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                              <CoreAutoCompleteAPI
                                placeholder='Chọn học phần'
                                control={control}
                                labelPath2='code'
                                label='Học phần cần phê duyệt'
                                name='course'
                                params={{
                                  majorId: watch('major')?.id,
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
                          }
                          <Grid item xs={12}>
                            <CoreInput
                              className='mt-20 mb-5'
                              placeholder='Mô tả bộ đề'
                              control={control}
                              label='Nhập mô tả cho bộ đề'
                              name='description'
                              inputProps={{
                                maxLength: 250,
                              }}
                              multiline
                              required
                              rules={{
                                required: t('common:validation.required'),
                              }}
                            />
                          </Grid>
                        </Grid>
                      </div>
                      {!isView && (
                        <CoreCheckbox
                          control={control}
                          label='Tạo bộ đề kèm theo đề chi tiết có sẵn'
                          name='isCreateExam'
                        />
                      )}
                      {watch('isCreateExam') && (
                        <>
                          <Typography className='py-5' variant='subtitle1'>
                            Danh sách bộ đề
                          </Typography>
                          <TableExams
                            isShowColumnStt
                            showInfoText={false}
                            fieldsName='exams'
                            paginationHidden
                            columns={columns}
                            data={tableData}
                            isLoading={isLoading}
                            actionTable={
                              isView ? null : (fields ?? []).length <
                                getValues('exam_quantity') ? (
                                <ActionTable
                                  append={append}
                                  defaultValueLine={{
                                    code: '',
                                    name: '',
                                  }}
                                />
                              ) : null
                            }
                          />
                        </>
                      )}
                      <div>
                        {!isView ? (
                          <div className='space-x-12 text-center my-10'>
                            <CoreButton
                              theme='cancel'
                              onClick={() => {
                                router.push(MENU_URL.EXAM_SET)
                              }}
                            >
                              {t('common:btn.cancel')}
                            </CoreButton>
                            {role !== 'Admin' &&
                              watch('id') &&
                              (fields ?? []).length < watch('exam_quantity') &&
                              watch('status') !== 'approved' && (
                                <CoreButton
                                  theme='add'
                                  onClick={() => {
                                    showDialog(
                                      <DialogCfAddExams
                                        nameExamSet={watch('name')}
                                        idExamSet={Number(watch('id'))}
                                      />
                                    )
                                  }}
                                >
                                  Tạo đề cương cho bộ đề
                                </CoreButton>
                              )}

                            {role !== 'Admin' &&
                              watch('status') !== 'approved' && (
                                <CoreButton
                                  theme='add'
                                  onClick={async () => {
                                    onSubmitInProgress()
                                  }}
                                  loading={isLoadingSubmit}
                                >
                                  Lưu đang thực hiện
                                </CoreButton>
                              )}

                            {watch('status') !== 'approved' &&
                              watch('exam_quantity') ===
                                (fields ?? []).length &&
                              role !== 'Admin' && (
                                <CoreButton
                                  theme='submit'
                                  type='submit'
                                  loading={isLoadingSubmit}
                                >
                                  Lưu và yêu cầu duyệt
                                </CoreButton>
                              )}

                            {role === 'Admin' &&
                              watch('status') === 'pending_approval' && (
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
                          ? methodForm.watch('status') === 'in_progress' ||
                            methodForm.watch('status') === 'approved'
                            ? []
                            : ['edit']
                          : ([
                              ...(methodForm.watch('status') === 'approved'
                                ? []
                                : isUpdate
                                ? ['delete']
                                : []),
                              ...(isView ? ['delete', 'edit'] : []),
                            ] as any)
                      }
                      onDeleteAction={() => {
                        showDialog(
                          <DialogDeleteExamSet
                            id={Number(watch('id'))}
                            nameExamSet={watch('name')}
                          />
                        )
                      }}
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
