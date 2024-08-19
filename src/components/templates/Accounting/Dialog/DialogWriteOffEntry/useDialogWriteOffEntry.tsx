import { useDialog } from '@/components/hooks/dialog/useDialog'
import { MAX_VALUE } from '@/helper/contain'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useQueryGetAccountList } from '@/service/accounting/account/getList'
import { useQueryGetAccountJournalCashBankList } from '@/service/accounting/accountJournal/getCashBank'
import { postAccountMoveLineMatchingWriteOff } from '@/service/accounting/accountMoveLineMatching/writeOff'
import { RequestBody } from '@/service/accounting/accountMoveLineMatching/writeOff/type'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import { useMutation } from 'react-query'
import { WriteOffProp } from '.'

const useDialogWriteOffEntry = ({
  moneyMatching,
  partnerId,
  accountMoveLineIds,
  onAfterWriteOff,
}: WriteOffProp) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()

  const defaultValues = {
    partnerId,
    moneyMatching,
    accountMoveLineIds,
    label: 'Write Off',
    dayReconcile: moment().format('YYYY-MM-DD'),
  }

  const methodForm = useFormCustom<RequestBody['POST']>({
    defaultValues,
  })

  const { handleSubmit, setError } = methodForm

  const { isLoading: isLoadingAccountSelect, data: accountSelect } =
    useQueryGetAccountList({
      page: 0,
      size: MAX_VALUE,
      isAllowedReconcile: true,
    })

  const { isLoading: isLoadingAccountJournal, data: accountJournalSelect } =
    useQueryGetAccountJournalCashBankList({
      page: 0,
      size: MAX_VALUE,
    })

  // SUBMIT
  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    postAccountMoveLineMatchingWriteOff,
    {
      onSuccess: (data) => {
        successMsg(t('common:message.success'))
        onAfterWriteOff()
      },
      onError: (error) => {
        errorMsg(error, setError)
      },
    }
  )

  const onSubmit = handleSubmit(async (input) => {
    mutate(input)
    hideDialog()
  })

  return [
    {
      accountSelect: accountSelect ? accountSelect.data.content : [],
      isLoadingAccountSelect,
      isLoadingSubmit,
      methodForm,
      isLoadingAccountJournal,
      accountJournalSelect: accountJournalSelect
        ? accountJournalSelect.data.content
        : [],
    },
    { onSubmit },
  ] as const
}

export default useDialogWriteOffEntry
