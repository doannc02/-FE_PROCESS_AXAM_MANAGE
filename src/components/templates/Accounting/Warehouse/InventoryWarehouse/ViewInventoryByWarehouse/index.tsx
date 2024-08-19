import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { Box, Button, Grid } from '@mui/material'
import { useViewInventoryByWarehouse } from './useViewInventoryByWarehouse'
import { CoreButton } from '@/components/atoms/CoreButton'
import { useRouter } from 'next/router'
import { MENU_URL } from '@/routes'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import moment from 'moment'

export const ViewInventoryByWarehouse = () => {
  const [values, handles] = useViewInventoryByWarehouse()
  const router = useRouter()
  const {
    methodForm,
    data,
    isLoading,
    columns,
    rowData,
    isLoadingWarehouse,
    warehouseData,
  } = values

  const { onChangePageSize, onSubmit, onReset } = handles

  const { control, watch } = methodForm
  const { typeWareHouse } = useCheckPath()

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: 'Danh sách kho hàng',
            },
          ]}
        />
      }
    >
      <form onSubmit={onSubmit}>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreAutocomplete
              name={'warehouseId'}
              control={control}
              label={'Kho hàng'}
              placeholder={'Chọn kho'}
              options={warehouseData}
              returnValueType='enum'
              labelPath='name'
              valuePath='id'
              loading={isLoadingWarehouse}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreDatePicker
              control={control}
              name='startDate'
              title='Từ ngày'
              inputFormat='DD/MM/YYYY'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
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
      <CoreTable
        columns={columns}
        data={rowData}
        onChangePageSize={onChangePageSize}
        isLoading={isLoading}
        onRowClick={(id: number) => {
          router.push({
            pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].INVENTORY_WAREHOUSE.DEPARTMENT.VIEW_BY_WAREHOUSE}/productsInWarehouse`,
            query: {
              id,
            },
          })
        }}
      />
    </PageContainer>
  )
}
