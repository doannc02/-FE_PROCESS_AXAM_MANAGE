import { contractApi } from '@/config/axios'
import { BaseResponse } from '@/service/type'

const URL_CHANGE_STATE_CONTRACT = '/api/v1/sale/request/contract/state'

export const changeSaleContractState = async (requestBody: {
  id: number
  state: string
}): Promise<BaseResponse<{ id: number }>> => {
  const { data } = await contractApi({
    method: 'put',
    url: URL_CHANGE_STATE_CONTRACT,
    data: requestBody,
  })

  return data
}
