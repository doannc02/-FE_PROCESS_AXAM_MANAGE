import { useCheckPath } from '@/path'
import { TRANSLATE } from '@/routes'
import { useQueryGetUpdateHisDetail } from '@/service/accounting/updateHistory/getDetail'
import { useTranslation } from 'react-i18next'

const useDetailHisUpdate = ({ id }: { id: number }) => {
  const { t } = useTranslation(TRANSLATE.BANK_CASH_ACCOUNT)

  const { paymentMethod, paymentMethodURL } = useCheckPath()

  const { data, isLoading } = useQueryGetUpdateHisDetail(
    {
      id,
    },
    { enabled: !!id }
  )

  return [
    {
      isLoading,
      tableData: data?.data ?? null,
      paymentMethod,
      paymentMethodURL,
    },
    { t },
  ] as const
}

export default useDetailHisUpdate
