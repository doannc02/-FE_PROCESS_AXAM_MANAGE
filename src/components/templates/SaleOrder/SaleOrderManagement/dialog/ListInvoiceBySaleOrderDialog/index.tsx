import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Response } from '@/service/accounting/accountMove/getList/type'
import { useListInvoiceBySaleOrderDialog } from './useListInvoiceBySaleOrderDialog'
import { CustomTable } from '@/components/organism/TableCustom'

export type Props = {
  idOrder: number | null
}

export const ListInvoiceBySaleOrderDialog = (props: Props) => {
  const {idOrder} = props
  const [values, handles] = useListInvoiceBySaleOrderDialog(idOrder)
  const { columns, tableData } = values
  const { hideDialog } = useDialog()
  return (
    <DialogCustom
      title={'Invoice'}
      onClose={hideDialog}
      width={1080}
      fullWidth
      //position='top'
    >
      <div className='my-10 p-15'>
        <CustomTable
          columns={columns}
          data={tableData}
          isShowColumnStt
          paginationHidden
        />
      </div>
    </DialogCustom>
  )
}
