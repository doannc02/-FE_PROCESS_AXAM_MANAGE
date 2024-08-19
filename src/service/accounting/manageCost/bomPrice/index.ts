import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { GeneralPriceList, RequestBody } from './type'
import { URL_BOM_COST_MANAGE } from '..'
export const getGeneralPriceList = async (
  params: RequestBody['GET']
): Promise<GeneralPriceList> => {
  const { data } = await accountingApi({
    method: 'get',
    url: URL_BOM_COST_MANAGE + '/general-price-list',
    params: {
      name: params.name?.name,
      page: params.page,
      size: params.size,
    },
  })

  return data
}

export const useQueryGetGeneralPriceList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<GeneralPriceList>(
    [URL_BOM_COST_MANAGE + '/general-price-list', params],
    () => getGeneralPriceList(params),
    { ...defaultOption, ...options }
  )
}

export const calculatePricing = async (params: {
  productId: number
  bomId: number
  processId: number
  costPercentage: number
}): Promise<any> => {
  const { data } = await accountingApi({
    method: 'get',
    url: URL_BOM_COST_MANAGE + '/pricing',
    params: params,
  })

  return data
}
