import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { ColumnProps, CoreTable } from '@/components/organism/CoreTable'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useMemo } from 'react'

type Props = { tableData: any; isLoadingTable: any }

const DialogItemPrices = ({ tableData, isLoadingTable }: Props) => {
  const { hideDialog } = useDialog()
  const { currency } = useAppSelector((state) => state.companyConfigData)

  console.log(tableData, 'tableData')

  const columns = useMemo(
    () =>
      [
        {
          header: 'Số lượng',
          fieldName: 'quantity',
        },
        {
          header: 'Đơn giá' + ` (${currency})`,
          fieldName: 'unitPrice',
        },
        {
          header: 'Ngày nhập kho',
          fieldName: 'receiveDate',
        },
      ] as ColumnProps[],
    [currency]
  )
  return (
    <DialogCustom
      title={'Chi tiết đơn giá'}
      onClose={hideDialog}
      width={1000}
      formProps={{
        className: 'm-20',
      }}
    >
      <CoreTable
        isLoading={isLoadingTable}
        tableName=''
        columns={columns}
        data={tableData}
        paginationHidden
      />
    </DialogCustom>
  )
}

export default DialogItemPrices
