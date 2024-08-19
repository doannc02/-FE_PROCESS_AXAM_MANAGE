import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postIncreaseAsset = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: '/api/v1/increase-asset/handmade',
    data: requestBody,
  })
}

export const putIncreaseAsset = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: '/api/v1/increase-asset',
    data: requestBody,
  })
}

export const postIncreaseAssetPurchase = async (
  requestBody: RequestBody['PURCHASE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: '/api/v1/increase-asset/purchase',
    params: requestBody.params,
    data: requestBody.requestBody,
  })
}

export const putIncreaseToolPurchase = async (
  requestBody: RequestBody['PURCHASE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: '/api/v1/increase-asset/purchase',
    params: requestBody.params,
    data: requestBody.requestBody,
  })
}
