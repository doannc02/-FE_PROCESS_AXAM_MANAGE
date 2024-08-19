import { ColumnProps } from '@/components/organism/CoreTable'
import { useAppSelector } from '@/redux/hook'
import { useQueryGetStockPickingDetail } from '@/service/warehouse/importWarehouse/stockPicking/getDetail'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export const useDetailStockPickingRequestList = () => {
  const router = useRouter()
  const id = Number(router.query?.id)
  const { currency } = useAppSelector((state) => state.companyConfigData)

  const columns = useMemo(
    () =>
      [
        {
          header: 'SKU',
          fieldName: 'sku',
        },
        {
          header: 'Tên sản phẩm',
          fieldName: 'productName',
        },
        {
          header: 'UPC code',
          fieldName: 'UPCCode',
        },
        {
          header: 'Đơn vị tính',
          fieldName: 'uom',
        },

        {
          header: 'Số lượng',
          fieldName: 'total',
        },
        {
          header: 'Kiểu nhập kho',
          fieldName: 'type',
        },
        {
          header: 'Vị trí kho',
          fieldName: 'location',
        },
        {
          header: 'Số lượng nhập thực tế',
          fieldName: 'totalActual',
        },
        {
          header: 'Đơn giá',
          fieldName: 'unitPrice',
        },
        {
          header: 'Thành tiền' + ` (${currency})`,
          fieldName: 'intoMoney',
        },
      ] as ColumnProps[],
    [currency]
  )

  const { isLoading, data } = useQueryGetStockPickingDetail({ id })

  const tableData = (data?.stockPickingLines ?? []).map((item) => {
    return {
      sku: item.productSku,
      productName: item.productName,
      UPCCode: item.upcCode,
      uom: item?.productResponse?.uomName,
      total: item.demandQty,
      type:
        item.destinationType === 'DIFF_LOCATION'
          ? 'Khác vị trí '
          : item.destinationType === 'SAME_LOCATION'
          ? 'Chung vị trí'
          : '',
      location: item.toLocationData && item.toLocationData.name,
      totalActual: item.doneQty,
      unitPrice: item.unitPrice,
      intoMoney: item.unitPrice * item.demandQty,
    }
  })

  return [
    {
      isLoading,
      columns,
      data,
      tableData,
    },
    {},
  ] as const
}
