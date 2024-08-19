import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Box, Typography } from '@mui/material'

export const DialogWarning = ({ onSubmit }: { onSubmit: any }) => {
  const { hideDialog } = useDialog()

  return (
    <DialogCustom title='' onClose={hideDialog} width={450}>
      <Box className='mx-20'>
        <Typography variant='h6' className='text-center'>
          {`Bạn có chắc chắn về thông tin vừa nhập? Sau khi nhấn "Hoàn thành" bạn sẽ không được phép chỉnh sửa lại thông tin.`}
        </Typography>
      </Box>

      <div className='flex justify-center gap-10 py-25'>
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
        >
          Hoàn thành
        </CoreButton>
      </div>
    </DialogCustom>
  )
}
