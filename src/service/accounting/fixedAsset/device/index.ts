import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { Response, RequestBody } from './type'

export const getDevice = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/increase-tool/device',
    params,
  })
  return data
}

export const useQueryGetDevice = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/increase-tool/device', params],
    () => getDevice(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
