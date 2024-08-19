import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postAccountMove = async (
  params: RequestBody['SAVE']
): Promise<any> => {
  let u = params.typeInvoice ? `/api/v1/account-move/${params.typeInvoice}` : `/api/v1/account-move/vendor`
  return await accountingApi({
    method: 'post',
    url: u,
    data: params.requestBody,
  })
}
export const putAccountMove = async (
  params: RequestBody['SAVE']
): Promise<any> => {
  let u = params.typeInvoice ? `/api/v1/account-move/${params.typeInvoice}` : `/api/v1/account-move/vendor`

  return await accountingApi({
    method: 'put',
    url: u,
    data: params.requestBody,
    params: {
      id: params.requestBody.id,
    },
  })
}

export const putAccountMoveLocked = async (
  requestBody: RequestBody['LOCK']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: `/api/v1/account-move/locked`,
    params: requestBody.id,
  })
}
