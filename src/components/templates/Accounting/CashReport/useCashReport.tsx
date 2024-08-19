import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { TRANSLATE } from '@/routes'
import { useQueryGetCashReportList } from '@/service/accounting/cashReport/getList'
import { ReqCashReport } from '@/service/accounting/cashReport/getList/type'
import { useQueryGetCashReportTotal } from '@/service/accounting/cashReport/getTotal'
import { getEndDateOfMonth, getStartDateOfMonth } from '@/utils/date/date'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useState } from 'react'

const useCashReport = () => {
  const { t } = useTranslation(TRANSLATE.BANK_CASH_REPORT)

  const { id: accountLedgerId } = useAppSelector((state) => state.ledgerRefData)

  const defaultValues = {
    search: '',
    start: getStartDateOfMonth(true),
    end: getEndDateOfMonth(true),
    accountLedgerId: Number(accountLedgerId),
  }

  const [tableData, setTableData] = useState<any>([])

  const methodForm = useFormCustom<ReqCashReport>({
    defaultValues,
  })

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.accountingDate'),
          fieldName: 'accountingDate',
        },
        {
          header: t('table.paymentDate'),
          fieldName: 'paymentDate',
        },

        {
          header: t('table.receiptNumber'),
          fieldName: 'receiptNumber',
        },
        {
          header: t('table.payNumber'),
          fieldName: 'payNumber',
        },
        {
          header: t('table.label'),
          fieldName: 'label',
        },
        {
          header: t('table.account'),
          fieldName: 'account.code',
        },
        {
          header: t('table.reciprocalAccount'),
          fieldName: 'reciprocalAccount.code',
        },
        {
          header: t('table.debit'),
          fieldName: 'arise.debit',
        },
        {
          header: t('table.credit'),
          fieldName: 'arise.credit',
        },
        {
          header: t('table.inventoryNumber'),
          fieldName: 'inventoryNumber',
        },
        {
          header: t('table.partner'),
          fieldName: 'partner.name',
        },
      ] as ColumnProps[],
    [t]
  )

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )
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

  const {
    isLoading: isLoadingListTable,
    data,
    refetch,
  } = useQueryGetCashReportList(
    {
      ...queryPage,
    },
    {
      enabled: !!accountLedgerId,
    }
  )
  const {
    isLoading: isLoadingTotalTable,
    data: cashReportTotalData,
    refetch: cashReportTotalRefresh,
  } = useQueryGetCashReportTotal(
    {
      ...queryPage,
    },
    {
      enabled: !!accountLedgerId,
    }
  )

  useEffect(() => {
    let tableDataTemp: any = []

    if (
      data?.data &&
      cashReportTotalData?.data &&
      isLoadingListTable === false &&
      isLoadingTotalTable === false
    ) {
      const dataList = data?.data ?? []
      dataList.forEach((item, index) => {
        if (item.codeAccount) {
          tableDataTemp = [
            ...tableDataTemp,
            {
              inventoryNumber: (
                <CurrencyFormatCustom
                  variant='subtitle1'
                  amount={item?.inventoryNumber}
                />
              ),
              label: <Typography variant='subtitle1'>Số dư đầu kỳ</Typography>,
              account: {
                code: (
                  <Typography variant='subtitle1'>
                    {item?.codeAccount}
                  </Typography>
                ),
              },
            },
          ]
        }

        if (item?.reports) {
          tableDataTemp = [
            ...tableDataTemp,
            ...item.reports.map((ele) => ({
              ...ele,
              inventoryNumber: (
                <CurrencyFormatCustom
                  variant='body1'
                  amount={ele?.inventoryNumber}
                />
              ),
              arise: {
                debit: (
                  <CurrencyFormatCustom
                    variant='body1'
                    amount={ele?.arise.debit}
                  />
                ),
                credit: (
                  <CurrencyFormatCustom
                    variant='body1'
                    amount={ele?.arise.credit}
                  />
                ),
              },
            })),
          ]
        }
      })

      setTableData(tableDataTemp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isLoadingListTable,
    isLoadingTotalTable,
    data?.data,
    cashReportTotalData?.data,
  ])

  return [
    {
      methodForm,
      columns,
      isLoadingListTable,
      isLoadingTotalTable,
      tableData,
      cashReportTotalData,
    },
    { t, onSubmit, onReset, onChangePageSize, refetch },
  ] as const
}

export default useCashReport
