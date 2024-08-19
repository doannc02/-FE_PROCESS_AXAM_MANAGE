import { useDialog } from '@/components/hooks/dialog/useDialog'
import { MAX_VALUE } from '@/helper/contain'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useCheckPath } from '@/path'
import { useAppSelector } from '@/redux/hook'
import { useQueryGetAccountList } from '@/service/accounting/account/getList'
import { useQueryGetAccountJournalCashBankList } from '@/service/accounting/accountJournal/getCashBank'
import { postAccountPayment } from '@/service/accounting/accountPayment/save'
import { RequestBody } from '@/service/accounting/accountPayment/save/type'
import { useQueryGetMoneyPaid } from '@/service/accounting/paymentTerm/getMoneyPaid'
import { useQueryGetBankOfCompanyList } from '@/service/common/company/getListBank'
import { useQueryGetCurrenciesOfCompany } from '@/service/common/company/getListCurrency'
import { useQueryGetCompanyUserLogin } from '@/service/common/company/userLogin'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'

export type Props = {
  bankAccount?: any
  paymentTypeOfInv?: 'CASH' | 'BANK'
  id: number
  type: 'INBOUND' | 'OUTBOUND'
  name: string
  refetch: any
}

const useDialogPayment = ({
  bankAccount,
  paymentTypeOfInv,
  id,
  name,
  type,
  refetch,
}: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()
  const ledgerRefDefault = useAppSelector((state) => state.ledgerRefData)

  const { currencyId } = useAppSelector((state) => state.companyConfigData)

  const defaultValues = {
    id: null,
    accountMoveId: id,
    note: name,
    paymentDate: moment().format('YYYY-MM-DD'),
    paymentType: type,
    description: '',
    branchId: null,
    keepOpen: true,
    currencyId,
    haveEarlyDiscount: null,
    ...(paymentTypeOfInv ? { paymentMethod: paymentTypeOfInv } : {}),
    ...(bankAccount?.id ? { bankAccountId: bankAccount.id } : {}),
  }

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues,
  })

  const [amountValue, setAmountValue] = useState(0)

  const { handleSubmit, watch, setValue, setError } = methodForm

  const { data, isLoading } = useQueryGetMoneyPaid({
    accountMoveId: id,
    dayPayment: watch('paymentDate') ?? moment().format('YYYY-MM-DD'),
  })

  const {
    isLoading: isLoadingUserLogin,
    data: userLoginData,
    refetch: refetchUserLoginData,
  } = useQueryGetCompanyUserLogin()

  const { isLoading: isLoadingCurrencySelect, data: currencySelect } =
    useQueryGetCurrenciesOfCompany({
      page: 0,
      size: MAX_VALUE,
    })

  const { isLoading: isLoadingAccountJournal, data: accountJournalSelect } =
    useQueryGetAccountJournalCashBankList({
      accountLedgerId: Number(ledgerRefDefault.id),
      page: 0,
      size: MAX_VALUE,
    })

  // list tai khoan theo cong ty

  const { isLoading: isLoadingAccountBankComp, data: accountBankSelectComp } =
    useQueryGetBankOfCompanyList({
      page: 0,
      size: MAX_VALUE,
    })
  useEffect(() => {
    if (id && data && data.data) {
      if (paymentTypeOfInv) {
        setValue(
          'accountJournalId',
          Number(
            accountJournalSelect?.data?.content?.find(
              (i) => i.type === paymentTypeOfInv
            )?.id
          )
        )
      }
      setAmountValue(data.data.moneyPaid)
      setValue('haveEarlyDiscount', data.data.haveEarlyDiscount)
      setValue('amount', data.data.moneyPaid)
    }
  }, [
    id,
    data,
    setValue,
    paymentTypeOfInv,
    accountJournalSelect?.data?.content,
  ])

  const { isLoading: isLoadingAccountSelect, data: accountSelect } =
    useQueryGetAccountList({
      page: 0,
      size: MAX_VALUE,
      type: 'ASSET_CASH',
    })

  const { typePath } = useCheckPath()

  // SUBMIT
  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    postAccountPayment,
    {
      onSuccess: (data) => {
        successMsg(t('common:message.success'))
        refetch()
      },
      onError: (error) => {
        errorMsg(error, setError)
      },
    }
  )

  const onSubmit = handleSubmit(async (input) => {
    mutate(input)
    hideDialog()
  })
  return [
    {
      amountValue,
      isLoading,
      data,
      typePath,
      currencyId,
      moneyPaid: data?.data.moneyPaid,
      accountSelect: accountSelect ? accountSelect.data.content : [],
      isLoadingAccountSelect,
      isLoadingSubmit,
      methodForm,
      isLoadingAccountJournal,
      accountJournalSelect: accountJournalSelect
        ? paymentTypeOfInv
          ? accountJournalSelect.data.content.filter(
              (i) => i.type === paymentTypeOfInv
            )
          : accountJournalSelect.data.content
        : [],
      haveEarlyDiscount: data?.data.haveEarlyDiscount,
      isLoadingCurrencySelect,
      currencySelect: currencySelect ? currencySelect.data.content : [],
      isLoadingUserLogin,
      bankSelect: bankAccount
        ? (accountBankSelectComp?.data?.content ?? []).map((item) => ({
            label: item?.bank + ' - ' + item?.accountNumber,
            value: item.id,
          }))
        : userLoginData
        ? (userLoginData?.data?.bankAccountOutputs ?? []).map((item) => ({
            label: item.bank + ' - ' + item.accountNumber,
            value: item.id,
          }))
        : [],
    },
    { onSubmit, refetchUserLoginData, setAmountValue },
  ] as const
}

export default useDialogPayment
