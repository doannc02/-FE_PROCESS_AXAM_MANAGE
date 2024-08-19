import { Divider, Grid, Typography } from '@mui/material'
import { CoreTable } from '@/components/organism/CoreTable'
import { RowBoxCommon } from './BoxCustom'
export type Props = {
  data: any
  column: any
  rowArrays: any
}

export const DialogDistributionConfigWarehouse = ({
  data,
  column,
  rowArrays,
}: Props) => {
  console.log('============= data', data)
  return (
    <>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        <RowBoxCommon title='Mã kho' data={data?.code} />
        <RowBoxCommon title='Tên kho' data={data?.name} />
        {/* <RowBoxCommon title='Công ty' data={data?.company?.name} />
        <RowBoxCommon title='Chi nhánh' data={data?.branch?.name} /> */}
        <RowBoxCommon title='Địa chỉ' data={data?.address} />
        {/* <RowBoxCommon
          title='Cấu hình nhập kho'
          data={
            data?.receptionSteps === 'SHIP_ONLY'
              ? 'Nhận hàng trực tiếp (1 bước)'
              : data?.receptionSteps === 'PICK_SHIP'
              ? 'Nhập vào vị trí tập kết sau đó nhập kho (2 bước)'
              : data?.receptionSteps === 'PICK_PACK_SHIP'
              ? 'Nhập vào vị trí tập kết, kiểm tra chất lượng sau đó nhập kho (3 bước)'
              : ''
          }
        />
        <RowBoxCommon
          title='Cấu hình xuất kho'
          data={
            data?.deliverySteps === 'ONE_STEP'
              ? 'Lấy hàng trực tiếp (1 bước)'
              : data?.deliverySteps === 'TWO_STEP'
              ? 'Lấy hàng ra vị trí tập kết sau đó giao hàng (2 bước)'
              : data?.deliverySteps === 'THREE_STEP'
              ? 'Đóng gói, lấy hàng ra vị trí tập kết sau đó giao hàng (3 bước)'
              : ''
          }
        /> */}
        <RowBoxCommon
          title='Điều kiện bảo quản'
          data={
            data?.hasConditionStorage === true
              ? 'Có'
              : data?.hasConditionStorage === false
              ? 'Không'
              : ''
          }
        />
        <RowBoxCommon
          title='Cấu hình thông tin bổ sung'
          data={
            data?.hasAdditionalInfo === true
              ? 'Có'
              : data?.hasAdditionalInfo === false
              ? 'Không'
              : ''
          }
        />
      </Grid>
      {data?.hasConditionStorage === true && (
        <>
          <p className='py-[15px] px-12 font-bold text-[#242424] bg-[#F6F7FB] uppercase text-[17px]'>
            Điều kiện bảo quản
          </p>
          <div className='grid grid-cols-2 gap-8 mx-12'>
            <RowBoxCommon
              title='Nhiệt độ bảo quản tiêu chuẩn'
              data={`${data?.conditionStorage.standardTemperature} độ C`}
            />
            <RowBoxCommon
              title='Nhiệt độ bảo quản tối thiểu'
              data={`${data?.conditionStorage.minTemperature} độ C`}
            />
            <RowBoxCommon
              title='Độ ẩm tiêu chuẩn'
              data={`${data?.conditionStorage.standardHumidity}%`}
            />
          </div>
        </>
      )}
      {data?.hasAdditionalInfo === true && (
        <>
          <p className='py-[15px] px-12 font-bold text-[#242424] bg-[#F6F7FB] uppercase text-[17px]'>
            Cấu hình thông tin bổ sung
          </p>
          <div className='grid grid-cols-2 gap-8 mx-12'>
            <RowBoxCommon
              title='Kinh độ'
              data={
                <>
                  {data?.additionalInfo?.longitude}
                  <sup>o</sup>
                </>
              }
            />
            <RowBoxCommon
              title='Vĩ độ'
              data={
                <>
                  {data?.additionalInfo?.latitude}
                  <sup>o</sup>
                </>
              }
            />
            <RowBoxCommon
              title='Chiều dài'
              data={
                !data?.additionalInfo?.length ? (
                  <>0</>
                ) : !data?.additionalInfo?.lengthUom ? (
                  <>{data?.additionalInfo?.length} m</>
                ) : (
                  `${data?.additionalInfo?.length}${data?.additionalInfo?.lengthUom}`
                )
              }
            />
            <RowBoxCommon
              title='Chiều rộng'
              data={
                !data?.additionalInfo?.width ? (
                  <>0</>
                ) : !data?.additionalInfo?.widthUom ? (
                  <>{data?.additionalInfo?.width} m</>
                ) : (
                  `${data?.additionalInfo?.width}${data?.additionalInfo?.widthUom}`
                )
              }
            />
            <RowBoxCommon
              title='Chiều cao'
              data={
                !data?.additionalInfo?.height ? (
                  <>0</>
                ) : !data?.additionalInfo?.heightUom ? (
                  <>{data?.additionalInfo?.height} m</>
                ) : (
                  `${data?.additionalInfo?.height}${data?.additionalInfo?.heightUom}`
                )
              }
            />
            <RowBoxCommon
              title='Tải trọng nền'
              data={
                !data?.additionalInfo?.weightCapacity ? (
                  <>0</>
                ) : !data?.additionalInfo?.weightCapacityUom ? (
                  <>
                    {data?.additionalInfo?.weightCapacity} m<sup>3</sup>
                  </>
                ) : (
                  `${data?.additionalInfo?.weightCapacity} ${data?.additionalInfo?.weightCapacityUom}`
                )
              }
            />
            <RowBoxCommon
              title='Kiểu kho'
              data={
                data?.additionalInfo?.scene === 'OUTDOOR'
                  ? 'Kho ngoài trời'
                  : 'Kho trong nhà'
              }
            />
          </div>
        </>
      )}

      {data?.state === 'APPROVED' && (
        <>
          <div className='my-10'>
            <Divider />
            <Typography
              variant='h6'
              className='py-6 px-10 bg-[#F6F7FB] uppercase text-[17px]'
            >
              Vị trí trong kho
            </Typography>
            <Divider />
          </div>
          <Grid container columnSpacing={4} className='px-7'>
            <Grid item xs={12}>
              <CoreTable
                columns={column}
                data={rowArrays as any}
                paginationHidden
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}
