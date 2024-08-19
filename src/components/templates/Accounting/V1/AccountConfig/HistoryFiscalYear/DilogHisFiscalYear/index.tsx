import { CoreTable } from '@/components/organism/CoreTable'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { useDialogHisFisYear } from './useDialogHisFisYear'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CustomTable } from '@/components/organism/TableCustom'

export const DialogHistoryAccConfig = () => {
  const [values, handles] = useDialogHisFisYear()
  const { hideDialog } = useDialog()
  const { columns, dataTable, page, size, totalPages, isLoading } = values
  const { onChangePageSize } = handles

  return (
    <DialogCustom
      title={'Lịch sử cấu hình năm tài chính'}
      onClose={hideDialog}
      width={1080}
    >
      <div className='p-15'>
        <CustomTable
          columns={columns}
          data={dataTable}
          onChangePageSize={onChangePageSize}
          page={page}
          size={size}
          totalPages={totalPages}
          isLoading={isLoading}
          isShowColumnTurn
          //   onRowClick={(id: number) => {
          //     router.push({
          //       pathname: '/config/accountConfig/[id_history]',
          //       query: {
          //         id_history: id,
          //       },
          //     })
          //     hideDialog()
          //   }}
        />
      </div>
    </DialogCustom>
  )
}
