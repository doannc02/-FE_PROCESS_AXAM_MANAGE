import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getIncreaseToolList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: 'api/v1/increase-tool/list',
    params,
  })

  return data
}

export const useQueryGetIncreaseToolList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/increase-tool/list', params],
    () => getIncreaseToolList(params),
    { ...defaultOption, ...options }
  )
}

export const getDeCreaseToolList = async (
  params: RequestBody['GET']
): Promise<Response['GET_DECREASE']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: 'api/v1/decrease-tools/list',
    params,
  })

  return data
}

export const useQueryGetDeCreaseToolList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET_DECREASE']>(
    ['api/v1/decrease-tools/list', params],
    () => getDeCreaseToolList(params),
    { ...defaultOption, ...options }
  )
}
