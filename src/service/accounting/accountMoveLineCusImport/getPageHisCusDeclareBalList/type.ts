import { PageResponse } from '@/service/type'

export type PageHisCusDeclareBal = {
  createdBy: string
  createdAt: string
  fileUpload: string
  fileUploadName: string
  fileResult: string
  fileResultName: string
}

export type Response = {
  GET: PageResponse<PageHisCusDeclareBal[]>
}

export type RequestParams = {
  GET: {
    page: number
    size: number
    accountLedgerId?: number | null
  }
}
