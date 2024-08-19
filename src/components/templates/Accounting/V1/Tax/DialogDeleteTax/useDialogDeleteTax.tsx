import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { deleteTax } from '@/service/accounting/tax/delete'
import { RequestBody } from '@/service/accounting/tax/delete/type'
import { useTranslation } from 'next-i18next'
import { useMutation } from 'react-query'

export type Props = {
  id: number
  refetch: any
}

const useDialogDeleteTax = ({ id, refetch }: Props) => {
  const { t } = useTranslation(TRANSLATE.TAX)
  const { hideDialog } = useDialog()
  const { handleSubmit, setError } = useFormCustom<RequestBody['DELETE']>({
    defaultValues: {
      id,
    },
  })

  const { mutate, isLoading } = useMutation(deleteTax, {
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
  return [{ isLoading }, { t, onSubmit }] as const
}

export default useDialogDeleteTax
