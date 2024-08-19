import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getTotalReceivableDebt = async (
  params: RequestBody['GET_DEBT']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url:
      params?.typeDebt === 'PAYABLE'
        ? '/api/v1/debt-paid/total'
        : '/api/v1/debt/total',
    params,
  })

  return data
}

export const useQueryGetTotalReceivableDebt = (
  params: RequestBody['GET_DEBT'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/debt/total', params],
    () => getTotalReceivableDebt(params),
    { ...defaultOption, ...options }
  )
}

// --- new ----
export const getTotalReceivableDebtNewNormalTab = async (
  params: RequestBody['GET_DEBT']
): Promise<Response['GET_NORMAL_TAB']> => {
  const { data } = await accountingApi({
    method: 'get',
    url:
      params.typeDebt === 'PAYABLE'
        ? '/api/v1/debt-paid/total'
        : '/api/v1/debt/total',
    params,
  })
  return data
}

export const useQueryGetTotalReceivableDebtNewNormalTab = (
  params: RequestBody['GET_DEBT'],
  options?: any
) => {
  return useQuery<Response['GET_NORMAL_TAB']>(
    ['/api/v1/debt/total', params],
    () => getTotalReceivableDebtNewNormalTab(params),
    { ...defaultOption, ...options }
  )
}

export const getTotalReceivableDebtNew = async (
  params: RequestBody['GET_DEBT']
): Promise<Response['GET_DEBT']> => {
  const { data } = await accountingApi({
    method: 'get',
    url:
      params.typeDebt === 'PAYABLE'
        ? '/api/v1/debt-paid/synthetic-total'
        : '/api/v1/debt/synthetic-total',
    params,
  })
  return data
}

export const useQueryGetTotalReceivableDebtNew = (
  params: RequestBody['GET_DEBT'],
  options?: any
) => {
  return useQuery<Response['GET_DEBT']>(
    ['/api/v1/debt/synthetic-total', params],
    () => getTotalReceivableDebtNew(params),
    { ...defaultOption, ...options }
  )
}
