import { authWarehouseApi, authCommonAPI } from '@/config/axios'
import { RequestBody, Response } from './type'
import { TypePath } from '@/path'

export const deleteRetailPartnerTag = async (
  requestBody: RequestBody['DELETE']
): Promise<Response['DELETE']> => {
  const { data } = await authCommonAPI({
    method: 'delete',
    url: 'api/v1/retail/partner-tag',
    params: { partnerId: requestBody.id },
    data: requestBody,
  })

  return data ? data.data : data
}

export const deleteWholesalePartnerTag = async (
  requestBody: RequestBody['DELETE']
): Promise<Response['DELETE']> => {
  const { data } = await authCommonAPI({
    method: 'delete',
    url: 'api/v1/wholesale/partner-tag',
    params: { partnerId: requestBody.id },
    data: requestBody,
  })

  return data ? data.data : data
}

export const deletePartnerTag = async (
  requestBody: RequestBody['DELETE'],
  typePath: TypePath
): Promise<Response['DELETE']> => {
  const url =
    typePath === 'MERCHANT'
      ? 'api/v1/merchant/partner-tag'
      : typePath === 'WHOLESALE'
      ? 'api/v1/wholesale/partner-tag'
      : typePath === 'RETAIL'
      ? 'api/v1/wholesale/partner-tag'
      : 'api/v1/partner-tag'
  const { data } = await authCommonAPI({
    method: 'delete',
    url,
    params: { partnerId: requestBody.id },
    data: requestBody,
  })
  return data ? data.data : data
}
