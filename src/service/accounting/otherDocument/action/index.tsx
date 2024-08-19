import { accountingApi } from '@/config/axios'
import { BaseResponse } from '@/service/type'
import { END_POINT_OTHER_DOCUMENT } from '../get'
import { ReqSaveOtherDocument } from './type'

export const actionOtherDocument = async (arg: {
  method: 'post' | 'put' | 'delete'
  params: {
    id?: number
  }
  data?: ReqSaveOtherDocument
}): Promise<any> => {
  return await accountingApi({
    method: arg.method,
    url: END_POINT_OTHER_DOCUMENT,
    params: arg.params,
    data: arg?.data,
  })
}
