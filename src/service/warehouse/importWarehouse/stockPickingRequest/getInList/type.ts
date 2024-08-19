import { PageResponse } from '@/service/type'

type StockPickingIn = {
  id: number
  scheduledDate: string
  doneDate: string
  pickingType: string
  orderType: string
  sourceDocument: string
  state: string
  description: string
  quantity: number
  createdAt: string
  stockPickings: [
    {
      id: number
      name: string | null
      code: string
      scheduledDate: string
      doneDate: string | null
      pickingType: string | null
      pickingTypeData: any
      state: string
      orderType: string
      sourceDocument: string
      employeeId: number
      employee: {
        id: number
        firstName: string
        lastName: string
      }
      warehouseId: number
      note: string
      stockPickingLines: [
        {
          id: number
          fromLocationId: number
          toLocationData: {}
          toLocationId: number
          destinationType: string
          productId: number
          lotId: number
          demandQty: number
          doneQty: number
          uomCode: string
          pickingId: number
          productSku: string
          productName: string
          productManagementForm: string
          upcCode: string
          serialLotLines: [
            {
              id: number
              lotId: number
              lotType: string
              quantity: number
              lotCode: string
            }
          ]
          isOpacity: true
        }
      ]
      stockWarehouseName: string
    }
  ]
}

export type Response = {
  GET: PageResponse<Array<StockPickingIn>>
}

export type RequestBody = {
  GET: {
    search?: string | null
    date?: string | null
    state?: string | null
    page: number
    size: number
  }
}
