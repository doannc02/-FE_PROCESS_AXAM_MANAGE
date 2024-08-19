import { commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getPartnerList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  let u = '/api/v1/partners/branch-list-tiny'

  const { data } = await commonApi({
    method: 'get',
    url: u,
    params,
  })

  return data
}

export const getPartnerListForMerchant = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  let u = 'api/v1/merchant/partners/list-approve'

  const { data } = await commonApi({
    method: 'get',
    url: u,
    params,
  })

  return data
}

export const useQueryGetPartnerList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/partners/branch-list-tiny', params],
    () => getPartnerList(params),
    { ...defaultOption, ...options }
  )
}
