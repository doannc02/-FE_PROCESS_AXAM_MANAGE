import { accountingApi } from '@/config/axios'
import { RequestBody } from './type'

export const postAccountJournal = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'post',
    url: `/api/v1/account-journal`,
    data: requestBody,
  })
}

export const putAccountJournal = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await accountingApi({
    method: 'put',
    url: `/api/v1/account-journal`,
    data: requestBody,
  })
}
