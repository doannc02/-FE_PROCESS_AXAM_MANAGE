import { commonApi } from '@/config/axios'
import { RequestBody } from './type'

export const putThemeConfig = async (
  requestBody: RequestBody['PUT']
): Promise<any> => {
  return await commonApi({
    method: 'put',
    url: '/api/v1/color-theme',
    params: {
      companyId: requestBody.companyId,
    },
    data: requestBody.data,
  })
}
