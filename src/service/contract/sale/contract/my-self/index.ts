import { contractApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { ReqGetSaleContractList, ResGetSaleContractList } from './type'

export const END_POINT_SALE_CONTRACT_MY_SELF = '/api/v1/sale/request/contract'

export const getSaleContractMySelfList = async (
  params: ReqGetSaleContractList
): Promise<ResGetSaleContractList> => {
  const { data } = await contractApi({
    method: 'get',
    url: END_POINT_SALE_CONTRACT_MY_SELF + '/list',
    params,
  })
  return data
}

export const useQueryGetSaleContractMySelfList = (
  params: ReqGetSaleContractList,
  options?: any
) => {
  return useQuery<ResGetSaleContractList>(
    [END_POINT_SALE_CONTRACT_MY_SELF + '/list', params],
    () => getSaleContractMySelfList(params),
    { ...defaultOption, ...options }
  )
}
