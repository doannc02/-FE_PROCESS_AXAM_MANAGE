import { authSOApi } from '@/config/axios'

export const rejectBill = async (id: number) => {
  const res = await authSOApi({
    method: 'PUT',
    url: `/api/v1/request-stock/update/status`,
    params: { id },
  })
  return res
}
