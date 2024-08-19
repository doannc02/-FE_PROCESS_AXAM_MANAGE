export type RequestBody = {
  SAVE: {
    id: number
    fiscalYear: {
      id: number
      startFiscalYear: string
      endFiscalYear: string
    } | null
    warehouses: {
      id: number | null
      warehouse: {
        id: number
        name: string
      } | null
      cycleType: string
      locations: {
        id: number
        location: {
          id: number
          name: string
        }
        pricingMethodType: string
      }[]
      stockLocations: {
        id: number | null
        name: string
        code: string
        type: string
      }[]
    }[]
    deleteWarehouseIds: number[]
  }
}
