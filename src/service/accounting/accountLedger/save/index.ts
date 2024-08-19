import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postAccountLedger = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: `/api/v1/account-ledger`,
    data: requestBody,
  })
}

export const putAccountLedger = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: `/api/v1/account-ledger`,
    data: requestBody,
    params: {
      id: requestBody.id,
    },
  })
}
