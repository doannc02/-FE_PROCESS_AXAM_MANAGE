import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL } from '@/routes'
import { useQueryGetAccountTagDetail } from '@/service/accounting/accountTag/getDetail'
import {
  postAccountTag,
  putAccountTag,
} from '@/service/accounting/accountTag/save'
import { RequestBody } from '@/service/accounting/accountTag/save/type'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  id: null,
  name: '',
}

const useSaveAccountTag = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isUpdate = !!id
  const isView = actionType === 'VIEW'

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues,
  })

  const { control, formState, handleSubmit, reset, setError } = methodForm

  const { data, isLoading, refetch } = useQueryGetAccountTagDetail(
    { id },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data && data.data) {
      reset(data.data)
    }
  }, [id, data, reset])

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putAccountTag : postAccountTag,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.CONFIG.ACCOUNTING.ACCOUNT_TAG}/[id]`,
            query: {
              id: res?.data?.data?.id,
              actionType: 'VIEW',
            },
          })
          refetch()
        }
      },
      onError: (error) => {
        errorMsg(error, setError)
      },
    }
  )

  const onSubmit = handleSubmit(async (data) => {
    mutate(data)
  })

  return [
    {
      id,
      control,
      formState,
      isUpdate,
      isLoading,
      isLoadingSubmit,
      methodForm,
      isView,
    },
    { onSubmit, onCancel },
  ] as const
}

export default useSaveAccountTag
