import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { postCheckMappingBalance } from '@/service/accounting/accountMoveLine/checkMapping'
import { deleteBalance } from '@/service/accounting/accountMoveLine/deleteBalance'
import { RequestBody } from '@/service/accounting/accountMoveLine/deleteBalance/type'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Props } from '.'
import DialogCfDeleteBalance from '../DialogCfDeleteBalance'

const useDialogDeleteBalance = ({ id, beginType, refetch }: Props) => {
  const { t } = useTranslation()
  const { hideDialog, showDialog } = useDialog()
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

  const router = useRouter()

  const onSubmit = handleSubmit(async (input) => {
    try {
      const res = await postCheckMappingBalance(input)

      if (res && res.data.isHaveMatching) {
        showDialog(
          <DialogCfDeleteBalance
            id={id}
            beginType={beginType}
            refetch={router.back}
          />
        )
      } else if (res && !res.data.isHaveMatching) {
        await deleteBalance(input)
        refetch && refetch()
        hideDialog()
      }
    } catch (e) {
      errorMsg(e, setError)
    }
  })
  return [{ isLoading }, { onSubmit }] as const
}

export default useDialogDeleteBalance
