import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { URL_MMC_INPUT } from '../..'
import { MMC_InputLst, RequestBody } from './type'

export const getMMCInputLst = async (
  params: RequestBody['GET']
): Promise<MMC_InputLst> => {
  const { data } = await accountingApi({
    method: 'get',
    url: URL_MMC_INPUT + '/list',
    params,
  })

  return data
}

export const useQueryGetMMCInputLst = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<MMC_InputLst>(
    [URL_MMC_INPUT + '/list', params],
    () => getMMCInputLst(params),
    { ...defaultOption, ...options }
  )
}
