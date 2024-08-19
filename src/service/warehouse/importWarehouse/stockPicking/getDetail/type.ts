export type ProductResponse = {
  id: number
  name: string
  sku: string
  upc: string
  uomCode: string
  uomName: string
  baseProductPackingLineOutput: {
    id: number
    uomGroupLineId: any
    productId: number
    amount: number
    uomLineType: string
    length: any
    high: any
    wide: any
    weight: any
    volume: any
    uomGroupLineOutput: any
  }
  productTemplateOutputDto: {
    id: number
    hasVariant: boolean
    sku: string
    upc: string
    name: string
    productCategoryId: number
    productCategoryName: string
    uomCode: string
    managementForm: string
    cost: number
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
      activated: boolean
      unitGroupOutputList: [
        {
          id: number
          code: string
          name: string
          originalUnitId: number
          description: string
          activated: boolean
          companyId: number
          branchId: number
        }
      ]
      companyId: number
      branchId: number
      isUsing: boolean
    }
    description: string
    activated: boolean
    companyId: number
    branchId: number

    unitGroupLineOutputList: [
      {
        id: number
        code: string
        unitId: number
        unitGroupId: number
        unitName: string
        conversionRate: number
        accuracy: number
        uomLineType: string
        isUsing: boolean
      }
    ]
    isUsing: boolean
    unitGroupLineOutputContainOriginalList: [
      {
        id: number
        code: string
        unitId: number
        unitGroupId: number
        unitName: string
        conversionRate: number
        accuracy: number
        uomLineType: string
        isUsing: boolean
      }
    ]
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
      isUsing: boolean
    }
  }[]
}

export type StockPickingLines = {
  id: number
  fromLocationId: number
  toLocationData: {
    id: number
    name: string
  }
  destinationType: string
  productId: number
  lotId: number
  demandQty: number
  doneQty: number
  uomCode: string
  upcCode: string
  isOpacity: boolean
  pickingId: number
  productSku: string
  productName: string
  productManagementForm: string
  serialLotLines: {
    id: number
    lotId: number
    lotType: string
    quantity: number
    lotCode: string
  }[]
  productResponse: ProductResponse
  unitPrice: number
  intoMoney: number
}

export type StockPickingDetail = {
  id: number
  name: string
  code: string
  scheduledDate: string
  doneDate: string | null
  pickingTypeData: {
    code: string
    fromLocationId: number
    fromLocationName: string
    id: number
    isDefault: boolean
    name: string
    note: string
    toLocationId: number
    toLocationName: string
    type: string
    warehouseId: number
  }
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
  stockPickingLines: StockPickingLines[]
  productResponse: ProductResponse
  stockWarehouseName: string
  imageUrls: string[]
}

export type Response = {
  GET: StockPickingDetail
}

export type RequestBody = {
  GET: {
    id: number
  }
}
