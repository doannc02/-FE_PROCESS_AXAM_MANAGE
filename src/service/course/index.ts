import { commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { CommonObject, PageResponse } from '../type'

const URL_COURSE = '/api/v1/course'

export const getListCourse = async (
  params: any
): Promise<PageResponse<CommonObject[]>> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_COURSE + '/list',
    params,
  })

  return data
}

export const useQueryGetProposalsList = (params: any, options?: any) => {
  return useQuery<PageResponse<CommonObject[]>>(
    ['api/v1/course/list', params],
    () => getListCourse(params),
    { ...defaultOption, ...options }
  )
}
