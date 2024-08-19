import { BaseResponse } from '@/service/type'
import { Item } from '../save/type'

export type RequestParam = {
  GET: {
    type: string
  }
}

export type Response = {
  GET: BaseResponse<Item[]>
}
