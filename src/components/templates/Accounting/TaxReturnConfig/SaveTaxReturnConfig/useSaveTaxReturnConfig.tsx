import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { actionTaxReturnConfig } from '@/service/accounting/taxReturn/taxReturnConfig/action'
import { useQueryGetTaxReturnConfigDetail } from '@/service/accounting/taxReturn/taxReturnConfig/getDetail'
import { TaxConfig } from '@/service/accounting/taxReturn/taxReturnConfig/getDetail/type'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  id: null,
  code: '',
  name: '',
  circularName: '',
  periodType: 'MONTH',
  isActive: true,
}

const useSaveTaxReturnConfig = () => {
  const { t } = useTranslation(TRANSLATE.TAX_RETURN)
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isUpdate = !!id
  const isView = actionType === 'VIEW'

  const methodForm = useFormCustom<TaxConfig>({
    defaultValues,
  })

  const { control, formState, handleSubmit, reset, setError } = methodForm

  const { data, isLoading, refetch } = useQueryGetTaxReturnConfigDetail(
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
    actionTaxReturnConfig,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.TAX_RETURN_CONFIG}/[id]`,
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
    mutate({
      method: 'put',
      params: {
        id,
      },
      data,
    })
  })

  return [
    {
      id,
      name: data?.data.name,
      control,
      formState,
      isUpdate,
      isLoading,
      isLoadingSubmit,
      methodForm,
      isView,
    },
    { t, onSubmit, onCancel },
  ] as const
}

export default useSaveTaxReturnConfig
