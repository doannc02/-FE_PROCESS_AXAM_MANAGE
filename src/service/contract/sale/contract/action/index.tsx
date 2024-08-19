import { contractApi } from '@/config/axios'
import { BaseResponse } from '@/service/type'
import { END_POINT_SALE_CONTRACT_MY_SELF } from '../my-self'
import { RequestBodySaveSaleContract } from './type'

export const actionSaleContract = async (arg: {
  method: 'post' | 'put' | 'delete'
  params: {
    id?: number
  }
  data?: RequestBodySaveSaleContract
}): Promise<BaseResponse<{ id: number }>> => {
  const { data } = await contractApi({
    method: arg.method,
    url: END_POINT_SALE_CONTRACT_MY_SELF,
    params: arg.params,
    data: arg?.data,
  })

  return data
}
