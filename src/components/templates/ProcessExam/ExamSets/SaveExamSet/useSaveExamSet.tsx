import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import DisplayStatus from '@/components/molecules/DisplayStatus'
import { Tooltip } from '@/components/molecules/Tooltip'
import { TopAction } from '@/components/molecules/TopAction'
import { ColumnProps } from '@/components/organism/CoreTable'
import { getRole } from '@/config/token'
import { BLACK, GREEN, ORANGE, RED } from '@/helper/colors'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import defaultValue from '@/redux/defaultValue'
import { useAppDispatch } from '@/redux/hook'
import { setButtonConfig } from '@/redux/reducer/buttonReducer'
import { setCompanyConfig } from '@/redux/reducer/companyConfigReducer'
import { setFontConfig } from '@/redux/reducer/fontReducer'
import { setThemeColor } from '@/redux/reducer/themeColorReducer'
import { MENU_URL } from '@/routes'
import { getExamList } from '@/service/exam'
import {
  actionExamSet,
  changeStateExamSet,
  useQueryGetDetailExamSet,
} from '@/service/examSet'
import { ExamSet, RequestExamSet, state } from '@/service/examSet/type'
import {
  actionProposals,
  useQueryGetDetailProposals,
} from '@/service/proposals'
import { Proposals, ResponseProposals } from '@/service/proposals/type'
import { CommonObject } from '@/service/type'
import {
  convertToDate,
  convertToOffsetDateTime,
} from '@/utils/date/convertToDate'
import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const defaultValues = {
  status: 'in_progress' as any,
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
  const { actionType, id } = router.query
  const isUpdate = !!id && !isAddNew
  const isView = actionType === 'VIEW'

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exams',
    keyName: 'key',
  })

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
          fieldName: 'upload_date',
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
    return {
      ...item,
      upload_date: convertToDate(watch(`exams.${index}.upload_date`)),
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
          }}
          placeholder='Chọn đề cương chi tiết'
          control={control}
          fetchDataFn={getExamList}
          name={`exams.${index}`}
          onChangeValue={(val) => {
            setValue(`exams.${index}`, val)
          }}
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

    if (input.exam_quantity) {
      input.exams.forEach((item, index) => {
        console.log('zzzzzl')
        if (!item.code) {
          console.log('lmm')
          setError(`exams.${index}`, {
            message: 'Trường này là bắt buộc',
          })
          isValid = false
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
      },
    })
  }

  const onSubmit = handleSubmit(async (input) => {
    await handleFormSubmit(input, 'pending_approval')
  })

  const onSubmitInProgress = handleSubmit(async (input) => {
    await handleFormSubmit(input, 'in_progress')
  })

  const onUpdateState = async (state: state) => {
    try {
      const params = {
        status: state,
        examSetId: watch('id'),
      } as RequestExamSet['UPDATE_STATE']
      const res = await changeStateExamSet(params)
      if (res?.data?.data?.id) {
        console.log(res?.data, 'resdata')
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
    },
    { onSubmit, append, t, onSubmitInProgress, onUpdateState },
  ] as const
}
