import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { WarningText } from '@/components/atoms/WarningText'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import { TableExams } from '@/components/organism/TableExams'
import { errorMsg, successMsg } from '@/helper/message'
import { MENU_URL } from '@/routes'
import { actionExams } from '@/service/exam'
import { convertToOffsetDateTime } from '@/utils/date/convertToDate'
import { Typography } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import DialogDeleteExam from '../DialogDeleteExam'
import useSaveExams from './useSaveExams'

const SaveExams = () => {
  const { t } = useTranslation()
  const [values, handles] = useSaveExams()

  const {
    router,
    methodForm,
    examQuantity,
    columns,
    id,
    isUpdate,
    tableData,
    actionType,
    isView,
    isLoading,
    isLoadingSubmit,
    nameExamSet,
    idExamSet,
    role,
    isDirty,
  } = values

  const { append, onSubmit, onReRequest, refetch, setError } = handles

  const { showDialog } = useDialog()

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
        <CoreLoading />
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
                          ? `Bạn đang tạo đề chi tiết cho bộ đề "${nameExamSet}"`
                          : watch('exams.0.exam_set')?.name ||
                            watch('exams.0.exam_set')?.id
                          ? `Đề chi tiết này đã được gán với bộ đề "${
                              watch('exams.0.exam_set')?.name ?? ''
                            }"`
                          : 'Đề chi tiết này chưa được gán với bộ đề nào!!'}
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
                              Number(examQuantity)
                                ? Number(examQuantity) > tableData.length
                                : true
                            ) ? (
                            <ActionTable
                              append={append}
                              defaultValueLine={{
                                id: null,
                                status: 'in_progress',
                                create_at: convertToOffsetDateTime(new Date()),
                                exam_set: {
                                  id: Number(idExamSet),
                                },
                              }}
                            />
                          ) : null
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
                                    onClick={async () => {
                                      try {
                                        const res = await actionExams({
                                          method: 'put',
                                          data: {
                                            ...watch(`exams.${0}`),
                                            status: 'rejected',
                                          },
                                        })
                                        if (res?.data?.id) {
                                          successMsg('Phê duyệt thành công!!!')
                                          router.push({
                                            pathname: `${MENU_URL.DETAIL_EXAM}/[id]`,
                                            query: {
                                              id: res?.data?.id,
                                              actionType: 'VIEW',
                                            },
                                          })
                                          refetch()
                                        }
                                      } catch (err) {
                                        errorMsg(err, setError)
                                      }
                                    }}
                                  >
                                    Từ chối
                                  </CoreButton>
                                  <CoreButton
                                    theme='add'
                                    loading={isLoadingSubmit}
                                    onClick={async () => {
                                      try {
                                        const res = await actionExams({
                                          method: 'put',
                                          data: {
                                            ...watch(`exams.${0}`),
                                            status: 'approved',
                                          },
                                        })
                                        if (res?.data?.id) {
                                          successMsg('Phê duyệt thành công!!!')
                                          router.push({
                                            pathname: `${MENU_URL.DETAIL_EXAM}/[id]`,
                                            query: {
                                              id: res?.data?.id,
                                              actionType: 'VIEW',
                                            },
                                          })
                                          refetch()
                                        }
                                      } catch (err) {
                                        errorMsg(err, setError)
                                      }
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
                      onDeleteAction={() => {
                        showDialog(
                          <DialogDeleteExam
                            id={Number(watch(`exams.0.id`))}
                            nameExam={watch('exams.0.name')}
                          />
                        )
                      }}
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
            />
          </form>
        </FormProvider>
      )}
    </PageContainer>
  )
}

export default SaveExams
