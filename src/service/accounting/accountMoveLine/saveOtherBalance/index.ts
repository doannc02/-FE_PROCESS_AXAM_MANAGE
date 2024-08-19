import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postOtherBalance = async (input: {
  requestBody: RequestBody['SAVE']
  beginType: 'CUSTOMER' | 'VENDOR' | 'BANK' | 'OTHER'
}): Promise<any> => {
  const { requestBody, beginType } = input

  return await accountingApi({
    method: 'post',
    url: '/api/v1/account-move-line/add-balance',
    data: requestBody,
    params: {
      beginType: beginType,
    },
  })
}

export const putOtherBalance = async (input: {
  requestBody: RequestBody['SAVE']
  beginType: 'CUSTOMER' | 'VENDOR' | 'BANK' | 'OTHER'
}): Promise<any> => {
  const { requestBody, beginType } = input

  return await accountingApi({
    method: 'put',
    url: '/api/v1/account-move-line/change-balance',
    data: requestBody,
    params: {
      beginType: beginType,
    },
  })
}
