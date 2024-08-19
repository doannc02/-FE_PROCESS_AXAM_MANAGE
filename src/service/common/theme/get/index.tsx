import { commonApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { Response } from './type'

export const getThemeConfigAPI = async (): Promise<Response['GET']> => {
  const { data } = await commonApi({
    method: 'get',
    url: 'api/v1/theme-sys-config',
  })

  return data
}

export const useQueryGetThemeConfigAPI = (options?: any) => {
  return useQuery<Response['GET']>(
    ['api/v1/theme-sys-config'],
    () => getThemeConfigAPI(),
    { ...defaultOption, ...options }
  )
}
