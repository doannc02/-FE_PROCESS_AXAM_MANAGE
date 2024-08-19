import { PageResponse } from '@/service/type'

export type Country = {
  id: number
  flag: string
  code: string
  name: string
  alias: string
  timezone: any
  isActive: boolean
}

export type Response = {
  GET: PageResponse<Country[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number | null
    size: number | null
    isCustomer?: boolean | null
    isVendor?: boolean | null
    isMerchant?: boolean | null
    isCompany?: boolean | null
    vendorActivated?: boolean | null
    activated?: boolean | null
    state?: 'APPROVED' | string,
    merchantActivated?: boolean,
    oemActivated?: boolean,
    b2bActivated?: boolean,
    b2cActivated?: boolean,
    typePath?: string
    saleType?: string
  }
}
