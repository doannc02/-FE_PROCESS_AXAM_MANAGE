import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'

import { URL_BOM_COST_MANAGE } from '../..'
import { BCM } from '../getList/type'

export const getBomCostDetail = async (params: {
  id: number
}): Promise<BCM> => {
  const { data } = await accountingApi({
    method: 'get',
    url: URL_BOM_COST_MANAGE + '/id',
    params,
  })

  return data
}

export const useQueryGetGeneralDetail = (
  params: { id: number },
  options?: any
) => {
  return useQuery<BCM>(
    [URL_BOM_COST_MANAGE + '/id', params],
    () => getBomCostDetail(params),
    { ...defaultOption, ...options }
  )
}

export const computePricing = async (params: {
  productId: number
  bomId: number
  processId: number
  costPercentage: number
}): Promise<number> => {
  const { data } = await accountingApi({
    method: 'get',
    url: URL_BOM_COST_MANAGE + '/pricing',
    params: params,
  })

  return data
}
