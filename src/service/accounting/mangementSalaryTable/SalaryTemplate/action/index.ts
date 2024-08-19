import { hrmApi } from '@/config/axios'
import { ResDetailSalaryTemplate } from './type'
import { ReqSalaryTemplateAction } from '../get/type'

export const createSalaryTemplate = async (
  requestBody: ReqSalaryTemplateAction
): Promise<ResDetailSalaryTemplate> => {
  const { data } = await hrmApi({
    method: 'post',
    url: 'api/v1/salary-template',
    data: {
      ...requestBody,
    },
  })
  return data
}

export const updateSalaryTemplate = async (
  requestBody: ReqSalaryTemplateAction
): Promise<ResDetailSalaryTemplate> => {
  const { data } = await hrmApi({
    method: 'put',
    url: 'api/v1/salary-template',
    data: {
      ...requestBody,
    },
  })
  return data
}

export const deleteSalaryTemplate = async (params: {
  id: number
}): Promise<ResDetailSalaryTemplate> => {
  const { data } = await hrmApi({
    method: 'delete',
    url: "api/v1/salary-template",
    params,
  })
  return data
}
