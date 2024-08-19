import { accountingApi } from '@/config/axios'
import { RequestBody, Response } from './type'

// export const deleteAccountMove = async (
//   params: RequestBody['DELETE']
// ): Promise<Response['DELETE']> => {
//   let u =
//     params.typePath === 'PROVIDER'
//       ? `/api/v1/account-move/vendor `
//       : `/api/v1/account-move`
//   const { data } = await accountingApi({
//     method: 'delete',
//     url: u,
//     params,
//   })
//   return data
// }

export const deleteAccountMove = async (
  params: RequestBody['DELETE']
): Promise<Response['DELETE']> => {
  let u =  params.typeInvoice
    ? `/api/v1/account-move/${params.typeInvoice}`
    : `/api/v1/account-move/vendor-return`
  const { data } = await accountingApi({
    method: 'delete',
    url: u,
    params,
  })
  return data
}
