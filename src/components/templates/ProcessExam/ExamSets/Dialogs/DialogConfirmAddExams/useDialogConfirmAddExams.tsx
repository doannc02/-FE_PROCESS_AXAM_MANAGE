import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useTranslation } from 'next-i18next'
import { Props } from '.'
import { useRouter } from 'next/router'
import { MENU_URL } from '@/routes'

const useDialogCfAddExamSet = ({ idExamSet, nameExamSet, refetch }: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()
  const router = useRouter()
  const {
    handleSubmit,
    formState: { isLoading },
    setError,
  } = useFormCustom<any>({
    defaultValues: {
      idExamSet,
      nameExamSet,
    },
  })

  const onSubmit = handleSubmit(async () => {
    try {
      refetch && refetch()
      router.push({
        pathname: `${MENU_URL.DETAIL_EXAM}/addNew`,
        query: {
          idExamSet: idExamSet,
          nameExamSet: nameExamSet,
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
