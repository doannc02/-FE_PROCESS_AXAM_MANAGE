import { TypePath } from '@/path'
import { RequestBody } from './type'
import { productApi, authCommonAPI } from '@/config/axios'

export const postNewRetailPartnerTag = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  const url = `/api/v1/retail/partner-tag`
  const { data } = await authCommonAPI({
    method: 'post',
    url,
    data: requestBody,
  })
  return data
}

export const postNewWholesalePartnerTag = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  const url = `/api/v1/wholesale/partner-tag`
  const { data } = await authCommonAPI({
    method: 'post',
    url,
    data: requestBody,
  })
  return data
}

export const createPartnerTag = async (
  requestBody: RequestBody['POST'],
  typePath: TypePath,
  params?: any
): Promise<any> => {
  const url = `api/v1/${typePath.toLowerCase()}/partner-tag`
  const { data } = await authCommonAPI({
    method: 'post',
    params,
    url,
    data: requestBody,
  })
  return data
}
