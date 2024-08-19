import { commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { Response } from './type'

export const getFiscalYearConfig = async (): Promise<Response['GET']> => {
  const { data } = await commonApi({
    method: 'get',
    url: '/api/v1/fiscal-year-config',
  })

  return data
}

export const useQueryGetFiscalYearConfig = (options?: any) => {
  return useQuery<Response['GET']>(
    ['/api/v1/fiscal-year-config'],
    () => getFiscalYearConfig(),
    { ...defaultOption, ...options }
  )
}
