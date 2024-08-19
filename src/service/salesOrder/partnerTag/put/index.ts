import { authCommonAPI } from '@/config/axios'
import { RequestBody } from './type'
import { TypePath } from '@/path'

export const updatePartnerTag = async (
  requestBody: RequestBody['PUT'],
  typePath: TypePath,
  params?: any
) => {
  const url = `api/v1/${typePath.toLowerCase()}/partner-tag`
  return await authCommonAPI({
    method: 'put',
    url,
    params,
    data: requestBody,
  })
}
