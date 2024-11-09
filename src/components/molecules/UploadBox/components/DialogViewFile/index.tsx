import { useDialog } from '@/components/hooks/dialog/useDialog'
import CoreViewFile from '@/components/molecules/CoreViewFile'
import { DialogCustom } from '@/components/organism/DialogCustom'

const DialogViewFile = ({
  nameFile,
  src,
}: {
  nameFile: string
  src: string
}) => {
  const new_url = src?.replace('/pdf-files/', '/qldethi/pdf-files/')
  const { hideDialog } = useDialog()
  return (
    <DialogCustom
      width={1100}
      onClose={hideDialog}
      title={`Chi tiết file ${nameFile}`}
    >
      <div className=''>
        <CoreViewFile src={new_url} />
      </div>
    </DialogCustom>
  )
}

export default DialogViewFile
