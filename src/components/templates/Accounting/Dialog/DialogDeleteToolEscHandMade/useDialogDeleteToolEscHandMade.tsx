import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { deleteAccountPayment } from '@/service/accounting/accountPayment/delete'
import { RequestBody } from '@/service/accounting/accountPayment/delete/type'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { deleteEscToolHandMade } from '@/service/accounting/increaseTools/delete/increase'

export type Props = {
  id: number
  refetch: any
}

const useDialogDeleteToolEscHM = ({ id, refetch }: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()
  const { handleSubmit, setError } = useFormCustom<RequestBody['DELETE']>({
    defaultValues: {
      id,
    },
  })

  const { mutate, isLoading } = useMutation(deleteEscToolHandMade, {
    onSuccess: (data) => {
      successMsg(t('common:message.success'))
      refetch()
    },
    onError: (error) => {
      errorMsg(error, setError)
    },
  })

  const onSubmit = handleSubmit(async (input) => {
    mutate(input)
    hideDialog()
  })
  return [{ isLoading }, { onSubmit }] as const
}

export default useDialogDeleteToolEscHM
