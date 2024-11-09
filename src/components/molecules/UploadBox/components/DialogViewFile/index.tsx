import { useDialog } from '@/components/hooks/dialog/useDialog'
import CoreViewFile from '@/components/molecules/CoreViewFile'
import { DialogCustom } from '@/components/organism/DialogCustom'
import getConfig from 'next/config'

const DialogViewFile = ({
  nameFile,
  src,
}: {
  nameFile: string
  src: string
}) => {
  const {
    publicRuntimeConfig: { COMMON_URL },
  } = getConfig()
  const { hideDialog } = useDialog()
  console.log(COMMON_URL, src, 'dialog')
  return (
    <DialogCustom
      width={1100}
      onClose={hideDialog}
      title={`Chi tiết file ${nameFile}`}
    >
      <div className=''>
        <CoreViewFile src={`https://itf.viu.edu.vn:880/qldethi${src}`} />
      </div>
    </DialogCustom>
  )
}

export default DialogViewFile
