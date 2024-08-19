import { accountingApi } from '@/config/axios'
import { BaseResponse } from '@/service/type'

import { URL_BOM_COST_MANAGE } from '../..'
import { RequestBody } from './type'

export const actionBCM = async (arg: {
  method: 'post' | 'put' | 'delete'
  params?: { ids: [number] }
  data?: RequestBody['SAVE'] | any
}): Promise<any> => {
  return await accountingApi({
    method: arg.method,
    url: URL_BOM_COST_MANAGE,
    data: arg?.data,
    params: arg?.params,
  })
}
