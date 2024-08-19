import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { WHITE } from '@/helper/colors'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box, Button, Grid, Menu, MenuItem, Typography } from '@mui/material'
import {
  listType,
  useViewInventoryByProductTemplate,
} from './useViewInventoryByProductTemplate'
import { CoreButton } from '@/components/atoms/CoreButton'
import { MENU_URL } from '@/routes'
import { useRouter } from 'next/router'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'

export const ViewInventoryByProductTemplate = () => {
  const [values, handles] = useViewInventoryByProductTemplate()
  const router = useRouter()
  const { typeWareHouse } = useCheckPath()
  const {
    methodForm,
    isLoading,
    columns,
    rowData,
    data,
    anchorEl,
    open,
    queryPage,
  } = values

  const {
    onSubmit,
    onReset,
    refetch,
    onChangePageSize,
    handleClick,
    handleClose,
    setQueryPage,
  } = handles

  const { control } = methodForm

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: 'Danh sách sản phẩm',
            },
          ]}
        />
      }
    >
      <form onSubmit={onSubmit}>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreInput
              control={control}
              name='search'
              label='Tìm kiếm'
              placeholder='Nhập từ khóa'
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
        isShowColumnStt
        columns={columns}
        data={rowData}
        onChangePageSize={onChangePageSize}
        isLoading={isLoading}
        paginationHidden={rowData?.length < 1}
        // onRowClick={(id: number) => {
        //   router.push({
        //     pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].INVENTORY_WAREHOUSE.DEPARTMENT.VIEW_BY_PRODUCT_TEMPLATE}/viewVariants`,
        //     query: {
        //       id,
        //     },
        //   })
        // }}
      />
    </PageContainer>
  )
}
