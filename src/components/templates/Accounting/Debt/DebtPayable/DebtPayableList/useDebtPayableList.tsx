import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { useQueryGetDebtPaidList } from '@/service/accounting/debtPaid/getList'
import { RequestBody } from '@/service/accounting/debtPaid/getList/type'
import { useQueryGetTotalPayableDebt } from '@/service/accounting/debtPaid/getTotal'
import { useQueryGetFiscalYearConfig } from '@/service/common/company/getFiscalYearConfig'
import { getTranText } from '@/utils/tranText'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useState } from 'react'

const defaultValues = {
  page: 0,
  size: 20,
}

const useDebtPayableList = () => {
  const { t } = useTranslation('accounting/debt-payable')
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const { id } = useAppSelector((state) => state.ledgerRefData)

  const { reset, handleSubmit, setValue } = methodForm

  const { data: fiscalYearConfig } = useQueryGetFiscalYearConfig()

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  useEffect(() => {
    if (fiscalYearConfig) {
      setQueryPage({
        ...queryPage,
        start: fiscalYearConfig.data.startFiscalYear,
        end: fiscalYearConfig.data.endFiscalYear,
      })
      setValue('start', fiscalYearConfig.data.startFiscalYear)
      setValue('end', fiscalYearConfig.data.endFiscalYear)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fiscalYearConfig, setValue])

  const columns = useMemo(
    () =>
      [
        {
          fieldName: 'name',
        },
        {
          fieldName: 'openBalanceDebit',
        },
        {
          fieldName: 'openBalanceCredit',
        },

        {
          fieldName: 'ariseDebit',
        },
        {
          fieldName: 'ariseCredit',
        },
        {
          fieldName: 'endingBalanceDebit',
        },
        {
          fieldName: 'endingBalanceCredit',
        },
      ] as ColumnProps[],
    []
  )

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }

    setQueryPage(input)
  }

  const onReset = () => {
    reset(defaultValues)
    const input = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onSubmit = handleSubmit(async (input) => {
    setQueryPage(input)
  })

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryGetDebtPaidList(
    {
      ...queryPage,
      vendorId: queryPage?.vendor?.id,
      vendor: null,
      accountLedgerId: id,
    },
    {
      enabled: !!queryPage?.start && !!queryPage?.end,
    }
  )

  const { isLoading: isLoadingGetTotalDebt, data: totalDebt } =
    useQueryGetTotalPayableDebt(
      {
        ...queryPage,
        vendorId: queryPage?.vendor?.id,
        vendor: null,
        accountLedgerId: id,
      },
      {
        enabled: !!queryPage?.start && !!queryPage?.end,
      }
    )

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      partner: item.code + ' - ' + item.name,
      vendorId: item.id,
      name: <Typography variant='subtitle1'>{getTranText(item)}</Typography>,
      openBalanceDebit: (
        <CurrencyFormatCustom variant='body1' amount={item.openBalance.debit} />
      ),
      openBalanceCredit: (
        <CurrencyFormatCustom
          variant='body1'
          amount={item.openBalance.credit}
        />
      ),
      ariseDebit: (
        <CurrencyFormatCustom variant='body1' amount={item.arise.debit} />
      ),
      ariseCredit: (
        <CurrencyFormatCustom variant='body1' amount={item.arise.credit} />
      ),
      endingBalanceDebit: (
        <CurrencyFormatCustom
          variant='body1'
          amount={item.endingBalance.debit}
        />
      ),
      endingBalanceCredit: (
        <CurrencyFormatCustom
          variant='body1'
          amount={item.endingBalance.credit}
        />
      ),
    }
  })

  return [
    {
      queryPage,
      methodForm,
      isLoadingGetTotalDebt,
      totalDebt: totalDebt ? totalDebt.data : null,
      columns,
      isLoadingTable,
      tableData,
      page: data?.data?.page,
      size: data?.data?.size,
      totalPages: data?.data?.totalPages,
    },
    { onSubmit, onReset, onChangePageSize, refetch },
  ] as const
}

export default useDebtPayableList
