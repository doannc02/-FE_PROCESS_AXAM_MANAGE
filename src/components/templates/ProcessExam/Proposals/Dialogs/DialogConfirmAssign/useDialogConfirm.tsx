import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { Props } from '.'

const useDialogConfirm = ({ codePlan, refetch }: Props) => {
  const { hideDialog } = useDialog()
  const {
    handleSubmit,
    formState: { isLoading },
    setError,
  } = useFormCustom<any>({
    defaultValues: {
      codePlan,
    },
  })

  const onSubmit = handleSubmit(async (input) => {
    try {
      refetch && refetch()
      hideDialog()
    } catch (error) {
      errorMsg(error, setError)
    }
  })
  return [{ isLoading }, { onSubmit }] as const
}

export default useDialogConfirm
