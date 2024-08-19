import { accountingApi } from '@/config/axios'
import { SUBJECT_COST_END_POINT } from '../get'
import { SaveSubjectCost } from './type'

export const actionSubjectCostConfig = async (arg: {
  method: 'post' | 'put' | 'delete'
  data?: SaveSubjectCost
}): Promise<any> => {
  return await accountingApi({
    method: arg.method,
    url: SUBJECT_COST_END_POINT,
    params: { subjectType: arg.data?.subjectType },
    data: arg.data?.data,
  })
}
