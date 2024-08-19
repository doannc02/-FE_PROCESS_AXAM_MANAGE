import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { CustomTable } from '@/components/organism/TableCustom'
import { useCheckPath } from '@/path'
import { MENU_URL } from '@/routes'
import { useRouter } from 'next/router'
import { useSaleOrderManagement } from './useSaleOrderManagement'

export const SaleOrderManagement = () => {
  const router = useRouter()
  const [values, handles] = useSaleOrderManagement()
  const { typePathSale } = useCheckPath()
  const {
    control,
    isLoading,
    data,
    page,
    size,
    totalPages,
    dataRows,
    columns,
    stateFilter,
    PATH_URL,
  } = values
  const { refetch, onSubmit, handleReset, onChangePageSize } = handles

  return (
    <PageWithDetail
      title={
        <div className='flex justify-between items-center'>
          <div className='flex'>
            <CoreBreadcrumbs
              isShowDashboard
              breadcrumbs={[
                {
                  title: typePathSale === 'CLEARANCE' ? 'Thanh lý' : 'Đơn bán',
                  pathname: `${MENU_URL.BILLS[typePathSale]}`,
                },
              ]}
            />
          </div>
        </div>
      }
    >
      <div>
        <form onSubmit={onSubmit} autoComplete='off'>
          <div className='grid grid-cols-3 gap-10'>
            <CoreInput
              control={control}
              name='search'
              label='Mã đơn hàng'
              placeholder='Nhập từ khóa'
            />

            <CoreDatePicker
              control={control}
              name='quotationDate'
              title='Ngày gửi báo giá'
            />
            <CoreDatePicker
              control={control}
              name='orderDate'
              title='Ngày đặt hàng'
            />
            <CoreDatePicker
              control={control}
              name='createDate'
              title='Ngày tạo báo giá'
            />
            <CoreAutocomplete
              control={control}
              name='state'
              label='Trạng thái'
              returnValueType='enum'
              placeholder='Chọn trạng thái'
              options={stateFilter}
            />
          </div>
          <div className='flex justify-center mt-6 mb-16'>
            <div className='m-5'>
              <CoreButton
                onClick={() => handleReset()}
                theme='reset'

                // style={{ marginRight: 20 }}
              >
                Reset
              </CoreButton>
            </div>
            <div className='m-5'>
              <CoreButton theme='submit' type='submit'>
                Tìm kiếm
              </CoreButton>
            </div>
          </div>
        </form>
        <CustomTable
          columns={columns}
          data={dataRows}
          onChangePageSize={onChangePageSize}
          page={page}
          size={size}
          totalPages={totalPages}
          isLoading={isLoading}
          isShowColumnStt
        />
      </div>
    </PageWithDetail>
  )
}
