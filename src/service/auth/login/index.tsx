import { commonApi } from '@/config/axios'
import { Response } from './type'

export const postLogin = async (
  requestBody: any
): Promise<Response['POST']> => {
  const { data } = await commonApi({
    method: 'post',
    url: '/api/v1/account/login',
    data: requestBody,
  })

  return data
}
