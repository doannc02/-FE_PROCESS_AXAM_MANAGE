import { authWarehouseApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { BaseResponse } from '@/service/type'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getStockPickingList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: '/api/v1/sale/stock-picking/in/list',
    params,
  })
  return data ? data.data : data
}

export const getStockPickingListFromFactoryWarehouse = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: '/api/v1/sale/factory/stock-picking/list',
    params,
  })
  return data ? data.data : data
}

// export const useQueryGetStockPickingList = (
//   params: RequestBody['GET'],
//   options?: any
// ) => {
//   const { importWarehouseFrom } = useCheckPathImportWarehouse()
//   return useQuery<Response['GET']>(
//     [
//       importWarehouseFrom === 'FACTORY'
//         ? '/api/v1/sale/factory/stock-picking/list'
//         : '/api/v1/sale/stock-picking/in/list',
//       params,
//     ],
//     () =>
//       importWarehouseFrom === 'FACTORY'
//         ? getStockPickingListFromFactoryWarehouse(params)
//         : getStockPickingList(params),
//     { ...defaultOption, ...options }
//   )
// }

export const getAutoGenerateSerial = async (params: {
  numberSerial: number
}): Promise<BaseResponse<string[]>> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: '/api/v1/sale/stock-picking/auto-generate-serial',
    params,
  })
  return data
}

export const useQueryGetAutoGenerateSerial = (
  params: { numberSerial: number },
  options?: any
) => {
  return useQuery<BaseResponse<string[]>>(
    ['/api/v1/sale/stock-picking/auto-generate-serial', params],
    () => getAutoGenerateSerial(params),
    { ...defaultOption, ...options }
  )
}
