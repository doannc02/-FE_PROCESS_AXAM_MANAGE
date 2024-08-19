import { commonApi } from '@/config/axios'
import { RequestBody } from './type'

export const putButtonConfig = async (
  requestBody: RequestBody['PUT']
): Promise<any> => {
  return await commonApi({
    method: 'put',
    url: '/api/v1/button-style',
    params: {
      companyId: requestBody.companyId,
    },
    data: requestBody.data,
  })
}
