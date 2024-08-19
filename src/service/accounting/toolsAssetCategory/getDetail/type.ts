import { BaseResponse } from '@/service/type'

export type DetailToolsAssetCategory = {
  id: number
  code: string
  name: string
  parent: {
    id: number
    name: string
    code: string
  }
  originalAccount: {
    id: number
    code: string
    name: string
  }
  depreciationAccount: {
    id: number
    code: string
    name: string
  }
  type: 'TOOLS' | 'ASSET'
  description: string
  isActive: true
}

export type Response = {
  GET: BaseResponse<DetailToolsAssetCategory>
}

export type RequestParams = {
  GET: {
    id: number
  }
}
