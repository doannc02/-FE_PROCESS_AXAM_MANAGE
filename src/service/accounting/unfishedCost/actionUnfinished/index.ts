import { accountingApi } from '@/config/axios'
import { URL_UNFINISHED_COST } from '../get'

export const actionUC = async (arg: {
  method: 'post' | 'put' | 'delete'
  data?: any
}): Promise<any> => {
  let params = { subjectType: arg.data[0].subjectType, ids: [arg.data?.id] }
  console.log('logg vaof dda', params, arg.data[0].subjectType)
  return await accountingApi({
    method: arg.method,
    url: URL_UNFINISHED_COST,
    params: params,
    data: arg.data,
  })
}
