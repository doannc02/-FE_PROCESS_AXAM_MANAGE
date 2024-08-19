import { authWarehouseApi, defaultOption, authCommonAPI } from '@/config/axios'
import { useQuery } from 'react-query'
import { Request, Response } from './type'

export const getBankController = async (
  params: Request['GET']
): Promise<Response['GET']> => {
  const { data } = await authCommonAPI({
    method: 'get',
    url: 'api/v1/bank/list',
    params,
  })

  return data ? data.data : data
}

export const useQueryGetBankController = (
  params: Request['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/bank/list', params],
    () => getBankController(params),
    { ...defaultOption, ...options }
  )
}
