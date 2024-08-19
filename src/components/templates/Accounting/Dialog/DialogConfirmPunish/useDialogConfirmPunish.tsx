import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { putAccountMoveRejectPunish } from '@/service/accounting/accountMove/rejectPunish'
import { RequestBody } from '@/service/accounting/accountMove/undoPunish/type'
import { useTranslation } from 'next-i18next'
import { useMutation } from 'react-query'

export type Props = {
  punishId: number
  refetch: any
}

const useDialogConfirmPunish = ({ punishId, refetch }: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()
  const { handleSubmit, setError } = useFormCustom<RequestBody['PUT']>({
    defaultValues: {
      punishId,
    },
  })

  const { mutate, isLoading } = useMutation(putAccountMoveRejectPunish, {
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

export default useDialogConfirmPunish
