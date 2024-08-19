import { authApusApi } from '@/config/axios'
import { BaseResponse } from '@/service/type'
import { RequestBodyInviteCompany } from './type'

export const actionVerifyInviteUser = async (
  requestBody: RequestBodyInviteCompany
): Promise<BaseResponse<{ id: number }>> => {
  const { data } = await authApusApi({
    method: 'post',
    url: '/api/v1/company-invite/verify',
    data: requestBody,
  })

  return data
}
