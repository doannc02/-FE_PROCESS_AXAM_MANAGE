import { accountingApi } from '@/config/axios'
import { RequestBody, Response } from './type'

export const putAccountMoveDraft = async (
  requestBody: RequestBody['PUT']
): Promise<Response['PUT']> => {
  // let u = requestBody.typePath === "PROVIDER" ? '/api/v1/account-move/vendor/set-to-draft' : '/api/v1/account-move/set-to-draft'
  let u = requestBody.typeInvoice
    ? `/api/v1/account-move/${requestBody.typeInvoice}/set-to-draft`
    : `/api/v1/account-move/vendor/set-to-draft`
  const { data } = await accountingApi({
    method: 'put',
    url: u,
    params: {
      id: requestBody.id,
      reason: requestBody.reason,
    },
  })

  return data
}

// export const approveProductRequestInternal = async (params: any) => {
//   const url = `/api/v1/product-internal-request/approve`
//   const { data } = await accountingApi({
//     method: 'get',
//     url,
//     params,
//   })
//   return data ? data.data : data
// }
