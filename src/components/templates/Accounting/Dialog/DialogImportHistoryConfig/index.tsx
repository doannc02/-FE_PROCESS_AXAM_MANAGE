import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { CustomTable } from '@/components/organism/TableCustom'
import { useDialogImportHistoryConfig } from './useDialogImportHistory'

export const DialogImportHistoryConfig = () => {
  const [values, handles] = useDialogImportHistoryConfig()
  const { columns, dataTable, page, size, totalPages, isLoading } = values
  const { onChangePageSize } = handles
  const { hideDialog } = useDialog()
  return (
    <DialogCustom title={'Lịch sử Import'} onClose={hideDialog} width={1080}>
      <div className='p-15'>
        <CustomTable
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
