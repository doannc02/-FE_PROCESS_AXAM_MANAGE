import { CheckboxCustom } from '@/components/atoms/CheckboxCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import LoadingPage from '@/components/atoms/LoadingPage'
import PlusIcon from '@/components/icons/PlusIcon'
import { RemoveIcon } from '@/components/atoms/RemoveIcon'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Grid, Typography } from '@mui/material'
import { useDialogEditLot } from './useDialogEditLot'
import { autoGen } from '@/helper/autoGen'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getLotManagementLot } from '@/service/warehouse/inventoryFirstPeriod/getListLo'
import useCheckPath from '@/components/hooks/path/useCheckPath'

export type DialogEditLotProps = {
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
  onChangeSerialLotLineDeleteIds: (newValue: any, index: number) => void
  isView: boolean
}

export const DialogEditLot = (props: DialogEditLotProps) => {
  const [values, handles] = useDialogEditLot(props)
  const { typeWareHouse } = useCheckPath()
  const { isView } = props
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
    index,
    trigger,
    // lotSelect,
    append,
    remove,
    data,
  } = values

  const { onSubmit, onChangeSerialLotLineDeleteIds } = handles

  // if (isLoading) return <LoadingPage />

  return (
    <DialogCustom
      title='Chỉnh sửa số Lô'
      onClose={hideDialog}
      width={1500}
      formProps={{ onSubmit, className: 'mx-10 my-15' }}
    >
      {fields.map((field, index) => {
        const serialLotLines = watch('serialLotLines') ?? []
        // const optionLotSelectHandle = lotSelect.filter(
        //   (v) =>
        //     !serialLotLines.some(
        //       (v2, idx) => v2.quantity === v.value && index !== idx
        //     )
        // )

        return (
          <Grid container key={field.key} spacing={3}>
            <Grid item xs={12} sm={5} md={2.5} lg={2.5}>
              <CoreInput
                control={control}
                name={`serialLotLines.${index}.serialLots.code`}
                label='Số lô'
                placeholder='Nhập số lô'
                required
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
                name={`serialLotLines.${index}.quantity`}
                label='Số lượng'
                placeholder='Nhập số lượng'
                inputProps={{ maxLength: 11 }}
                required
                type='number'
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
                    setValue(
                      `serialLotLines.${index}.intoMoney`,
                      val * watch(`serialLotLines.${index}.quantity`)
                    )
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
                type='number'
                isViewProp={true}
              />
            </Grid>
          </Grid>
        )
      })}
      {!isView ? (
        <>
          {' '}
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
                        intoMoney: 0,
                      }))

                      setValue('serialLotLines', newValue)
                    } else setValue('serialLotLines', data)
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
              Hủy
            </CoreButton>
            <CoreButton theme='submit' type='submit'>
              Lưu thay đổi
            </CoreButton>
          </Grid>
        </>
      ) : null}
    </DialogCustom>
  )
}
