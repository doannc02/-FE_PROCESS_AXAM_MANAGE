import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getDebtReceivableInvoiceList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/product-debt/list-invoice-line',
    params,
  })

  return data
}

export const useQueryGetDebtReceivableInvoiceList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/product-debt/list-invoice-line', params],
    () => getDebtReceivableInvoiceList(params),
    { ...defaultOption, ...options }
  )
}
