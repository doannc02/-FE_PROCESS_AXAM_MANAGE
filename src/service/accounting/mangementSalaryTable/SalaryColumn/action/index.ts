import { hrmApi } from '@/config/axios'
import { ReqSalaryColumnDetail, ResponseSalaryColumn } from './type'

export const createSalaryColumn = async (
  requestBody: ReqSalaryColumnDetail
): Promise<ResponseSalaryColumn> => {
  const { data } = await hrmApi({
    method: 'post',
    url: 'api/v1/salary-column',
    data: {
      ...requestBody,
    },
  })
  return data
}

export const updateSalaryColumn = async (
  requestBody: ReqSalaryColumnDetail
): Promise<ResponseSalaryColumn> => {
  const { data } = await hrmApi({
    method: 'put',
    url: 'api/v1/salary-column',
    data: {
      ...requestBody,
    },
  })
  return data
}

export const deleteSalaryColumn = async (params: { id: number }) => {
  const { data } = await hrmApi({
    method: 'delete',
    url: 'api/v1/salary-column',
    params,
  })
  return data
}
