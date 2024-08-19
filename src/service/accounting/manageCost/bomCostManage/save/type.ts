import { BaseResponse, PageResponse } from '@/service/type/index'
import { BCM } from '../getList/type'



export type BomCodeList = PageResponse<BCM[]>

export type RequestBody = {
  SAVE: BCM[]
}

export type ResponseBomCodeSave = BaseResponse<{ id: number; name: string }>
