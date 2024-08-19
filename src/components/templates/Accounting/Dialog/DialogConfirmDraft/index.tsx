import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useDialogConfirmDraft from './useDialogConfirmDraft'

export type Props = {
  id: number
  type: 'INVOICE' | 'PAYMENT'
  refetch: any
}

const DialogConfirmDraft = ({ id, refetch, type }: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()

  const [values, handles] = useDialogConfirmDraft({ id, type, refetch })
  const { isLoading, methods } = values
  const { handleConfirmDraft } = handles

  return (
    <CoreDialog title={'Đặt lại thành nháp'} onClose={hideDialog} width={800}>
      <Box className='px-20 mt-10'>
        <CoreInput
          multiline
          control={methods.control}
          name='reason'
          placeholder='Nhập lý do'
          label='Lý do'
          inputProps={{ maxLength: 255 }}
          rows={5}
          required
          rules={{
            required: t('common:validation.required'),
          }}
          isViewProp={false}
        />
        <div className='flex justify-center gap-10 py-17'>
          <CoreButton
            theme='cancel'
            onClick={() => {
              hideDialog()
            }}
          >
            {t('common:btn.cancel')}
          </CoreButton>
          <CoreButton
            theme='submit'
            loading={isLoading}
            onClick={(val: any) => handleConfirmDraft(val)}
          >
            {t('common:btn.confirm')}
          </CoreButton>
        </div>
      </Box>
    </CoreDialog>
  )
}

export default DialogConfirmDraft
