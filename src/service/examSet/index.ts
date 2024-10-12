import { commonApi } from '@/config/axios'
import { RequestExamSet, ResponseExamSet } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

const URL_EXAM_SET = '/api/v1/exam-set'

export const getExamSetList = async (
  params: RequestExamSet['GET']
): Promise<ResponseExamSet['GET']> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_EXAM_SET + '/list',
    params,
  })

  return data
}

export const useQueryGetExamSetList = (
  params: RequestExamSet['GET'],
  options?: any
) => {
  return useQuery<ResponseExamSet['GET']>(
    ['api/v1/exam-set/list', params],
    () => getExamSetList(params),
    { ...defaultOption, ...options }
  )
}

export const getDetailExamSet = async (params: {
  req: number
}): Promise<ResponseExamSet['GET_DETAIL']> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_EXAM_SET + '/detail',
    params,
  })

  return data
}

export const useQueryGetDetailExamSet = (
  params: { req: number },
  options?: any
) => {
  return useQuery<ResponseExamSet['GET_DETAIL']>(
    ['api/v1/exam-set/detail', params],
    () => getDetailExamSet(params),
    { ...defaultOption, ...options }
  )
}

export const actionExamSet = async (
  req: RequestExamSet['ACTION']
): Promise<any> => {
  const { data } = await commonApi({
    method: req.method,
    url: URL_EXAM_SET,
    params: req.params,
    data: req.data,
  })
  return data
}

export const changeStateExamSet = async (
  req: RequestExamSet['UPDATE_STATE']
): Promise<ResponseExamSet['UPDATE_STATE']> => {
  const { data } = await commonApi({
    method: 'put',
    url: URL_EXAM_SET + '/update-state',
    params: req,
  })
  return data
}
