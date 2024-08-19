import { accountingApi } from '@/config/axios'
import { ComputeTax, ResComputeTax } from './type'
import { BaseResponse } from '../../../type/index'

export const postGenerateTaxOtherDocument = async (
  requestBody: ComputeTax[]
): Promise<BaseResponse<ResComputeTax[]>> => {
  const { data } = await accountingApi({
    method: 'post',
    url: '/api/v1/another-document/generate-taxes',
    data: requestBody,
  })

  return data
}
