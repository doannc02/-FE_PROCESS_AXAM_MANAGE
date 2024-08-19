export type ContentDTO = {
  id: number
  name: string
  code: string
  state: string
  companyId: number
  company: {
    id: number
    name: string
  }
  branchId: number
  branch: {
    id: number
    name: string
  }
  receptionSteps: string
  deliverySteps: string
  isManufacturing: boolean
  manufactureSteps: string
  address: string
  areaCode: string
  hasAdditionalInfo: boolean
  additionalInfo: {
    latitude: number
    longitude: number
    height: number
    heightUom: string
    length: number
    lengthUom: string
    width: number
    widthUom: string
    weightCapacity: number
    weightCapacityUom: string
    scene: string
  }
  hasConditionStorage: boolean
  conditionStorage: {
    standardTemperature: number
    minTemperature: number
    standardHumidity: number
  }
  viewLocationId: number
  viewLocation: {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation: string
    type: string
    isScrapLocation: boolean
    isReturnLocation: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: {
      id: number
      name: string
    }
    note: string
  }
  stockLocationId: number
  stockLocation: {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation: string
    type: string
    isScrapLocation: boolean
    isReturnLocation: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: {
      id: number
      name: string
    }
    note: string
  }
  inputLocationId: number
  inputLocation: {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation: string
    type: string
    isScrapLocation: boolean
    isReturnLocation: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: {
      id: number
      name: string
    }
    note: string
  }
  qualityLocationId: number
  qualityLocation: {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation: string
    type: string
    isScrapLocation: boolean
    isReturnLocation: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: {
      id: number
      name: string
    }
    note: string
  }
  packingLocationId: number
  packingLocation: {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation: string
    type: string
    isScrapLocation: boolean
    isReturnLocation: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: {
      id: number
      name: string
    }
    note: string
  }
  outputLocationId: number
  outputLocation: {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation: string
    type: string
    isScrapLocation: boolean
    isReturnLocation: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: {
      id: number
      name: string
    }
    note: string
  }
  samLocationId: number
  samLocation: {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation: string
    type: string
    isScrapLocation: boolean
    isReturnLocation: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: {
      id: number
      name: string
    }
    note: string
  }
  pbmLocationId: number
  pbmLocation: {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation: string
    type: string
    isScrapLocation: boolean
    isReturnLocation: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: {
      id: number
      name: string
    }
    note: string
  }
  action: string
  note: string
  isApproved: boolean
  vendorLocationId: number
  vendorLocation: {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation: string
    type: string
    isScrapLocation: boolean
    isReturnLocation: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: {
      id: number
      name: string
    }
    note: string
  }
  customerLocationId: number
  customerLocation: {
    id: number
    name: string
    code: string
    parentId: number
    parentStockLocation: string
    type: string
    isScrapLocation: boolean
    isReturnLocation: boolean
    removalStrategyType: string
    isDefaultPosition: boolean
    stockWarehouse: {
      id: number
      name: string
    }
    note: string
  }
  stockLocations: [
    {
      id: number
      name: string
      code: string
      parentId: number
      parentStockLocation: any
      type: string
      isScrapLocation: boolean
      isReturnLocation: boolean
      removalStrategyType: string
      isDefaultPosition: boolean
      stockWarehouse: {
        id: number
        name: string
      }
      note: string
    }
  ]
}

export type RequestBody = {
  GET: {
    id: number
  }
}

export type Response = {
  GET: ContentDTO
}
