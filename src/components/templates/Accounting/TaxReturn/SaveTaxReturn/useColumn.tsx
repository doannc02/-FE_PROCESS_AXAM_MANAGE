import { ColumnProps } from '@/components/organism/CoreTable'
import { useMemo } from 'react'

export const useColumn = () => {
  const columns = useMemo(
    () =>
      [
        {
          header: 'STT',
          fieldName: 'index',
        },
        {
          header: 'Chỉ tiêu',
          fieldName: 'targets',
        },
        {
          header: 'Giá trị hàng hóa, dịch vụ (chưa có thuế giá trị gia tăng)',
          fieldName: 'value',
        },
        {
          header: 'Thuế giá trị gia tăng',
          fieldName: 'tax',
        },
      ] as ColumnProps[],
    []
  )

  const columns2 = useMemo(
    () =>
      [
        {
          header: 'STT',
          fieldName: 'index',
        },
        {
          header: 'Số hoá đơn',
          fieldName: 'numberInvoice',
        },
        {
          header: 'Ngày lập hoá đơn',
          fieldName: 'invoiceDate',
        },
        {
          header: 'Tên người mua',
          fieldName: 'customerName',
        },
        {
          header: 'MST người mua',
          fieldName: 'xxxx',
        },
        {
          header: 'Doanh thu chưa có thuế GTGT',
          fieldName: 'amountUntaxed',
        },
        {
          header: 'Thuế GTGT',
          fieldName: 'amountTax',
        },
      ] as ColumnProps[],
    []
  )

  return { columns, columns2 } as const
}
