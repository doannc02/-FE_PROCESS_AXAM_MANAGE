import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postDecreaseAsset = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: '/api/v1/decrease-asset',
    data: requestBody,
  })
}

export const putDecreaseAsset = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: '/api/v1/decrease-asset',
    data: requestBody,
  })
}
