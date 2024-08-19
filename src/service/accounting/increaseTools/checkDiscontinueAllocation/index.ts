import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const checkDiscontinueAllocation = async (
  params: RequestParams['SAVE']
): Promise<Response['SAVE']> => {
  const { data } = await accountingApi({
    method: 'put',
    url: '/api/v1/increase-tool/is-discontinue-allocation',
    data: params,
  })
  return data
}
