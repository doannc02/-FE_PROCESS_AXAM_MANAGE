import { AccordionCustom } from '@/components/atoms/AccordionCustom'
import CoreInput from '@/components/atoms/CoreInput'
import DisplayStatus from '@/components/molecules/DisplayStatus'
import { BLACK, BLUE, GREEN, GREY, ORANGE, RED } from '@/helper/colors'
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ViewIcon from '@/assets/svg/Eye.svg'
import useDetailExamSet from './useDetailExamSet'
import { CoreButton } from '@/components/atoms/CoreButton'
import { Exam, ExamSet } from '@/service/examSet/type'
import { TopAction } from '@/components/molecules/TopAction'
import { MENU_URL } from '@/routes'
import { useRouter } from 'next/router'
import CoreInputDescription from '@/components/atoms/CoreInputDescrition'
import { actionExamSet } from '@/service/examSet'
import { actionExams, getDetailExam } from '@/service/exam'
import { errorMsg, successMsg } from '@/helper/message'

const DetailExamSet = ({
  isViewProp,
  item,
  indexExamSet,
}: {
  item: ExamSet
  indexExamSet: number
  isViewProp?: boolean
}) => {
  const { t } = useTranslation()
  const [values, handles] = useDetailExamSet({ indexExamSet })
  const { methodForm, isLoadingUpdateStateExam, role } = values
  const { submitChangeStateExam } = handles
  const { watch, getValues, setValue, control } = methodForm
  const router = useRouter()
  const { fields, append, remove } = useFieldArray({
    control,
    name: `exam_sets.${indexExamSet}.exams`,
    keyName: 'key',
  })
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <CoreInputDescription
          control={control}
          isView={!!isViewProp}
          nameField={`exam_sets.${indexExamSet}.description`}
          t={t}
          title='Mô tả bộ đề'
          watch={watch}
        />
      </Grid>
      {(item?.exams ?? []).map((ele, index) => {
        const status = watch(`exam_sets.${indexExamSet}.exams.${index}.status`)
        return (
          <Grid key={index} item xs={12}>
            <AccordionCustom
              //   bgColor="#DFE0EB"
              height='10px'
              title={
                <div className='w-full flex justify-between items-center'>
                  <div className='w-1/3 flex justify-start'>
                    <Typography fontWeight={'600'}>
                      Đề chi tiết: &nbsp;
                    </Typography>

                    <Typography color={BLUE} fontWeight={'600'}>
                      {ele?.name} - {ele?.code} &nbsp;
                    </Typography>
                  </div>

                  <div className='w-2/3 flex justify-between items-center p-5'>
                    <div className='flex justify-between items-center'>
                      <Typography>Xem chi tiết</Typography>
                      <IconButton
                        style={{
                          //bottom: '5px',
                          //right: '65px',
                          backgroundColor: '#DFE0EB',
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push({
                            pathname: `${MENU_URL.DETAIL_EXAM}/[id]`,
                            query: {
                              id: ele?.id,
                              actionType: 'VIEW',
                            },
                          })
                          //   showDialog(
                          //     <DialogViewFile
                          //       src={url_res}
                          //       nameFile={url_res.slice(68, url_res?.length)}
                          //     />
                          //   )
                        }}
                      >
                        <Image
                          src={ViewIcon}
                          alt={`icon_view_detail`}
                          width={16}
                          height={16}
                        />
                      </IconButton>
                    </div>
                    <Typography fontWeight={'600'}>
                      <DisplayStatus
                        text={
                          item?.status === 'pending_approval'
                            ? 'Chờ phê duyệt'
                            : item?.status === 'in_progress'
                            ? 'Đang thực hiện'
                            : item?.status === 'approved'
                            ? 'Đã phê duyệt'
                            : 'Bị từ chối'
                        }
                        color={
                          item?.status === 'pending_approval'
                            ? ORANGE
                            : item?.status === 'in_progress'
                            ? BLACK
                            : item?.status === 'approved'
                            ? GREEN
                            : RED
                        }
                      />
                    </Typography>
                    {role === 'Admin' && item?.status === 'pending_approval' ? (
                      <div>
                        <CoreButton
                          sx={{ marginRight: '10px' }}
                          theme='cancel'
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log(ele, 'ele')
                            submitChangeStateExam(
                              { ...ele, status: 'rejected' } as Exam,
                              index
                            )
                          }}
                        >
                          Từ chối
                        </CoreButton>

                        {role === 'Admin' && (
                          <CoreButton
                            sx={{ marginRight: '10px' }}
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
                        )}

                        <CoreButton
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                        >
                          Xem chi tiết
                        </CoreButton>
                      </div>
                    ) : null}
                  </div>
                </div>
              }
            >
              <Stack direction={'column'}>
                <Box>
                  {role !== 'Admin' &&
                  !!watch(
                    `exam_sets.${indexExamSet}.exams.${index}.comment`
                  ) ? (
                    <CoreInput
                      multiline
                      isViewProp={role !== 'Admin'}
                      control={control}
                      label='Nhận xét chi tiết đề'
                      name={`exam_sets.${indexExamSet}.exams.${index}.comment`}
                      required
                      rules={{
                        required: t('common:validation.required'),
                      }}
                    />
                  ) : (
                    <CoreInputDescription
                      control={control}
                      isView={isViewProp || role !== 'Admin'}
                      nameField={`exam_sets.${indexExamSet}.exams.${index}.comment`}
                      t={t}
                      title='Nhận xét của admin'
                      watch={watch}
                    />
                  )}
                </Box>
              </Stack>
            </AccordionCustom>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default DetailExamSet
