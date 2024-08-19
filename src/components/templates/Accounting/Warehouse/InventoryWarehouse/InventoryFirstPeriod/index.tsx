import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { Box, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useInventoryFirstPeriod } from './useInventoryFirstPeriod'
import { CoreButton } from '@/components/atoms/CoreButton'
import { MENU_URL } from '@/routes'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import DialogImport from './Dialog/DialogImport'

const InventoryFirstPeriod = () => {
  const router = useRouter()
  const { showDialog } = useDialog()
  const { typeWareHouse } = useCheckPath()
  console.log(typeWareHouse, 'typeWareHouse')
  const [values, handles] = useInventoryFirstPeriod()
  const {
    control,
    data,
    columns,
    isLoading,
    rowInventoryFirstPeriod,
    t,
    // warehouseSelect,
    // isLoadingWarehouse,
  } = values

  const { onReset, onChangePageSize, onSubmit, refetch } = handles
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: 'Tồn kho đầu kỳ',
            },
          ]}
        />
      }
    >
      <form onSubmit={onSubmit}>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={12}>
            <CoreInput
              control={control}
              name='search'
              label='Tìm kiếm'
              placeholder='Nhập từ khóa'
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          {/* <Grid item xs={12} sm={4} md={4}>
            <CoreAutocomplete
              control={control}
              name='warehouseId'
              label='Kho'
              placeholder='Chọn kho'
              options={warehouseSelect}
              labelPath='name'
              valuePath='id'
              loading={isLoadingWarehouse}
            />
          </Grid> */}
        </Grid>
        <Box className='flex items-center justify-center m-10 gap-14'>
          <CoreButton theme='reset' onClick={onReset} textTransform='none'>
            Reset
          </CoreButton>
          <CoreButton
            theme='submit'
            type='submit'
            loading={isLoading}
            textTransform='none'
          >
            Tìm kiếm
          </CoreButton>
        </Box>
        <div className='py-4 flex justify-end gap-4 items-center'>
          <CoreButton
            theme='submit'
            variant='contained'
            textTransform='none'
            onClick={() => {
              showDialog(<DialogImport refetch={refetch} />)
            }}
          >
            Import
          </CoreButton>
          <CoreButton
            theme='submit'
            variant='contained'
            textTransform='none'
            onClick={() =>
              router.push(
                `${MENU_URL.WARE_HOUSE[typeWareHouse].INVENTORY_WAREHOUSE.INVENTORY_FIRST_PERIOD}/addNew`
              )
            }
          >
            Thêm mới
          </CoreButton>
        </div>
        <CoreTable
          columns={columns}
          data={rowInventoryFirstPeriod}
          isLoading={isLoading}
          onChangePageSize={onChangePageSize}
          onRowClick={(id: number) => {
            router.push({
              pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].INVENTORY_WAREHOUSE.INVENTORY_FIRST_PERIOD}/[id]`,
              query: {
                id,
                actionType: 'VIEW',
              },
            })
          }}
        />
      </form>
    </PageContainer>
  )
}

export default InventoryFirstPeriod
