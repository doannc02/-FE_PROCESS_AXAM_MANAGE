import { defaultOption, hrmApi } from '@/config/axios'
import { useQuery } from 'react-query'
import {
  ReqParamsGroupSalary,
  ResponseDetailGroupSalary,
  ResponseGroupSalary,
} from './type'
export const getAllSalaryGroup = async (
  params: ReqParamsGroupSalary
): Promise<ResponseGroupSalary> => {
  const { data } = await hrmApi({
    method: 'get',
    url: 'api/v1/group-salary-column/list',
    params,
  })
  return data ? data : []
}

export const useGetAllSalaryGroup = (
  params: ReqParamsGroupSalary,
  options?: any
) => {
  return useQuery<ResponseGroupSalary>(
    ['api/v1/group-salary-column/list', params],
    () => getAllSalaryGroup(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getDetailGroupSalaryGroup = async (params: {
  id: number
}): Promise<ResponseDetailGroupSalary> => {
  const { data } = await hrmApi({
    method: 'get',
    url: 'api/v1/group-salary-column',
    params,
  })

  return data
}

export const useGetDetailSalaryGroup = (
  params: {
    id: number
  },

  options?: any
) => {
  return useQuery<ResponseDetailGroupSalary>(
    ['api/v1/group-salary-column', params],
    () => getDetailGroupSalaryGroup(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
