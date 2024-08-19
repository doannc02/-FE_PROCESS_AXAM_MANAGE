import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg } from '@/helper/message'
import { useTranslation } from 'next-i18next'
import { Props } from '.'

const useDialogCfDeleteBalance = ({ id, refetch }: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()

  const onSubmit = () => {
    try {
      refetch()
      hideDialog()
    } catch (error) {
      errorMsg(error)
    }
  }
  return [{}, { onSubmit }] as const
}

export default useDialogCfDeleteBalance
