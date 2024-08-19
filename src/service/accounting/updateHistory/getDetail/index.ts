import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response, ResponseInv } from './type'

export const getUpdateHisDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: `/api/v1/update-history/payment`,
    params,
  })
  return data
}

export const useQueryGetUpdateHisDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery([`/api/v1/update-history/payment`, params], () => getUpdateHisDetail(params), {
    ...defaultOption,
    ...options,
  })
}

export const getUpdateHisDetailInvoice = async (
  params: RequestParams['GET']
): Promise<ResponseInv['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: `/api/v1/update-history/invoice`,
    params,
  })
  return data
}

export const useQueryGetUpdateHisDetailInv = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery([`/api/v1/update-history/invoice`, params], () => getUpdateHisDetailInvoice(params), {
    ...defaultOption,
    ...options,
  })
}
