import { commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getBranchOfBank = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await commonApi({
    method: 'get',
    url: '/api/v1/bank/list/bank-branches',
    params,
  })
  return data
}

export const useQueryGetBranchOfBank = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/bank/list/bank-branches', params],
    () => getBranchOfBank(params),
    { ...defaultOption, ...options }
  )
}
