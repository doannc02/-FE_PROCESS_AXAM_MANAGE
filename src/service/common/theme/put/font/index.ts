import { commonApi } from '@/config/axios'
import { RequestBody } from './type'

export const putFontConfig = async (
  requestBody: RequestBody['PUT']
): Promise<any> => {
  return await commonApi({
    method: 'put',
    url: '/api/v1/font',
    params: {
      companyId: requestBody.companyId,
    },
    data: requestBody.data,
  })
}
