import { authUaaApi } from '@/config/axios'
import { RequestBody, Response } from './type'

export const getFeatureByProductList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authUaaApi({
    method: 'get',
    url: '/api/v1/feature/list-by-product',
    params,
  })
  return data
}
