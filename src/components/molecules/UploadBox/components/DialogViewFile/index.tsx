import { useDialog } from '@/components/hooks/dialog/useDialog'
import CoreViewFile from '@/components/molecules/CoreViewFile'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Box, Stack } from '@mui/material'

const DialogViewFile = ({
  nameFile,
  src,
}: {
  nameFile: string
  src: string
}) => {
  const { hideDialog } = useDialog()
  return (
    <DialogCustom
      width={1100}
      onClose={hideDialog}
      title={`Chi tiết file ${nameFile}`}
    >
      <div className=''>
        <CoreViewFile src={src} />
      </div>
    </DialogCustom>
  )
}

export default DialogViewFile
