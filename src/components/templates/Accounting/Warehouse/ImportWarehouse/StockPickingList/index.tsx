import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { sourceDocumentList, useStockPickingList } from './useStockPickingList'
import CoreInput from '@/components/atoms/CoreInput'
import { MENU_URL } from '@/routes'
import useCheckPath from '@/components/hooks/path/useCheckPath'

export const StockPickingList = () => {
  const { t } = useTranslation(
    'warehouse/importWarehouse/stockPickingList/index'
  )
  const { typeWareHouse } = useCheckPath()

  const router = useRouter()
  const { showDialog } = useDialog()
  const [values, handles] = useStockPickingList()
  const {
    isLoading,
    warehouseSelect,
    register,
    control,
    columns,
    stateSelect,
    tableData,
    totalPages,
    page,
    size,
  } = values
  const { onSubmit, onReset, onChangePageSize } = handles

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: <Typography>Phiếu nhập kho</Typography>,
            },
          ]}
        />
      }
    >
      <form onSubmit={onSubmit}>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <CoreInput
              control={control}
              name='search'
              label='Từ khóa'
              placeholder='Nhập từ khóa'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <CoreAutocomplete
              control={control}
              name='warehouseId'
              label='Kho hàng'
              placeholder='Chọn kho'
              returnValueType='enum'
              options={warehouseSelect}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3}>
            <CoreAutocomplete
              control={control}
              name='sourceDocument'
              label='Nguồn đơn'
              placeholder='Chọn nguồn đơn'
              returnValueType='enum'
              options={sourceDocumentList}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <CoreAutocomplete
              control={control}
              name='state'
              label='Trạng thái'
              placeholder='Chọn trạng thái'
              returnValueType='enum'
              options={stateSelect}
            />
          </Grid>

          <div className='flex items-center justify-center w-full my-13'>
            <div className='flex gap-10'>
              <CoreButton theme='reset' onClick={onReset} textTransform='none'>
                Reset
              </CoreButton>
              <CoreButton
                theme='submit'
                type='submit'
                disabled={isLoading}
                textTransform='none'
              >
                Tìm kiếm
              </CoreButton>
            </div>
          </div>
        </Grid>
      </form>
      {tableData && (
        <CoreTable
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          paginationHidden={tableData.length < 1}
          totalPages={totalPages}
          page={page}
          size={size}
          isLoading={isLoading}
          isShowColumnStt
          onRowClick={(id: number) => {
            router.push({
              pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].IMPORT_WAREHOUSE.STOCK_PICKING_LIST}/[id]`,
              query: {
                id,
                actionType: 'VIEW',
              },
            })
          }}
        />
      )}
    </PageContainer>
  )
}
