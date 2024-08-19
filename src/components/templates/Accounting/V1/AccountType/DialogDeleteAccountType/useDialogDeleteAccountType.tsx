import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { deleteAccountType } from '@/service/accounting/accountType/delete'
import { RequestBody } from '@/service/accounting/accountType/delete/type'
import { useTranslation } from 'next-i18next'
import { useMutation } from 'react-query'

export type Props = {
  id: number
  refetch: any
}

const useDialogDeleteAccountType = ({ id, refetch }: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()
  const { handleSubmit, setError } = useFormCustom<RequestBody['DELETE']>({
    defaultValues: {
      id,
    },
  })

  const { mutate, isLoading } = useMutation(deleteAccountType, {
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

export default useDialogDeleteAccountType
