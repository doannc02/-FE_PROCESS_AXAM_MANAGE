import { authWarehouseApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getSerialLots = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const paramsOption = { ...params } as Partial<any>

  const { data } = await authWarehouseApi({
    method: 'get',
    url: '/api/v1/stock-picking/out/serial-lots',
    params: { ...paramsOption },
  })

  return data ? data.data : data
}

export const useQueryGetSerialLots = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/stock-picking/out/serial-lots', params],
    () => getSerialLots(params),
    {
      ...defaultOption,
      ...options,
      enabled: !!params.locationId && !!params.productId,
    }
  )
}
