import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useStockPickingRequestList } from './useStockPickingRequestList'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { useRouter } from 'next/router'
import { MENU_URL } from '@/routes'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import useCheckPath from '@/components/hooks/path/useCheckPath'

export const StockPickingRequestList = () => {
  const { t } = useTranslation(
    'warehouse/importWarehouse/stockPickingRequestList/index'
  )
  const { typeWareHouse } = useCheckPath()
  const router = useRouter()
  const { showDialog } = useDialog()
  const [values, handles] = useStockPickingRequestList()
  const {
    isLoading,
    register,
    watch,
    setError,
    control,
    formState,
    trigger,
    columns,
    stateSelect,
    tableData,
    totalPages,
    getValues,
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
              title: 'Yêu cầu nhập kho',
            },
          ]}
        />
      }
    >
      <form onSubmit={onSubmit}>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <CoreInput
              control={control}
              name='search'
              label='Tìm kiếm'
              placeholder='Nhập từ khóa tìm kiếm'
              inputProps={{ maxLength: 255 }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={4}>
            <CoreDatePicker
              control={control}
              title='Ngày nhập dự kiến'
              placeholder='Chọn ngày nhập dự kiến'
              name='scheduledDate'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
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
            onRowClick={(id: number) => {
              router.push({
                pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].IMPORT_WAREHOUSE.STOCK_PICKING_REQUEST}/[id]`,
                query: {
                  id,
                },
              })
            }}
          />
        )}
      </form>
    </PageContainer>
  )
}
