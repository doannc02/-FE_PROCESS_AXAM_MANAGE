import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

type Props = {
  confirmFun: any
}

export const DialogCfView = ({ confirmFun }: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()

  return (
    <CoreDialog title='' onClose={hideDialog} width={450}>
      <Box className='flex justify-center max-w-[420px] m-auto align-middle text-center'>
        <Typography
          variant='subtitle1'
          style={{
            lineHeight: 1.5,
          }}
        >
          Dữ liệu thay đổi hiện tại sẽ không được lưu, bạn có chắc muốn chuyển
          trạng thái trang về Xem?
        </Typography>
      </Box>

      <div className='flex justify-center gap-10 py-10'>
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
          onClick={() => {
            confirmFun && confirmFun()
            hideDialog()
          }}
        >
          {t('common:btn.confirm')}
        </CoreButton>
      </div>
    </CoreDialog>
  )
}
