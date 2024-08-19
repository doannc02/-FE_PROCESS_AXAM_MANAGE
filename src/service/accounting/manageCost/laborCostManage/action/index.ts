import { accountingApi } from '@/config/axios'
import { URL_LABOR_COST_MANAGE } from '../..'
import { GeneralPrice } from '../get/type'

export const actionSaveLCM = async (arg: {
  method: 'post' | 'put' | 'delete'
  params?: {
    ids?: [number]
  }
  data?: GeneralPrice[] | any
}): Promise<any> => {
  return await accountingApi({
    method: arg.method,
    url: URL_LABOR_COST_MANAGE,
    params: arg.params,
    data: arg?.data,
  })
}
