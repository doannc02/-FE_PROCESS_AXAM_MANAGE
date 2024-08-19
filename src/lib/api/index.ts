export type BackendApiErr = {
  status?: string
  message?: string
  result?: string
  errorMessages?: string[]
  redirectUrl?: string
  validationErrors?: {
    title: string
    errors: { name: string; messages: string[] }[]
  }
}

export type Err = {
  status?: number
  message?: string
  result?: string
  errorMessages?: string[]
  redirectUrl?: string
  validationErrors?: {
    title: string
    errors: { name: string; messages: string[] }[]
  }
}

export type ErrResponse = {
  status: number
  data: null
  err: Err
}

export type DataResponse<T> = {
  status: number
  err: null
  data: T
}

export type HttpResponse<T> = DataResponse<T> | ErrResponse
