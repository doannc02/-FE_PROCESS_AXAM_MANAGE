import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL } from '@/routes'
import { useQueryGetAccountDetail } from '@/service/accounting/account/getDetail'
import { postAccount, putAccount } from '@/service/accounting/account/save'
import { RequestBody } from '@/service/accounting/account/save/type'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  id: null,
  code: '',
  name: '',
  type: '',
  isAllowedReconcile: true,
}

const useSaveAccountingSystemConfig = () => {
  const { t } = useTranslation('accounting/accounting-system-config')
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isUpdate = !!id
  const isView = actionType === 'VIEW'

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues,
  })

  const { setError, handleSubmit, reset, watch } = methodForm

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putAccount : postAccount,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        if (res && res.data && res.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.CONFIG.ACCOUNTING.SYSTEM}/[id]`,
            query: {
              id: res.data?.data?.id,
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

  const { data, isLoading, refetch } = useQueryGetAccountDetail(
    { id },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data && data.data) {
      reset(data.data)
    }
  }, [id, data, reset])

  return [
    {
      id,
      isUpdate,
      isLoading,
      isLoadingSubmit,
      methodForm,
      isView,
      code: data?.data.code,
    },
    { onSubmit, onCancel, watch },
  ] as const
}

export default useSaveAccountingSystemConfig
