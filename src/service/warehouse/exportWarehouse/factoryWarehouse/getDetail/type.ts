export type StockPickingLines = {
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
    productPackingLineOutputList: [
      {
        id: number
        uomGroupLineId: number
        productId: number
        amount: number
        uomLineType: string
        length: number
        high: number
        wide: number
        weight: number
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
      }
    ]
  }
  checkingType: string
  productName: string
  demandQty: number
  uomCode: string
  inventories: [
    {
      locationId: number
      locationName: string
      removalStrategy: string
      quantityInventory: number
      doneQty: number
      serialLots: [
        {
          lotId: number
          lotCode: string
          doneQtyByLot: number
        }
      ]
    }
  ]
}

export type StockPickingOutDetail = {
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
    isDefault: boolean
  }
  orderType: string
  sourceDocument: string
  userId: number
  warehouseId: number
  warehouseName: string
  note: string
  state: string
  employeeId: number
  employee: {
    name: string
    code: string
  }
  customerId: number
  customer: {
    name: string
    code: string
  }
  stockPickingLines: StockPickingLines[]
  imageUrls: string[]
}

export type Response = {
  GET: StockPickingOutDetail
}

export type RequestBody = {
  GET: {
    id: number
    warehouseId?: number
    pickingTypeId?: number
    isEdit?: boolean
  }
}
