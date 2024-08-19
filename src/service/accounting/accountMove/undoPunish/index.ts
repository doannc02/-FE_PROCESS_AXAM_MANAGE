import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const putAccountMoveUndoPunish = async (
  requestBody: RequestBody['PUT']
): Promise<any> => {
  let u = requestBody.typePath === "PROVIDER" ? '/api/v1/account-move/vendor/undo-punish': '/api/v1/account-move/undo-punish'
  return await accountingApi({
    method: 'put',
    url: u,
    params: {
      punishId: requestBody.punishId,
    },
  })
}
