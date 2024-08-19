import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import {
  ReqGetOtherDocumentDetail,
  ReqGetOtherDocumentList,
  ResGetOtherDocumentDetail,
  ResGetOtherDocumentList,
} from './type'

export const END_POINT_OTHER_DOCUMENT = '/api/v1/another-document'

export const getOtherDocumentList = async (
  params: ReqGetOtherDocumentList
): Promise<ResGetOtherDocumentList> => {
  const { data } = await accountingApi({
    method: 'get',
    url: END_POINT_OTHER_DOCUMENT + '/list',
    params,
  })
  return data
}

export const useQueryGetOtherDocumentList = (
  params: ReqGetOtherDocumentList,
  options?: any
) => {
  return useQuery<ResGetOtherDocumentList>(
    [END_POINT_OTHER_DOCUMENT + '/list', params],
    () => getOtherDocumentList(params),
    { ...defaultOption, ...options }
  )
}

export const getOtherDocumentDetail = async (
  params: ReqGetOtherDocumentDetail
): Promise<ResGetOtherDocumentDetail> => {
  const { data } = await accountingApi({
    method: 'get',
    url: END_POINT_OTHER_DOCUMENT,
    params,
  })
  return data
}

export const useQueryGetOtherDocumentDetail = (
  params: ReqGetOtherDocumentDetail,
  options?: any
) => {
  return useQuery<ResGetOtherDocumentDetail>(
    [END_POINT_OTHER_DOCUMENT, params],
    () => getOtherDocumentDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
