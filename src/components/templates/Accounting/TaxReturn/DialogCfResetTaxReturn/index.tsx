import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useDialogDeleteBalance from './useDialogCfResetTaxReturn'
import { TaxReturn } from '@/service/accounting/taxReturn/taxReturn/getList/type'

export type Props = {
  taxReturn: TaxReturn
}

const DialogCfResetTaxReturn = ({ taxReturn }: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogDeleteBalance({ taxReturn })
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
          Bạn xác nhận reset tờ khai thuế không
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

export default DialogCfResetTaxReturn
