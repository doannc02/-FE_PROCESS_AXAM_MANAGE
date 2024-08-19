import { commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { Response } from './type'

export const getListCurrencies = async (params: any): Promise<any> => {
  const { data } = await commonApi({
    method: 'get',
    url: '/api/v1/currency/list',
    params,
  })
  return data
}

export const useQueryGetListCurrencies = (params: any, options?: any) => {
  return useQuery<Response['GET']>(
    ['/api/v1/currency/list', params],
    () => getListCurrencies(params),
    { ...defaultOption, ...options }
  )
}
