import { hrmApi } from '@/config/axios'
import { GroupSalaryDetail, ResponseDetailGroupSalary } from '../get/type'
import { ResCreateGroupSalary } from './type'

export const createSalaryGroup = async (
  requestBody: GroupSalaryDetail
): Promise<ResCreateGroupSalary> => {
  const { data } = await hrmApi({
    method: 'post',
    url: "api/v1/group-salary-column",
    data: {
      ...requestBody,
    },
  })
  return data
}

export const updateSalaryGroup = async (
  requestBody: GroupSalaryDetail
): Promise<ResCreateGroupSalary> => {
  const { data } = await hrmApi({
    method: 'put',
    url: "api/v1/group-salary-column",
    data: {
      ...requestBody,
    },
  })
  return data
}

export const deleteSalaryGroup = async (params: {
  id: number
}): Promise<ResCreateGroupSalary> => {
  const { data } = await hrmApi({
    method: 'delete',
    url: "api/v1/group-salary-column",
    params,
  })
  return data
}
