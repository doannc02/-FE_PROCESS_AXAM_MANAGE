import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import InvoiceStatus from '@/components/atoms/InvoiceStatus'
import PaymentStatus from '@/components/atoms/PaymentStatus'
import { ColumnProps } from '@/components/organism/CoreTable'
import { RED } from '@/helper/colors'
import { convertToDate } from '@/utils/date/convertToDate'
import { useFormCustom } from '@/lib/form'
import { useCheckPath } from '@/path'
import { useAppSelector } from '@/redux/hook'
import { TRANSLATE } from '@/routes'
import { useQueryGetAccountMoveList } from '@/service/accounting/accountMove/getList'
import { RequestBody } from '@/service/accounting/accountMove/getList/type'
import { Typography } from '@mui/material'
import _ from 'lodash'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'
import {
  typeInvoiceNew,
  typeInvoiceOrRefund,
  typePathInvoiceNew,
} from '../Helper/typeInvoiceNew'
import { useRouter } from 'next/router'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
  startDate: convertToDate(moment().startOf('month'), 'YYYY-MM-DD'),
  endDate: convertToDate(moment().endOf('month'), 'YYYY-MM-DD'),
}

const useInvoiceList = () => {
  const { t } = useTranslation(TRANSLATE.ACCOUNT_INVOICE)

  const {
    typeInvoice,
    typeOfInvoice,
    invoiceCk,
    typePath,
    typeOfInvoiceCustomer,
  } = useCheckPath()

  const typePathRedirect = useMemo(() => {
    return typePathInvoiceNew(
      typePath,
      invoiceCk,
      typeOfInvoiceCustomer,
      typeInvoice,
      typeOfInvoice
    )
  }, [invoiceCk, typeInvoice, typeOfInvoice, typeOfInvoiceCustomer, typePath])

  const router = useRouter()

  const moveType = useMemo(() => {
    return typeInvoiceOrRefund({ router })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])

  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const { currency } = useAppSelector((state) => state.companyConfigData)
  const { id } = useAppSelector((state) => state.ledgerRefData)

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.code'),
          fieldName: 'code',
        },
        {
          header:
            typePath === 'CUSTOMER'
              ? invoiceCk !== 'INTERNAL'
                ? t('table.partnerCus')
                : 'Chi nhánh'
              : t('table.partner'),
          fieldName: 'partner',
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
          header: t('table.amountUntaxed') + ` (${currency})`,
          fieldName: 'amountUntaxed',
        },
        {
          header: t('table.amountTotal') + ` (${currency})`,
          fieldName: 'amountTotal',
        },
        {
          header: t('table.paymentStatus'),
          fieldName: 'paymentStatus',
        },

        {
          header: t('table.state'),
          fieldName: 'state',
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currency, t, typePath, invoiceCk]
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
  } = useQueryGetAccountMoveList({
    ...queryPage,
    typePathInvoice:
      typeInvoiceNew(
        typePath,
        invoiceCk,
        typeInvoice,
        typeOfInvoice,
        typeOfInvoiceCustomer
      ),
    accountLedgerId: id,
    moveType: moveType,
  })

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      id: item.id,
      code: <Typography variant='subtitle1'>{item.code}</Typography>,
      partner: item.partner
        ? item.partner?.code + ' - ' + item.partner?.name
        : '',
      date: convertToDate(item.date),
      dueDate: convertToDate(item.dueDate),
      amountUntaxed: (
        <CurrencyFormatCustom amount={item.amountUntaxed} color={RED} />
      ),
      amountTotal: (
        <CurrencyFormatCustom amount={item.amountTotal} color={RED} />
      ),
      paymentStatus: <PaymentStatus value={item.paymentStatus} />,
      state: <InvoiceStatus value={item.state} />,
    }
  })

  return [
    {
      typePathRedirect,
      methodForm,
      columns,
      isLoadingTable,
      tableData,
      page: data?.data?.page,
      size: data?.data?.size,
      totalPages: data?.data?.totalPages,
    },
    { t, onSubmit, onReset, onChangePageSize, refetch },
  ] as const
}

export default useInvoiceList
