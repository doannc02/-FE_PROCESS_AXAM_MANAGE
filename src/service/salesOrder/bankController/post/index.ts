import { RequestBody } from './type'
import { productApi, authCommonAPI } from '@/config/axios'

export const postNewBank = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  const url = `/api/v1/bank`
  const { data } = await authCommonAPI({
    method: 'post',
    url,
    data: requestBody,
  })

  return data
}

export const postNewBankApi = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  const url = `/api/v1/bank`
  const { data } = await authCommonAPI({
    method: 'post',
    url,
    data: requestBody,
  })

  return data
}
