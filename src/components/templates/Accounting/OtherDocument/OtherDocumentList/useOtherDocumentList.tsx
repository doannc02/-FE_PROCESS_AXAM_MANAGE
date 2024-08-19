import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { ColumnProps } from '@/components/organism/CoreTable'
import { documentType } from '@/enum/index'
import { RED } from '@/helper/colors'
import { useFormCustom } from '@/lib/form'
import { useCheckPath } from '@/path'
import { useAppSelector } from '@/redux/hook'
import { TRANSLATE } from '@/routes'
import { RequestBody } from '@/service/accounting/accountPayment/getList/type'
import { useQueryGetOtherDocumentList } from '@/service/accounting/otherDocument/get'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

const useOtherDocumentList = () => {
  const { t } = useTranslation(TRANSLATE.OTHER_DOCUMENT)
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })
  const { id: accountLedgerId } = useAppSelector((state) => state.ledgerRefData)

  const { currency } = useAppSelector((state) => state.companyConfigData)

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.code'),
          fieldName: 'code',
        },
        {
          header: t('table.accountingDate'),
          fieldName: 'accountingDate',
        },
        {
          header: t('table.documentType'),
          fieldName: 'documentType',
        },
        {
          header: t('table.date'),
          fieldName: 'date',
        },
        {
          header: t('table.amount') + ` (${currency})`,
          fieldName: 'amount',
        },
        // {
        //   header: t('table.note'),
        //   fieldName: 'note',
        // },
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

  const { paymentMethod, paymentType, paymentMethodURL } = useCheckPath()

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryGetOtherDocumentList(
    {
      ...queryPage,
      accountLedgerId,
    },
    {
      enabled: !!accountLedgerId,
    }
  )

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      amount: <CurrencyFormatCustom amount={item?.amount} color={RED} />,
      documentType: documentType.find((ele) => ele.value === item.documentType)
        ?.label,
    }
  })

  return [
    {
      methodForm,
      columns,
      isLoadingTable,
      tableData,
      paymentMethod,
      paymentMethodURL,
      paymentType,
      page: data?.data?.page,
      size: data?.data?.size,
      totalPages: data?.data?.totalPages,
    },
    { t, onSubmit, onReset, onChangePageSize, refetch },
  ] as const
}

export default useOtherDocumentList
