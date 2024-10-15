import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useTranslation } from 'next-i18next'
import { Props } from '.'
import { useRouter } from 'next/router'
import { MENU_URL } from '@/routes'

const useDialogCfAddExamSet = ({ id, codePlan, refetch }: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()
  const router = useRouter()
  const {
    handleSubmit,
    formState: { isLoading },
    setError,
  } = useFormCustom<any>({
    defaultValues: {
      id,
      codePlan,
    },
  })

  const onSubmit = handleSubmit(async (input) => {
    try {
      refetch && refetch()
      router.push({
        pathname: `${MENU_URL.EXAM_SET}/addNew`,
        query: {
          idProposal: id,
        },
      })
      hideDialog()
    } catch (error) {
      errorMsg(error, setError)
    }
  })
  return [{ isLoading }, { onSubmit }] as const
}

export default useDialogCfAddExamSet
