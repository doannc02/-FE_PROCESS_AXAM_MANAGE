import { authWarehouseApi, productApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import {
  warehouseNestedType,
  WarehouseType,
} from '@/components/hooks/path/useCheckPath'

export const getProductInventoryList = async (
  params: RequestBody['GET'],
  typeWareHouse: WarehouseType
): Promise<Response['GET']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: `/api/v1/${warehouseNestedType[typeWareHouse]}/inventory-first-period/product/list`,
    params,
  })
  return data
}

// export const useQueryGetProductList2 = (
//   params: RequestBody['GET'],
//   options?: any
// ) => {
//   return useQuery<Response['GET']>(
//     ['/api/v2/product/list2', params],
//     () => getProductList2(params),
//     { ...defaultOption, ...options }
//   )
// }

// export const getProductListFullType = async (
//   params: RequestBody['GET']
// ): Promise<Response['GET']> => {
//   const { data } = await productApi({
//     method: 'get',
//     url: '/api/v2/product/list',
//     params,
//   })
//   return data
// }

// export const useQueryGetProductListFullType = (
//   params: RequestBody['GET'],
//   options?: any
// ) => {
//   return useQuery<Response['GET']>(
//     ['/api/v2/product/list', params],
//     () => getProductListFullType(params),
//     { ...defaultOption, ...options }
//   )
// }
