import { contractApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import {
  ReqGetContractCategoryDetail,
  ReqGetContractCategoryList,
  ResGetContractCategoryDetail,
  ResGetContractCategoryList,
} from './type'

export const END_POINT_SALE_CONTRACT_CATEGORY = '/api/v1/sale/contract/category'

export const getContractCategoryList = async (
  params: ReqGetContractCategoryList
): Promise<ResGetContractCategoryList> => {
  const { data } = await contractApi({
    method: 'get',
    url: END_POINT_SALE_CONTRACT_CATEGORY + '/list',
    params,
  })
  return data
}

export const useQueryGetContractCategoryList = (
  params: ReqGetContractCategoryList,
  options?: any
) => {
  return useQuery<ResGetContractCategoryList>(
    [END_POINT_SALE_CONTRACT_CATEGORY + '/list', params],
    () => getContractCategoryList(params),
    { ...defaultOption, ...options }
  )
}

export const getContractCategoryDetail = async (
  params: ReqGetContractCategoryDetail
): Promise<ResGetContractCategoryDetail> => {
  const { data } = await contractApi({
    method: 'get',
    url: END_POINT_SALE_CONTRACT_CATEGORY,
    params,
  })
  return data
}

export const useQueryGetContractCategoryDetail = (
  params: ReqGetContractCategoryDetail,
  options?: any
) => {
  return useQuery<ResGetContractCategoryDetail>(
    [END_POINT_SALE_CONTRACT_CATEGORY, params],
    () => getContractCategoryDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
