import { productApi, authSOApi, defaultOption } from '@/config/axios'
import { useQuery } from 'react-query'
import { Response, Request } from './type'

// export const getRetailPartnerPolicy = async (
//   params: Request['PARAMS']
// ): Promise<any> => {
//   const paramsOption = { ...params }
//   const { partnerId } = params
//   if (!!partnerId) {
//     const { data } = await productApi({
//       method: 'get',
//       url: `/api/v1/retail/price-list-policy/partner`,
//       params: { ...paramsOption },
//     })
//     return data ? data.data : data
//   } else {
//     return null
//   }
// }

// export const getWholesalePartnerPolicy = async (
//   params: Request['PARAMS']
// ): Promise<any> => {
//   const paramsOption = { ...params }
//   const { partnerId } = params
//   if (!!partnerId) {
//     const { data } = await productApi({
//       method: 'get',
//       url: `/api/v1/wholesale/price-list-policy/partner`,
//       params: { ...paramsOption },
//     })
//     return data ? data.data : data
//   } else {
//     return null
//   }
// }

export const getMerchantPartnerPolicy = async (
  params: Request['PARAMS']
): Promise<any> => {
  const { partnerId } = params
  if (!!partnerId) {
    const { data } = await productApi({
      method: 'get',
      url: `/api/v1/merchant/price-list-policy/partner`,
      params,
    })
    return data
  }
}

export const useQueryGetPolicyPartner = (
  params: Request['PARAMS'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/merchant/price-list-policy/partner', params],
    () => getMerchantPartnerPolicy(params),
    { ...defaultOption, ...options }
  )
}
