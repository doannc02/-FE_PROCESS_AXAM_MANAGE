import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box, Collapse, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import useCustomCollapseAPI from './useCustomCollapseAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import { RowBoxCommon } from '@/components/templates/Accounting/Warehouse/WarehouseManagement/ViewWarehouse/components/BoxCustom'
import { sourceListOption } from '@/components/templates/Accounting/Warehouse/ExportWarehouse/FactoryWarehouse/useFactoryWarehouseList'
import CoreLoading from '@/components/molecules/CoreLoading'
import { BLUE } from '@/helper/colors'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getStockPickingTypeList } from '@/service/warehouse/inventoryFirstPeriod/getListStockPickingType'
import { getUserList } from '@/service/uaa/user/getList'
import { getWarehouseList } from '@/service/warehouse/getList'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CustomDisplayStateInv from '../CustomDisplayStateInv'

type Props = {
  stateInventory: string
  index: number
  className?: string
  id: number
  code: string
  typeInventory: 'IN' | 'OUT'
}

const CustomCollapseAPI = ({
  stateInventory,
  index,
  id,
  className,
  typeInventory,
  code,
}: Props) => {
  const [openIndex, setOpenIndex] = useState<null | number>(null)
  const isCallItem = openIndex === index

  const [values, handles] = useCustomCollapseAPI({
    id: id,
    typeInventory: typeInventory,
    isCallItem,
  })
  const { methodForm, isLoading, columns } = values

  const { stockPickingLinesData } = handles

  const { control, watch } = methodForm
  return (
    <Box
      className={className}
      display='flex'
      flexDirection='column'
      sx={{ marginBottom: '15px' }}
    >
      <div
        className='w-full h-[45px] bg-[#F6F7FB] flex justify-between items-center cursor-pointer px-15'
        style={{
          borderTop: '1px solid #DFE0EB',
          borderBottom: '1px solid #DFE0EB',
        }}
        onClick={() => setOpenIndex(openIndex === index ? null : index)}
      >
        <Typography variant='h6'>{code}</Typography>
        <div className='flex justify-between items-center'>
          <Typography sx={{ fontSize: '12px', fontWeight: '600', color: BLUE }}>
            <CustomDisplayStateInv state={stateInventory} />
          </Typography>
          <KeyboardArrowDownIcon
            fontSize='small'
            style={{
              transform: openIndex === index ? 'rotate(180deg)' : undefined,
            }}
          />
        </div>
      </div>

      {isLoading ? (
        <CoreLoading />
      ) : (
        <Collapse in={openIndex === index}>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='code'
                label='Mã phiếu'
                isViewProp={true}
                className='mt-10'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='doneDate'
                title={
                  typeInventory === 'IN' ? 'Ngày nhập kho' : 'Ngày xuất kho'
                }
                isViewProp={true}
                className='mt-10'
                format='YYYY-MM-DD'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='orderType'
                label='Nguồn đơn'
                isViewProp={true}
                className='mt-10'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name=''
                label='Mã tham chiếu'
                isViewProp={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                name={
                  typeInventory === 'IN'
                    ? 'stockWarehouseName'
                    : 'warehouseName'
                }
                control={control}
                label={typeInventory === 'IN' ? 'Nhập vào kho' : 'Xuất từ kho'}
                isViewProp={true}
              />
            </Grid>
            {typeInventory === 'OUT' ? (
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreAutoCompleteAPI
                  control={control}
                  name='pickingType'
                  label='Loại hoạt động'
                  placeholder='Chọn loại hoạt động'
                  fetchDataFn={getStockPickingTypeList}
                  labelPath='name'
                  valuePath='id'
                  isViewProp={true}
                />
              </Grid>
            ) : (
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CoreInput
                  isViewProp={true}
                  control={control}
                  label='Loại hoạt động'
                  name='pickingTypeData.name'
                />
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='employeeName'
                label={
                  typeInventory === 'IN' ? 'Người nhập kho' : 'Người xuất kho'
                }
                isViewProp={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              {typeInventory === 'IN' ? (
                <CoreInput
                  control={control}
                  name='note'
                  label='Mô tả'
                  isViewProp={true}
                />
              ) : (
                <CoreDatePicker
                  control={control}
                  name='doneDate'
                  title='Ngày xuất kho dự kiến'
                  isViewProp={true}
                  format='YYYY-MM-DD'
                />
              )}
            </Grid>
          </Grid>
          <Typography sx={{ marginTop: '15px' }} variant='h6'>{`Sản phẩm ${
            typeInventory === 'IN' ? 'nhập' : 'xuất'
          } kho`}</Typography>
          <CoreTable
            className='mt-5'
            tableName='inventoryInOut'
            data={stockPickingLinesData}
            columns={columns}
            paginationHidden
          />
        </Collapse>
      )}
    </Box>
  )
}

export default CustomCollapseAPI
