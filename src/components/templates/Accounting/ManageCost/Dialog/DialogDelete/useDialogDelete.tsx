import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { actionBCM } from '@/service/accounting/manageCost/bomCostManage/save'
import { actionSaveLCM } from '@/service/accounting/manageCost/laborCostManage/action'
import { actionSaveMMCInput } from '@/service/accounting/manageCost/manageMaterialCost/action'
import { useMutation } from 'react-query'
import { Props } from '.'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useRouter } from 'next/router'
import { MENU_URL } from '@/routes'
import { backToListUI } from '@/helper/backToListUI'

const defaultValues = {}

export const useDialogDelete = ({
  refetch,
  onCloseDialog,
  id,
  type,
}: Props) => {
  const methodForm = useFormCustom<any>({
    defaultValues,
  })

  const { handleSubmit, watch, setError } = methodForm
  const { hideDialog } = useDialog()
  const router = useRouter()
  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    type === 'BCM'
      ? actionBCM
      : type === 'LCM'
      ? actionSaveLCM
      : actionSaveMMCInput,
    {
      onSuccess: (data) => {
        successMsg('Success')
        refetch()

        hideDialog()
        backToListUI(router.pathname, router)
      },
      onError: (error) => {
        errorMsg(error, setError)
      },
    }
  )

  const onSubmit = handleSubmit(async () => {
    mutate({ method: 'delete', params: { ids: [id] } })
  })

  return [
    {
      isLoadingSubmit,
    },
    { onSubmit, handleSubmit },
  ] as const
}
