import { PageResponse } from '@/service/type'

export type Request = {
  GET: {
    page: number
    size: number
  }
}

export interface RequestBody {
  GET: PageResponse<
    {
      createdAt: string
      createdBy: string
      fileUploadName: string
      fileUpload: string
      fileResult: string
      fileResultName: string
    }[]
  >
}
