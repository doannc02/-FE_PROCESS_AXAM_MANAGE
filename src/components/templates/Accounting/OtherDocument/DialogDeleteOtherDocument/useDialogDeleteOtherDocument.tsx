import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL } from '@/routes'
import { actionOtherDocument } from '@/service/accounting/otherDocument/action'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const useDialogDeleteOtherDocument = (id: number) => {
  const { t } = useTranslation()
  const { hideDialog, showDialog } = useDialog()
  const {
    handleSubmit,
    formState: { isLoading },
    setError,
  } = useFormCustom<any>({
    defaultValues: {
      id,
    },
  })

  const router = useRouter()

  const onSubmit = handleSubmit(async (input) => {
    try {
      const res = await actionOtherDocument({
        method: 'delete',
        params: input,
      })

      if (res?.data?.message) {
        successMsg(res?.data?.message)
        hideDialog()

        router.push({
          pathname: MENU_URL.GENERAL_ACC.OTHER_DOC,
        })
      }
    } catch (e) {
      errorMsg(e, setError)
    }
  })
  return [{ isLoading }, { onSubmit }] as const
}

export default useDialogDeleteOtherDocument
