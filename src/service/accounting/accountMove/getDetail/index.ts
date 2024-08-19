import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getAccountMoveDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const url =
    params?.moveType === 'ENTRY'
      ? '/api/v1/account-move'
      : params.typeInvoice !== 'internal-internal'
      ? params?.typeInvoice?.includes('external')
        ? '/api/v1/account-move'
        : params.typeInvoice
        ? `/api/v1/account-move/${params.typeInvoice}`
        : `/api/v1/account-move/vendor-return`
      : `/api/v1/account-move/internal`
  const { data } = await accountingApi({
    method: 'get',
    url: url,
    params,
  })
  return data
}

export const useQueryGetAccountMoveDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    [`/api/v1/account-move/${params.typePathInv}`, params],
    () => getAccountMoveDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
