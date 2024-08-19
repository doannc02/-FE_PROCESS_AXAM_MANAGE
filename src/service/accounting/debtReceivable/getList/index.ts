import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getDebtReceivableList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v2/debt',
    params,
  })

  return data
}

export const useQueryGetDebtReceivableList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v2/debt', params],
    () => getDebtReceivableList(params),
    { ...defaultOption, ...options }
  )
}

// ---- new ---
export const getDebtReceivableListNewNormalTab = async (
  params: RequestBody['GET_DEBT']
): Promise<Response['GET_NORMAL_TAB']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: params?.typeDebt === 'PAYABLE' ? '/api/v1/debt-paid' : '/api/v1/debt',
    params,
  })

  return data
}
export const useQueryGetDebtReceivableListNewNormalTab = (
  params: RequestBody['GET_DEBT'],
  options?: any
) => {
  return useQuery<Response['GET_NORMAL_TAB']>(
    ['/api/v1/debt/synthetic', params],
    () => getDebtReceivableListNewNormalTab(params),
    { ...defaultOption, ...options }
  )
}

export const getDebtReceivableListNew = async (
  params: RequestBody['GET_DEBT']
): Promise<Response['GET_DEBT']> => {
  const { data } = await accountingApi({
    method: 'get',
    url:
      params?.typeDebt === 'PAYABLE'
        ? '/api/v1/debt-paid/synthetic'
        : '/api/v1/debt/synthetic',
    params,
  })

  return data
}

export const useQueryGetDebtReceivableListNew = (
  params: RequestBody['GET_DEBT'],
  options?: any
) => {
  return useQuery<Response['GET_DEBT']>(
    ['/api/v1/debt/synthetic', params],
    () => getDebtReceivableListNew(params),
    { ...defaultOption, ...options }
  )
}
