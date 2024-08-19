import { accountingApi } from '@/config/axios'
import { RequestBody, Response } from './type'

export const postGenerateMoveLines = async (
  requestBody: RequestBody['POST']
): Promise<Response['POST']> => {
  const { data } = await accountingApi({
    method: 'post',
    url: `/api/v1/account-move/generate-move-lines`,
    params: {
      scopeType: requestBody.scopeType,
      partnerName: requestBody.partnerName,
      type: requestBody.type,
      moveType: requestBody.moveType,
      accountJournalId: requestBody.accountJournalId,
    },
    data: requestBody.data,
  })

  return data
}
