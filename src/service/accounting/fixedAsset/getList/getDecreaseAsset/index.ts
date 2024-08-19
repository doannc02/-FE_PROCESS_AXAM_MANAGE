import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getDecreaseAssetList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: 'api/v1/increase-asset/list',
    params,
  })

  return data
}

export const useQueryGetDecreaseAssetList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/increase-asset/list', params],
    () => getDecreaseAssetList(params),
    { ...defaultOption, ...options }
  )
}

export const getIncreaseAssetListForDecrease = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: 'api/v1/decrease-asset/list-increased-asset',
    params,
  })

  return data
}

export const useQueryIncAssetForDecList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/increase-asset/list-increased-asset', params],
    () => getIncreaseAssetListForDecrease(params),
    { ...defaultOption, ...options }
  )
}
