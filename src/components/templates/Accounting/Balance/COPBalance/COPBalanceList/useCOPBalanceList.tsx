import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { useCheckPath } from '@/path'
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

const useCOPBalanceList = () => {
  const { t } = useTranslation('accounting/cop-balance')
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const { currency } = useAppSelector((state) => state.companyConfigData)
  const { id: accountLedgerId } = useAppSelector((state) => state.ledgerRefData)

  const { balanceTypePath } = useCheckPath()
  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const columns = useMemo(
    () =>
      [
        {
          header: t('table_customer.accountName'),
          fieldName: 'accountName',
        },

        balanceTypePath === 'CUSTOMER'
          ? {
              header: t('table_customer.partnerCode'),
              fieldName: 'partnerCode',
            }
          : {
              header: t('table_provider.partnerCode'),
              fieldName: 'partnerCode',
            },
        balanceTypePath === 'CUSTOMER'
          ? {
              header: t('table_customer.partnerName'),
              fieldName: 'partnerName',
            }
          : {
              header: t('table_provider.partnerName'),
              fieldName: 'partnerName',
            },
        {
          header: t('table_customer.debit') + ` (${currency})`,
          fieldName: 'debit',
        },
        {
          header: t('table_customer.credit') + ` (${currency})`,
          fieldName: 'credit',
        },
        ...(queryPage?.currency
          ? [
              {
                header: t('table_customer.amountSourceDebit'),
                fieldName: 'amountSourceDebit',
              },
              {
                header: t('table_customer.amountSourceCredit'),
                fieldName: 'amountSourceCredit',
              },
            ]
          : []),
      ] as ColumnProps[],
    [balanceTypePath, currency, queryPage?.currency, t]
  )

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryGetBankBalanceList({
    ...queryPage,
    accountLedgerId,
    beginType: balanceTypePath === 'CUSTOMER' ? 'CUSTOMER' : 'VENDOR',
    accountId: queryPage?.account?.id,
    partnerId: queryPage?.partner?.id,
    currencyId: queryPage?.currency?.id,
    currency: null,
    account: null,
    partner: null,
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
    useQueryGetAccountBalanceTypeTotal({
      beginType: balanceTypePath === 'CUSTOMER' ? 'CUSTOMER' : 'VENDOR',
      searchBankAccount: queryPage?.searchBankAccount,
      accountId: queryPage?.account?.id,
      currencyId: queryPage?.currency?.id,
      partnerId: queryPage?.partner?.id,
      accountLedgerId,
    })

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      accountName: (
        <Typography variant='subtitle1'>
          {item.account.code} - {item?.account?.name}
        </Typography>
      ),
      partnerCode: item?.partner?.code,
      partnerName: item?.partner?.name,
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

export default useCOPBalanceList
