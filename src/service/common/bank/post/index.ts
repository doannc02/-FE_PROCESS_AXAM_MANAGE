import { commonApi } from '@/config/axios'
import { RequestBody } from './type'

export const postNewBank = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  const url = `/api/v1/bank`
  return await commonApi({
    method: 'post',
    url,
    data: requestBody,
  })
}
