import { contractApi } from '@/config/axios'
import { BaseResponse } from '@/service/type'
import { END_POINT_SALE_CONTRACT_CATEGORY } from '../get'
import { RequestBodySaveContractCategory } from './type'

export const actionContractCategory = async (arg: {
  method: 'post' | 'put' | 'delete'
  params: {
    id?: number
  }
  data?: RequestBodySaveContractCategory
}): Promise<BaseResponse<{ id: number }>> => {
  const { data } = await contractApi({
    method: arg.method,
    url: END_POINT_SALE_CONTRACT_CATEGORY,
    params: arg.params,
    data: arg?.data,
  })

  return data
}
