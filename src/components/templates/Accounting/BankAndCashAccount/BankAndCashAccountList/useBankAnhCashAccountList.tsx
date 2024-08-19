import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import InvoiceStatus from '@/components/atoms/InvoiceStatus'
import { ColumnProps } from '@/components/organism/CoreTable'
import { paymentMethodSelect } from '@/enum'
import { RED } from '@/helper/colors'
import { convertToDate } from '@/utils/date/convertToDate'
import { useFormCustom } from '@/lib/form'
import { useCheckPath } from '@/path'
import { useAppSelector } from '@/redux/hook'
import { TRANSLATE } from '@/routes'
import { useQueryGetAccountPaymentList } from '@/service/accounting/accountPayment/getList'
import { RequestBody } from '@/service/accounting/accountPayment/getList/type'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

const useBankAccountList = () => {
  const { t } = useTranslation(TRANSLATE.BANK_CASH_ACCOUNT)
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })
  const { id } = useAppSelector((state) => state.ledgerRefData)

  const { currency } = useAppSelector((state) => state.companyConfigData)

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.code'),
          fieldName: 'code',
        },
        {
          header: t('table.partnerName'),
          fieldName: 'partner',
        },
        {
          header: t('table.paymentDate'),
          fieldName: 'paymentDate',
        },
        {
          header: t('table.accountJournalName'),
          fieldName: 'accountJournal',
        },
        {
          header: t('table.paymentMethod'),
          fieldName: 'paymentMethod',
        },
        {
          header: t('table.equalAmount'),
          fieldName: 'equalAmount',
        },
        {
          header: t('table.amount') + ` (${currency})`,
          fieldName: 'amount',
        },
        {
          header: t('table.state'),
          fieldName: 'state',
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

  const { paymentMethod, paymentType, paymentMethodURL } = useCheckPath()

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryGetAccountPaymentList({
    ...queryPage,
    partnerId: queryPage?.partner?.id,
    partner: null,
    paymentType,
    paymentMethod,
    accountLedgerId: id,
  })

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      code: <Typography variant='subtitle1'>{item.code}</Typography>,
      accountJournal: item.accountJournal?.name,
      paymentMethod: paymentMethodSelect.find(
        (ele) => ele.value === item.paymentMethod
      )?.label,
      partner: (item.partner?.code ?? '') + ' - ' + (item.partner?.name ?? ''),
      equalAmount:
        item.equalAmount && item?.currency?.name !== currency ? (
          <div className='flex gap-2'>
            <CurrencyFormatCustom amount={item?.equalAmount} color={RED} />
            <Typography
              style={{
                color: RED,
              }}
            >
              {` (${item.currency?.name})`}
            </Typography>
          </div>
        ) : null,
      amount: <CurrencyFormatCustom amount={item.amount} color={RED} />,
      paymentDate: convertToDate(item.paymentDate),
      state: <InvoiceStatus value={item.state} />,
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

export default useBankAccountList
