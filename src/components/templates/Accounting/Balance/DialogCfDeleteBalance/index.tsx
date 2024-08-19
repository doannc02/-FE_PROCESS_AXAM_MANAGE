import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useDialogDeleteBalance from './useDialogCfDeleteBalance'

export type Props = {
  id: number
  beginType: 'CUSTOMER' | 'VENDOR' | 'BANK'
  refetch: any
}

const DialogCfDeleteBalance = ({ id, beginType, refetch }: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogDeleteBalance({ id, beginType, refetch })
  const { isLoading } = values
  const { onSubmit } = handles

  return (
    <DialogCustom title='' onClose={hideDialog} width={520}>
      <Box className='flex justify-center px-25 m-auto align-middle text-center'>
        <Typography
          variant='h6'
          style={{
            lineHeight: 1.5,
          }}
        >
          Nếu xóa dư nợ này sẽ ảnh hưởng tới những chứng từ đã được tham chiếu
          thanh toán bởi số tiền này, bạn có xác nhận xóa không?
        </Typography>
      </Box>

      <div className='flex justify-center gap-10 py-17'>
        <CoreButton
          theme='cancel'
          onClick={() => {
            hideDialog()
          }}
        >
          {t('common:btn.cancel')}
        </CoreButton>
        <CoreButton theme='submit' onClick={onSubmit} loading={isLoading}>
          {t('common:btn.confirm')}
        </CoreButton>
      </div>
    </DialogCustom>
  )
}

export default DialogCfDeleteBalance
