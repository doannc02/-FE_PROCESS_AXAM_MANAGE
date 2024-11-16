export type CommonObject = {
  id: number
  name: string
  code?: string | null
}

export type BaseResponse<T> = {
  message: string
  traceId: string
  data: T
}

export type ErrorCodes = {
  code: string
  message: string
  httpCode?: number
  fields?: string[]
}

export type PageResponse<T> = {
  message: string
  traceId: string
  data: {
    content: T
    page: number
    size: number
    sort: string
    totalElements: number
    totalPages: number
    numberOfElements: number
  }
  errorCodes?: ErrorCodes[]
}
