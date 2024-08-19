import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { URL_LABOR_COST_MANAGE } from '../..'
import { LaborCostManageLst, RequestBody } from './type'

export const getLaborCostManage = async (
  params: RequestBody['GET']
): Promise<LaborCostManageLst> => {
  const { data } = await accountingApi({
    method: 'get',
    url: URL_LABOR_COST_MANAGE + '/list',
    params,
  })

  return data
}

export const useQueryGetLaborCostManage = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<LaborCostManageLst>(
    [URL_LABOR_COST_MANAGE + '/list', params],
    () => getLaborCostManage(params),
    { ...defaultOption, ...options }
  )
}
