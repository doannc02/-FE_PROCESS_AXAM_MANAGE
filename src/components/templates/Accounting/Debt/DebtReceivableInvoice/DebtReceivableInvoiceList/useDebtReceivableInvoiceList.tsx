import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { RED } from '@/helper/colors'
import { ColumnProps } from '@/components/organism/CoreTable'
import { MAX_VALUE } from '@/helper/contain'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { RequestBody } from '@/service/accounting/debtReceivableInvoice/getList/type'
import { useQueryGetDebtReceivableInvoiceList } from '@/service/accounting/debtReceivableInvoice/getList'
import { useQueryGetPartnerList } from '@/service/common/partner/getListTiny'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

const useDebtReceivableInvoiceList = () => {
  const { t } = useTranslation('accounting/debt-receivable-invoice')
  const router = useRouter()
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
          header: t('table.partnerName'),
          fieldName: 'partnerName',
          styleCell: {
            style: {
              minWidth: 250,
            },
          },
        },
        {
          header: t('table.date'),
          fieldName: 'date',
        },
        {
          header: t('table.dueDate'),
          fieldName: 'dueDate',
        },
        {
          header: t('table.accountMoveCode'),
          fieldName: 'accountMoveCode',
        },
        {
          header: t('table.productName'),
          fieldName: 'productName',
          styleCell: {
            style: {
              minWidth: 300,
            },
          },
        },
        {
          header: t('table.unit'),
          fieldName: 'unit',
        },
        {
          header: t('table.quantity'),
          fieldName: 'quantity',
        },
        {
          header: t('table.unitPrice') + ` (${currency})`,
          fieldName: 'unitPrice',
        },
        {
          header: t('table.amountTotal') + ` (${currency})`,
          fieldName: 'amountTotal',
        },
        {
          header: t('table.discount') + ` (${currency})`,
          fieldName: 'discount',
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
  } = useQueryGetDebtReceivableInvoiceList(queryPage)

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      quantity: <CurrencyFormatCustom amount={item.quantity} color={RED} />,
      unitPrice: <CurrencyFormatCustom amount={item.unitPrice} color={RED} />,
      discount: <CurrencyFormatCustom amount={item.discount} color={RED} />,
      amountTotal: (
        <CurrencyFormatCustom amount={item.amountTotal} color={RED} />
      ),
    }
  })

  return [
    {
      isLoadingPartners,
      methodForm,
      columns,
      partnerSelect: partnerSelect ? partnerSelect?.data?.content : [],
      isLoadingTable,
      tableData,
      page: data?.data?.page,
      size: data?.data?.size,
      totalPages: data?.data?.totalPages,
    },
    { refetch, onSubmit, onReset, onChangePageSize },
  ] as const
}

export default useDebtReceivableInvoiceList
