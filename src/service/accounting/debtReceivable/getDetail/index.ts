import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getDebtReceivableDetail = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url:
      params?.typeDebt === 'PAYABLE'
        ? '/api/v1/debt-paid/detail-paid'
        : '/api/v1/debt/detail-receive',
    params,
  })

  return data
}

export const useQueryGetDebtReceivableDetail = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/debt/detail-receive', params],
    () => getDebtReceivableDetail(params),
    { ...defaultOption, ...options }
  )
}
