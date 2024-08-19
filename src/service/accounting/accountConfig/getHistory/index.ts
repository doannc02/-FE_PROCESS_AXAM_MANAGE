import { accountingApi, commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getHisAccountConfig = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/account-config/history',
    params: params,
  })
  return data
}

export const useQueryGetHisAccountConfig = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    [`/api/v1/account-config/history`],
    () => getHisAccountConfig(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getHisAccountConfigList = async (): Promise<Response['LIST']> => {
  const { data } = await commonApi({
    method: 'get',
    url: '/api/v1/fiscal-year-config/list',
  })
  return data
}

export const useQueryGetHisAccountConfigList = (options?: any) => {
  return useQuery(
    [`/api/v1/fiscal-year-config/list`],
    () => getHisAccountConfigList(),
    {
      ...defaultOption,
      ...options,
    }
  )
}
