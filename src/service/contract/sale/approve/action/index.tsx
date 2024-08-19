import { contractApi } from '@/config/axios'
import { BaseResponse } from '@/service/type'
import { END_POINT_SALE_APPROVE } from '../get'

export const actionContractApprove = async (arg: {
  method: 'put'
  data: {
    id: number
    state: 'REJECTED' | 'APPROVED'
    reason?: string
  }
}): Promise<BaseResponse<{ id: number }>> => {
  const { data } = await contractApi({
    method: arg.method,
    url: END_POINT_SALE_APPROVE,
    data: arg?.data,
  })

  return data
}
