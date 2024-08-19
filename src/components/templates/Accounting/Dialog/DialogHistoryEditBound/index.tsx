import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { CustomTable } from '@/components/organism/TableCustom'
import { useCheckPath } from '@/path'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDialogHisEditBound } from './useDialogHistoryEditBound'

const DialogHisUpdateList = ({
  changeId,
  code,
  historyType,
  refetch,
}: {
  changeId: number
  code: string
  historyType:
    | 'ENTRY'
    | 'OUT_INVOICE'
    | 'OUT_REFUND'
    | 'IN_REFUND'
    | 'PAYMENT'
    | any
  refetch: any
}) => {
  const { hideDialog } = useDialog()
  const { typePath, paymentType, paymentMethod, balanceTypePath } =
    useCheckPath()
  const [values, handles] = useDialogHisEditBound({
    changeId,
    historyType,
    code,
  })
  const { isLoading, columns, dataTable, page, size, totalPages } = values
  const { t, onChangePageSize } = handles

  return (
    <DialogCustom title='' onClose={hideDialog} width={1010}>
      <Box className='flex justify-center px-25 m-auto align-middle text-center'>
        <Typography
          variant='h6'
          style={{
            lineHeight: 1.5,
          }}
        >
          {historyType !== 'PAYMENT' ? `Lịch sử chỉnh sửa chứng từ ${code}` : ''}
          {historyType === 'PAYMENT' &&
            paymentType === 'INBOUND' &&
            `Lịch sử chỉnh sửa Phiếu thu ${code}`}
          {historyType === 'PAYMENT' &&
            paymentType === 'OUTBOUND' &&
            `Lịch sử chỉnh sửa Phiếu chi ${code}`}
        </Typography>
      </Box>

      <Box className='mx-20'>
        <CustomTable
          isShowColumnTurn
          className='my-15'
          columns={columns}
          data={dataTable}
          onChangePageSize={onChangePageSize}
          paginationHidden={dataTable.length < 1}
          totalPages={totalPages}
          page={page}
          size={size}
          isLoading={isLoading}
        />
      </Box>
    </DialogCustom>
  )
}

export default DialogHisUpdateList
