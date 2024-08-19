import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { BomCodeList, RequestBody } from './type'
import { URL_BOM_COST_MANAGE } from '../..'

export const getBomCostList = async (
  params: RequestBody['GET']
): Promise<BomCodeList> => {
  const { data } = await accountingApi({
    method: 'get',
    url: URL_BOM_COST_MANAGE + '/list',
    params,
  })

  return data
}

export const useQueryGetBCMList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<BomCodeList>(
    [URL_BOM_COST_MANAGE + '/list', params],
    () => getBomCostList(params),
    { ...defaultOption, ...options }
  )
}
