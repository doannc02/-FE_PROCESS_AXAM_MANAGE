import { contractApi } from '@/config/axios'
import { RequestParam, Response } from './type'

export const putApproveStatus = async (
  params: RequestParam['PUT']
): Promise<Response['PUT']> => {
  const { data } = await contractApi({
    method: 'put',
    url: '/api/v1/sale/debt-granting-policies/pending-approval',
    params,
  })

  return data
}

export const putApproveStatusPolicyByManager = async (
  params: RequestParam['PUT']
): Promise<Response['PUT']> => {
  const { data } = await contractApi({
    method: 'put',
    url: '/api/v1/sale/debt-granting-policies/manager-approval',
    params,
  })

  return data
}

export const putApproveStatusReplacePolicy = async (
  params: RequestParam['PUT']
): Promise<Response['PUT']> => {
  const { data } = await contractApi({
    method: 'put',
    url: '/api/v1/sale/debt-granting-policies/replace-policies',
    params,
  })

  return data
}
