import { authSOApi } from '@/config/axios'
import { Request } from './type'
import { TypePath } from '@/path'

export const sendEmailOrder = async (
  data: Request['POST'],
  params: any,
  typePath: TypePath
) => {
  const url = `/api/v1/${typePath.toLowerCase()}/sale-order/send-email`
  const res = await authSOApi({
    method: 'POST',
    url,
    data,
    params: { ...params },
  })
  return res
}
