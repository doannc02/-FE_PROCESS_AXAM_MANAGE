import { AccordionCustom } from '@/components/atoms/AccordionCustom'
import { CoreButton } from '@/components/atoms/CoreButton'
import DisplayStatus from '@/components/molecules/DisplayStatus'
import EditText from '@/components/molecules/EditText'
import { BLUE } from '@/helper/colors'
import { Exam } from '@/service/examSet/type'
import { Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useDetailExamSet from './useDetailExamSet'
import { getStatusColor, getStatusText } from '@/utils/disState'
import { MENU_URL } from '@/routes'

const DetailExamSet = ({
  indexExamSet,
  isViewProp,
}: {
  indexExamSet: number
  isViewProp?: boolean
}) => {
  const { t } = useTranslation()
  const [values, handles] = useDetailExamSet({ indexExamSet })
  const { methodForm, isView, router, isLoadingUpdateStateExam, role } = values
  const { submitChangeStateExam, clearErrors } = handles
  const { watch, getValues, setValue, control, formState } = methodForm

  const { fields } = useFieldArray({
    control,
    name: `exam_sets.${indexExamSet}.exams`,
    keyName: 'key',
  })

  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([])

  const toggleAccordion = (index: number) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  // Tự động mở Accordion nếu có lỗi trong các trường của một phần tử
  useEffect(() => {
    const indexesWithError = fields.map((_, index) => {
      const errors = formState.errors?.exam_sets?.[indexExamSet]?.exams?.[index]
      return !!errors?.comment?.message || !!errors?.description?.message
    })

    setExpandedIndexes((prev: any[]) => [
      ...prev,
      ...indexesWithError
        .map((hasError, index) => (hasError ? index : null))
        .filter((index) => index !== null && !prev.includes(index)),
    ])
  }, [formState.errors, fields, indexExamSet])

  return (
    <Grid container>
      <Grid item xs={12}>
        <EditText
          title='Mô tả bộ đề'
          error={
            formState.errors?.exam_sets?.[indexExamSet]?.description?.message ||
            ''
          }
          disabled={!!isViewProp}
          editorText={getValues(`exam_sets.${indexExamSet}.description`)}
          placeholder='Nhập mô tả bộ đề'
          setEditorText={(text) =>
            setValue(`exam_sets.${indexExamSet}.description`, text, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        />
      </Grid>

      {(fields ?? []).map((ele, index) => {
        const status = watch(`exam_sets.${indexExamSet}.exams.${index}.status`)
        const errors = formState.errors
        const hasError =
          !!errors?.exam_sets?.[indexExamSet]?.exams?.[index]?.comment
            ?.message ||
          !!errors?.exam_sets?.[indexExamSet]?.exams?.[index]?.description
            ?.message

        return (
          <Grid key={index} item xs={12}>
            <AccordionCustom
              expanded={expandedIndexes.includes(index) || hasError}
              onChange={() => toggleAccordion(index)}
              height='10px'
              title={
                <div className='w-full flex justify-between items-center'>
                  <div className='w-1/3 flex justify-start'>
                    <Typography fontWeight='600'>
                      Đề chi tiết: &nbsp;
                    </Typography>
                    <Typography color={BLUE} fontWeight='600'>
                      {ele?.name} - {ele?.code} &nbsp;
                    </Typography>
                  </div>

                  <div className='w-2/3 flex justify-between items-center p-5'>
                    <Typography fontWeight='600'>
                      <DisplayStatus
                        text={getStatusText(status)}
                        color={getStatusColor(status)}
                      />
                    </Typography>
                    {role === 'Admin' && status === 'pending_approval' ? (
                      <>
                        {!isView ? (
                          <div>
                            <CoreButton
                              loading={isLoadingUpdateStateExam}
                              sx={{ marginRight: '10px' }}
                              theme='cancel'
                              onClick={(e) => {
                                e.stopPropagation()
                                submitChangeStateExam(
                                  {
                                    ...getValues(
                                      `exam_sets.${indexExamSet}.exams.${index}`
                                    ),
                                    status: 'rejected',
                                  } as Exam,
                                  index
                                )
                              }}
                            >
                              Từ chối
                            </CoreButton>

                            <CoreButton
                              sx={{ marginRight: '10px' }}
                              loading={isLoadingUpdateStateExam}
                              theme='submit'
                              onClick={(e) => {
                                e.stopPropagation()
                                submitChangeStateExam(
                                  { ...ele, status: 'approved' } as Exam,
                                  index
                                )
                              }}
                            >
                              Phê duyệt
                            </CoreButton>
                          </div>
                        ) : null}
                      </>
                    ) : null}
                    {ele?.id && (
                      <CoreButton
                        onClick={(e) => {
                          router.push({
                            pathname: `${MENU_URL.DETAIL_EXAM}/[id]`,
                            query: {
                              id: ele?.id,
                              actionType: 'VIEW',
                            },
                          })
                          e.stopPropagation()
                        }}
                      >
                        Xem chi tiết
                      </CoreButton>
                    )}
                  </div>
                </div>
              }
            >
              <Stack direction='column'>
                <EditText
                  title='Mô tả đề'
                  error={
                    errors?.exam_sets?.[indexExamSet]?.exams?.[index]
                      ?.description?.message || ''
                  }
                  disabled={!!isViewProp}
                  editorText={watch(
                    `exam_sets.${indexExamSet}.exams.${index}.description`
                  )}
                  placeholder='Nhập mô tả đề'
                  setEditorText={(text) => {
                    setValue(
                      `exam_sets.${indexExamSet}.exams.${index}.description`,
                      text
                    )
                    clearErrors(
                      `exam_sets.${indexExamSet}.exams.${index}.description`
                    )
                  }}
                />
                <EditText
                  title='Nhận xét đề'
                  error={
                    errors?.exam_sets?.[indexExamSet]?.exams?.[index]?.comment
                      ?.message || ''
                  }
                  disabled={!!isViewProp}
                  editorText={watch(
                    `exam_sets.${indexExamSet}.exams.${index}.comment`
                  )}
                  placeholder='Nhận xét của Admin'
                  setEditorText={(text) => {
                    setValue(
                      `exam_sets.${indexExamSet}.exams.${index}.comment`,
                      text
                    )
                    clearErrors(
                      `exam_sets.${indexExamSet}.exams.${index}.comment`
                    )
                  }}
                />
              </Stack>
            </AccordionCustom>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default DetailExamSet
