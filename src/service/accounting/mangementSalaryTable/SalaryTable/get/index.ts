import { defaultOption, hrmApi } from '@/config/axios'
import { useQuery } from 'react-query'

export const getAllSalaryTable = async (params?: any): Promise<any> => {
  const { data } = await hrmApi({
    method: 'get',
    url: 'api/v1/staff-payroll/list',
    params,
  })
  return data
}

export const useGetAllSalaryTable = (params?: any, options?: any) => {
  return useQuery(
    ['api/v1/staff-payroll/list', params],
    () => getAllSalaryTable(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAllHeaderTable = async (params: { id: number }) => {
  const { data } = await hrmApi({
    method: 'get',
    url: '/api/v1/staff-payroll/headers',
    params,
  })
  return data
}

export const useGetAllHeaderTable = (params: { id: number }, options?: any) => {
  return useQuery(
    ['/api/v1/staff-payroll/headers', params],
    () => getAllHeaderTable(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
