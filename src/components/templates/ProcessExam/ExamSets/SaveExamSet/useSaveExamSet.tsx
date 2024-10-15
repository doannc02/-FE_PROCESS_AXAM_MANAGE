import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import DisplayStatus from '@/components/molecules/DisplayStatus'
import { Tooltip } from '@/components/molecules/Tooltip'
import { TopAction } from '@/components/molecules/TopAction'
import { ColumnProps } from '@/components/organism/CoreTable'
import { getRole } from '@/config/token'
import { BLACK, GREEN, ORANGE, RED } from '@/helper/colors'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useAppDispatch } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { getExamList } from '@/service/exam'
import {
  actionExamSet,
  changeStateExamSet,
  useQueryGetDetailExamSet,
} from '@/service/examSet'
import { ExamSet, RequestExamSet, state } from '@/service/examSet/type'
import { convertToDate } from '@/utils/date/convertToDate'
import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const defaultValues = {
  status: 'in_progress' as any,
  isCreateExam: false,
}
export const useSaveExamSet = () => {
  const { t } = useTranslation('')
  const role = getRole()
  const dispatch = useAppDispatch()
  const methodForm = useFormCustom<ExamSet>({
    defaultValues,
  })
  const { control, watch, reset, setValue, getValues, setError, handleSubmit } =
    methodForm
  const router = useRouter()
  const isAddNew = router.asPath.includes('/addNew')
  const { actionType, id, idProposal, codePlan } = router.query
  const isUpdate = !!id && !isAddNew
  const isView = actionType === 'VIEW'

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exams',
    keyName: 'key',
  })

  const { showDialog } = useDialog()
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

        {
          header: 'Năm học áp dụng',
          fieldName: 'academic_year',
        },

        {
          header: 'Ngày upload',
          fieldName: 'create_at',
        },

        {
          header: 'Trạng thái',
          fieldName: 'status',
        },
        {
          header: '',
          fieldName: 'action',
        },
      ] as ColumnProps[],
    []
  )

  const tableData = (watch('exams') ?? []).map((item, index) => {
    const exceptValues = watch(`exams`)
      .filter((i) => watch(`exams.${index}.id`) !== i?.id)
      .map((i) => {
        return {
          id: i?.id,
        }
      })
      .filter((i) => !!i)
    return {
      ...item,
      create_at: convertToDate(watch(`exams.${index}.create_at`)),
      description: watch(`exams.${index}.description`) && (
        <Stack direction='row' justifyContent='space-between'>
          <Typography>
            {watch(`exams.${index}.description`)?.slice(0, 19)}
          </Typography>
          {watch(`exams.${index}.description`)?.length > 20 ? (
            <div className='w-1/3'>
              <Tooltip
                isShowIcon
                showText
                tooltips={[
                  { title: watch(`exams.${index}.description`) ?? '' },
                ]}
              ></Tooltip>
            </div>
          ) : (
            <div className='w-1/3'></div>
          )}
        </Stack>
      ),
      comment: watch(`exams.${index}.comment`) && (
        <Stack direction='row' justifyContent='space-between'>
          <Typography>
            {watch(`exams.${index}.comment`).slice(0, 19)}
          </Typography>
          {watch(`exams.${index}.comment`)?.length > 20 ? (
            <div className='w-1/3'>
              <Tooltip
                isShowIcon
                showText
                tooltips={[{ title: watch(`exams.${index}.comment`) ?? '' }]}
              ></Tooltip>
            </div>
          ) : (
            <div className='w-1/3'></div>
          )}
        </Stack>
      ),
      academic_year: watch(`exams.${index}.academic_year`)?.name,
      user: watch(`exams.${index}.user`)?.name,
      status: watch(`exams.${index}.status`) && (
        <DisplayStatus
          text={
            watch(`exams.${index}.status`) === 'pending_approval'
              ? 'Chờ phê duyệt'
              : watch(`exams.${index}.status`) === 'in_progress'
              ? 'Đang thực hiện'
              : watch(`exams.${index}.status`) === 'approved'
              ? 'Đã phê duyệt'
              : 'Bị từ chối'
          }
          color={
            watch(`exams.${index}.status`) === 'pending_approval'
              ? ORANGE
              : watch(`exams.${index}.status`) === 'in_progress'
              ? BLACK
              : watch(`exams.${index}.status`) === 'approved'
              ? GREEN
              : RED
          }
        />
      ),
      name: (
        <CoreAutoCompleteAPI
          label=''
          labelPath2='code'
          params={{
            page: 1,
            size: 20,
            isGetForAddExamSet: true,
          }}
          placeholder='Chọn đề cương chi tiết'
          control={control}
          fetchDataFn={getExamList}
          name={`exams.${index}`}
          onChangeValue={(val) => {
            setValue(`exams.${index}`, val)
          }}
          exceptValues={exceptValues}
          required
          rules={{
            required: t('common:validation.required'),
          }}
        />
      ),
      code: watch(`exams.${index}.code`),
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

  // get data detail step proposal
  const { data, isLoading, refetch } = useQueryGetDetailExamSet(
    {
      req: Number(id),
    },
    { enabled: !!id }
  )

  // mutate proposal
  const { mutate, isLoading: isLoadingSubmit } = useMutation(actionExamSet, {
    onSuccess: (res: any) => {
      if (res?.errs) {
        errorMsg(res?.message ?? 'Đã tồn tại', setError)
      }
      if (res?.data?.id) {
        successMsg(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.EXAM_SET}/[id]`,
          query: {
            id: res?.data?.id,
            actionType: 'VIEW',
          },
        })
        refetch()
      }
    },
    onError: (error: any) => {
      errorMsg(error, setError)
    },
  })

  useEffect(() => {
    if (isUpdate && data?.data) {
      console.log(data?.data)
      reset({
        ...data?.data?.data,
        isCreateExam: data?.data?.data?.exams?.length > 0 ? true : false,
      })
    }
  }, [data?.data, isUpdate, reset])

  const handleFormSubmit = async (input: ExamSet, status: state) => {
    const { isCreateExam, ...rest } = input
    console.log(input, 'input')
    let isValid = true

    if (input.exam_quantity && !!watch('isCreateExam')) {
      input.exams.forEach((item, index) => {
        if (!item?.code) {
          setError(`exams.${index}`, {
            message: 'Trường này là bắt buộc',
          })
          isValid = false
        }
        if (status === 'approved' || status === 'rejected') {
          if (item?.status === 'in_progress') {
            errorMsg(
              `Không thể phê duyệt bộ đề do vẫn còn đề chi tiết ở trạng thái "Đang thực hiện"`
            )
          }
        }
      })
    }

    if (!isValid) {
      errorMsg('Vui lòng chọn đề chi tiết')
      return
    }

    mutate({
      method: isUpdate ? 'put' : 'post',
      data: {
        ...rest,
        status: status,
        exams: !!getValues('isCreateExam') ? input.exams : [],
        proposal: !!idProposal
          ? {
              id: Number(idProposal),
              code: '',
              name: '',
            }
          : undefined,
      },
    })
  }

  const onSubmit = handleSubmit(async (input) => {
    await handleFormSubmit(input, 'pending_approval')
  })

  const onSubmitInProgress = handleSubmit(async (input) => {
    await handleFormSubmit(input, 'in_progress')
  })

  const onSubmitReject = handleSubmit(async (input) => {
    await handleFormSubmit(input, 'rejected')
  })

  const onSubmitApprove = handleSubmit(async (input) => {
    await handleFormSubmit(input, 'approved')
  })

  const onUpdateState = async (state: state) => {
    try {
      const params = {
        status: state,
        examSetId: watch('id'),
      } as RequestExamSet['UPDATE_STATE']
      const res = await changeStateExamSet(params)
      if (res?.data?.id) {
        console.log(res?.data, 'resdata')
        successMsg('Phê duyệt thành công!!!')
        router.push({
          pathname: `${MENU_URL.EXAM_SET}/[id]`,
          query: {
            id: res?.data?.id,
            actionType: 'VIEW',
          },
        })
        refetch()
      }
    } catch {
      errorMsg('Phê duyệt bộ đề thất bại!')
    }
  }

  return [
    {
      methodForm,
      nameExamSet: watch('name'),
      isLoading,
      router,
      isLoadingSubmit,
      isView,
      isUpdate,
      actionType,
      id,
      columns,
      tableData,
      role,
      fields,
      codePlan,
    },
    {
      onSubmit,
      append,
      t,
      onSubmitInProgress,
      onUpdateState,
      handleFormSubmit,
      onSubmitApprove,
      onSubmitReject,
      showDialog,
    },
  ] as const
}
