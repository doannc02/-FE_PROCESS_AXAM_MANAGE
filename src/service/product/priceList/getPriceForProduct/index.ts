import { productApi, defaultOption } from '@/config/axios'
import { RequestBody, Response } from './type'

// Get the price of the product in the price list
export const getPriceForProduct = async (
  data: RequestBody['POST'],
  typePath: RequestBody['TYPE_PATH']
): Promise<Response['POST']> => {
  const res = await productApi({
    method: 'POST',
    url: `/api/v1/${typePath.toLowerCase()}/request-price-list/request/price`,
    data,
  })
  return !!res ? res.data.data : res
}
