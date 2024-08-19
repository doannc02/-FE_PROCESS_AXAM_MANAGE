import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const calculatorDec = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'post',
    url: '/api/v1/decrease-tools/calculator-remain',
    data: params.lines,
    params: { decreaseDate: params.decreaseDate },
  })
  return data
}

export const useQueryCalculatorDecrease = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/decrease-tools/calculator-remain', params],
    () => calculatorDec(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
