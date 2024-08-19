import { accountingApi } from '@/config/axios'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response, ResponseLedger } from './type'

export const getAccountJournalLedger = async (
  params: RequestBody['GET']
): Promise<ResponseLedger['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/account-journal/ledger-list',
    params,
  })

  return data
}

export const useQueryGetAccountJournalLedgerList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<ResponseLedger['GET']>(
    ['/api/v1/account-journal/ledger-list', params],
    () => getAccountJournalLedger(params),
    { ...defaultOption, ...options }
  )
}

export const getAccountJournalList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await accountingApi({
    method: 'get',
    url: '/api/v1/account-journal/list',
    params,
  })
  return data
}

export const useQueryGetAccountJournalList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/account-journal/list', params],
    () => getAccountJournalList(params),
    { ...defaultOption, ...options }
  )
}
