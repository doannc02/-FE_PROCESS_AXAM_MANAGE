import { contractApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import {
  ReqGetSaleContractDetail,
  ReqGetSaleContractList,
  ResGetSaleContractDetail,
  ResGetSaleContractList,
} from './type'

export const END_POINT_SALE_CONTRACT = '/api/v1/sale/contract'

export const getSaleContractList = async (
  params: ReqGetSaleContractList
): Promise<ResGetSaleContractList> => {
  const { data } = await contractApi({
    method: 'get',
    url: END_POINT_SALE_CONTRACT + '/list',
    params,
  })
  return data
}

export const useQueryGetSaleContractList = (
  params: ReqGetSaleContractList,
  options?: any
) => {
  return useQuery<ResGetSaleContractList>(
    [END_POINT_SALE_CONTRACT + '/list', params],
    () => getSaleContractList(params),
    { ...defaultOption, ...options }
  )
}

export const getSaleContractDetail = async (
  params: ReqGetSaleContractDetail
): Promise<ResGetSaleContractDetail> => {
  const { data } = await contractApi({
    method: 'get',
    url: END_POINT_SALE_CONTRACT,
    params,
  })
  return data
}

export const useQueryGetSaleContractDetail = (
  params: ReqGetSaleContractDetail,
  options?: any
) => {
  return useQuery<ResGetSaleContractDetail>(
    [END_POINT_SALE_CONTRACT, params],
    () => getSaleContractDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
