import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CoreTable } from '@/components/organism/CoreTable'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { useDialogImportHistory } from './useDialogImportHistory'

export const DialogImportHistoryBankBalance = () => {
  const [values, handles] = useDialogImportHistory()
  const { columns, dataTable, page, size, totalPages, isLoading } = values
  const { onChangePageSize } = handles
  const { hideDialog } = useDialog()
  return (
    <DialogCustom title={'Lịch sử Import'} onClose={hideDialog} width={1080}>
      <div className='p-15'>
        <CoreTable
          columns={columns}
          data={dataTable}
          onChangePageSize={onChangePageSize}
          page={page}
          size={size}
          totalPages={totalPages}
          isLoading={isLoading}
          isShowColumnStt
        />
      </div>
    </DialogCustom>
  )
}
