import { PageResponse } from '@/service/type/index'
import { MMC_Input } from '../get/type'

export type MMC_InputLst = PageResponse<MMC_Input[]>

export type RequestBody = {
  GET: {
    name?: string
    page?: number
    size?: number
  }
}
