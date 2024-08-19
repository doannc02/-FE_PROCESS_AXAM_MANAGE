import { errorMsg, successMsg } from '@/helper/message'
import { postAccountMoveLineMatchingPayment } from '@/service/accounting/accountMoveLineMatching/matching'
import { useTranslation } from 'next-i18next'
import { useMutation } from 'react-query'
import { Props } from '.'

const useMoneyBalanceItem = ({ item, dataInvoice, type, refetch }: Props) => {
  const { t } = useTranslation()

  // SUBMIT
  const { mutate } = useMutation(postAccountMoveLineMatchingPayment, {
    onSuccess: (data) => {
      successMsg(t('common:message.success'))
      refetch()
    },
    onError: (error) => {
      errorMsg(error)
    },
  })

  const onSubmit = () => {
    mutate({
      accountPaymentId: item.accountPaymentId,
      accountPaymentCode: item.accountPaymentCode,
      accountMoveId: Number(dataInvoice.id),
      amount: item.amount,
      accountMoveLineId: item.accountMoveLineId,
      paymentType: type,
      paymentTermId: dataInvoice?.paymentTerm?.id,
      date: dataInvoice.date,
      paymentAccountId: item.paymentAccountId,
      paymentLabel: item.paymentLabel,
      currencyId: item.currencyId,
      accountJournalId: dataInvoice.accountJournal?.id,
      payType: item.payType,
    })
    refetch()
  }

  return [{}, { onSubmit }] as const
}

export default useMoneyBalanceItem
