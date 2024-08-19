// /api/v1/retail/sale-order/exceed-debt-limit/update-state

import { authSOApi } from '@/config/axios'

export const updateStatusRetailOrderExceedDebt = async (
  data: any,
  params: any = {}
) => {
  const res = await authSOApi({
    method: 'put',
    url: `/api/v1/retail/sale-order/exceed-debt-limit/update-state`,
    data,
    params,
  })
  return res
}

export const updateStatusWholesaleOrderExceedDebt = async (
  data: any,
  params: any = {}
) => {
  const res = await authSOApi({
    method: 'put',
    url: `/api/v1/wholesale/sale-order/exceed-debt-limit/update-state`,
    data,
    params,
  })
  return res
}

export const updateStatusLiquidationOrderExceedDebt = async (
  data: any,
  params: any = {}
) => {
  const res = await authSOApi({
    method: 'put',
    url: `/api/v1/clearance/sale-order/exceed-debt-limit/update-state`,
    data,
    params,
  })
  return res
}
