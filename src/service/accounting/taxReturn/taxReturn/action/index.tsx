import { accountingApi } from '@/config/axios'
import { END_POINT_TAX_RETURN } from '../getList'
import { ReqSaveTaxReturn } from './type'

export const actionTaxReturn = async (arg: {
  method: 'post' | 'put' | 'delete'
  params: {
    id?: number
  }
  data: ReqSaveTaxReturn
}): Promise<any> => {
  return await accountingApi({
    method: arg.method,
    url: END_POINT_TAX_RETURN,
    params: arg.params,
    data: arg?.data,
  })
}
