import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import { getSerialManagementSerial } from '@/service/warehouse/inventoryFirstPeriod/getListSerial'
import { Grid, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { SerialLotLine } from './type'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'

const SerialItem = (props: {
  item: SerialLotLine
  index: number
  optionSerialSelectHandle: any[]
  billData: any
  isLoading?: boolean
  doneQty: number
  isView?: boolean
}) => {
  const {
    index,
    item,
    optionSerialSelectHandle,
    billData,
    isLoading,
    doneQty,
    isView,
  } = props
  const { control, watch, setValue, trigger } = useFormContext()

  if (!item?.serialChildren?.length) {
    return (
      <Grid container spacing={3} className='w-full p-2'>
        <Grid item xs={12} sm={8} md={2.5} lg={2.5}>
          <CoreInput
            control={control}
            name={`serialLotLines.${index}.serialLots.code`}
            label='Số serial'
            required
            placeholder='Nhập số serial'
            disabled={watch(`serialLotLines.${index}.disable`)}
            inputProps={{
              maxLength: 50,
            }}
            rules={{ required: 'Đây là thông tin bắt buộc' }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={2.5} lg={2.5}>
          <CoreDatePicker
            name={`serialLotLines.${index}.receiveDate`}
            control={control}
            title='Ngày nhập kho'
            required
          />
        </Grid>

        <Grid item xs={12} sm={3} md={2.5} lg={2.5}>
          <CoreInput
            control={control}
            name={`serialLotLines.${index}.unitPrice`}
            label='Đơn giá'
            placeholder='Nhập đơn giá'
            inputProps={{ maxLength: 11 }}
            required
            type='number'
            onChangeValue={(val) => {
              if (val) {
                setValue(`serialLotLines.${index}.intoMoney`, val * 1)
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={2.5} lg={2.5}>
          <CoreInput
            control={control}
            name={`serialLotLines.${index}.intoMoney`}
            label='Thành tiền'
            inputProps={{ maxLength: 11 }}
            required
            type='number'
            readOnly
          />
        </Grid>
        {!isView && (
          <Grid item xs={12} sm={4} md={2} lg={2}>
            <CoreAutoCompleteAPI
              control={control}
              name={`serialLotLines.${index}.name`}
              disabled={watch(`serialLotLines.${index}.disable`)}
              label='Dùng serial có sẵn'
              placeholder='Chọn serial có sẵn'
              valuePath='id'
              labelPath='code'
              fetchDataFn={getSerialManagementSerial}
              params={{
                state: 'NOT_USED',
              }}
              onChangeValue={(value) => {
                if (value) {
                  setValue(
                    `serialLotLines.${index}.serialLots.code`,
                    value.code
                  )
                  setValue(`serialLotLines.${index}.serialLots.id`, value.id)
                  setValue(`serialLotLines.${index}.disable`, true)
                  trigger('serialLotLines')
                } else {
                  setValue(`serialLotLines.${index}.disable`, false)
                  setValue(`serialLotLines.${index}.serialLots.id`, value.id)
                }
              }}
            />
          </Grid>
        )}
      </Grid>
    )
  }
  return (
    <fieldset
      className='mb-10'
      style={{ border: '1px solid #DFE0EB', borderRadius: '4px' }}
    >
      <legend>
        <Typography variant='body2' style={{ color: '#747475' }}>
          Serial
        </Typography>
      </legend>
      <Grid container spacing={3} className='w-full'>
        <Grid item xs={12} sm={8} md={4} lg={4}>
          <CoreInput
            control={control}
            label='Số serial'
            required
            // disabled={watch(`serialLotLines.${index}.disable`)}
            placeholder='Nhập số serial'
            name={`serialLotLines.${index}.serialLots.code`}
            inputProps={{
              maxLength: 50,
            }}
            rules={{ required: 'Đây là thông tin bắt buộc' }}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={4} lg={4}>
          <CoreDatePicker
            name={`serialLotLines.${index}.receiveDate`}
            control={control}
            title='Ngày nhập kho'
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <CoreAutoCompleteAPI
            control={control}
            name={`serialLotLines.${index}.name`}
            // disabled={watch(`serialLotLines.${index}.disable`)}
            label='Dùng serial có sẵn'
            placeholder='Chọn serial có sẵn'
            valuePath='id'
            labelPath='code'
            fetchDataFn={getSerialManagementSerial}
            params={{
              state: 'NOT_USED',
            }}
            onChangeValue={(value) => {
              if (value) {
                setValue(`serialLotLines.${index}.serialLots.code`, value.code)
                // setValue(`serialLotLines.${index}.disable`, true)
                setValue(`serialLotLines.${index}.serialLots.id`, value.id)
                trigger('serialLotLines')
              } else {
                // setValue(`serialLotLines.${index}.disable`, false)
                setValue(`serialLotLines.${index}.serialLots.id`, value.id)
              }
            }}
          />
        </Grid>
      </Grid>
      {item.serialChildren?.map((v2: any, index2: number) => {
        return (
          <Grid container spacing={3} className='w-full' key={index2}>
            <Grid item xs={12} sm={1} md={1} lg={1} />
            <Grid item xs={12} sm={7} md={4} lg={4}>
              <CoreInput
                control={control}
                label={
                  'Số serial linh kiện ' +
                    billData?.billOfMaterialLine.find(
                      (v3: any) => v3.productId === v2.productId
                    )?.productResponse?.name ?? ''
                }
                required
                disabled={watch(`serialLotLines.${index}.disable`)}
                placeholder={'Nhập số serial linh kiện'}
                name={`serialLotLines.${index}.serialChildren.${index2}.serialLots.code`}
                inputProps={{
                  maxLength: 50,
                }}
                rules={{ required: 'Đây là thông tin bắt buộc' }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={4} lg={4}>
              <CoreDatePicker
                name={`serialLotLines.${index}.serialChildren.${index2}.receiveDate`}
                control={control}
                title='Ngày nhập kho'
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <CoreAutoCompleteAPI
                control={control}
                name={`serialLotLines.${index}.serialChildren.${index2}.name`}
                placeholder='Dùng serial có sẵn'
                label='Dùng serial có sẵn'
                fetchDataFn={getSerialManagementSerial}
                params={{
                  state: 'NOT_USED',
                }}
                valuePath='id'
                labelPath='code'
                onChangeValue={(value: any) => {
                  if (value) {
                    setValue(
                      `serialLotLines.${index}.serialChildren.${index2}.serialLots.code`,
                      value.code
                    )
                    setValue(
                      `serialLotLines.${index}.serialChildren.${index2}.serialLots.id`,
                      value.id
                    )
                    // setValue(
                    //   `serialLotLines.${index}.serialChildren.${index2}.disable`,
                    //   true
                    // )
                    trigger(`serialLotLines.${index}`)
                  } else {
                    // setValue(
                    //   `serialLotLines.${index}.serialChildren.${index2}.disable`,
                    //   false
                    // )
                    setValue(
                      `serialLotLines.${index}.serialChildren.${index2}.serialLots.id`,
                      null
                    )
                  }
                  return value
                }}
              />
            </Grid>
          </Grid>
        )
      })}
    </fieldset>
  )
}

export default SerialItem
