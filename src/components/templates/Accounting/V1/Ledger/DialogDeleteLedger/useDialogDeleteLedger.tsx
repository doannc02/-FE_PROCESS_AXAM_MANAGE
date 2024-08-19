import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { deleteAccountLedger } from '@/service/accounting/accountLedger/delete'
import { RequestBody } from '@/service/accounting/accountLedger/delete/type'
import { useAppDispatch } from '@/redux/hook'
import { setLedgerRefConfig } from '@/redux/reducer/ledgerRefReducer'
import { getAccountLedger } from '@/service/accounting/accountLedger/getList'

export type Props = {
  id: number
  refetch: any
}

const useDialogDeleteLedger = ({ id, refetch }: Props) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { hideDialog } = useDialog()
  const { handleSubmit, setError } = useFormCustom<RequestBody['DELETE']>({
    defaultValues: {
      id,
    },
  })

  const { mutate, isLoading } = useMutation(deleteAccountLedger, {
    onSuccess: async (data) => {
      successMsg(t('common:message.success'))
      const dt = await getAccountLedger({ page: 0, size: 1000 })
      const findLedgerDefault = (dt?.data?.content ?? []).find(
        (i) => i.code === 'SC00'
      )
      if (dt && dt?.data?.content && findLedgerDefault) {
        dispatch(
          setLedgerRefConfig({
            id: findLedgerDefault.id,
            name: findLedgerDefault.name,
            code: findLedgerDefault.code,
          })
        )
      }
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

export default useDialogDeleteLedger
