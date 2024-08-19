import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { useQueryGetAccountBalanceTypeTotal } from '@/service/accounting/accountMoveLine/getBalanceTypeTotal'
import { useQueryGetBankBalanceList } from '@/service/accounting/accountMoveLine/getBankBalanceList'
import { RequestBody } from '@/service/accounting/accountMoveLine/getBankBalanceList/type'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  page: 0,
  size: 20,
}

const useBankBalanceList = () => {
  const { t } = useTranslation('accounting/bank-balance')
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const { currency } = useAppSelector((state) => state.companyConfigData)
  const { id: accountLedgerId } = useAppSelector((state) => state.ledgerRefData)

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.bankAccountNumber'),
          fieldName: 'bankAccountNumber',
        },
        {
          header: t('table.bankAccountName'),
          fieldName: 'bankAccountName',
        },
        {
          header: t('table.accountName'),
          fieldName: 'accountName',
        },
        {
          header: t('table.debit') + ` (${currency})`,
          fieldName: 'debit',
        },
        {
          header: t('table.credit') + ` (${currency})`,
          fieldName: 'credit',
        },
        ...(queryPage?.currency
          ? [
              {
                header: t('table.amountSourceDebit'),
                fieldName: 'amountSourceDebit',
              },
              {
                header: t('table.amountSourceCredit'),
                fieldName: 'amountSourceCredit',
              },
            ]
          : []),
      ] as ColumnProps[],
    [currency, queryPage?.currency, t]
  )

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryGetBankBalanceList({
    ...queryPage,
    accountLedgerId,
    beginType: 'BANK',
    accountId: queryPage?.account?.id,
    partnerId: queryPage?.partner?.id,
    currencyId: queryPage?.currency?.id,
    currency: null,
    account: null,
    partner: null,
  })

  const { data: totalData, refetch: refetchTotal } =
    useQueryGetAccountBalanceTypeTotal({
      beginType: 'BANK',
      searchBankAccount: queryPage?.searchBankAccount,
      accountId: queryPage?.account?.id,
      currencyId: queryPage?.currency?.id,
      partnerId: queryPage?.partner?.id,
      accountLedgerId,
    })

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    setQueryPage(input)
  }

  const onReset = () => {
    methodForm.reset(defaultValues)
    const input = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onSubmit = methodForm.handleSubmit(async (input) => {
    setQueryPage(input)
  })

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      bankAccountNumber: (
        <Typography variant='subtitle1'>
          {item?.bankAccount?.accountNumber}
        </Typography>
      ),
      bankAccountName: item?.bankAccount.bank,
      accountName: item.account?.name,
      debit: <CurrencyFormatCustom variant='body1' amount={item.debit} />,
      credit: <CurrencyFormatCustom variant='body1' amount={item.credit} />,
      amountSourceCredit: (
        <CurrencyFormatCustom
          variant='body1'
          amount={item.amountSourceCredit}
        />
      ),
      amountSourceDebit: (
        <CurrencyFormatCustom variant='body1' amount={item.amountSourceDebit} />
      ),
    }
  })

  return [
    {
      queryPage,
      methodForm,
      columns,
      isLoadingTable,
      tableData,
      totalData: totalData ? totalData.data : null,
      page: data?.data?.page,
      size: data?.data?.size,
      totalPages: data?.data?.totalPages,
    },
    { onSubmit, onReset, onChangePageSize, refetchTotal, refetch },
  ] as const
}

export default useBankBalanceList
