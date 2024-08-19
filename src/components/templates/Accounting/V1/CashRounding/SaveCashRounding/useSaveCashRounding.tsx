import { MAX_VALUE } from '@/helper/contain'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL } from '@/routes'
import { useQueryGetAccountList } from '@/service/accounting/account/getList'
import { useQueryGetCashRoundingDetail } from '@/service/accounting/cashRounding/getDetail'
import {
  postCashRounding,
  putCashRounding,
} from '@/service/accounting/cashRounding/save'
import { RequestBody } from '@/service/accounting/cashRounding/save/type'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  id: null,
  name: '',
  profitAccountId: null,
  lossAccountId: null,
  activated: true,
}

const useSaveCashRounding = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const id = Number(router.query?.id)
  const isUpdate = !!id

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues,
  })

  const { control, formState, handleSubmit, reset, setError } = methodForm

  const { data, isLoading, refetch } = useQueryGetCashRoundingDetail(
    { id },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data && data.data) {
      reset({ ...data.data, activated: data.data.activated ?? false })
    }
  }, [id, data, reset])

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putCashRounding : postCashRounding,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.CONFIG.CASH_ROUNDING}/[id]`,
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

  const { isLoading: isLoadingAccountSelect, data: accountSelect } =
    useQueryGetAccountList({
      page: 0,
      size: MAX_VALUE,
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
      isLoadingAccountSelect,
      accountSelect: (accountSelect?.data?.content ?? []).map((item) => ({
        id: item.id,
        name: item.code + ' - ' + item.name,
      })),
    },
    { onSubmit, onCancel },
  ] as const
}

export default useSaveCashRounding
