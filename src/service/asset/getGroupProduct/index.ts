import { accountingApi, assetApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { Response } from './type'

export const getAssetGroupProduct = async (
  params: any
): Promise<Response['GET']> => {
  const { data } = await assetApi({
    method: 'get',
    url: '/api/v1/asset/group-product',
    params,
  })
  return data
}

export const useQueryGetAssetGroupProduct = (params: any, options?: any) => {
  return useQuery<Response['GET']>(
    ['/api/v1/asset/group-product', params],
    () => getAssetGroupProduct(params),
    { ...defaultOption, ...options }
  )
}
