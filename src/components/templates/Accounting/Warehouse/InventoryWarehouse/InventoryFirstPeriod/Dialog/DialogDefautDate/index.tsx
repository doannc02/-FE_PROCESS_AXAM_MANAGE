import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import PlusIcon from '@/components/icons/PlusIcon'
import { RemoveIcon } from '@/components/atoms/RemoveIcon'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Grid } from '@mui/material'
import { useDialogDefaultDate } from './useDialogDefaultDate'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'

export type DialogDefaultDateProps = {
  productId: number
  index: number
  doneQty: number
  onChangeSerialLotLines: (newValue: any, index: number) => void
  setValueLo: any
}

export const DialogDefaultDate = (props: DialogDefaultDateProps) => {
  const [values, handles] = useDialogDefaultDate(props)
  const { doneQty } = props
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
    defaultValues,
  } = values

  const { onSubmit } = handles

  return (
    <DialogCustom
      title='Ngày nhập kho'
      onClose={hideDialog}
      width={1000}
      formProps={{ onSubmit, className: 'mx-10 my-15' }}
    >
      {fields.map((field, index) => {
        const serialLotLines = watch('serialLotLines') ?? []
        return (
          <Grid container key={field.key} spacing={3}>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <CoreInput
                control={control}
                name={`serialLotLines.${index}.quantity`}
                label='Số lượng'
                placeholder='Nhập số lượng'
                required
                type='number'
                rules={{
                  validate: {
                    min: (val: number) => {
                      return val > 0 || `Không được nhỏ hơn 0`
                    },
                    max: (val: number) => {
                      return val <= doneQty || `Không được lớn hơn ${doneQty}`
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <CoreDatePicker
                name={`serialLotLines.${index}.receiveDate`}
                control={control}
                title='Ngày nhập kho'
                required
              />
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
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
                    setValue(
                      `serialLotLines.${index}.intoMoney`,
                      val * watch(`serialLotLines.${index}.quantity`)
                    )
                  } else {
                    setValue(`serialLotLines.${index}.intoMoney`, 0)
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={2} lg={2}>
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

            <Grid item xs={12} sm={2} md={1} lg={1}>
              <div className='mt-7'>
                <PlusIcon
                  onClick={() =>
                    append({
                      id: 0,
                      serialLots: {
                        id: 0,
                        code: '',
                      },
                      quantity: 0,
                      receiveDate: '',
                      unitPrice: 0,
                      intoMoney: 0,
                    })
                  }
                />
                {index > 0 && <RemoveIcon handleClick={() => remove(index)} />}
              </div>
            </Grid>
          </Grid>
        )
      })}

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
    </DialogCustom>
  )
}
