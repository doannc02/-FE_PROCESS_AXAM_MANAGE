import { commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { Response } from './type'

export const getAddressList = async (params: any): Promise<Response['GET']> => {
  const { data } = await commonApi({
    method: 'get',
    url: '/api/v1/companies/address-delivery',
    params,
  })
  return data
}

export const useQueryGetAddressList = (params: any, options?: any) => {
  return useQuery<Response['GET']>(
    ['/api/v1/companies/address-company', params],
    () => getAddressList(params),
    { ...defaultOption, ...options }
  )
}
