import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { WHITE } from '@/helper/colors'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box, Button, Grid, Menu, MenuItem, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useProductsInWarehouse } from './useProductsInWarehouse'
import { MENU_URL } from '@/routes'
import { TableHeadTest } from './components/TableHead'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'

export const ProductsInWarehouse = () => {
  const [values, handles] = useProductsInWarehouse()
  // const { typePath } = useCheckPathInventory()
  const router = useRouter()
  const {
    data,
    methodForm,
    isLoading,
    columns,
    rowData,
    checkingTypeOptions,
    queryPage,
    open,
    anchorEl,
    titlePage,
    warehouseId,
  } = values

  const {
    onChangePageSize,
    onSubmit,
    onReset,
    setQueryPage,
    handleClick,
    handleClose,
  } = handles

  const { control } = methodForm

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: 'Kho hàng',
              pathname: `${MENU_URL.WARE_HOUSE.SALE.INVENTORY_WAREHOUSE.DEPARTMENT.VIEW_BY_WAREHOUSE}`,
            },
            { title: titlePage ?? 'Chi tiết' },
          ]}
        />
      }
    >
      <div className='mx-10'>
        <form onSubmit={onSubmit}>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreDatePicker
                control={control}
                name='startDate'
                title='Từ ngày'
                inputFormat='DD/MM/YYYY'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreDatePicker
                control={control}
                name='endDate'
                title='Đến ngày'
                inputFormat='DD/MM/YYYY'
              />
            </Grid>
          </Grid>
          <Box className='flex items-center justify-center m-10 gap-x-10'>
            <CoreButton
              theme='reset'
              fontSize={14}
              textTransform='none'
              onClick={onReset}
            >
              Reset
            </CoreButton>
            <CoreButton
              theme='submit'
              fontSize={14}
              textTransform='none'
              type='submit'
            >
              Tìm kiếm
            </CoreButton>
          </Box>
        </form>
      </div>

      <CoreTable
        columns={columns}
        data={rowData}
        onChangePageSize={onChangePageSize}
        isLoading={isLoading}
        tableHead={<TableHeadTest />}
      />
    </PageContainer>
  )
}
