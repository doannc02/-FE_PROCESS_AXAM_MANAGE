import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useStockPickingList } from './useStockPickingList'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { MENU_URL } from '@/routes'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'

export const ExportWarehouseList = () => {
  const router = useRouter()
  const { showDialog } = useDialog()
  const [values, handles] = useStockPickingList()
  const {
    isLoading,
    register,
    watch,
    setError,
    control,
    formState,
    trigger,
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
              title: 'Yêu cầu xuất kho',
            },
          ]}
        />
      }
    >
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <CoreInput
              control={control}
              name='search'
              label='Tìm kiếm'
              placeholder='Nhập từ khóa'
              inputProps={{ maxLength: 255 }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={3}>
            <CoreDatePicker
              control={control}
              name='createdAt'
              title='Ngày gửi yêu cầu'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <CoreDatePicker
              control={control}
              name='scheduledDate'
              title='Ngày xuất dự kiến'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <CoreAutocomplete
              control={control}
              name='state'
              label='Trạng thái'
              options={[
                { value: 'WAITING', label: 'Chờ xuất kho' },
                { value: 'DONE', label: 'Đã xuất kho' },
                { value: 'REJECTED', label: 'Bị huỷ' },
                { value: 'DONE_PART', label: 'Xuất 1 phần' },
              ]}
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
          />
        )}
      </form>
    </PageContainer>
  )
}
