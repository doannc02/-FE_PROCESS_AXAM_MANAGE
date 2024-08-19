import {
  useQueryGetUpdateHisDetailInv
} from '@/service/accounting/updateHistory/getDetail'

const useDetailHisUpdate = ({ id }: { id: number }) => {
  const { data, isLoading } = useQueryGetUpdateHisDetailInv(
    {
      id,
    },
    { enabled: !!id }
  )
  const tableData = data?.data ?? null
  return [{ tableData, isLoading }, {}] as const
}

export default useDetailHisUpdate
