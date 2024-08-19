import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postToolsAssetCategory = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: '/api/v1/tools-asset-category',
    data: requestBody,
  })
}

export const putToolsAssetCategory = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: '/api/v1/tools-asset-category',
    data: requestBody,
  })
}
