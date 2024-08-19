import { authApi } from '@/config/axios'
import { Response } from './type'

export const postLogin = async (
  requestBody: any
): Promise<Response['POST']> => {
  const { data } = await authApi({
    method: 'post',
    url: '/oauth/login',
    data: requestBody,
  })

  return data
}
