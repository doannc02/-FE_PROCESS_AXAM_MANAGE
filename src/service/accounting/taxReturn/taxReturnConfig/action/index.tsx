import { accountingApi } from '@/config/axios'
import { END_POINT_TAX_CONFIG } from '../getDetail'
import { TaxConfig } from '../getDetail/type'

export const actionTaxReturnConfig = async (arg: {
  method: 'post' | 'put' | 'delete'
  params: {
    id?: number
  }
  data?: TaxConfig
}): Promise<any> => {
  return await accountingApi({
    method: arg.method,
    url: END_POINT_TAX_CONFIG,
    params: arg.params,
    data: arg?.data,
  })
}
