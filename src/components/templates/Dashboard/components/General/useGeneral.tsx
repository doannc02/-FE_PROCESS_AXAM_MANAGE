import { useAppSelector } from '@/redux/hook'
import { useQueryGetProposalsList } from '@/service/proposals'

const useGeneral = () => {
  const email = useAppSelector((state) => state.userData.email)

  const { data: dataProp, isLoading: isLoadingProposal } =
    useQueryGetProposalsList({
      day_expire: 5,
      page: 1,
      size: 10,
    })
  return [{ email, dataProp, isLoadingProposal }, {}] as const
}

export default useGeneral
