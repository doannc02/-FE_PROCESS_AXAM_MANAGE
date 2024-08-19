import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { putAccountMoveDraft } from '@/service/accounting/accountMove/setDraft'
import { putPaymentDraft } from '@/service/accounting/accountPayment/setDraft'
import { useTranslation } from 'next-i18next'
import { useMutation } from 'react-query'

import { RequestBody } from '@/service/accounting/accountPayment/setDraft/type'
import { useCheckPath } from '@/path'
import { checkingTypeInvoice } from '@/helper/chkTypeInvPath'
import { useMemo } from 'react'

type Props = {
  id: number
  type: string
  refetch: any
}

const useDialogConfirmDraft = ({ id, type, refetch }: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()
  const methods = useFormCustom<RequestBody['PUT']>({
    defaultValues: {
      id,
      reason: '',
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
  const { mutate, isLoading } = useMutation(
    type === 'INVOICE' ? putAccountMoveDraft : putPaymentDraft,
    {
      onSuccess: (data) => {
        successMsg(t('common:message.success'))
        refetch()
      },
      onError: (error) => {
        errorMsg(error, methods.setError)
      },
    }
  )

  const handleConfirmDraft = methods.handleSubmit(async (input) => {
    const format = { ...input, ...(type === 'INVOICE' ? { typeInvoice } : {}) }

    mutate(format)
    hideDialog()
  })
  return [{ isLoading, methods }, { handleConfirmDraft }] as const
}

export default useDialogConfirmDraft
