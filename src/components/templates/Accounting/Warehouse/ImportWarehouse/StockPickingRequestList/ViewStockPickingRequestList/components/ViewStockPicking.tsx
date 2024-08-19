import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'

import LoadingPage from '@/components/atoms/LoadingPage'
import { Box, Grid } from '@mui/material'
import moment from 'moment'
import { CoreTable } from '@/components/organism/CoreTable'
import { RowBoxCommon } from '../../../../WarehouseManagement/ViewWarehouse/components/BoxCustom'

export type Props = {
  data: any
  isLoading: any
  tableData: any
  columns: any
}

export const ViewStockPicking = ({
  data,
  isLoading,
  tableData,
  columns,
}: Props) => {
  return (
    <>
      {isLoading && (
        <div className='min-h-[300px] mt-22'>
          <LoadingPage />
        </div>
      )}

      {data && (
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <RowBoxCommon title='Mã phiếu nhập kho' data={data.code} />
          <RowBoxCommon
            title='Ngày nhập kho'
            data={data.doneDate && moment(data.doneDate).format('DD/MM/YYYY')}
          />

          <RowBoxCommon
            title='Nguồn đơn'
            data={
              data.sourceDocument === 'PURCHASE_ORDER'
                ? 'Đơn mua'
                : data.sourceDocument === 'RETURN_ORDER'
                ? 'Đơn trả'
                : data.sourceDocument === 'EXCHANGE'
                ? 'Đơn đổi'
                : data.sourceDocument === 'WARRANTY'
                ? 'Đơn bảo hành'
                : data.sourceDocument === 'MANUAL'
                ? 'Manual'
                : ''
            }
          />
          <RowBoxCommon title='Mã tham chiếu' data={''} />
          <RowBoxCommon title='Nhập vào kho' data={data.stockWarehouseName} />
          <RowBoxCommon
            title='Người nhập kho'
            data={
              data?.employee?.firstName
                ? data?.employee?.firstName + data?.employee?.lastName
                : ''
            }
          />
          <RowBoxCommon title='Ghi chú' data={data?.note ?? ''} />
          {/* <Box
            sx={{
              borderBottom: '1px solid #DFE0EB',
              // padding: '10px 0',
            }}
          >
            <div className='grid grid-cols-2'>
              <p className='text-[#747475] text-sm'>Ghi chú</p>
              <div
                className='whitespace-pre-line text-sm font-bold flex flex-col justify-center'
                dangerouslySetInnerHTML={{
                  __html: data?.note ?? '',
                }}
              />
            </div>
          </Box> */}
        </Grid>
      )}

      {tableData && tableData.length > 0 && (
        <div className='pb-20'>
          <p className='py-6 px-15 font-bold text-[#242424] bg-[#F6F7FB] uppercase'>
            Sản phẩm nhập kho
          </p>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <CoreTable
                className='m-5'
                columns={columns}
                data={tableData}
                paginationHidden
              />
            </Grid>
          </Grid>
        </div>
      )}
    </>
  )
}
