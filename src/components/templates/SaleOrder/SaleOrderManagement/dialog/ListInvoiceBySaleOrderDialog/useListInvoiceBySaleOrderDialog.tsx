import { GREEN, ORANGE, RED } from '@/helper/colors'
import { Typography } from '@mui/material'
import moment from 'moment'
import { Props } from '.'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { useQueryGetAccountMoveList } from '@/service/accounting/accountMove/getList'

export const useListInvoiceBySaleOrderDialog = (orderId: number | null) => {
  const {
    isLoading: isLoadingInvoiceList,
    data: invoiceList,
    refetch: refetchInvoiceList,
  } = useQueryGetAccountMoveList(
    {
      page: 0,
      size: 20,
      moveType: 'OUT_INVOICE',
      // saleId: Number(orderId),
    },
    {
      enabled: !!Number(orderId),
    }
  )

  const { t } = useTranslation('saleOrder/sale-order')
  const columns = useMemo(
    () =>
      [
        {
          header: t('table.code'),
          fieldName: 'code',
        },
        {
          header: t('table.partner'),
          fieldName: 'partner',
        },
        // {
        //   header: t('table.moveType'),
        //   fieldName: 'moveType',
        // },
        {
          header: t('table.date'),
          fieldName: 'date',
        },
        {
          header: t('table.dueDate'),
          fieldName: 'dueDate',
        },
        {
          header: t('table.amountUntaxed'),
          fieldName: 'amountUntaxed',
        },
        {
          header: t('table.amountTotal'),
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
        // {
        //   header: t('table.action'),
        //   fieldName: 'action',
        // },
      ] as ColumnProps[],
    [t]
  )
  const tableData = (invoiceList?.data?.content ?? []).map((item) => {
    let state: any = null
    if (item.state === 'DRAFT') {
      state = (
        <Typography variant='body2' style={{ color: ORANGE }}>
          Nháp
        </Typography>
      )
    } else if (item.state === 'POSTED') {
      state = (
        <Typography variant='body2' style={{ color: GREEN }}>
          Đã vào sổ
        </Typography>
      )
    } else if (item.state === 'CANCELED') {
      state = (
        <Typography variant='body2' style={{ color: RED }}>
          Đã hủy
        </Typography>
      )
    }

    let paymentStatus

    if (item.paymentStatus === 'PAID') {
      paymentStatus = (
        <Typography variant='body2' style={{ color: GREEN }}>
          Đã thanh toán
        </Typography>
      )
    } else if (item.paymentStatus === 'PARTIAL_PAYMENT') {
      paymentStatus = (
        <Typography variant='body2' style={{ color: GREEN }}>
          Thanh toán 1 phần
        </Typography>
      )
    } else if (item.paymentStatus === 'NOT_PAYMENT') {
      paymentStatus = (
        <Typography variant='body2' style={{ color: RED }}>
          Chưa thanh toán
        </Typography>
      )
    }

    return {
      id: item.id,
      code: item.code,
      partner: item.partner ? item.partner?.name : '',
      date: item.date ? moment(item.date).format('DD/MM/YYYY') : '',
      dueDate: item.dueDate ? moment(item.dueDate).format('DD/MM/YYYY') : '',
      amountUntaxed: <CurrencyFormatCustom amount={item.amountUntaxed} />,
      amountTotal: <CurrencyFormatCustom amount={item.amountTotal} />,
      paymentStatus,
      state,
    }
  })
  return [{ columns, tableData }, {}] as const
}
