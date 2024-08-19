import { PageResponse } from '@/service/type'

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  username: string
  imageUrl: string
  lang: string
  countryCode: string
  birthday: string
  timeZone: string
  sex: string
  tenantCode: string
  isActivated: true
  roles: {
    id: number
    name: string
    alias: string
    productId: number
    description: string
    numberOfUsers: number
    isDefault: true
    isActivated: true
    level: number
  }[]

  products: {
    id: number
    name: string
    alias: string
    imageUrl: string
    description: string
    isActivated: true
  }[]
}

export type Response = {
  GET: PageResponse<Array<User>>
}

export type RequestBody = {
  GET: {
    fullName?: string | null
    email?: number | null
    phoneNumber?: string | null
    username?: string | null
    page: number
    size: number
    isActive?: boolean
    roleCode?: string
    roleId?: number
  }
}
