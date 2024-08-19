import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Box } from '@mui/material'

export const CancelSaleOrderDialog = ({
  data,
  handleCancel,
}: {
  data: any
  handleCancel: (val: any) => void
}) => {
  const { hideDialog } = useDialog()
  const handleCancelConfirm = () => {
    handleCancel(data)
    hideDialog()
  }
  //   const {handleSubmit} = useDeleteSaleOrderDialog()

  return (
    <DialogCustom title='' onClose={hideDialog} width={500}>
      <Box className='flex justify-center font-medium text-[20px] max-w-[290px] m-auto align-middle text-center'>
        Bạn có chắc chắn muốn hủy đơn bán này hay không?
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
        <CoreButton theme='submit' onClick={handleCancelConfirm}>
          Xác nhận
        </CoreButton>
      </div>
    </DialogCustom>
  )
}
