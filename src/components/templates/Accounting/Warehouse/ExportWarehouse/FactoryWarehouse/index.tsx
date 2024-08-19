import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useFactoryWarehouseList } from './useFactoryWarehouseList'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { MENU_URL } from '@/routes'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'

const listStatusOut = [
  {
    value: 'PROCESSING',
    label: 'Đang xử lý',
  },
  {
    value: 'REJECTED',
    label: 'Từ chối',
  },
  {
    value: 'WAITING',
    label: 'Chờ xử lý',
  },
  {
    value: 'DONE',
    label: 'Hoàn thành',
  },
]

export const FactoryWarehouseList = () => {
  const router = useRouter()
  const { showDialog } = useDialog()
  const [values, handles] = useFactoryWarehouseList()
  const { typeWareHouse } = useCheckPath()

  const {
    isLoading,
    register,
    control,
    columns,
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
              title: 'Phiếu xuất kho',
            },
          ]}
        />
      }
    >
      <form onSubmit={onSubmit}>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <CoreInput
              control={control}
              name='search'
              label='Tìm kiếm'
              placeholder='Nhập từ khóa'
              inputProps={{ maxLength: 255 }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3}>
            <CoreDatePicker
              control={control}
              name='scheduleDate'
              title='Ngày xuất kho dự kiến'
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3}>
            <CoreDatePicker
              control={control}
              name='doneDate'
              title='Ngày xuất kho'
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3}>
            <CoreAutocomplete
              control={control}
              name='state'
              label='Trạng thái'
              placeholder='Chọn trạng thái'
              returnValueType='enum'
              options={listStatusOut}
            />
          </Grid>
          <div className='flex items-center justify-center w-full my-13'>
            <div className='flex gap-10'>
              <CoreButton theme='reset' onClick={onReset}>
                Reset
              </CoreButton>
              <CoreButton theme='submit' type='submit' disabled={isLoading}>
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
              pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].EXPORT_WAREHOUSE.FACTORY_WAREHOUSE}/[id]`,
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
