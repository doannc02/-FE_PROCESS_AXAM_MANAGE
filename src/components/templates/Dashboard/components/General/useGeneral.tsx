import { useAppSelector } from '@/redux/hook'
import { useQueryGetExamList } from '@/service/exam'
import { useQueryGetExamSetList } from '@/service/examSet'
import { useQueryGetProposalsList } from '@/service/proposals'
import { convertToDate } from '@/utils/date/convertToDate'
import moment from 'moment'
import { useMemo } from 'react'

const useGeneral = () => {
  const email = useAppSelector((state) => state.userData.email)

  const { data: dataPropExpire, isLoading: isLoadingPropExpire } =
    useQueryGetProposalsList(
      {
        day_expire: 20,
        page: 1,
        size: 20,
      }
    )

  const { data: dataProposals, isLoading: isLoadingProposal } =
    useQueryGetProposalsList(
      {
        page: 1,
        size: 100,
        startDate: convertToDate(moment().startOf('month'), 'YYYY-MM-DD'),
        endDate: convertToDate(moment().endOf('month'), 'YYYY-MM-DD'),
      }
    )

  const { data: dataExamSet, isLoading: isLoadingExamSet } =
    useQueryGetExamSetList(
      {
        page: 1,
        size: 100,
        startDate: convertToDate(moment().startOf('month'), 'YYYY-MM-DD'),
        endDate: convertToDate(moment().endOf('month'), 'YYYY-MM-DD'),
      }
    )

  const { data: dataExam, isLoading: isLoadingExam } = useQueryGetExamList(
    {
      page: 1,
      size: 100,
      startDate: convertToDate(moment().startOf('month'), 'YYYY-MM-DD'),
      endDate: convertToDate(moment().endOf('month'), 'YYYY-MM-DD'),
    },
    {
      enabled: !!email,
    }
  )

  const objectExpire = useMemo(() => {
    return dataPropExpire?.data ?? {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPropExpire?.data?.content])

  const objectProposal = useMemo(() => {
    return dataProposals?.data ?? { content: [] }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataProposals?.data?.content])

  const objectExamSet = useMemo(() => {
    return dataExamSet?.data ?? { content: [] }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataExamSet?.data?.content])

  const objectExam = useMemo(() => {
    return dataExam?.data ?? { content: [], totalElements: 0 }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataExamSet?.data?.content])

  const arrDataRender = useMemo(() => {
    return [objectExpire, objectProposal, objectExamSet, objectExam] as {
      content: any[]
      totalElements: number
    }[]
  }, [objectExpire, objectProposal, objectExamSet, objectExam])
  console.log(arrDataRender, 'arrDataRender')
  return [{ email, arrDataRender }, { moment}] as const
}

export default useGeneral
