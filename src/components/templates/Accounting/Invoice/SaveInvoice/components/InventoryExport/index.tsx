import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import { AccountMoveDetail } from '@/service/accounting/accountMove/getDetail/type'
import { Grid, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import useInventoryExport from './useInventoryExport'

const InventoryExport = () => {
  const { watch, control } = useFormContext<AccountMoveDetail>()
  const [values, {}] = useInventoryExport()
  const { columns, tableDataPurchaseOrSales, tableData } = values
  return (
    <>
      {watch('state') === 'DRAFT' ? (
        <>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography>Yêu cầu xuất</Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              {watch('state') === 'DRAFT' ? (
                <CoreInput
                  label='Mã yêu cầu'
                  control={control}
                  name='pickingCode'
                />
              ) : (
                <CoreInput
                  label='Mã yêu cầu'
                  control={control}
                  name={`pickingSales.${0}.codeRequestStock`}
                />
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              {watch('state') === 'DRAFT' ? (
                <CoreDatePicker
                  title='Ngày dự kiến xuất kho'
                  placeholder='Chọn ngày dự kiến xuất kho'
                  control={control}
                  name='applyDate'
                />
              ) : (
                <CoreDatePicker
                  title='Ngày dự kiến xuất kho'
                  placeholder='Chọn ngày dự kiến xuất kho'
                  control={control}
                  name={`pickingSales.${0}.updateAt`}
                />
              )}
            </Grid>
          </Grid>
          <CoreTable
            className='mt-40'
            tableName='inventoryExport'
            columns={columns}
            data={tableData}
            paginationHidden
          />
        </>
      ) : watch('pickingSales').length > 0 ? (
        tableDataPurchaseOrSales
      ) : null}
    </>
  )
}

export default InventoryExport
