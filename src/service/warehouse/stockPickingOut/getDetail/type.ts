import { BaseResponse } from '@/service/type'

export type StockPickingOutDetail = {
  pickingTypeName?: string
  employeeName?: string
  id: number
  name: string
  code: string
  scheduledDate: string
  doneDate: string
  pickingTypeId: number
  pickingType: {
    id: number
    warehouseId: number
    name: string
    code: string
    type: string
    fromLocationId: number
    fromLocationName: string
    toLocationId: number
    toLocationName: string
    note: string
    isDefault: true
  }
  orderType: string
  sourceDocument: string
  warehouseId: number
  warehouseName: string
  note: string
  state: string
  employeeId: number
  employee: {
    name: string
    code: string
    firstName?: string
    lastName?: string
  }
  customerId: number
  customer: {
    name: string
    code: string
  }
  isSignature: true
  imageUrls: [string]
  stockPickingLines: stockPickingLines[]
  rejectReason: string
}

type stockPickingLines = {
  id: number
  productId: number
  sku: string
  upc: string
  productResponse: {
    id: number
    name: string
    sku: string
    upc: string
    uomCode: string
    uomName: string
    productTemplateOutputDto: {
      id: number
      hasVariant: true
      sku: string
      upc: string
      name: string
      productCategories: [
        {
          id: number
          name: string
          type: 'INTERNAL'
        }
      ]
      uomCode: string
      uomName: string
      managementForm: string
      cost: number
      uomOutput: {
        id: number
        code: string
        name: string
        description: string
        activated: true
        unitGroupOutputList: [
          {
            id: number
            code: string
            name: string
            originalUnitId: number
            description: string
            activated: true
            companyId: number
            branchId: number
          }
        ]
        companyId: number
        branchId: number
        isUsing: true
      }
      isInternal: true
      isMaterial: true
      isGoods: true
      isSemiFinished: true
      isOEM: true
      attributeCategory: [
        {
          attributeOutputDtos: [
            {
              id: number
              name: string
              productAttributeValue: [
                {
                  id: number
                  value: string
                }
              ]
            }
          ]
        }
      ]
    }
    productPrice: number
    cost: number
    uomId: number
    uomGroupOutput: {
      id: number
      code: string
      name: string
      originalUnitId: number
      originalUnitOutput: {
        id: number
        code: string
        name: string
        description: string
        activated: true
        unitGroupOutputList: {
          id: number
          code: string
          name: string
          originalUnitId: number
          description: string
          activated: true
          companyId: number
          branchId: number
        }[]
        companyId: number
        branchId: number
        isUsing: true
      }
      description: string
      activated: true
      companyId: number
      branchId: number
      unitGroupLineOutputList: {
        id: number
        code: string
        unitId: number
        unitGroupId: number
        unitName: string
        conversionRate: number
        accuracy: number
        uomLineType: string
        isUsing: true
      }[]
      isUsing: true
      unitGroupLineOutputContainOriginalList: {
        id: number
        code: string
        unitId: number
        unitGroupId: number
        unitName: string
        conversionRate: number
        accuracy: number
        uomLineType: string
        isUsing: true
      }[]
    }
    saleUom: {
      id: number
      code: string
      name: string
      description: string
      activated: true
      unitGroupOutputList: {
        id: number
        code: string
        name: string
        originalUnitId: number
        description: string
        activated: true
        companyId: number
        branchId: number
      }[]
      companyId: number
      branchId: number
      isUsing: true
    }
    purchaseUom: {
      id: number
      code: string
      name: string
      description: string
      activated: true
      unitGroupOutputList: {
        id: number
        code: string
        name: string
        originalUnitId: number
        description: string
        activated: true
        companyId: number
        branchId: number
      }[]
      companyId: number
      branchId: number
      isUsing: true
    }
    baseProductPackingLineOutput: {
      id: number
      uomGroupLineId: number
      productId: number
      amount: number
      uomLineType: string
      length: number
      high: number
      wide: number
      weight: number
      volume: number
      uomGroupLineOutput: {
        id: number
        code: string
        unitId: number
        unitGroupId: number
        unitName: string
        conversionRate: number
        accuracy: number
        uomLineType: string
        isUsing: true
      }
    }
    productPackingLineOutputList: {
      id: number
      uomGroupLineId: number
      productId: number
      amount: number
      uomLineType: string
      length: number
      high: number
      wide: number
      weight: number
      volume: number
      uomGroupLineOutput: {
        id: number
        code: string
        unitId: number
        unitGroupId: number
        unitName: string
        conversionRate: number
        accuracy: number
        uomLineType: string
        isUsing: true
      }
    }[]
  }
  checkingType: string
  productName: string
  demandQty: number
  uom: {
    id: number
    code: string
    name: string
  }
  itemPrices: {
    quantity: number
    unitPrice: number
    receiveDate: '2024-07-08'
  }[]
  inventories: {
    locationId: number
    locationName: string
    removalStrategy: string
    quantityInventory: number
    doneQty: number
    serialLots: {
      lotId: number
      lotCode: string
      doneQtyByLot: number
    }[]
  }[]
}
export type Response = {
  GETV2: BaseResponse<StockPickingOutDetail>
  GET: StockPickingOutDetail
}

export type RequestBody = {
  GET: {
    id: number
    warehouseId?: number
    pickingTypeId?: number
  }
}
