import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { Response } from './type'
import { RequestBody } from '../getList/getIncreaseAsset/type'

export const getTotal = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/increase-asset/total',
    params,
  })
  return data
}

export const useQueryGetTotal = (params: RequestBody['GET'], options?: any) => {
  return useQuery(
    ['/api/v1/increase-asset/total', params],
    () => getTotal(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
