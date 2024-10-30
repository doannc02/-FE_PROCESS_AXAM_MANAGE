import { BaseResponse } from '@/service/type'

export type Token = {
  accessToken: string
  tokenType: string
  refreshToken: string
  expiresIn: number
  scopes: string[]
  role: string
  userId: number
  jti: string
}

export type ErrorCodes = {
  code: string
  message: string
}[]

export type Response = {
  POST: BaseResponse<Token> | any
}
