import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import CustomCard from '../../components/CustomCard'

interface Props {
  id: number
  code: string
  hideInfo: boolean
}

export const ViewDetailSaleOrderDialog = (props: Props) => {
  const { id, code, hideInfo } = props
  const { hideDialog } = useDialog()
  return (
    <DialogCustom
      title={code}
      onClose={hideDialog}
      maxWidth='lg'
      width={1080}
      fullWidth
      //position='top'
    >
      <CustomCard hideInfo={hideInfo} id={id} code={code} />
    </DialogCustom>
  )
}
