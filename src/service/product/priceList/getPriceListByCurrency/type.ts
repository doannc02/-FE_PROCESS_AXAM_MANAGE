import { PageResponse } from '@/service/type'

export interface PriceList {
  id: number
  name: string
  code: string
  currencyUnit: CurrencyUnit
  priceListCategory: PriceListCategory
  createdAt: string
  employee: Employee
  manager: Manager
  methodState: string
  state: string
  trackingState: string
  managerId: number
  employeeId: number
  currencyUnitId: number
  priceListCategoryId: number
}

export interface CurrencyUnit {
  id: number
  name: string
}

export interface PriceListCategory {
  id: number
  name: string
}

export interface Employee {
  id: number
  name: string
}

export interface Manager {
  id: number
  name: string
}

export interface ResponsePriceList {
  GET: PageResponse<PriceList[]>
}

export interface RequestBody {
  GET: {
    typePath?: string
    search?: string
    priceListCategoryId?: number
    trackingState?: string
    currencyId?: number
    page?: number
    size?: number
  }
}
