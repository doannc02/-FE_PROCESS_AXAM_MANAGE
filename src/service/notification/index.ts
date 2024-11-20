import { commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { PageResponse } from '../type'
import { TypeNotification } from './type'

const URL_NOTIFICATION = '/api/v1/notification'

export const getNotificationByUserId = async (): Promise<
  PageResponse<TypeNotification[]>
> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_NOTIFICATION + '/get-by-user-id',
  })

  return data
}

export const useQueryGetNotificationByUserId = (params: any, options?: any) => {
  return useQuery<PageResponse<TypeNotification[]>>(
    ['api/v1/notification/get-by-user-id'],
    () => getNotificationByUserId(),
    { ...defaultOption, ...options }
  )
}

export const actionNotification = async (req: {
  NotificationIds: number[]
  isRead?: boolean
  method: 'put' | 'delete'
}): Promise<any> => {
  const { data } = await commonApi({
    method: req.method,
    url:
      URL_NOTIFICATION + (req.method === 'put' ? '/update-state' : '/delete'),
    data: req,
  })
  return data
}
