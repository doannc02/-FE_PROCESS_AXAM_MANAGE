import { CheckboxCustom } from '@/components/atoms/CheckboxCustom'
import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Grid } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import SerialItem from './SerialItem'
import { useDialogAddSerial } from './useDialogAddSerial'

export type DialogAddSerialProps = {
  productId: number
  index: number
  doneQty: number
  onChangeSerialLotLines: (newValue: any, index: number) => void
  setValueSerial: any
}
export const DialogAddSerialV2 = (props: DialogAddSerialProps) => {
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogAddSerial(props)
  const { doneQty } = props
  const {
    // isLoading,
    fields,
    // serialSelect,
    data,
    formContext,
    billData,
    dataAutoGenerateSerial,
    dataAutoGenerateSerialChildren,
  } = values

  const { watch, setValue, trigger } = formContext

  const { onSubmit } = handles

  const listSerial = watch('serialLotLines') ?? []

  return (
    <DialogCustom
      title='Thêm số Serial'
      onClose={hideDialog}
      width={1000}
      formProps={{ onSubmit, className: 'mx-15 mb-15' }}
    >
      <FormProvider {...formContext}>
        <div className='flex flex-row items-center'>
          <CheckboxCustom
            formProps={{
              label: 'Tạo số serial theo cách tự động',
              name: 'checkbox',
            }}
            checkboxProps={{
              onChange: (_, value) => {
                if (value) {
                  const newValue = listSerial.map(
                    (item: any, index: number) => ({
                      // id: item.id,
                      // lotId: null,
                      // lotType: item.lotType,
                      // quantity: item.quantity ?? 1,
                      // lotCode: dataAutoGenerateSerial?.[index],
                      name: '',
                      id: item.id,
                      serialLots: {
                        id: null,
                        code: dataAutoGenerateSerial?.[index],
                      },
                      quantity: item.quantity ?? 1,
                      receiveDate: '',
                      unitPrice: '',
                      disable: true,
                      serialChildren: item.serialChildren?.map(
                        (item2: any, index2: number) => {
                          return {
                            ...item2,
                            id: item2.id,
                            serialLots: {
                              id: null,
                              code:
                                dataAutoGenerateSerialChildren?.[index]?.[
                                  index2
                                ] ?? '',
                            },
                            unitPrice: '',
                            quantity: item2.quantity ?? 1,
                            name: '',
                            disable: true,
                          }
                        }
                      ),
                    })
                  )
                  setValue('serialLotLines', newValue)
                } else setValue('serialLotLines', data)
                trigger('serialLotLines')
              },
            }}
          />
        </div>

        <div className='max-h-[330px] overflow-auto mb-6'>
          {fields.map((field, i) => {
            const serialLotLines = watch('serialLotLines') ?? []
            // const optionSerialSelectHandle = serialSelect.filter(
            //   (v) =>
            //     !serialLotLines.some(
            //       (v2: any, idx: number) => v2.lotId === v.value && i !== idx
            //     )
            // )
            return (
              <SerialItem
                item={field as any}
                index={i}
                key={field.key}
                billData={billData}
                optionSerialSelectHandle={[]}
                doneQty={doneQty}
                // isLoading={isLoading}
              />
            )
          })}
        </div>

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
      </FormProvider>
    </DialogCustom>
  )
}
