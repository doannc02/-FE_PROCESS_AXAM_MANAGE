import { PageResponse } from '@/service/type'
import { DetailToolsAssetCategory } from '../getDetail/type'

export type Response = {
  GET: PageResponse<DetailToolsAssetCategory[]>
}

export type RequestParams = {
  GET: {
    page: number
    size: number
    search?: string
    categoryType?: 'TOOLS' | 'ASSET'
    parent?: {
      id: number
      code: string
      name: string
    }
    parentId?: number
    isActive?: boolean
  }
}
