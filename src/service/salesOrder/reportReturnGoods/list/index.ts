import { authSOApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { Response, Request } from './type'
import {useCheckPath} from '@/path'

export const getListReportReturnRetail = async (
  params: Request['GET']
): Promise<any> => {
  const paramsOption = { ...params }
  const { data } = await authSOApi({
    method: 'get',
    url: `/retail/return-synthesis/list`,
    params: { ...paramsOption, page: params.page },
  })
  return data ? data.data : data
}

export const getListReportReturnWholesale = async (
  params: Request['GET']
): Promise<any> => {
  const paramsOption = { ...params }
  const { data } = await authSOApi({
    method: 'get',
    url: `/wholesale/return-synthesis/list`,
    params: { ...paramsOption, page: params.page },
  })
  return data ? data.data : data
}

export const useQueryGetListReportReturnGoods = (params: Request['GET']) => {
  const { typeSaleRequest } = useCheckPath()
  return useQuery<Response['GET']>(
    ['/return-synthesis/list', params],
    () =>
      typeSaleRequest === 'RETAIL'
        ? getListReportReturnRetail(params)
        : getListReportReturnWholesale(params),
    { ...defaultOption }
  )
}
