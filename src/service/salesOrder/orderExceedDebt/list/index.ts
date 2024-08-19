import { authSOApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { Response } from './type'
import  { TypePath, useCheckPath } from '@/path'

export const getListWholesaleExceedDebt = async (params: any): Promise<any> => {
  const { data } = await authSOApi({
    method: 'get',
    url: `/api/v1/wholesale/sale-order/exceed-debt-limit/list`,
    params: { ...params },
  })
  return data ? data.data : data
}

export const getListRetailExceedDebt = async (params: any): Promise<any> => {
  const { data } = await authSOApi({
    method: 'get',
    url: `/api/v1/retail/sale-order/exceed-debt-limit/list`,
    params: { ...params },
  })
  return data ? data.data : data
}

export const getListLiquidationExceedDebt = async (
  params: any
): Promise<any> => {
  const { data } = await authSOApi({
    method: 'get',
    url: `/api/v1/clearance/sale-order/exceed-debt-limit/list`,
    params: { ...params },
  })
  return data ? data.data : data
}

export const getListExceedDebt = async (
  params: any,
  typePath: TypePath
): Promise<any> => {
  const url = `/api/v1/${typePath.toLowerCase()}/sale-order/exceed-debt-limit/list`
  const { data } = await authSOApi({
    method: 'get',
    url,
    params,
  })
  return data ? data.data : data
}

export const useQueryGetOrderExceedDebt = (params: any) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<Response['GET']>(
    ['/api/v1/sale-order/exceed-debt-limit/list', params],
    () => getListExceedDebt(params, typeSaleRequest),
    { ...defaultOption }
  )
}
