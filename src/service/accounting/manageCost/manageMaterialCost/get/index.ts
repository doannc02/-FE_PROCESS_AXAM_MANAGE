import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { BaseResponse } from '@/service/type'
import { useQuery } from 'react-query'
import { URL_MMC_INPUT } from '../..'
import { MMC_Input, RequestBody } from './type'

export const getDetailMMCInput = async (
  params: RequestBody['GET']
): Promise<BaseResponse<MMC_Input>> => {
  const { data } = await accountingApi({
    method: 'get',
    url: URL_MMC_INPUT + '/id',
    params,
  })

  return data
}

export const useQueryGetDetailMMCInput = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<BaseResponse<MMC_Input>>(
    [URL_MMC_INPUT + '/id', params],
    () => getDetailMMCInput(params),
    { ...defaultOption, ...options }
  )
}
