import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postIncreaseTool = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: '/api/v1/increase-tool/handmade',
    data: requestBody,
  })
}

export const putIncreaseTool = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: '/api/v1/increase-tool',
    data: requestBody,
  })
}

export const postIncreaseToolPurchase = async (
  requestBody: RequestBody['PURCHASE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: '/api/v1/increase-tool/purchase',
    params: requestBody.params,
    data: requestBody.requestBody,
  })
}

export const putIncreaseToolPurchase = async (
  requestBody: RequestBody['PURCHASE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: '/api/v1/increase-tool/purchase',
    params: requestBody.params,
    data: requestBody.requestBody,
  })
}
