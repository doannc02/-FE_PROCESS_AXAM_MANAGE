import { financeApi } from '@/config/axios'
import { RequestBody, Response } from './type'

export const getIncomeList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await financeApi({
    method: 'get',
    url: '/api/v1/income/list',
    params,
  })

  return data
}

export const getListObjectCurrency = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await financeApi({
    method: 'get',
    url: '/api/v1/expense/list',
    params,
  })
  return data
}
