import { TypePath } from '@/path'
import { authSOApi } from '@/config/axios'

export const deleteRetailOrderById = async (params: any): Promise<any> => {
  return await authSOApi({
    method: 'DELETE',
    url: `/api/v1/retail/sale-order`,
    params: { ...params },
  })
}

export const deleteWholesaleOrderById = async (params: any): Promise<any> => {
  return await authSOApi({
    method: 'DELETE',
    url: `/api/v1/wholesale/sale-order`,
    params: { ...params },
  })
}

export const deleteLiquidationOrderById = async (params: any): Promise<any> => {
  return await authSOApi({
    method: 'DELETE',
    url: `/api/v1/clearance/sale-order`,
    params: { ...params },
  })
}

export const deleteSaleOrderById = async (
  params: any,
  typePath: TypePath
): Promise<any> => {
  const url = `/api/v1/${typePath.toLowerCase()}/sale-order`
  return await authSOApi({
    method: 'DELETE',
    url,
    params: { ...params },
  })
}
