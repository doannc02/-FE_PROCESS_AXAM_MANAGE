import { accountingApi } from '@/config/axios'
import { END_POINT_TAX_RETURN } from '../getList'
import { SaveTaxReturn } from './type'

export const putTaxReturn = async (data: SaveTaxReturn): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: END_POINT_TAX_RETURN,
    data,
  })
}
