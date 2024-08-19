import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getInvoicePrint = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { typePath, ...rest } = params
  const { data } = await accountingApi({
    method: 'get',
    url:
      params.invoiceType === 'SALE'
        ? 'api/v1/print/invoice-sale'
        : 'api/v1/print/invoice',
    params: rest,
  })

  return data
}

export const useQueryGetInvoicePrint = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/print/invoice', params],
    () => getInvoicePrint(params),
    { ...defaultOption, ...options }
  )
}

export const getAccountMovePrint = async (params: {
  id: number
}): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: 'api/v1/print/accounting_document',
    params,
  })

  return data
}

export const useQueryGetAccountMovePrint = (
  params: { id: number },
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['api/v1/print/accounting_document', params],
    () => getAccountMovePrint(params),
    { ...defaultOption, ...options }
  )
}
