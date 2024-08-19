import { PageResponse } from '@/service/type'

type Unit = {
  id: number
  name: string
  // group_unit_id: number
  // group_unit: any
  // code: string
  // alias: string
  // description: string
  // is_origin: boolean
  // accuracy: number
  // ratio: number
  // is_active: boolean
  // unit_type: string
}

export type Response = {
  GET: PageResponse<Array<Unit>>
}
