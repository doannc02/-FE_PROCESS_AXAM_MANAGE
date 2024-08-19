import { commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getCurrencyOfCompany = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await commonApi({
    method: 'get',
    url: '/api/v1/companies/currency-id',
    params,
  })
  return data
}

export const useQueryGetCurrenciesOfCompany = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/companies/currency-id'],
    () => getCurrencyOfCompany(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
