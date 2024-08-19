import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useDialogDeleteAccountMove from './useDialogDeleteAccountMove'

const DialogDeleteAccountMove = ({
  id,
  refetch,
}: {
  id: number
  refetch: any
}) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogDeleteAccountMove({ id, refetch })
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
          Bạn có chắc chắn muốn xoá chứng từ này hay không?
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

export default DialogDeleteAccountMove
