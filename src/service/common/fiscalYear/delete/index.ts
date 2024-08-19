import { authCommonAPI } from '@/config/axios'
import { RequestBody, Response } from './type'

export const deleteFiscalYear = async (
  params: RequestBody['DELETE']
): Promise<Response['DELETE']> => {
  const { data } = await authCommonAPI({
    method: 'delete',
    url: `/api/v1/fiscal-year`,
    params,
  })
  return data
}
