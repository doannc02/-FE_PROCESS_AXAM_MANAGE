import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { useQueryGetAccountBalanceList } from '@/service/accounting/accountMoveLine/getAccountBalanceList'
import { RequestBody } from '@/service/accounting/accountMoveLine/getAccountBalanceList/type'
import { useQueryGetAccountBalanceTotal } from '@/service/accounting/accountMoveLine/getTotal'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const useAccountBalance = () => {
  const { t } = useTranslation('accounting/account-balance')

  const { currency } = useAppSelector((state) => state.companyConfigData)
  const { id: accountLedgerId } = useAppSelector((state) => state.ledgerRefData)

  const defaultValues = {
    page: 0,
    size: 20,
  }

  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.code'),
          fieldName: 'code',
        },
        {
          header: t('table.name'),
          fieldName: 'name',
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

  const { isLoading: isLoadingTable, data } = useQueryGetAccountBalanceList({
    ...queryPage,
    currencyId: queryPage?.currency?.id,
    accountId: queryPage?.account?.id,
    accountLedgerId,
    currency: null,
    account: null,
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

  const { data: totalData, refetch: refetchTotal } =
    useQueryGetAccountBalanceTotal({
      currencyId: queryPage?.currency?.id,
      accountId: queryPage?.account?.id,
      accountLedgerId,
    })

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      code: <Typography variant='subtitle1'>{item.account.code}</Typography>,
      name: item.account?.name,
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
    { onSubmit, onReset, onChangePageSize, refetchTotal },
  ] as const
}

export default useAccountBalance
