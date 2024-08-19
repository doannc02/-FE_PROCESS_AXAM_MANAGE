import { commonApi } from '@/config/axios'
import { RequestBody } from './type'

export const postSignatureConfig = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await commonApi({
    method: 'post',
    url: `/api/v1/config-signature`,
    data: requestBody,
  })
}
