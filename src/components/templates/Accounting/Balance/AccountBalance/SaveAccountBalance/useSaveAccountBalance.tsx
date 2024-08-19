import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { useQueryGetBalanceDetail } from '@/service/accounting/accountMoveLine/getBalanceDetail'
import { RequestBody } from '@/service/accounting/accountMoveLine/saveBankAndCOPBalance/type'
import {
  postOtherBalance,
  putOtherBalance,
} from '@/service/accounting/accountMoveLine/saveOtherBalance'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const SaveAccountBalance = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const id = Number(router.query?.id)
  const isUpdate = !!id

  const { currencyId, currency } = useAppSelector(
    (state) => state.companyConfigData
  )

  const { id: accountLedgerId } = useAppSelector((state) => state.ledgerRefData)

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues: {
      currencySource: {
        id: currencyId,
        name: currency,
      },
      accountLedger: {
        id: accountLedgerId,
      },
      amountSourceDebit: 0,
      amountSourceCredit: 0,
    },
  })

  const { handleSubmit, reset, setError } = methodForm

  const { data, refetch } = useQueryGetBalanceDetail(
    { id: Number(id), beginType: 'OTHER' },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data && data.data) {
      reset({
        ...data.data,
      })
    }
  }, [id, data, reset])

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putOtherBalance : postOtherBalance,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        if (res.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.BALANCE.ACCOUNT_BALANCE}/[id]`,
            query: {
              id: res?.data?.data?.id,
              actionType: 'VIEW',
            },
          })
          refetch()
        } else {
          router.back()
        }
      },
      onError: (error) => {
        errorMsg(error, setError)
      },
    }
  )

  const onSubmit = handleSubmit(async (data) => {
    mutate({ requestBody: data, beginType: 'OTHER' })
  })

  return [
    {
      id,
      isUpdate,
      currencyId,
      currency,
      methodForm,
      isLoadingSubmit,
    },
    { onSubmit, onCancel },
  ] as const
}

export default SaveAccountBalance
