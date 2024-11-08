import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useDialogDeleteExam from './useDialogDeleteExam'

export type Props = {
  id: number
  nameExam: string
  refetch?: any
}

const DialogDeleteExam = ({ id, nameExam, refetch }: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogDeleteExam({ id })
  const { isLoadingUpdateStateExam } = values
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
          {`Bạn có chắc chắn muốn xóa đề "${nameExam}" này không?`}
        </Typography>
      </Box>

      <div className='flex justify-center gap-10 py-17'>
        <CoreButton
          theme='cancel'
          onClick={() => {
            hideDialog()
          }}
        >
          Hủy
        </CoreButton>
        <CoreButton
          theme='submit'
          onClick={() => {
            onSubmit()
            hideDialog()
          }}
          loading={isLoadingUpdateStateExam}
        >
          {t('common:btn.confirm')}
        </CoreButton>
      </div>
    </DialogCustom>
  )
}

export default DialogDeleteExam
