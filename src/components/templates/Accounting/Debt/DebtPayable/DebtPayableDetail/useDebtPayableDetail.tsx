import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { ColumnProps } from '@/components/organism/CoreTable'
import { PRIMARY } from '@/helper/colors'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { useQueryGetDebtPaidDetail } from '@/service/accounting/debtPaid/getDetail'
import { RequestBody } from '@/service/accounting/debtPaid/getDetail/type'
import { useQueryGetTotalPayableDebt } from '@/service/accounting/debtPaid/getTotal'
import { checkInvoice } from '@/utils/checkInvoice'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

const defaultValues = {
  page: 0,
  size: 20,
}

const useDebtPayableDetail = () => {
  const { t } = useTranslation('accounting/debt-payable')
  const router = useRouter()
  const { id: idLedger } = useAppSelector((state) => state.ledgerRefData)
  const { id, start, end, partner, type } = router.query

  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues: {
      ...defaultValues,
      vendorId: Number(id),
      start: !!start ? start.toString() : undefined,
      end: !!end ? end.toString() : undefined,
    },
  })

  const { reset, handleSubmit } = methodForm

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(
      {
        ...defaultValues,
        vendorId: Number(id),
        start: start ? start.toString() : undefined,
        end: end ? end.toString() : undefined,
        type: type,
      },
      _.isNil
    )
  )

  const columns = useMemo(
    () =>
      [
        { header: '', fieldName: 'orderCode' },
        { header: '', fieldName: 'orderDate' },
        { header: '', fieldName: 'invoiceCode' },
        { header: '', fieldName: 'invoiceDate' },
        { header: '', fieldName: 'note' },
        { header: '', fieldName: 'codeAccount' },
        { header: '', fieldName: 'codeReciprocalAccount' },
        { header: '', fieldName: 'openBalanceDebit' },
        { header: '', fieldName: 'openBalanceCredit' },
        { header: '', fieldName: 'ariseDebit' },
        { header: '', fieldName: 'ariseCredit' },
        { header: '', fieldName: 'balanceDebit' },
        { header: '', fieldName: 'balanceCredit' },
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
  } = useQueryGetDebtPaidDetail(
    {
      ...queryPage,
      vendorId: Number(id),
      vendor: null,
      accountLedgerId: idLedger,
    },
    {
      enabled: !!Number(id),
    }
  )

  const { isLoading: isLoadingGetTotalDebt, data: totalDebt } =
    useQueryGetTotalPayableDebt(
      {
        ...queryPage,
        vendorId: Number(id),
        vendor: null,
        accountLedgerId: idLedger,
      },
      {
        enabled: !!Number(id),
      }
    )

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      orderCode: <Typography variant='subtitle1'>{item.orderCode}</Typography>,
      orderDate: item.dateOrder,
      invoiceCode: (
        <div
          onClick={(e) => {
            e.preventDefault()
            const val = checkInvoice(item)
            if (val?.id && val?.pathname) {
              router.push({
                pathname: val?.pathname,
                query: {
                  id: val?.id,
                  actionType: 'VIEW',
                },
              })
            }
          }}
        >
          <Typography variant='subtitle1' color={PRIMARY}>
            {item.code}
          </Typography>
        </div>
      ),
      invoiceDate: item.accountingDate,
      codeReciprocalAccount: item.codeReciprocalAccount,
      note: item.note,
      code: <Typography variant='subtitle1'>{item.code}</Typography>,
      codeAccount: item.codeAccount,
      ariseDebit: (
        <CurrencyFormatCustom variant='body1' amount={item.arise.debit} />
      ),
      ariseCredit: (
        <CurrencyFormatCustom variant='body1' amount={item.arise.credit} />
      ),
      balanceDebit: (
        <CurrencyFormatCustom variant='body1' amount={item.balance.debit} />
      ),
      balanceCredit: (
        <CurrencyFormatCustom variant='body1' amount={item.balance.credit} />
      ),
    }
  })

  return [
    {
      id,
      partner: partner?.toString(),
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

export default useDebtPayableDetail
