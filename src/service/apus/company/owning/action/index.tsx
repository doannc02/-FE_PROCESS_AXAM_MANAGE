import { authApusApi } from '@/config/axios'
import { BaseResponse } from '@/service/type'
import { RequestBodySaveCompany } from './type'

export const actionCompany = async (arg: {
  method: 'post' | 'put' | 'delete'
  params: {
    id?: number
  }
  data?: RequestBodySaveCompany
}): Promise<BaseResponse<{ id: number }>> => {
  const { data } = await authApusApi({
    method: arg.method,
    url: '/api/v1/company',
    params: arg.params,
    data: arg?.data,
  })

  return data
}
