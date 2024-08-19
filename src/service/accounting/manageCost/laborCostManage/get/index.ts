import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { URL_LABOR_COST_MANAGE } from '../..'
import { GeneralPrice, LaborCostManageLst, RequestBody } from './type'
import { BaseResponse } from '@/service/type'

export const getDetailLaborCostManage = async (
  params: RequestBody['GET']
): Promise<BaseResponse<GeneralPrice>> => {
  const { data } = await accountingApi({
    method: 'get',
    url: URL_LABOR_COST_MANAGE + '/id',
    params,
  })

  return data
}

export const useQueryGetDetailLaborCostManage = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<BaseResponse<GeneralPrice>>(
    [URL_LABOR_COST_MANAGE + '/id', params],
    () => getDetailLaborCostManage(params),
    { ...defaultOption, ...options }
  )
}
