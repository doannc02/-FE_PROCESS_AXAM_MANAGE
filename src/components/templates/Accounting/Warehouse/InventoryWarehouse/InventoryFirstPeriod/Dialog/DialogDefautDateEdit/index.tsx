import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Grid } from '@mui/material'
import { useDialogDefaultDateEdit } from './useDialogDefaultDateEdit'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'

export type DialogDefaultDateEditProps = {
  productId: number
  index: number
  data: {
    id: number
    serialLots: {
      id: number
      code: string
    }
    quantity: number
    receiveDate: string
    unitPrice: number
    intoMoney: number
  }[]
  doneQty: number
  setValueLo: any
  onChangeSerialLotLines: (newValue: any, index: number) => void
  isView: boolean
}

export const DialogDefaultDateEdit = (props: DialogDefaultDateEditProps) => {
  const [values, handles] = useDialogDefaultDateEdit(props)
  const { isView } = props
  const {
    hideDialog,
    fields,
    register,
    control,
    errors,
    watch,
    setValue,
    getValues,
    trigger,
    append,
    remove,
  } = values

  const { onSubmit } = handles

  return (
    <DialogCustom
      title='Ngày nhập kho'
      onClose={hideDialog}
      width={1000}
      formProps={{ onSubmit, className: 'mx-10 my-15' }}
    >
      {fields.map((field, index2) => {
        return (
          <Grid container key={field.key} spacing={3}>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <CoreInput
                control={control}
                name={`serialLotLines.${index2}.quantity`}
                label='Số lượng'
                placeholder='Nhập số lượng'
                required
                type='number'
              />
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <CoreDatePicker
                name={`serialLotLines.${index2}.receiveDate`}
                control={control}
                title='Ngày nhập kho'
                required
              />
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <CoreInput
                control={control}
                name={`serialLotLines.${index2}.unitPrice`}
                label='Đơn giá'
                placeholder='Nhập đơn giá'
                inputProps={{ maxLength: 11 }}
                required
                type='number'
                onChangeValue={(val) => {
                  setValue(
                    `serialLotLines.${index2}.intoMoney`,
                    val * watch(`serialLotLines.${index2}.quantity`)
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={2.5} lg={2.5}>
              <CoreInput
                control={control}
                name={`serialLotLines.${index2}.intoMoney`}
                label='Thành tiền'
                inputProps={{ maxLength: 11 }}
                required
                type='number'
                readOnly
                isViewProp={true}
              />
            </Grid>
          </Grid>
        )
      })}
      {!isView ? (
        <Grid
          item
          xs={12}
          style={{ paddingTop: 20 }}
          className='flex flex-row items-center justify-center gap-10 '
        >
          <CoreButton onClick={hideDialog} theme='cancel'>
            Hủy
          </CoreButton>
          <CoreButton theme='submit' type='submit'>
            Thêm mới
          </CoreButton>
        </Grid>
      ) : null}
    </DialogCustom>
  )
}
