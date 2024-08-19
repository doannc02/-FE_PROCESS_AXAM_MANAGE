import { commonApi } from '@/config/axios'
import { RequestBody, RequestParam } from './type'

export const putSTKBankForUserLogin = async (
  requestBody: RequestBody['PUT']
): Promise<any> => {
  const url = '/api/v1/companies/update-banks'
  return await commonApi({
    method: 'put',
    url,
    data: [requestBody.data],
  })
}

export const putSTKBankForPartner = async (
  requestBody: RequestBody['PUT']
): Promise<any> => {
  const url = '/api/v1/partners/bank-account'
  return await commonApi({
    method: 'post',
    url,
    params: { isPartner: requestBody.isPartner, id: Number(requestBody?.id) },
    data: requestBody.data,
  })
}
