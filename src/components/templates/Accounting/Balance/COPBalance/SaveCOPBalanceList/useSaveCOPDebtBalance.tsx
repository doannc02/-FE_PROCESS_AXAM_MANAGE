import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useCheckPath } from '@/path'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { useQueryGetAccountConfig } from '@/service/accounting/accountConfig/get'
import { useQueryGetBalanceDetail } from '@/service/accounting/accountMoveLine/getBalanceDetail'
import {
  postBankAndCOPBalance,
  putBankAndCOPBalance,
} from '@/service/accounting/accountMoveLine/saveBankAndCOPBalance'
import { RequestBody } from '@/service/accounting/accountMoveLine/saveBankAndCOPBalance/type'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const useSaveCOPDebtBalance = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { actionType } = router.query

  const id = Number(router.query?.id)
  const isUpdate = !!id

  const { currencyId, currency } = useAppSelector(
    (state) => state.companyConfigData
  )

  const { id: accountLedgerId } = useAppSelector((state) => state.ledgerRefData)

  const { balanceTypePath } = useCheckPath()

  const { data: configData } = useQueryGetAccountConfig()

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues: {
      currencySource: {
        id: currencyId,
        name: currency,
      },
      accountLedger: {
        id: accountLedgerId,
      },
      debit: 0,
      amountSourceDebit: 0,
      credit: 0,
      amountSourceCredit: 0,
      type: 'EXTERNAL',
    },
  })
  const { handleSubmit, reset, setValue, setError, watch } = methodForm

  useEffect(() => {
    if (configData && configData.data && balanceTypePath) {
      balanceTypePath === 'CUSTOMER'
        ? watch('type') === 'EXTERNAL'
          ? setValue('account', {
              ...configData.data.receivableAccount,
              name:
                configData.data?.receivableAccount?.code +
                ' - ' +
                configData.data?.receivableAccount?.name,
            } as any)
          : setValue('account', {
              ...configData.data.receivableInternalAccount,
              name:
                configData.data?.receivableInternalAccount?.code +
                ' - ' +
                configData.data?.receivableInternalAccount?.name,
            } as any)
        : setValue('account', {
            ...configData?.data?.payableAccount,
            name:
              configData?.data?.payableAccount?.code +
              ' - ' +
              configData?.data?.payableAccount?.name,
          } as any)
    }
  }, [balanceTypePath, configData, setValue, watch])

  const { data, refetch } = useQueryGetBalanceDetail(
    {
      id: Number(id),
      beginType: balanceTypePath === 'CUSTOMER' ? 'CUSTOMER' : 'VENDOR',
    },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data && data.data) {
      reset({
        ...data.data,
        accountLedger: {
          id: accountLedgerId,
        },
      })
    }
  }, [id, data, reset, balanceTypePath, accountLedgerId])

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putBankAndCOPBalance : postBankAndCOPBalance,
    {
      onSuccess: (res) => {
        successMsg(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.BALANCE[balanceTypePath]}/[id]`,
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
      requestBody: data,
      beginType: balanceTypePath === 'CUSTOMER' ? 'CUSTOMER' : 'VENDOR',
    })
  })

  return [
    { id, isUpdate, actionType, currencyId, methodForm, isLoadingSubmit },
    { onSubmit, onCancel },
  ] as const
}

export default useSaveCOPDebtBalance
