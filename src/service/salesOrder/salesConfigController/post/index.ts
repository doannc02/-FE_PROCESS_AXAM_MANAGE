import { RequestBody } from './type'
import { productApi, authCommonAPI, authSOApi } from '@/config/axios'

export const postNewSaleConfig = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  const url = `/api/v1/sale-config`
  return await authSOApi({
    method: 'post',
    url,
    data: requestBody,
  })
}

export const postNewSaleConfigApi = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  const url = `/api/v1/sale-config`
  return await authSOApi({
    method: 'post',
    url,
    data: requestBody,
  })
}
