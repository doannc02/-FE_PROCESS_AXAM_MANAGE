// import { accountingApi } from '@/config/axios'
// import { defaultOption } from '@/config/reactQuery'
// import { useQuery } from 'react-query'
// import { RequestParams, Response } from './type'

// export const getAccountOverPayment = async (
//   params: RequestParams['GET']
// ): Promise<Response['GET']> => {
//   const { data } = await accountingApi({
//     method: 'get',
//     url: '/api/v1/account-move-line-matching/over-payment',
//     params,
//   })
//   return data
// }

// export const useQueryGetAccountOverPayment = (
//   params: RequestParams['GET'],
//   options?: any
// ) => {
//   return useQuery(
//     [`/api/v1/account-move-line-matching/over-payment`, params],
//     () => getAccountOverPayment(params),
//     {
//       ...defaultOption,
//       ...options,
//     }
//   )
// }
