import { contractApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import {
  ReqGetContractApproveDetail,
  ReqGetContractApproveList,
  ResGetContractApproveDetail,
  ResGetContractApproveList,
} from './type'

export const END_POINT_SALE_APPROVE = '/api/v1/sale/approve/contract'

export const getContractApproveList = async (
  params: ReqGetContractApproveList
): Promise<ResGetContractApproveList> => {
  const { data } = await contractApi({
    method: 'get',
    url: END_POINT_SALE_APPROVE + '/list',
    params,
  })
  return data
}

export const useQueryGetContractApproveList = (
  params: ReqGetContractApproveList,
  options?: any
) => {
  return useQuery<ResGetContractApproveList>(
    [END_POINT_SALE_APPROVE + '/list', params],
    () => getContractApproveList(params),
    { ...defaultOption, ...options }
  )
}

export const getContractApproveDetail = async (
  params: ReqGetContractApproveDetail
): Promise<ResGetContractApproveDetail> => {
  const { data } = await contractApi({
    method: 'get',
    url: END_POINT_SALE_APPROVE,
    params,
  })
  return data
}

export const useQueryGetContractApproveDetail = (
  params: ReqGetContractApproveDetail,
  options?: any
) => {
  return useQuery<ResGetContractApproveDetail>(
    [END_POINT_SALE_APPROVE, params],
    () => getContractApproveDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
