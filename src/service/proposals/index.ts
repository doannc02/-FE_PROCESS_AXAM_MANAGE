import { commonApi } from '@/config/axios'
import { RequestProposals, ResponseProposals } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

const URL_PROPOSALS = '/api/v1/proposal'

export const getProposalList = async (
  params: RequestProposals['GET']
): Promise<ResponseProposals['GET']> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_PROPOSALS + '/list',
    params,
  })

  return data
}

export const useQueryGetProposalsList = (
  params: RequestProposals['GET'],
  options?: any
) => {
  return useQuery<ResponseProposals['GET']>(
    ['api/v1/proposals/list', params],
    () => getProposalList(params),
    { ...defaultOption, ...options }
  )
}

export const getDetailProposals = async (params: {
  id: number
}): Promise<ResponseProposals['GET_DETAIL']> => {
  const { data } = await commonApi({
    method: 'get',
    url: URL_PROPOSALS + '/detail',
    params,
  })

  return data
}

export const useQueryGetDetailProposals = (
  params: { id: number },
  options?: any
) => {
  return useQuery<ResponseProposals['GET_DETAIL']>(
    ['api/v1/proposals/detail', params],
    () => getDetailProposals(params),
    { ...defaultOption, ...options }
  )
}

export const actionProposals = async (
  req: RequestProposals['ACTION']
): Promise<any> => {
  const { data } = await commonApi({
    method: req.method,
    url: URL_PROPOSALS,
    params: req.params,
    data: req.data,
  })
  return data
}


export const changeStateProposal = async (
  req: RequestProposals['UPDATE_STATE']
): Promise<ResponseProposals['UPDATE_STATE']> => {
  const { data } = await commonApi({
    method: 'put',
    url: URL_PROPOSALS + '/update-state',
    params: req,
  })
  return data
}