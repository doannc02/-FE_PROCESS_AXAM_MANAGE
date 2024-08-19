import { accountingApi } from '@/config/axios'
import { URL_MMC_INPUT } from '../..'
import { MMC_Input } from '../get/type'

export const actionSaveMMCInput = async (arg: {
  method: 'post' | 'put' | 'delete'
  params?: {
    ids?: [number]
  }
  data?: MMC_Input[] | any
}): Promise<any> => {
  return await accountingApi({
    method: arg.method,
    url: URL_MMC_INPUT,
    params: arg.params,
    data: arg?.data,
  })
}
