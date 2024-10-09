import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import defaultValue from '@/redux/defaultValue'
import { useAppDispatch } from '@/redux/hook'
import { setButtonConfig } from '@/redux/reducer/buttonReducer'
import { setCompanyConfig } from '@/redux/reducer/companyConfigReducer'
import { setFontConfig } from '@/redux/reducer/fontReducer'
import { setThemeColor } from '@/redux/reducer/themeColorReducer'
import { MENU_URL } from '@/routes'
import { actionExamSet, useQueryGetDetailExamSet } from '@/service/examSet'
import { ExamSet } from '@/service/examSet/type'
import {
  actionProposals,
  useQueryGetDetailProposals,
} from '@/service/proposals'
import { Proposals, ResponseProposals } from '@/service/proposals/type'
import { convertToOffsetDateTime } from '@/utils/date/convertToDate'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const defaultValues = {
  status: 'in_progress' as any,
}
export const useSaveExamSet = () => {
  const { t } = useTranslation('')
  const dispatch = useAppDispatch()
  const methodForm = useFormCustom<ExamSet>({
    defaultValues,
  })
  const { control, watch, getValues, reset, setError, handleSubmit } =
    methodForm
  const router = useRouter()
  const isAddNew = router.asPath.includes('/addNew')
  const { actionType, id } = router.query
  const isUpdate = !!id && !isAddNew
  const isView = actionType === 'VIEW'

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
      if (res?.data?.data?.id) {
        successMsg(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.EXAM_SET}/[id]`,
          query: {
            id: res?.data?.data?.id,
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

  const onSubmit = handleSubmit(async (input) => {
    const { isCreateExam, ...rest } = input
    mutate({
      method: isUpdate ? 'post' : 'post',
      data: {
        ...rest,
      },
    })
    //console.log(input, "DICAILON")
  })

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
    },
    { onSubmit, t },
  ] as const
}
