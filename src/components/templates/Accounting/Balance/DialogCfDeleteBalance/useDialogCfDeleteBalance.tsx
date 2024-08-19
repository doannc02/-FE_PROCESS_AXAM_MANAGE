import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { deleteBalance } from '@/service/accounting/accountMoveLine/deleteBalance'
import { RequestBody } from '@/service/accounting/accountPayment/delete/type'
import { useTranslation } from 'next-i18next'
import { Props } from '.'

const useDialogCfDeleteBalance = ({ id, beginType, refetch }: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()

  const {
    handleSubmit,
    formState: { isLoading },
    setError,
  } = useFormCustom<RequestBody['DELETE']>({
    defaultValues: {
      id,
      beginType,
    },
  })

  const onSubmit = handleSubmit(async (input) => {
    try {
      await deleteBalance(input)
      refetch && refetch()
      hideDialog()
    } catch (error) {
      errorMsg(error, setError)
    }
  })
  return [{ isLoading }, { onSubmit }] as const
}

export default useDialogCfDeleteBalance
