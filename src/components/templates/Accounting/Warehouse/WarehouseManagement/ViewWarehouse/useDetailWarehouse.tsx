import { ColumnProps } from '@/components/organism/CoreTable'
import { useQueryGetDetailStockWarehouse } from '@/service/warehouse/getDetail'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export const useDetailWarehouse = () => {
  const router = useRouter()
  const id = Number(router.query?.id)
  const { isLoading, data: detailData } = useQueryGetDetailStockWarehouse({
    id,
  })

  const renderType = (type: string) => {
    let typeName = ''
    switch (type) {
      case 'STORAGE_OF_GOODS':
        typeName = 'Lưu trữ hàng hoá (vị trí vật lý)'
        break
      case 'VIEW':
        typeName = 'Xem'
        break
      case 'SUPPLIER_INVENTORY':
        typeName = 'Quản lý tồn kho nhà cung cấp (vị trí logic)'
        break
      case 'CUSTOMER_INVENTORY':
        typeName = 'Quản lý tồn kho khách hàng (vị trí logic)'
        break
      case 'INVENTORY_DUE_TO_LOSS':
        typeName = 'Quản lý tồn kho do thất thoát (vị trí logic)'
        break
      case 'INVENTORY_DUE_TO_MATERIAL_CONSUMABLES':
        typeName = 'Quản lý tồn kho NVL tiêu hao trong sản xuất (vị trí logic)'
        break
      case 'TRANSIT_LOCATION':
        typeName = 'Vị trí trung chuyển (vị trí vật lý)'
        break
      case 'QUALITY_INSPECTION':
        typeName = 'Vị trí kiểm tra chất lượng sản phẩm'
        break
      case 'PRODUCT_PACKAGING':
        typeName = 'Vị trí đóng gói'
        break
      case 'MATERIAL_BEFORE_PRODUCTION':
        typeName = 'Vị trí lưu trữ NVL trước khi sản xuất'
        break
      case 'MATERIAL_AFTER_PRODUCTION':
        typeName = 'Vị trí lưu trữ sản phẩm thành phẩm sau sản xuất'
        break
    }

    return typeName
  }
  const columns = useMemo(
    () =>
      [
        {
          header: 'Mã vị trí kho',
          fieldName: 'code',
        },
        {
          header: 'Tên vị trí kho',
          fieldName: 'name',
        },
        {
          header: 'Mục đích sử dụng',
          fieldName: 'type',
        },
        {
          header: 'Chiến lược xuất hàng',
          fieldName: 'use',
        },
        {
          header: 'Ghi chú',
          fieldName: 'note',
        },
      ] as ColumnProps[],
    []
  )
  const rowsArray = (detailData?.stockLocations ?? [])?.map((item) => ({
    code: item?.code,
    name: item?.name,
    type: renderType(item?.type),
    note: item?.note,
    use: item?.removalStrategyType,
  }))

  return [{ detailData, isLoading, columns, rowsArray }, {}] as const
}
