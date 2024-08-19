import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getIncreaseAssetList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: 'api/v1/increase-asset/list',
    params,
  })

  return data
}

export const useQueryGetIncreaseAssetList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/increase-asset/list', params],
    () => getIncreaseAssetList(params),
    { ...defaultOption, ...options }
  )
}


export const getDeCreaseAssetList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: 'api/v1/decrease-asset/list',
    params,
  })

  return data
}

export const useQueryGetDeCreaseAssetList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/decrease-asset/list', params],
    () => getDeCreaseAssetList(params),
    { ...defaultOption, ...options }
  )
}
