import { contractApi } from '@/config/axios'
import { BaseResponse } from '@/service/type'
import { END_POINT_SALE_PROGRESS_CONTRACT } from '../get'
import { SaleContractProgressDetail } from '../get/type'

export const actionSaleContractProgress = async (arg: {
  method: 'post' | 'put' | 'delete'
  params: {
    id?: number
  }
  data?: SaleContractProgressDetail
}): Promise<BaseResponse<{ id: number }>> => {
  const { data } = await contractApi({
    method: arg.method,
    url: END_POINT_SALE_PROGRESS_CONTRACT,
    params: arg.params,
    data: arg?.data,
  })

  return data
}
