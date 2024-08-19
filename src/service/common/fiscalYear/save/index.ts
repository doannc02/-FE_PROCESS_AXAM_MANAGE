import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postFiscalYear = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: `/api/v1/fiscal-year`,
    data: requestBody,
  })
}

export const putFiscalYear = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: `/api/v1/fiscal-year`,
    data: requestBody,
    params: {
      fiscalYearId: requestBody.id,
    },
  })
}
