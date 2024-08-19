import { accountingApi } from '@/config/axios'
import { RequestParams, Response } from './type'
import { errorMsg, successMsg } from '@/helper/message'

export const postCopyMoveLines = async (
  params: RequestParams['POST']
): Promise<Response['POST']> => {
  let u =
    params.typePath === 'PROVIDER'
      ? '/api/v1/account-move/vendor/copy'
      : '/api/v1/account-move/copy'
  const { data } = await accountingApi({
    method: 'post',
    url: u,
    params,
  })

  return data
}
