import { defaultOption, hrmApi } from '@/config/axios'
import {
  ReqParamsSalaryColumn,
  ResponseSalaryColumnAll,
  ResponseSalaryColumnDetail,
} from './type'
import { useQuery } from 'react-query'

export const getAllSalaryColumn = async (
  params?: ReqParamsSalaryColumn
): Promise<ResponseSalaryColumnAll> => {
  const { data } = await hrmApi({
    method: 'get',
    url: 'api/v1/salary-column/list',
    params,
  })
  return data
}

export const useGetAllSalaryColumn = (
  params?: ReqParamsSalaryColumn,
  options?: any
) => {
  return useQuery<ResponseSalaryColumnAll>(
    ['api/v1/salary-column/list', params],
    () => getAllSalaryColumn(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAllSalaryColumnSystem = async (
  params?: ReqParamsSalaryColumn
): Promise<ResponseSalaryColumnAll> => {
  const { data } = await hrmApi({
    method: 'get',
    url: 'api/v1/salary-column/system/list',
    params,
  })
  return data
}

export const useGetAllSalaryColumnSystem = (
  params?: ReqParamsSalaryColumn,
  options?: any
) => {
  return useQuery<ResponseSalaryColumnAll>(
    ['api/v1/salary-column/system/list', params],
    () => getAllSalaryColumnSystem(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getDetailSalaryColumn = async (params: {
  id: number
}): Promise<ResponseSalaryColumnDetail> => {
  const { data } = await hrmApi({
    method: 'get',
    url: 'api/v1/salary-column',
    params,
  })
  return data
}

export const useGetDetailSalaryColumn = (
  params: {
    id: number
  },
  options?: any
) => {
  return useQuery<ResponseSalaryColumnDetail>(
    ['api/v1/salary-column', params],
    () => getDetailSalaryColumn(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
