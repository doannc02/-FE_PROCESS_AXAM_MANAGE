import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { RequestBody } from '@/service/accounting/accountJournal/delete/type'
import { deletePaymentTerm } from '@/service/accounting/paymentTerm/delete'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'

export type Props = {
  id: number
  refetch: any
}

export const useDialogDeletePaymentTerm = ({ id, refetch }: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()

  const { handleSubmit, setError } = useFormCustom<RequestBody['DELETE']>({
    defaultValues: {
      id,
    },
  })

  const { mutate, isLoading } = useMutation(deletePaymentTerm, {
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
