import { commonApi } from '@/config/axios'
import { RequestExam, ResponseExam } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

const URL_EXAM = '/api/v1/exam'

export const getExamList = async (
  params: RequestExam['LIST']
): Promise<ResponseExam['LIST']> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_EXAM + '/list',
    params,
  })

  return data
}

export const useQueryGetExamList = (
  params: RequestExam['LIST'],
  options?: any
) => {
  return useQuery<ResponseExam['LIST']>(
    ['api/v1/exam/list', params],
    () => getExamList(params),
    { ...defaultOption, ...options }
  )
}

export const getDetailExam = async (params: {
  examId: number
}): Promise<ResponseExam['DETAIL']> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_EXAM + '/detail',
    params,
  })

  return data
}

export const useQueryGetDetailExam = (
  params: { examId: number },
  options?: any
) => {
  return useQuery<ResponseExam['DETAIL']>(
    ['api/v1/exam/detail', params],
    () => getDetailExam(params),
    { ...defaultOption, ...options }
  )
}

export const actionExams = async (req: RequestExam['ACTION']): Promise<any> => {
  const { data } = await commonApi({
    method: req.method,
    url: URL_EXAM,
    params: req.params,
    data: req.data,
  })
  return data
}

export const changeStateExam = async (
  req: RequestExam['UPDATE_STATE']
): Promise<ResponseExam['UPDATE_STATE']> => {
  const { data } = await commonApi({
    method: 'put',
    url: URL_EXAM + '/update-state',
    params: req,
  })
  return data
}
