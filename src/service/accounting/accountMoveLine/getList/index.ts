import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getAccountMoveLineList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: 'api/v1/account-move-line/list',
    params,
  })

  return data
}

export const useQueryGetAccountMoveLineList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/account-move-line/list', params],
    () => getAccountMoveLineList(params),
    { ...defaultOption, ...options }
  )
}
