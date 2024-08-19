import { authSOApi } from '@/config/axios'
import { RequestBody, RequestBodyLineOrderId, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getSaleOrderPrint = async (
  params: RequestBody['POST']
): Promise<Response['POST']> => {
  const { data } = await authSOApi({
    method: 'post',
    url: '/api/v1/report',
    params,
  })

  return data
}

export const useQueryGetSaleOrderPrint = (
  params: RequestBody['POST'],
  options?: any
) => {
  return useQuery<Response['POST']>(
    ['/api/v1/report', params],
    () => getSaleOrderPrint(params),
    { ...defaultOption, ...options }
  )
}

export const getBackPurchaseOrderPrint = async (
  params: RequestBody['POST']
): Promise<Response['POST']> => {
  const { data } = await authSOApi({
    method: 'post',
    url: '/api/v1/report/invoice-return',
    params,
  })

  return data
}

export const useQueryGetBackPurchaseOrderPrint = (
  params: RequestBody['POST'],
  options?: any
) => {
  return useQuery<Response['POST']>(
    ['/api/v1/report/invoice-return', params],
    () => getBackPurchaseOrderPrint(params),
    { ...defaultOption, ...options }
  )
}

export const getInvoiceOrderPrint = async (
  params: RequestBody['POST']
): Promise<Response['POST']> => {
  const { data } = await authSOApi({
    method: 'post',
    url: '/api/v1/report/invoice-order',
    params,
  })

  return data
}

export const useQueryGetInvoiceOrderPrint = (
  params: RequestBody['POST'],
  options?: any
) => {
  return useQuery<Response['POST']>(
    ['/api/v1/report/invoice-order', params],
    () => getInvoiceOrderPrint(params),
    { ...defaultOption, ...options }
  )
}

export const getRequestExportPrint = async (
  params: RequestBodyLineOrderId['POST']
): Promise<Response['POST']> => {
  const { data } = await authSOApi({
    method: 'post',
    url: '/api/v1/report/invoice-export',
    params,
  })

  return data
}

export const useQueryGetRequestExportPrint = (
  params: RequestBodyLineOrderId['POST'],
  options?: any
) => {
  return useQuery<Response['POST']>(
    ['/api/v1/report/invoice-export', params],
    () => getRequestExportPrint(params),
    { ...defaultOption, ...options }
  )
}
