import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getDebtInvoiceSaleList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: 'api/v2/debt/invoice-of-sale',
    params,
  })

  return data
}

export const useQueryGetDebtInvoiceSaleList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v2/debt/invoice-of-sale', params],
    () => getDebtInvoiceSaleList(params),
    { ...defaultOption, ...options }
  )
}
