import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, SubjectCostConfig } from './type'

export const SUBJECT_COST_END_POINT = '/api/v1/config_subject_cost'

export const getSubjectCostConfigDetail = async (
  params: RequestBody['GET']
): Promise<SubjectCostConfig> => {
  const { data } = await accountingApi({
    method: 'get',
    url: SUBJECT_COST_END_POINT,
    params,
  })

  return data
}

export const useQueryGetSubjectCostConfigDetail = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<SubjectCostConfig>(
    [SUBJECT_COST_END_POINT, params],
    () => getSubjectCostConfigDetail(params),
    { ...defaultOption, ...options }
  )
}
