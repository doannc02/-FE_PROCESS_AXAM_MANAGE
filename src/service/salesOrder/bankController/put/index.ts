import { authCommonAPI, defaultOption } from '@/config/axios'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'

export const getBankById = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { bankId } = params
  const url = `/api/v1/bank?bankId=${bankId}`
  const { data } = await authCommonAPI({
    method: 'get',
    url,
    params,
  })
  return data ? data.data : data
}

export const putUpdateBank = async (
  requestBody: RequestBody['PUT']
): Promise<any> => {
  const { id } = requestBody
  const url = `/api/v1/bank?bankId=${id}`
  return await authCommonAPI({
    method: 'put',
    url,
    data: requestBody,
  })
}

export const useQueryGetBankId = (params?: any, options?: any) => {
  return useQuery<Response['GET']>(
    ['/api/v1/bank', params],
    () => getBankById(params),
    { ...defaultOption, ...options }
  )
}
