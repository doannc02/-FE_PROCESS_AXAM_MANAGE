import { useQueryGetUnitList } from '@/service/common/unit/getList'
import { useQueryGetStockPickingOutDetail } from '@/service/warehouse/exportWarehouse/stockPickingList/getDetail/index'
import { useRouter } from 'next/router'

export const useDialogViewDeliveryBillInfomation = () => {
  const router = useRouter()
  const id = Number(router.query?.id)
  const { isLoading, data } = useQueryGetStockPickingOutDetail({
    id,
    isEdit: false,
  })

  const renderType = (type: string) => {
    let typeName = ''
    switch (type) {
      case 'SALE_ORDER':
        typeName = 'Đơn bán'
        break
      case 'PURCHASE_ORDER':
        typeName = 'Đơn mua'
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

  // const { data: listUnit } = useQueryGetUnitList({
  //   page: 0,
  //   size: 1000,
  //   activated: true,
  // })
  return [{ isLoading, data }, { renderType }] as const
}
