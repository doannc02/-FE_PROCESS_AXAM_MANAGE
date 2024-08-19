import { commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { Response } from './type'

export const getUnitList = async (params: any): Promise<Response['GET']> => {
  const { data } = await commonApi({
    method: 'get',
    url: '/api/v1/units/list',
    params,
  })
  return data
}

export const useQueryGetUnitList = (params: any, options?: any) => {
  return useQuery<Response['GET']>(
    ['/api/v1/units/list', params],
    () => getUnitList(params),
    { ...defaultOption, ...options }
  )
}
