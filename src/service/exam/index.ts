import { commonApi } from '@/config/axios'
import { RequestExam, ResponseExam } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

const URL_EXAM = '/api/v1/exam'

export const getExamSetList = async (
  params: RequestExam['LIST']
): Promise<ResponseExam['LIST']> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_EXAM + '/list',
    params,
  })

  return data
}

export const useQueryGetExamSetList = (
  params: RequestExam['LIST'],
  options?: any
) => {
  return useQuery<ResponseExam['LIST']>(
    ['api/v1/exam-set/list', params],
    () => getExamSetList(params),
    { ...defaultOption, ...options }
  )
}

export const getDetailExamSet = async (params: {
  id: number
}): Promise<ResponseExam['DETAIL']> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_EXAM + '/detail',
    params,
  })

  return data
}

export const useQueryGetDetailExamSet = (
  params: { id: number },
  options?: any
) => {
  return useQuery<ResponseExam['DETAIL']>(
    ['api/v1/exam-set/detail', params],
    () => getDetailExamSet(params),
    { ...defaultOption, ...options }
  )
}

export const changeStateExam = async (
  req: RequestExam['UPDATE_STATE']
): Promise<ResponseExam['UPDATE_STATE']> => {
  const { data } = await commonApi({
    method: 'post',
    url: URL_EXAM + '/change-state',
    data: req,
  })
  return data
}
export const actionExamSet = async (
  req: RequestExam['ACTION']
): Promise<any> => {
  const { data } = await commonApi({
    method: req.method,
    url: URL_EXAM,
    params: req.params,
    data: req.data,
  })
  return data
}
