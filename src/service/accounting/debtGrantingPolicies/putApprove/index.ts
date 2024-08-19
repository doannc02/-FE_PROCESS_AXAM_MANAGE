import { accountingApi } from '@/config/axios'
import { RequestParam, Response } from './type'

export const putApproveStatus = async (
  params: RequestParam['PUT']
): Promise<Response['PUT']> => {
  const { data } = await accountingApi({
    method: 'put',
    url: '/api/v1/debt-granting-policies/pending-approval',
    params,
  })

  return data
}

export const putApproveStatusPolicyByManager = async (
  params: RequestParam['PUT']
): Promise<Response['PUT']> => {
  const { data } = await accountingApi({
    method: 'put',
    url: '/api/v1/debt-granting-policies/manager-approval',
    params,
  })

  return data
}

export const putApproveStatusReplacePolicy = async (
  params: RequestParam['PUT']
): Promise<Response['PUT']> => {
  const { data } = await accountingApi({
    method: 'put',
    url: '/api/v1/debt-granting-policies/replace-policies',
    params,
  })

  return data
}
