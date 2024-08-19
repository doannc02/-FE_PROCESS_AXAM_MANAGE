import { hrmApi } from '@/config/axios'

export const exportSalaryTable = async (salaryTemplateId: number) => {
  const { data } = await hrmApi({
    method: 'get',
    url: 'api/v1/export/payroll/template',
    responseType: 'blob',
    params: {
      salaryTemplateId,
    },
  })

  return data
}

export const importSalaryTable = async (salaryTemplateId: number) => {
  const { data } = await hrmApi({
    method: 'get',
    url: 'api/v1/import/payroll/template',
    responseType: 'blob',
    params: {
      salaryTemplateId,
    },
  })
  return data
}
