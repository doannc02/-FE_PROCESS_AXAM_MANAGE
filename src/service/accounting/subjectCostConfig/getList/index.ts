import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, SubjectCostConfig } from './type'
import { SUBJECT_COST_END_POINT } from '../get'
import { PageResponse } from '@/service/type'

export const getSubjectCostConfigList = async (
  params: RequestBody['GET']
): Promise<SubjectCostConfig> => {
  const { data } = await accountingApi({
    method: 'get',
    url: SUBJECT_COST_END_POINT + '/list',
    params,
  })

  return data
}

export const useQueryGetSubjectCostConfigList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<SubjectCostConfig>(
    [SUBJECT_COST_END_POINT + '/list', params],
    () => getSubjectCostConfigList(params),
    { ...defaultOption, ...options }
  )
}

export const getSubjectCostConfigListByType = async (
  params: RequestBody['GET']
): Promise<PageResponse<SubjectCostConfig>> => {
  const { data } = await accountingApi({
    method: 'get',
    url: SUBJECT_COST_END_POINT + '/list-by-type',
    params,
  })
  const d = (data.data ?? []).map((ele: any) => {
    if (params.subjectType === 'STEP_STOOL_PRODUCTION' && !params?.processId) {
      return {
        ...ele,
        name: ele?.stage?.name ?? '',
        code: ele?.stage?.code ?? '',
      }
    }
    return {
      ...ele,
      name: ele?.subject?.name ?? '',
      code: ele?.subject?.code ?? '',
    }
  })
  let dataFormat: PageResponse<SubjectCostConfig> = {
    traceId: '',
    message: '',
    data: {
      content: d,
      page: 0,
      size: 20,
      sort: '',
      totalElements: 0,
      totalPages: 0,
      numberOfElements: 20,
    },
  }

  console.log(dataFormat, 'data')
  return dataFormat
}

//handleGetListListProduct
