import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import PaymentStatus from '@/components/atoms/PaymentStatus'
import { RED } from '@/helper/colors'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/CoreTable'
import { convertToDate } from '@/utils/date/convertToDate'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { useQueryGetDebtExceptionList } from '@/service/accounting/debtReceivable/getListException'
import { RequestBody } from '@/service/accounting/debtReceivable/getListException/type'
import { useQueryGetDebtSaleList } from '@/service/accounting/debtReceivable/getListSale'
import { Checkbox } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

const useDebtDetail = () => {
  const { t } = useTranslation('accounting/debt-receivable')

  const router = useRouter()
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const { currency } = useAppSelector((state) => state.companyConfigData)

  const methodFormTable = useFormCustom<{
    checkedList: number[]
  }>({
    defaultValues: {
      checkedList: [],
    },
  })

  const id = Number(router.query?.id)
  const start = router.query?.start
  const end = router.query?.end

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const columns1 = useMemo(
    () =>
      [
        {
          header: '',
          fieldName: 'checkbox',
        },
        {
          header: t('table1.code'),
          fieldName: 'code',
        },
        {
          header: t('table1.orderDate'),
          fieldName: 'orderDate',
        },
        {
          header: t('table1.amountTotal') + ` (${currency})`,
          fieldName: 'amountTotal',
        },
        {
          header: t('table1.amountPunish') + ` (${currency})`,
          fieldName: 'amountPunish',
        },
        {
          header: t('table1.action'),
          fieldName: 'action',
        },
      ] as ColumnProps[],
    [currency, t]
  )
  const columns2 = useMemo(
    () =>
      [
        {
          header: '',
          fieldName: 'checkbox',
        },
        {
          header: t('table2.code'),
          fieldName: 'code',
        },
        {
          header: t('table2.date'),
          fieldName: 'date',
        },
        {
          header: t('table2.dueDate'),
          fieldName: 'dueDate',
        },
        {
          header: t('table2.amountTotal') + ` (${currency})`,
          fieldName: 'amountTotal',
        },
        {
          header: t('table2.punishRemainingAmount') + ` (${currency})`,
          fieldName: 'punishRemainingAmount',
        },
        {
          header: t('table2.remainingAmount') + ` (${currency})`,
          fieldName: 'remainingAmount',
        },
        {
          header: t('table2.paymentStatus'),
          fieldName: 'paymentStatus',
        },
      ] as ColumnProps[],
    [currency, t]
  )
  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }

    setQueryPage(input)
  }

  const {
    isLoading: isLoadingDebtSale,
    data: debtSaleData,
    refetch: refetchDebtSale,
  } = useQueryGetDebtSaleList(
    { ...queryPage, partnerId: id, start, end },
    { enabled: !!id }
  )

  const rowDebtSaleData = (debtSaleData?.data?.content ?? []).map((item) => {
    return {
      ...item,
      checkbox: (
        <Checkbox
          checked={!!methodFormTable.watch('checkedList').includes(item.id)}
          onChange={(e, checked) => {
            const curValue = methodFormTable.getValues('checkedList')
            if (checked)
              methodFormTable.setValue('checkedList', [...curValue, item.id])
            else if (curValue.includes(item.id)) {
              methodFormTable.setValue(
                'checkedList',
                curValue.filter((ele) => ele !== item.id)
              )
            }
          }}
        />
      ),
      orderDate: convertToDate(item.orderDate),
      amountTotal: (
        <CurrencyFormatCustom amount={item.amountTotal} color={RED} />
      ),

      amountPunish: (
        <CurrencyFormatCustom amount={item.amountPunish} color={RED} />
      ),

      action: (
        <Action
          actionList={['watch']}
          onWatchAction={() => {
            router.push({
              pathname: `${MENU_URL.DEBT.RECEIVABLE}/[id]/[saleOrderId]`,
              query: {
                id: id,
                saleOrderId: item.id,
              },
            })
          }}
        />
      ),
    }
  })

  const {
    isLoading: isLoadingDebtException,
    data: debtExceptionData,
    refetch: refetchDebtException,
  } = useQueryGetDebtExceptionList(
    { ...queryPage, partnerId: id, start, end },
    { enabled: !!id }
  )

  const rowDebtExceptionData = (debtExceptionData?.data?.content ?? []).map(
    (item) => {
      return {
        ...item,
        checkbox: (
          <Checkbox
            checked={!!methodFormTable.watch('checkedList').includes(item.id)}
            onChange={(e, checked) => {
              const curValue = methodFormTable.getValues('checkedList')
              if (checked)
                methodFormTable.setValue('checkedList', [...curValue, item.id])
              else if (curValue.includes(item.id)) {
                methodFormTable.setValue(
                  'checkedList',
                  curValue.filter((ele) => ele !== item.id)
                )
              }
            }}
          />
        ),
        date: convertToDate(item.date),
        dueDate: convertToDate(item.dueDate),
        amountTotal: (
          <CurrencyFormatCustom amount={item.amountTotal} color={RED} />
        ),
        punishRemainingAmount: (
          <CurrencyFormatCustom
            amount={item.punishRemainingAmount}
            color={RED}
          />
        ),
        remainingAmount: (
          <CurrencyFormatCustom amount={item.remainingAmount} color={RED} />
        ),
        paymentStatus: <PaymentStatus value={item.paymentStatus} />,
      }
    }
  )

  return [
    {
      methodForm,
      methodFormTable,

      columns1,
      isLoadingDebtSale,
      rowDebtSaleData,
      page1: debtSaleData?.data?.page,
      size1: debtSaleData?.data?.size,
      totalPages1: debtSaleData?.data?.totalPages,

      columns2,
      isLoadingDebtException,
      rowDebtExceptionData,
      page2: debtExceptionData?.data?.page,
      size2: debtExceptionData?.data?.size,
      totalPages2: debtExceptionData?.data?.totalPages,
    },
    { onChangePageSize, refetchDebtSale, refetchDebtException },
  ] as const
}

export default useDebtDetail
