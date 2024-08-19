import { useDialog } from '@/components/hooks/dialog/useDialog'
import { MAX_VALUE } from '@/helper/contain'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useQueryGetAccountJournalCashBankList } from '@/service/accounting/accountJournal/getCashBank'
import { useQueryGetPaymentDebt } from '@/service/accounting/debtReceivable/getPayment'
import { postPaymentDebt } from '@/service/accounting/debtReceivable/postPayment'
import { RequestBody } from '@/service/accounting/debtReceivable/postPayment/type'
import { useQueryGetCompanyUserLogin } from '@/service/common/company/userLogin'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo } from 'react'
import { useMutation } from 'react-query'
import { Props } from '.'

const useDialogDebtPayment = (props: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()

  const { saleOrderId, invoiceId, refetchDebtException, refetchDebtSale } =
    props

  const defaultValues = useMemo(() => {
    return {
      note: '',
      accountMoveIds: { ...invoiceId, ...saleOrderId },
    }
  }, [invoiceId, saleOrderId])

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues,
  })

  const { handleSubmit, reset, setError } = methodForm

  const { data, isLoading } = useQueryGetPaymentDebt({
    saleOrderId,
    invoiceId,
  })

  useEffect(() => {
    if (data && data.data) {
      reset({
        ...defaultValues,
        ...data.data,
        accountMoves: data.data.accountMoves.map((item) => {
          return {
            ...item,
            movePunishes: item.movePunishes.map((pu) => ({
              ...pu,
              isPenaltyExemption: false,
            })),
          }
        }),
        rejectPunishIds: [],
        note: '',
        accountMoveIds: data.data.accountMoves.map((ele) => ele.id),
      })
    }
  }, [data, defaultValues, reset])

  const {
    isLoading: isLoadingUserLogin,
    data: userLoginData,
    refetch: refetchUserLoginData,
  } = useQueryGetCompanyUserLogin()

  const { isLoading: isLoadingAccountJournal, data: accountJournalSelect } =
    useQueryGetAccountJournalCashBankList({
      page: 0,
      size: MAX_VALUE,
    })

  // SUBMIT
  const { mutate, isLoading: isLoadingSubmit } = useMutation(postPaymentDebt, {
    onSuccess: (data) => {
      successMsg(t('common:message.success'))
      refetchDebtException(), refetchDebtSale()
      hideDialog()
    },
    onError: (error) => {
      errorMsg(error, setError)
    },
  })

  const onSubmit = handleSubmit(async (input) => {
    let rejectPunishIds: number[] = []

    input.accountMoves.map((am) => {
      if (
        am.movePunishes.map((pu) => {
          if (pu.isPenaltyExemption) rejectPunishIds.push(pu.id)
          return pu
        })
      )
        return am
    })

    mutate({ ...input, rejectPunishIds })
  })
  return [
    {
      isLoading,
      data: data ? data.data : null,
      isLoadingSubmit,
      methodForm,
      isLoadingAccountJournal,
      accountJournalSelect: accountJournalSelect
        ? accountJournalSelect.data.content
        : [],
      isLoadingUserLogin,
      bankSelect: userLoginData
        ? (userLoginData?.data?.bankAccountOutputs ?? []).map((item) => ({
            label: item.accountNumber + ' - ' + item.bank,
            value: item.id,
          }))
        : [],
    },
    { onSubmit, refetchUserLoginData },
  ] as const
}

export default useDialogDebtPayment
