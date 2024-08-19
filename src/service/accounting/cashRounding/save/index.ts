import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postCashRounding = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: `/api/v1/cash-rounding`,
    data: requestBody,
  })
}

export const putCashRounding = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: `/api/v1/cash-rounding`,
    data: requestBody,
  })
}
