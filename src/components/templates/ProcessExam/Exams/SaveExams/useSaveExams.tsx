import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { MenuCustom } from '@/components/layouts/MultipleLayouts/Layout1/components/MenuCustom'
import DisplayStatus from '@/components/molecules/DisplayStatus'
import { Tooltip } from '@/components/molecules/Tooltip'
import { TopAction } from '@/components/molecules/TopAction'
import { ColumnProps } from '@/components/organism/CoreTable'
import { getRole } from '@/config/token'
import {
  menuStateView,
  menuStateAdmin,
  menuStateUser,
  stateEnum,
  stateEnumUser,
} from '@/enum'
import { BLACK, GREEN, ORANGE, RED, WHITE } from '@/helper/colors'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL } from '@/routes'
import { getAcademicYears } from '@/service/academicYear'
import {
  actionExams,
  changeStateExam,
  useQueryGetDetailExam,
} from '@/service/exam'
import { RequestExam } from '@/service/exam/type'
import { Exam, state } from '@/service/examSet/type'
import {
  convertToDate,
  convertToOffsetDateTime,
} from '@/utils/date/convertToDate'
import { IconButton, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const useSaveExams = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id, actionType, examQuantity, idExamSet, nameExamSet } = router.query

  const defaultValues = {
    exams: [
      {
        id: null,
        status: 'in_progress',
        create_at: convertToOffsetDateTime(new Date()),
        exam_set: idExamSet
          ? {
              id: Number(idExamSet),
            }
          : undefined,
      },
    ] as Exam[],
  }
  const methodForm = useFormCustom<{
    exams: Exam[]
  }>({ defaultValues })

  const {
    getValues,
    control,
    formState: { isDirty },
    setValue,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    reset,
  } = methodForm
  const role = getRole()

  const [isLoadingUpdateStateExam, setLoadingUpdateStateExam] =
    useState<boolean>()

  const isUpdate = !!id
  const isView = !!id && actionType === 'VIEW'
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exams',
    keyName: 'key',
  })

  const { data, isLoading, refetch } = useQueryGetDetailExam(
    {
      examId: Number(id),
    },
    {
      enabled: !!id,
    }
  )
  const [selectedMenu, setSelectedMenu] = useState<null | string>(null)
  const [anchorEl, setAnchorEl] = useState<any>(null)

  const columns = useMemo(
    () =>
      [
        {
          header: 'Tên đề chi tiết',
          fieldName: 'name',
        },
        {
          header: 'Mã đề',
          fieldName: 'code',
        },
        ...(role === 'Admin'
          ? [
              {
                header: 'Người thực hiện',
                fieldName: 'user',
              },
            ]
          : []),
        {
          header: 'Năm học áp dụng',
          fieldName: 'academic_year',
        },
        ...(isView
          ? [
              {
                header: 'Ngày upload',
                fieldName: 'create_at',
              },
            ]
          : []),
        {
          header: 'Trạng thái',
          fieldName: 'status',
          styleCell: {
            style: {
              minWidth: '80px',
            },
          },
        },
        {
          header: '',
          fieldName: 'action',
          styleCell: {
            style: {
              minWidth: '50px',
            },
          },
        },
      ] as ColumnProps[],
    [role, isView]
  )

  const tableData = (fields ?? []).map((item, index) => {
    if (isView) {
      return {
        ...item,
        create_at: convertToDate(item?.create_at),
        description: item?.description && (
          <Stack direction='row' justifyContent='space-between'>
            <Typography>{item?.description.slice(0, 19)}</Typography>
            {item?.description?.length > 20 ? (
              <div className='w-1/3'>
                <Tooltip
                  isShowIcon
                  showText
                  tooltips={[{ title: item?.description ?? '' }]}
                ></Tooltip>
              </div>
            ) : (
              <div className='w-1/3'></div>
            )}
          </Stack>
        ),
        comment: item?.comment && (
          <Stack direction='row' justifyContent='space-between'>
            <Typography>{item?.comment.slice(0, 19)}</Typography>
            {item?.comment?.length > 20 ? (
              <div className='w-1/3'>
                <Tooltip
                  isShowIcon
                  showText
                  tooltips={[{ title: item?.comment ?? '' }]}
                ></Tooltip>
              </div>
            ) : (
              <div className='w-1/3'></div>
            )}
          </Stack>
        ),
        academic_year: item?.academic_year?.name,
        user: item?.user?.name,
        status: (
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
        ),
        action: <CoreButton>Xem thêm...</CoreButton>,
      }
    }
    return {
      ...item,
      code: (
        <CoreInput
          control={control}
          isViewProp={role === 'Admin'}
          name={`exams.${index}.code`}
          placeholder='Nhập mã đề'
          required
          rules={{
            required: t('common:validation.required'),
          }}
        />
      ),
      name: (
        <CoreInput
          isViewProp={role === 'Admin'}
          control={control}
          name={`exams.${index}.name`}
          required
          rules={{
            required: t('common:validation.required'),
          }}
          placeholder='Nhập tên đề'
        />
      ),
      academic_year: (
        <CoreAutoCompleteAPI
          control={control}
          isViewProp={role === 'Admin'}
          name={`exams.${index}.academic_year`}
          placeholder='Chọn năm học'
          label=''
          params={{}}
          fetchDataFn={getAcademicYears}
          // required
          // rules={{
          //   required: t('common:validation.required'),
          // }}
        />
      ),
      user: item?.user?.name,
      status: (
        <div>
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
              setAnchorEl(e.currentTarget)
              setSelectedMenu(getValues(`exams.${index}.status`))
            }}
          >
            <div className='flex gap-3 items-center'>
              <Typography
                variant='body1'
                style={{
                  color:
                    watch(`exams.${index}.status`) === 'pending_approval'
                      ? ORANGE
                      : watch(`exams.${index}.status`) === 'in_progress'
                      ? BLACK
                      : watch(`exams.${index}.status`) === 'approved'
                      ? GREEN
                      : RED,
                }}
              >
                {stateEnum[getValues(`exams.${index}.status`)]}
              </Typography>
              {/* <KeyboardArrowDownIcon fontSize='small' /> */}
            </div>
          </IconButton>
          <MenuCustom
            classes={{
              root: 'mt-4',
              paper: 'w-106',
            }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            itemList={
              isView
                ? menuStateView
                : role === 'Admin'
                ? menuStateAdmin
                : menuStateUser
            }
            onItemAction={(item) => {
              if (getValues(`exams.${index}.exam_set`)?.id) {
                setValue(`exams.${index}.status`, item?.value as any)
                clearErrors(`exams.${index}.status`)
                setAnchorEl(null)
              } else {
                errorMsg(
                  `Không thể chuyển trạng thái do Đề ${getValues(
                    `exams.${index}.name`
                  )} chưa được gán cho bộ đề nào!`
                )
              }
            }}
            currentValue={selectedMenu}
          />
        </div>
      ),
      action: !isView &&
        watch(`exams.${index}.status`) !== 'approved' &&
        index > 0 && (
          <TopAction
            isShowText={false}
            actionList={['delete']}
            onDeleteAction={() => {
              remove(index)
            }}
          />
        ),
    }
  })

  const { mutate, isLoading: isLoadingSubmit } = useMutation(actionExams, {
    onSuccess: (res: any) => {
      if (res?.data?.errs) {
        errorMsg(res?.data?.message ?? 'Đã tồn tại')
        ;(res?.data?.errs ?? []).map((item: any) => {
          setError(item.field, item.message)
        })
        return
      }
      if (res?.data && res?.data?.id) {
        successMsg(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.DETAIL_EXAM}/[id]`,
          query: {
            id: res?.data?.id,
            actionType: 'VIEW',
          },
        })
        refetch()
        return
      }
      if (Array.isArray(res?.data) && res?.data?.length > 0) {
        successMsg(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.DETAIL_EXAM}`,
        })
        refetch()
      }
    },
    onError: (error: any) => {
      errorMsg(error, setError)
      refetch()
    },
  })

  useEffect(() => {
    if (!!id && data?.data) {
      const format = {
        ...data?.data,
      } as any
      reset({ exams: [format] })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data])

  const onSubmit = handleSubmit(async (input) => {
    const exams = input.exams || []
    let isValid = true

    for (let i = 0; i < exams.length; i++) {
      if (!exams[i].description || !exams[i].attached_file) {
        isValid = false
        setError(`exams.${i}.description`, {
          message: 'Đây là trường bắt buộc',
        })
      }
    }
    if (!isValid) {
      errorMsg('Vui lòng nhập mô tả!!')
      return
    }
    mutate({
      method: isUpdate ? 'put' : 'post',
      data: isUpdate ? input.exams[0] : (input.exams as Exam[]),
    })
  })

  const onReRequest = handleSubmit(async (input) => {
    console.log('aaa')
    const exams = input.exams || []
    let isValid = true

    if (!exams[0].description || !exams[0].attached_file) {
      isValid = false
      setError(`exams.${0}.description`, {
        message: 'Đây là trường bắt buộc',
      })
    }

    if (!isValid) {
      errorMsg('Vui lòng nhập mô tả!!')
      return
    }
    mutate({
      method: 'put',
      data: input.exams[0],
    })
  })

  const onUpdateState = async (state: state) => {
    const exams = fields || []
    let isValid = true

    if (!getValues('exams.0.comment')) {
      isValid = false
      setError(`exams.0.comment`, {
        message: 'Đây là trường bắt buộc',
      })
    }

    if (!isValid) {
      errorMsg('Vui lòng nhập nhận xét để phê duyệt!!')
      return
    }
    try {
      const params = {
        status: state,
        examId: watch('exams.0.id'),
        comment: watch('exams.0.comment'),
      } as RequestExam['UPDATE_STATE']
      const res = await changeStateExam(params)
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
  }

  return [
    {
      isLoadingSubmit,
      methodForm,
      columns,
      tableData,
      actionType,
      id,
      isLoading,
      isLoadingUpdateStateExam,
      isUpdate,
      isView,
      router,
      role,
      idExamSet,
      nameExamSet,
      isDirty,
      examQuantity,
    },
    {
      append,
      remove,
      onSubmit,
      onReRequest,
      changeStateExam,
      refetch,
      onUpdateState,
      setError,
    },
  ] as const
}

export default useSaveExams
