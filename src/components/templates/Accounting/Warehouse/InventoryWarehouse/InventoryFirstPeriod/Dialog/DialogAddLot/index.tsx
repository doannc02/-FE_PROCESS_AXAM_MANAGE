import { CheckboxCustom } from '@/components/atoms/CheckboxCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import LoadingPage from '@/components/atoms/LoadingPage'
import { RemoveIcon } from '@/components/atoms/RemoveIcon'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Grid } from '@mui/material'
import { useDialogAddLot } from './useDialogAddLot'
import PlusIcon from '@/components/icons/PlusIcon'
import { autoGen } from '@/helper/autoGen'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getLotManagementLot } from '@/service/warehouse/inventoryFirstPeriod/getListLo'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'

export type DialogAddLotProps = {
  productId: number
  index: number
  doneQty: number
  sumMoney?: number
  onChangeSerialLotLines: (newValue: any, index: number) => void
  setValueLo: any
}

export const DialogAddLot = (props: DialogAddLotProps) => {
  const [values, handles] = useDialogAddLot(props)
  const { typeWareHouse } = useCheckPath()
  const { doneQty } = props
  const {
    // isLoading,
    hideDialog,
    fields,
    register,
    control,
    errors,
    watch,
    setValue,
    getValues,
    trigger,
    // lotSelect,
    append,
    remove,
    defaultValues,
  } = values

  const { onSubmit } = handles

  // if (isLoading) return <LoadingPage />

  return (
    <DialogCustom
      title='Thêm số Lô'
      onClose={hideDialog}
      width={1500}
      formProps={{ onSubmit, className: 'mx-10 my-15' }}
    >
      {fields.map((field, index2) => {
        const serialLotLines = watch('serialLotLines') ?? []
        // const optionLotSelectHandle = lotSelect.filter(
        //   (v) =>
        //     !serialLotLines.some(
        //       (v2, idx) => v2.quantity === v.value && index2 !== idx
        //     )
        // )
        return (
          <Grid container key={field.key} spacing={3}>
            <Grid item xs={12} sm={5} md={2} lg={2}>
              <CoreInput
                control={control}
                name={`serialLotLines.${index2}.serialLots.code`}
                label='Số lô'
                placeholder='Nhập số lô'
                required
              />
            </Grid>
            <Grid item xs={12} sm={3} md={2} lg={2}>
              <CoreDatePicker
                name={`serialLotLines.${index2}.receiveDate`}
                control={control}
                title='Ngày nhập kho'
              />
            </Grid>

            <Grid item xs={12} sm={3} md={1.5} lg={1.5}>
              <CoreInput
                control={control}
                name={`serialLotLines.${index2}.quantity`}
                label='Số lượng'
                placeholder='Nhập số lượng'
                inputProps={{ maxLength: 11 }}
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
            <Grid item xs={12} sm={3} md={1.5} lg={1.5}>
              <CoreInput
                control={control}
                name={`serialLotLines.${index2}.unitPrice`}
                label='Đơn giá'
                placeholder='Nhập đơn giá'
                inputProps={{ maxLength: 11 }}
                required
                type='number'
                onChangeValue={(val) => {
                  if (val) {
                    setValue(
                      `serialLotLines.${index2}.intoMoney`,
                      val * watch(`serialLotLines.${index2}.quantity`)
                    )
                  } else {
                    setValue(`serialLotLines.${index2}.intoMoney`, 0)
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={1.5} lg={1.5}>
              <CoreInput
                control={control}
                name={`serialLotLines.${index2}.intoMoney`}
                label='Thành tiền'
                inputProps={{ maxLength: 11 }}
                required
                type='number'
                readOnly
              />
            </Grid>

            <Grid item xs={12} sm={2.1} md={2} lg={2}>
              <CoreAutoCompleteAPI
                control={control}
                name={`serialLotLines.${index2}.name`}
                // disabled={watch(`serialLotLines.${index}.disable`)}
                label='Dùng lô có sẵn'
                placeholder='Chọn lô có sẵn'
                valuePath='id'
                labelPath='code'
                fetchDataFn={getLotManagementLot}
                params={{
                  state: 'NOT_USED',
                }}
                type={typeWareHouse}
                onChangeValue={(value) => {
                  if (value) {
                    setValue(
                      `serialLotLines.${index2}.serialLots.code`,
                      value.code
                    )
                    setValue(`serialLotLines.${index2}.quantity`, value.value)
                    setValue(`serialLotLines.${index2}.serialLots.id`, value.id)
                    trigger('serialLotLines')
                  } else {
                    // setValue(`serialLotLines.${index}.disable`, false)
                    setValue(`serialLotLines.${index2}.serialLots.id`, value.id)
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={1.5} md={1.5} lg={1.5}>
              <div className='mt-7'>
                <PlusIcon
                  onClick={() =>
                    append({
                      id: null,
                      serialLots: {
                        id: null,
                        code: autoGen(10),
                      },
                      quantity: 0,
                      receiveDate: '',
                      unitPrice: 0,
                      name: '',
                      intoMoney: 0,
                    })
                  }
                />
                {index2 > 0 && (
                  <RemoveIcon handleClick={() => remove(index2)} />
                )}
              </div>
            </Grid>
          </Grid>
        )
      })}

      <Grid container spacing={2} paddingLeft='13px'>
        <Grid item xs={12} className='flex flex-row items-center'>
          <CheckboxCustom
            formProps={{
              label: 'Tạo số lô theo cách tự động',
              name: 'checkbox',
            }}
            checkboxProps={{
              onChange: (_, value) => {
                if (value) {
                  const newValue = fields.map((item) => ({
                    id: item.id,
                    serialLots: {
                      id: null,
                      code: autoGen(10),
                    },
                    quantity: item.quantity,
                    receiveDate: '',
                    unitPrice: 0,
                    name: '',
                    intoMoney: 0,
                  }))

                  setValue('serialLotLines', newValue)
                } else setValue('serialLotLines', defaultValues.serialLotLines)
                trigger('serialLotLines')
              },
            }}
          />
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        style={{ paddingTop: 10 }}
        className='flex flex-row items-center justify-center gap-10'
      >
        <CoreButton onClick={hideDialog} theme='cancel'>
          HUỶ
        </CoreButton>
        <CoreButton theme='submit' type='submit'>
          Thêm mới
        </CoreButton>
      </Grid>
    </DialogCustom>
  )
}
