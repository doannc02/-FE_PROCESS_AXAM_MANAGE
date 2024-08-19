import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getAccountMoveList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const url =
    params?.moveType === 'ENTRY'
      ? '/api/v1/account-move/list'
      : params.typePathInvoice !== 'internal-internal'
      ? params?.typePathInvoice?.includes('external')
        ? '/api/v1/account-move/list'
        : params.typePathInvoice
        ? `/api/v1/account-move/${params.typePathInvoice}/list`
        : `/api/v1/account-move/vendor-return/list`
      : `/api/v1/account-move/internal/list`

  const { data } = await accountingApi({
    method: 'get',
    url,
    params,
  })

  return data
}

export const useQueryGetAccountMoveList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/account-move/list', params],
    () => getAccountMoveList(params),
    { ...defaultOption, ...options }
  )
}
