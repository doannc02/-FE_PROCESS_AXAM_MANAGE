import { contractApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import {
  ReqGetSaleContractProgressDetail,
  ReqGetSaleContractProgressList,
  ResGetSaleContractProgressDetail,
  ResGetSaleContractProgressList,
} from './type'

export const END_POINT_SALE_PROGRESS_CONTRACT = '/api/v1/sale/contract-progress'

export const getSaleContractProgressList = async (
  params: ReqGetSaleContractProgressList
): Promise<ResGetSaleContractProgressList> => {
  const { data } = await contractApi({
    method: 'get',
    url: END_POINT_SALE_PROGRESS_CONTRACT + '/list',
    params,
  })
  return data
}

export const useQueryGetSaleContractProgressList = (
  params: ReqGetSaleContractProgressList,
  options?: any
) => {
  return useQuery<ResGetSaleContractProgressList>(
    [END_POINT_SALE_PROGRESS_CONTRACT + '/list', params],
    () => getSaleContractProgressList(params),
    { ...defaultOption, ...options }
  )
}

export const getSaleContractProgressDetail = async (
  params: ReqGetSaleContractProgressDetail
): Promise<ResGetSaleContractProgressDetail> => {
  const { data } = await contractApi({
    method: 'get',
    url: END_POINT_SALE_PROGRESS_CONTRACT,
    params,
  })
  return data
}

export const useQueryGetSaleContractProgressDetail = (
  params: ReqGetSaleContractProgressDetail,
  options?: any
) => {
  return useQuery<ResGetSaleContractProgressDetail>(
    [END_POINT_SALE_PROGRESS_CONTRACT, params],
    () => getSaleContractProgressDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
