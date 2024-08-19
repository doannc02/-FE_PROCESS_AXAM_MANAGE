import { accountingApi } from '@/config/axios'
import { RequestBody, Response } from './type'

export const getDecreasedToolsList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: 'api/v1/decrease-tools/list-increased-tools',
    params,
  })

  return data
}
