import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const putAccountMoveRejectPunish = async (
  requestBody: RequestBody['PUT']
): Promise<any> => {
  let u =
    requestBody.typePathInv === 'PROVIDER'
      ? '/api/v1/account-move/vendor/reject-punish'
      : '/api/v1/account-move/reject-punish'
  return await accountingApi({
    method: 'put',
    url: u,
    params: {
      punishId: requestBody.punishId,
    },
  })
}
