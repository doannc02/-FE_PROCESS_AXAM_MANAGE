import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import InvoiceStatus from '@/components/atoms/InvoiceStatus'
import PaymentStatus from '@/components/atoms/PaymentStatus'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { RED } from '@/helper/colors'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/CoreTable'
import { MAX_VALUE } from '@/helper/contain'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { useQueryGetDebtInvoiceOfSaleList } from '@/service/accounting/debtReceivable/getListInvoiceOfSale'
import { RequestBody } from '@/service/accounting/debtReceivable/getListInvoiceOfSale/type'
import { useQueryGetPartnerList } from '@/service/common/partner/getListTiny'
import { Checkbox } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

const useDebtInvoiceSale = () => {
  const { t } = useTranslation('accounting/debt-receivable')
  const router = useRouter()
  const saleOrderId = Number(router.query?.saleOrderId)

  const { showDialog } = useDialog()
  const defaultValues = {
    search: '',
    page: 0,
    size: 20,
    saleOrderId,
  }

  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const { currency } = useAppSelector((state) => state.companyConfigData)

  const { isLoading: isLoadingPartners, data: partnerSelect } =
    useQueryGetPartnerList({
      page: 0,
      size: MAX_VALUE,
    })

  const columns = useMemo(
    () =>
      [
        {
          header: '',
          fieldName: 'checkbox',
        },
        {
          header: t('table3.code'),
          fieldName: 'code',
        },
        {
          header: t('table3.date'),
          fieldName: 'date',
          styleCell: {
            style: {
              minWidth: 100,
            },
          },
        },
        {
          header: t('table3.dueDate'),
          fieldName: 'dueDate',
          styleCell: {
            style: {
              minWidth: 110,
            },
          },
        },
        {
          header: t('table3.amountTotal') + ` (${currency})`,
          fieldName: 'amountTotal',
          styleCell: {
            style: {
              minWidth: 150,
            },
          },
        },
        {
          header: t('table3.remainingAmount') + ` (${currency})`,
          fieldName: 'remainingAmount',
          styleCell: {
            style: {
              minWidth: 150,
            },
          },
        },
        {
          header: t('table3.punishAmount') + ` (${currency})`,
          fieldName: 'punishAmount',
        },
        {
          header: t('table3.punishRemainingAmount') + ` (${currency})`,
          fieldName: 'punishRemainingAmount',
        },
        {
          header: t('table3.totalMoneyHavePaid') + ` (${currency})`,
          fieldName: 'totalMoneyHavePaid',
        },
        {
          header: t('table3.paymentStatus'),
          fieldName: 'paymentStatus',
        },
        {
          header: t('table3.state'),
          fieldName: 'state',
        },
        {
          header: t('table3.action'),
          fieldName: 'action',
        },
      ] as ColumnProps[],
    [currency, t]
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
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryGetDebtInvoiceOfSaleList(queryPage)

  const methodFormTable = useFormCustom<{
    checkedList: number[]
  }>({
    defaultValues: {
      checkedList: [],
    },
  })

  const tableData = (data?.data?.content ?? []).map((item) => {
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
      amountTotal: (
        <CurrencyFormatCustom amount={item.amountTotal} color={RED} />
      ),
      remainingAmount: (
        <CurrencyFormatCustom amount={item.remainingAmount} color={RED} />
      ),
      punishAmount: (
        <CurrencyFormatCustom amount={item.punishAmount} color={RED} />
      ),
      punishRemainingAmount: (
        <CurrencyFormatCustom amount={item.punishRemainingAmount} color={RED} />
      ),
      totalMoneyHavePaid: (
        <CurrencyFormatCustom amount={item.totalMoneyHavePaid} color={RED} />
      ),
      paymentStatus: <PaymentStatus value={item.paymentStatus} />,
      state: <InvoiceStatus value={item.state} />,
      action: (
        <Action
          actionList={['watch']}
          onWatchAction={() => {
            // router.push({
            //   pathname: '/accounting/debt/receivable/[id]',
            //   query: {
            //     id: item.partnerId,
            //   },
            // })
          }}
        />
      ),
    }
  })

  return [
    {
      methodFormTable,
      isLoadingPartners,
      methodForm,
      columns,
      partnerSelect: partnerSelect ? partnerSelect.data.content : [],
      isLoadingTable,
      tableData,
      page: data?.data?.page,
      size: data?.data?.size,
      totalPages: data?.data?.totalPages,
    },
    { showDialog, refetch, onSubmit, onReset, onChangePageSize },
  ] as const
}

export default useDebtInvoiceSale
