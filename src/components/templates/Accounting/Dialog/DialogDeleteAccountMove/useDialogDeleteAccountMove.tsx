import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { RequestBody } from '@/service/accounting/accountJournal/delete/type'
import { deleteAccountMove } from '@/service/accounting/accountMove/delete'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { useCheckPath } from '@/path'
import { checkingTypeInvoice } from '@/helper/chkTypeInvPath'
import { useMemo } from 'react'

export type Props = {
  id: number
  refetch: any
}

const useDialogDeleteAccountMove = ({ id, refetch }: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()
  const { handleSubmit, setError } = useFormCustom<RequestBody['DELETE']>({
    defaultValues: {
      id,
    },
  })

  const {
    typePath,
    typeOfInvoice,
    typeInvoice: typeCustomerInv,
    typeOfInvoiceCustomer,
  } = useCheckPath()

  const typeInvoice = useMemo(() => {
    return checkingTypeInvoice(
      typePath,
      typeOfInvoice,
      typeCustomerInv,
      typeOfInvoiceCustomer
    )
  }, [typeCustomerInv, typeOfInvoice, typeOfInvoiceCustomer, typePath])

  const { mutate, isLoading } = useMutation(deleteAccountMove, {
    onSuccess: (data) => {
      successMsg(t('common:message.success'))
      refetch()
    },
    onError: (error) => {
      errorMsg(error, setError)
    },
  })

  const onSubmit = handleSubmit(async (input) => {
    const format = { ...input, ...{ typeInvoice } }
    mutate(format)
    hideDialog()
  })
  return [{ isLoading }, { onSubmit }] as const
}

export default useDialogDeleteAccountMove
