import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { actionTaxReturn } from '@/service/accounting/taxReturn/taxReturn/action'
import { useTranslation } from 'next-i18next'
import { Props } from '.'
import { QueryClient, useQueryClient } from 'react-query'
import { END_POINT_TAX_RETURN } from '@/service/accounting/taxReturn/taxReturn/getList'

const useDialogCfResetTaxReturn = ({ taxReturn }: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()

  const {
    handleSubmit,
    formState: { isLoading },
    setError,
  } = useFormCustom<{
    id: number
  }>({
    defaultValues: {
      id: taxReturn.id,
    },
  })

  const queryClient = useQueryClient()

  const onSubmit = handleSubmit(async (input) => {
    try {
      await actionTaxReturn({
        method: 'delete',
        params: {
          id: input.id,
        },
        data: null as any,
      })

      queryClient.invalidateQueries({
        queryKey: [END_POINT_TAX_RETURN + '/list'],
      })

      hideDialog()
    } catch (error) {
      errorMsg(error, setError)
    }
  })
  return [{ isLoading }, { onSubmit }] as const
}

export default useDialogCfResetTaxReturn
