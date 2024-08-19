import { commonApi, defaultOption, hrmApi } from '@/config/axios'
import { useQuery } from 'react-query'
import {
  reqGetAllDepartment,
  reqGetAllDStaff,
  reqGetAllSalaryTemplate,
  ResponseDepartmentAll,
  ResponseDetailSalaryTemplate,
  ResponseSalarySystemAll,
  ResponseSalaryTemplateAll,
  ResponseStaffAll,
} from './type'

export const getAllSalaryTemplate = async (
  params?: reqGetAllSalaryTemplate
): Promise<ResponseSalaryTemplateAll> => {
  const { data } = await hrmApi({
    method: 'GET',
    url: 'api/v1/salary-template/list',
    params,
  })
  return data
}

export const useGetAllSalaryTemplate = (
  params?: reqGetAllSalaryTemplate,
  options?: any
) => {
  return useQuery(
    ['api/v1/salary-template/list', params],
    () => getAllSalaryTemplate(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAllSalarySystemTemplate = async (
  params?: reqGetAllSalaryTemplate
): Promise<ResponseSalarySystemAll> => {
  const { data } = await hrmApi({
    method: 'GET',
    url: 'api/v1/salary-column/system/list',
    params,
  })
  return data
}

export const useGetAllSalarySystemTemplate = (
  params?: reqGetAllSalaryTemplate,
  options?: any
) => {
  return useQuery(
    ['api/v1/salary-column/system/list', params],
    () => getAllSalarySystemTemplate(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAllDepartment = async (
  params?: reqGetAllDepartment
): Promise<ResponseDepartmentAll> => {
  const { data } = await hrmApi({
    method: 'GET',
    url: 'api/v1/salary-template/department/list',
    params,
  })
  return data
}

export const useGetAllDepartment = (
  params?: reqGetAllDepartment,
  options?: any
) => {
  return useQuery(
    ['api/v1/salary-template/department/list', params],
    () => getAllDepartment(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAllStaff = async (
  params?: reqGetAllDStaff
): Promise<ResponseStaffAll> => {
  const { data } = await hrmApi({
    method: 'GET',
    url: 'api/v1/salary-template/staff/list',
    params,
  })
  return data
}

export const getDetailSalaryTemplate = async (params?: {
  id: number
}): Promise<ResponseDetailSalaryTemplate> => {
  const { data } = await hrmApi({
    method: 'GET',
    url: 'api/v1/salary-template',
    params,
  })
  return data
}

export const useGetDetailSalaryTemplate = (
  params?: { id: number },
  options?: any
) => {
  return useQuery(
    ['api/v1/salary-template', params],
    () => getDetailSalaryTemplate(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getPositionAll = async (
  params?: reqGetAllSalaryTemplate
): Promise<any> => {
  const { data } = await commonApi({
    method: 'GET',
    url: '/api/v1/position/list',
    params,
  })
  return data
}
