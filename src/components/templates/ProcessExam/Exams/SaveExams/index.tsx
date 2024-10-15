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
import useSaveExams from './useSaveExams'
import { useTranslation } from 'react-i18next'
import { TableExams } from '@/components/organism/TableExams'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import { convertToOffsetDateTime } from '@/utils/date/convertToDate'
import { WarningText } from '@/components/atoms/WarningText'

const SaveExams = () => {
  const { t } = useTranslation()
  const [values, handles] = useSaveExams()

  const {
    router,
    methodForm,
    columns,
    id,
    isUpdate,
    tableData,
    actionType,
    isView,
    isLoading,
    isLoadingSubmit,
    isLoadingUpdateStateExam,
    nameExamSet,
    idExamSet,
    role,
  } = values

  const { append, onSubmit, onUpdateState, onReRequest } = handles

  const { watch, setValue } = methodForm
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: 'Danh sách đề',
              pathname: MENU_URL.DETAIL_EXAM,
            },
            {
              title: (
                <Typography>
                  {isUpdate
                    ? actionType === 'VIEW'
                      ? `Chi tiết Mã đề ${watch(`exams.0.code`)}`
                      : `Chỉnh sửa Mã đề ${watch(`exams.0.code`)}`
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
                  } `,
                  content: (
                    <>
                      <WarningText bgColor='#abdbe3'>
                        {nameExamSet
                          ? `Bạn đang tạo đề cương chi tiết cho bộ đề "${nameExamSet}"`
                          : watch('exams.0.exam_set')?.name ||
                            watch('exams.0.exam_set')?.id
                          ? `Đề cương chi tiết này đã được gán với bộ đề "${
                              watch('exams.0.exam_set')?.name ?? ''
                            }"`
                          : 'Đề cương chi tiết này chưa được gán với bộ đề nào!!'}
                      </WarningText>
                      <Typography className='py-5' variant='subtitle1'>
                        {isUpdate
                          ? 'Chi tiết đề' + ' ' + watch(`exams.0.name`)
                          : 'Thêm mới đề chi tiết'}
                      </Typography>
                      <TableExams
                        isShowColumnStt
                        fieldsName='exams'
                        paginationHidden
                        columns={columns}
                        data={tableData}
                        isLoading={isLoading}
                        actionTable={
                          isUpdate || role === 'Admin' ? null : (
                            <ActionTable
                              append={append}
                              defaultValueLine={{
                                id: null,
                                status: 'in_progress',
                                create_at: convertToOffsetDateTime(
                                  new Date()
                                ),
                                exam_set: idExamSet,
                              }}
                            />
                          )
                        }
                      />
                      <div>
                        {!isView ? (
                          <div className='space-x-12 text-center my-10'>
                            <CoreButton
                              theme='cancel'
                              onClick={() => {
                                router.push(MENU_URL.DETAIL_EXAM)
                              }}
                            >
                              {t('common:btn.cancel')}
                            </CoreButton>

                            {watch('exams.0.status') === 'rejected' &&
                              role !== 'Admin' && (
                                <CoreButton
                                  theme='draft'
                                  onClick={() => {
                                    setValue(
                                      'exams.0.status',
                                      'pending_approval'
                                    )
                                    onReRequest()
                                  }}
                                  loading={isLoadingSubmit}
                                >
                                  Yêu cầu phê duyệt lại
                                </CoreButton>
                              )}

                            {role === 'Admin' &&
                              watch('exams.0.status') ===
                                'pending_approval' && (
                                <>
                                  <CoreButton
                                    theme='cancel'
                                    loading={isLoadingSubmit}
                                    onClick={() => {
                                      onUpdateState('rejected')
                                    }}
                                  >
                                    Từ chối
                                  </CoreButton>
                                  <CoreButton
                                    theme='add'
                                    loading={isLoadingSubmit}
                                    onClick={() => {
                                      onUpdateState('approved')
                                    }}
                                  >
                                    Phê duyệt
                                  </CoreButton>
                                </>
                              )}
                            {role !== 'Admin' && (
                              <CoreButton
                                theme='submit'
                                type='submit'
                                loading={isLoadingSubmit}
                              >
                                {isUpdate
                                  ? t('common:btn.edit')
                                  : t('common:btn.add')}
                              </CoreButton>
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
                          ? watch('exams.0.status') === 'approved'
                            ? []
                            : ['edit']
                          : ([
                              ...(isUpdate ? ['delete'] : []),
                              ...(isView ? ['delete', 'edit'] : []),
                              ...(watch('exams.0.status') === 'approved'
                                ? []
                                : []),
                            ] as any)
                      }
                      onDeleteAction={() => {}}
                      onEditAction={() => {
                        router.push({
                          pathname: `${MENU_URL.DETAIL_EXAM}/[id]`,
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

export default SaveExams
