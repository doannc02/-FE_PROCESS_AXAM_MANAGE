import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import defaultValue from '@/redux/defaultValue'
import { useAppDispatch } from '@/redux/hook'
import { setButtonConfig } from '@/redux/reducer/buttonReducer'
import { setCompanyConfig } from '@/redux/reducer/companyConfigReducer'
import { setFontConfig } from '@/redux/reducer/fontReducer'
import { setThemeColor } from '@/redux/reducer/themeColorReducer'
import { MENU_URL } from '@/routes'
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
  academic_year: new Date().getFullYear().toString(),
  status: 'DRAFT' as any,
}
export const useSaveProposals = () => {
  const { t } = useTranslation('')
  const dispatch = useAppDispatch()
  const methodForm = useFormCustom<Proposals>({
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
  const { data, isLoading, refetch } = useQueryGetDetailProposals(
    {
      id: Number(id),
    },
    { enabled: !!id }
  )

  // mutate proposal
  const { mutate, isLoading: isLoadingSubmit } = useMutation(actionProposals, {
    onSuccess: (res: any) => {
      successMsg(t('common:message.success'))

      if (res?.data?.data?.id) {
        router.push({
          pathname: `${MENU_URL.PROPOSALS_ASSIGNMENT}/[id]`,
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
      reset({ ...data?.data?.data })
    }
    console.log(watch('instructor'), data?.data, isUpdate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data, isUpdate, reset])

  const onSubmit = handleSubmit(async (input) => {
    mutate({
      method: isUpdate ? 'put' : 'post',
      data: {
        ...input,
        start: convertToOffsetDateTime(input.start),
        deadline: convertToOffsetDateTime(input.deadline),
      },
    })
  })

  return [
    {
      methodForm,
      isLoading,
      router,
      isLoadingSubmit,
      isView,
      isUpdate,
      actionType,
    },
    { onSubmit, t },
  ] as const
}
