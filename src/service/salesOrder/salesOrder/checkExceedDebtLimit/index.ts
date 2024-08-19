import { authSOApi } from '@/config/axios'
import { POST } from '../create/type'
import { TypePath } from '@/path'

export const checkExceedDebtLimitRetail = async (data: POST, params?: any) => {
  const res = await authSOApi({
    method: 'POST',
    url: `/api/v1/retail/sale-order/is-exceed-debt-limit`,
    data,
    params: { ...params },
  })
  return res ? res.data.data : res
}

export const checkExceedDebtLimitWholesale = async (
  data: POST,
  params?: any
) => {
  const res = await authSOApi({
    method: 'POST',
    url: `/api/v1/wholesale/sale-order/is-exceed-debt-limit`,
    data,
    params: { ...params },
  })
  return res ? res.data.data : res
}

export const checkExceedDebtLimitLiquidation = async (
  data: POST,
  params?: any
) => {
  const res = await authSOApi({
    method: 'POST',
    url: `/api/v1/clearance/sale-order/is-exceed-debt-limit`,
    data,
    params: { ...params },
  })
  return res ? res.data.data : res
}

export const checkExceedDebtLimit = async (
  data: POST,
  typePath: TypePath,
  params?: any
) => {
  const url = `/api/v1/${typePath.toLowerCase()}/sale-order/is-exceed-debt-limit`
  const res = await authSOApi({
    method: 'POST',
    url,
    data,
    params: { ...params },
  })
  return res ? res.data.data : res
}
