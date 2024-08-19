import { useQueryGetUnitList } from '@/service/common/unit/getList'
import { useQueryGetStockPickingOutDetail } from '@/service/warehouse/stockPickingOut/getDetail'

export const useDialogViewDeliveryBillInfomation = (id: number) => {
  const { isLoading, data } = useQueryGetStockPickingOutDetail({ id })

  const renderType = (type: string) => {
    let typeName = ''
    switch (type) {
      case 'SALE_ORDER':
        typeName = 'Đơn hàng mua'
        break
      case 'PURCHASE_ORDER':
        typeName = 'Đơn hàng bán'
        break
      case 'POS_ORDER':
        typeName = 'Điểm bán hàng'
        break
      case 'MANUFACTURE_ORDER':
        typeName = 'Đơn hàng sản xuất'
        break
      case 'INVENTORY_DUE_TO_LOSS':
        typeName = 'Quản lý tồn kho do thất thoát (vị trí logic)'
        break
    }

    return typeName
  }

  const { data: listUnit } = useQueryGetUnitList({ page: 0, size: 1000 })
  return [
    { isLoading, data, listUnit: listUnit?.data?.content ?? [] },
    { renderType },
  ] as const
}
