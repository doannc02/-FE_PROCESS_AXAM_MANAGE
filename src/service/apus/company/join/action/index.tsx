import { authApusApi } from '@/config/axios'
import { BaseResponse } from '@/service/type'
import { END_POINT_COMPANY_JOIN } from '../get'
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
    url: END_POINT_COMPANY_JOIN,
    params: arg.params,
    data: arg?.data,
  })

  return data
}
