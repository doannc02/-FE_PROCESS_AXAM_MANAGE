import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import { MENU_URL } from '@/routes'
import { useRouter } from 'next/router'
import DialogDeleteOtherDocument from '../DialogDeleteOtherDocument'

export const RightAction = ({
  isUpdate,
  id,
}: {
  isUpdate: boolean
  id: number
}) => {
  const { showDialog } = useDialog()
  const router = useRouter()
  return (
    <TopAction
      actionList={isUpdate && id ? ['edit', 'delete'] : []}
      onEditAction={() => {
        router.push({
          pathname: `${MENU_URL.GENERAL_ACC.OTHER_DOC}/[id]`,
          query: {
            id,
          },
        })
      }}
      onDeleteAction={() => showDialog(<DialogDeleteOtherDocument id={id} />)}
    ></TopAction>
  )
}
