import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postBankAndCOPBalance = async (input: {
  requestBody: RequestBody['SAVE']
  beginType: 'CUSTOMER' | 'VENDOR' | 'BANK' | 'OTHER'
}): Promise<any> => {
  const { requestBody, beginType } = input

  return await accountingApi({
    method: 'post',
    url: '/api/v1/account-move-line/beginning',
    data: requestBody,
    params: {
      beginType: beginType,
    },
  })
}

export const putBankAndCOPBalance = async (input: {
  requestBody: RequestBody['SAVE']
  beginType: 'CUSTOMER' | 'VENDOR' | 'BANK' | 'OTHER'
}): Promise<any> => {
  const { requestBody, beginType } = input

  return await accountingApi({
    method: 'put',
    url: '/api/v1/account-move-line/beginning',
    data: requestBody,
    params: {
      beginType: beginType,
    },
  })
}
