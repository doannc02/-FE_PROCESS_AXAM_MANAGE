import { commonApi } from '@/config/axios'

export const postLogout = async (jti: string): Promise<any> => {
  const { data } = await commonApi({
    method: 'post',
    url: '/oauth/logout',
    params: {
      jti,
    },
  })

  return data
}
