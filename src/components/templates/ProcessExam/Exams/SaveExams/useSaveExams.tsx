import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { MenuCustom } from '@/components/layouts/MultipleLayouts/Layout1/components/MenuCustom'
import DisplayStatus from '@/components/molecules/DisplayStatus'
import { Tooltip } from '@/components/molecules/Tooltip'
import { ColumnProps } from '@/components/organism/CoreTable'
import { getRole } from '@/config/token'
import { menuState, menuStateUser, stateEnum, stateEnumUser } from '@/enum'
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

const defaultValues = {
  exams: [
    {
      id: null,
      status: 'in_progress',
      upload_date: convertToOffsetDateTime(new Date()),
    },
  ] as Exam[],
}
const useSaveExams = () => {
  const { t } = useTranslation()
  const methodForm = useFormCustom<{
    exams: Exam[]
  }>({ defaultValues })

  const { getValues, control, setValue, handleSubmit, watch, setError, reset } =
    methodForm
  const role = getRole()
  const [isLoadingUpdateStateExam, setLoadingUpdateStateExam] =
    useState<boolean>()

  const router = useRouter()
  const { id, actionType, name } = router.query
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
                fieldName: 'upload_date',
              },
            ]
          : []),
        {
          header: 'Trạng thái',
          fieldName: 'status',
        },
      ] as ColumnProps[],
    [role, isView]
  )

  const tableData = (fields ?? []).map((item, index) => {
    if (isView) {
      return {
        ...item,
        upload_date: convertToDate(item?.upload_date),
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
          params={{
            page: 1,
            size: 20,
          }}
          fetchDataFn={getAcademicYears}
          required
          rules={{
            required: t('common:validation.required'),
          }}
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
            itemList={role === 'Admin' ? menuState : menuStateUser}
            onItemAction={(item) => {
              setValue(`exams.${index}.status`, item?.value as any)
              console.log(item)
              setAnchorEl(null)
            }}
            currentValue={selectedMenu}
          />
        </div>
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
    },
  })

  useEffect(() => {
    if (!!id && data?.data?.data) {
      console.log(data?.data?.data, 'lozd')
      const format = {
        ...data?.data?.data,
        upload_date: convertToOffsetDateTime(
          convertToDate(data?.data?.data?.upload_date)
        ),
      }
      reset({ exams: [format] })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data?.data])

  const onSubmit = handleSubmit(async (input) => {
    console.log(input, 'JACkJACk')
    mutate({
      method: isUpdate ? 'put' : 'post',
      data: isUpdate ? input.exams[0] : (input.exams as Exam[]),
    })
  })

  const onReRequest = handleSubmit(async (input) => {
    mutate({
      method: 'put',
      data: input.exams[0],
    })
  })
  return [
    {
      isLoadingSubmit,
      methodForm,
      columns,
      tableData,
      actionType,
      name,
      id,
      isLoading,
      isLoadingUpdateStateExam,
      isUpdate,
      isView,
      router,
      role,
    },
    { append, remove, onSubmit, onReRequest, changeStateExam },
  ] as const
}

export default useSaveExams
