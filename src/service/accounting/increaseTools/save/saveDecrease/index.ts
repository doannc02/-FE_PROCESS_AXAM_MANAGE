import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postDecreaseTool = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: '/api/v1/decrease-tools',
    data: requestBody,
  })
}

export const putDecreaseTool = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: '/api/v1/decrease-tools',
    data: requestBody,
  })
}
