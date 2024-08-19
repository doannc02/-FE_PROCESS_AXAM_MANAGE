import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { ColumnProps } from '@/components/organism/CoreTable'
import { PRIMARY } from '@/helper/colors'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { useQueryGetDebtReceivableDetail } from '@/service/accounting/debtReceivable/getDetail'
import { RequestBody } from '@/service/accounting/debtReceivable/getDetail/type'
import { useQueryGetTotalReceivableDebt } from '@/service/accounting/debtReceivable/getTotal'
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

const useDebtReceivableDetail = () => {
  const { t } = useTranslation('accounting/debt-receivable')
  const router = useRouter()

  const { typeDebt } = useCheckPath()
  const { id, start, end, partnerId, partnerName, type } = router.query
  const { id: idLedger } = useAppSelector((state) => state.ledgerRefData)

  console.log(type, partnerName, 'type')
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues: {
      ...defaultValues,
      accountId: Number(id),
      partnerId: Number(partnerId),
      start: !!start ? start.toString() : undefined,
      end: !!end ? end.toString() : undefined,
      accountLedgerId: idLedger,
      type: type?.toString() as any,
      typeDebt,
    },
  })

  const { reset, handleSubmit } = methodForm

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(
      {
        ...defaultValues,
        accountId: Number(id),
        partnerId: Number(partnerId),
        start: start ? start.toString() : undefined,
        end: end ? end.toString() : undefined,
        type: type,
        typeDebt,
      },
      _.isNil
    )
  )

  const columns = useMemo(
    () =>
      [
        {
          fieldName: 'orderCode',
        },
        {
          fieldName: 'orderDate',
        },
        {
          fieldName: 'invoiceCode',
        },
        {
          fieldName: 'invoiceDate',
        },
        {
          fieldName: 'note',
        },
        {
          fieldName: 'codeAccount',
        },
        {
          fieldName: 'codeReciprocalAccount',
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
          fieldName: 'balanceDebit',
        },
        {
          fieldName: 'balanceCredit',
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
  } = useQueryGetDebtReceivableDetail(
    {
      ...queryPage,
      accountId: Number(id),
      partnerId: Number(partnerId),
      start: start ? start.toString() : undefined,
      end: end ? end.toString() : undefined,
      accountLedgerId: idLedger,
      type: type,
      typeDebt,
    },
    {
      enabled: !!Number(id),
    }
  )

  const { isLoading: isLoadingGetTotalDebt, data: totalDebt } =
    useQueryGetTotalReceivableDebt(
      {
        ...queryPage,
        accountId: Number(id),
        partnerId: Number(partnerId),
        start: start ? start.toString() : undefined,
        end: end ? end.toString() : undefined,
        accountLedgerId: idLedger,
        type: type,
        typeDebt,
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
        <CurrencyFormatCustom variant='body1' amount={item.balance?.debit} />
      ),
      balanceCredit: (
        <CurrencyFormatCustom variant='body1' amount={item.balance?.credit} />
      ),
    }
  })

  return [
    {
      id,
      typeDebt,
      partner: partnerName?.toString(),
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

export default useDebtReceivableDetail
